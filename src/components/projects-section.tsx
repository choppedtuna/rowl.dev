"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import projects from '@/data/projects';
import { ExternalLink, Users, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionTitle from "./section-title";
import { useSpring, animated } from 'react-spring';

type RobloxGame = {
  visits: number;
  thumbnails: string;
  name: string;
  description: string;
  universeId: string;
};

// Add manual data type for fake cards
type ManualProjectData = {
  visits?: number;
  thumbnailUrl?: string;
  manualStats?: string[];
};

type ProjectWithGameData = {
  project: typeof projects[0];
  gameData: RobloxGame | null;
  manualData?: ManualProjectData; // Add manual data option
};

// Cache utility functions
const getCache = (key: string) => {
  if (typeof window === 'undefined') return null;
  try {
    const item = localStorage.getItem(key);
    if (!item) return null;
    
    const data = JSON.parse(item);
    const now = new Date();
    
    // Check if the cache is expired (24 hours)
    if (data.expiry && new Date(data.expiry) < now) {
      localStorage.removeItem(key);
      return null;
    }
    
    return data.value;
  } catch (err) {
    console.error('Cache error:', err);
    return null;
  }
};

const setCache = (key: string, value: any) => {
  if (typeof window === 'undefined') return;
  try {
    // Set expiry to 24 hours from now
    const expiry = new Date();
    expiry.setHours(expiry.getHours() + 24);
    
    localStorage.setItem(key, JSON.stringify({
      value,
      expiry: expiry.toISOString()
    }));
  } catch (err) {
    console.error('Cache error:', err);
  }
};

export default function ProjectsSection() {
  const [projectsWithData, setProjectsWithData] = useState<ProjectWithGameData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiLimited, setApiLimited] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalVisits, setTotalVisits] = useState(0);
  const [displayVisits, setDisplayVisits] = useState(0);
  
  // Carousel configuration
  const itemsPerSlide = {
    mobile: 1, // Show 1 card on mobile
    tablet: 2, // Show 2 cards on tablet
    desktop: 3, // Show 3 cards on desktop
  };
  
  // Get current number of visible items based on screen size
  const getVisibleItemCount = () => {
    if (typeof window === 'undefined') return itemsPerSlide.desktop;
    
    if (window.innerWidth < 768) {
      return itemsPerSlide.mobile;
    } else if (window.innerWidth < 1024) {
      return itemsPerSlide.tablet;
    }
    return itemsPerSlide.desktop;
  };
  
  const [visibleItemCount, setVisibleItemCount] = useState(itemsPerSlide.desktop);
  
  // Update visible items when window resizes
  useEffect(() => {
    const handleResize = () => {
      setVisibleItemCount(getVisibleItemCount());
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Calculate max index (prevents scrolling beyond available projects)
  const maxIndex = Math.max(0, projectsWithData.length - visibleItemCount);
  
  // Function to go to the next project
  const nextProject = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };
  
  // Function to go to the previous project
  const prevProject = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };
  
  // For the animated total visits counter
  const animatedProps = useSpring({
    from: { number: 0 },
    to: { number: totalVisits },
    config: { tension: 120, friction: 14 }
  });
  
  // Setup total visits counter
  useEffect(() => {
    // Calculate initial total from all projects
    let initialTotal = 0;
    
    // Initialize with data when available
    if (projectsWithData.length > 0 && !isLoading) {
      initialTotal = projectsWithData.reduce((sum, item) => {
        const visits = item.gameData?.visits || item.manualData?.visits || 0;
        return sum + visits;
      }, 0);
      setTotalVisits(initialTotal);
      setDisplayVisits(initialTotal);
    }
    
    // Set interval to add ~60 visits per second
    const interval = setInterval(() => {
      setTotalVisits(prev => prev + 5); // 5 visits every ~83ms ≈ 60 per second
    }, 83);
    
    return () => clearInterval(interval);
  }, [projectsWithData, isLoading]);
  
  // Smoothly animate the display value towards the total
  useEffect(() => {
    if (displayVisits === totalVisits) return;
    
    const difference = totalVisits - displayVisits;
    const increment = Math.max(1, Math.floor(difference * 0.1));
    
    const timeout = setTimeout(() => {
      setDisplayVisits(prev => Math.min(totalVisits, prev + increment));
    }, 16); // ~60fps
    
    return () => clearTimeout(timeout);
  }, [displayVisits, totalVisits]);
  
  useEffect(() => {
    async function fetchRobloxData() {
      try {
        setIsLoading(true);
        
        const projectsWithGameData = await Promise.all(
          projects.map(async (project) => {
            try {
              // Handle fake/manual cards
              if (project.isFakeCard) {
                return {
                  project,
                  gameData: null,
                  manualData: {
                    visits: project.manualVisits,
                    thumbnailUrl: project.gameIcon,
                    manualStats: project.keyStats
                  }
                };
              }
              
              // Skip if no gameId is provided
              if (!project.gameId) {
                return {
                  project,
                  gameData: null
                };
              }
              
              // Check localStorage cache first
              const cacheKey = `roblox-game-${project.gameId}`;
              const cachedData = getCache(cacheKey);
              
              if (cachedData) {
                console.log(`Using cached data for ${project.name}`);
                return {
                  project,
                  gameData: cachedData
                };
              }
              
              // Use our API route instead of directly calling Roblox API
              const response = await fetch(`/api/roblox/games?gameIds=${project.gameId}`);
              
              if (!response.ok) {
                // Instead of throwing, return a fallback with the project config data
                console.warn(`API request failed for ${project.name} with status ${response.status}`);
                
                // Check if it's likely a rate limit (429)
                if (response.status === 429) {
                  setApiLimited(true);
                }
                
                // Try to get from localStorage as fallback
                const cachedData = getCache(cacheKey);
                if (cachedData) {
                  return {
                    project,
                    gameData: cachedData
                  };
                }
                
                return {
                  project,
                  gameData: null
                };
              }
              
              const data = await response.json();
              
              // Check if we have valid data
              if (data.details?.data && data.details.data.length > 0 && data.thumbnails?.data) {
                const game = data.details.data[0];
                const thumbnail = data.thumbnails.data[0];
                
                const gameData: RobloxGame = {
                  visits: game.visits || 0,
                  thumbnails: thumbnail?.imageUrl || "/placeholder.jpg",
                  name: project.name || game.name, // Use custom name if provided, fall back to API name
                  description: game.description || "No description available",
                  universeId: game.id.toString()
                };
                
                // Save to localStorage cache
                setCache(cacheKey, gameData);
                
                return {
                  project,
                  gameData
                };
              }
              
              // If we don't have valid data, return project with null gameData
              return {
                project,
                gameData: null
              };
            } catch (err) {
              // Catch errors for each individual project fetch to prevent failing the entire batch
              console.error(`Error fetching data for ${project.name}:`, err);
              
              // Try to get from localStorage as fallback
              const cacheKey = `roblox-game-${project.gameId}`;
              const cachedData = getCache(cacheKey);
              if (cachedData) {
                return {
                  project,
                  gameData: cachedData
                };
              }
              
              return {
                project,
                gameData: null
              };
            }
          })
        );
        
        setProjectsWithData(projectsWithGameData);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching Roblox data:", err);
        setIsLoading(false);
      }
    }
    
    fetchRobloxData();
  }, []);
  
  return (
    <section id="projects" className="py-8 pt-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <SectionTitle title="Projects" subtitle="MY TOP HITS" centered={true} />
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-300 border-t-zinc-800" />
          </div>
        ) : (
          <div className="relative px-12 md:px-16">
            {/* Carousel container with overflow hidden */}
            <div className="overflow-hidden relative">
              {/* Sliding track */}
              <div 
                className="flex transition-transform duration-500 ease-out w-full"
                style={{ 
                  transform: `translateX(-${(currentIndex * 100) / visibleItemCount}%)`,
                }}
              >
                {/* Projects */}
                {projectsWithData.map((item, index) => (
                  <div 
                    key={index} 
                    className={`flex-none px-1`}
                    style={{ width: `${100 / visibleItemCount}%` }}
                  >
                    <div className="mx-1">
                      <ProjectCard 
                        item={item} 
                        index={index} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation buttons */}
            {projectsWithData.length > visibleItemCount && (
              <>
                <button 
                  onClick={prevProject}
                  disabled={currentIndex === 0}
                  className={`absolute top-1/2 left-0 -translate-y-1/2 bg-white dark:bg-zinc-800 rounded-full p-4 shadow-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors z-30 ${
                    currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'
                  }`}
                  aria-label="Previous project"
                >
                  <ChevronLeft className="w-6 h-6 text-zinc-600 dark:text-zinc-300" />
                </button>
                <button 
                  onClick={nextProject}
                  disabled={currentIndex >= maxIndex}
                  className={`absolute top-1/2 right-0 -translate-y-1/2 bg-white dark:bg-zinc-800 rounded-full p-4 shadow-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors z-30 ${
                    currentIndex >= maxIndex ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'
                  }`}
                  aria-label="Next project"
                >
                  <ChevronRight className="w-6 h-6 text-zinc-600 dark:text-zinc-300" />
                </button>
              </>
            )}
            
            {/* Progress indicator */}
            <div className="flex justify-center space-x-1 mt-6">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentIndex === index 
                      ? 'w-6 bg-gradient-to-r from-purple-500 to-orange-500' 
                      : 'w-1.5 bg-zinc-300 dark:bg-zinc-700'
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>
            
            {/* Total Visits Counter */}
            <div className="mt-10 text-center">
              <div className="inline-flex items-center bg-gradient-to-r from-purple-500/10 to-orange-500/10 px-6 py-4 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                <Users className="h-5 w-5 mr-2 text-purple-500" />
                <span className="mr-2 font-medium">Total Visits:</span>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-500 to-orange-500 bg-clip-text text-transparent">
                  {formatNumber(displayVisits)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

function ProjectCard({ 
  item,
  index
}: { 
  item: ProjectWithGameData;
  index: number;
}) {
  const { project, gameData, manualData } = item;
  const [isInView, setIsInView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            setIsInView(true);
            hasAnimated.current = true;
          }
        });
      },
      { 
        threshold: 0.15,
        rootMargin: "0px 0px -10% 0px"
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);
  
  // Calculate different animation directions based on index
  const getAnimationProperties = () => {
    // Alternate between different entrance animations
    const options = [
      { translateX: '-50px', translateY: '0px' },    // Left
      { translateX: '50px', translateY: '0px' },     // Right
      { translateX: '0px', translateY: '50px' },     // Bottom
      { translateX: '-30px', translateY: '30px' },   // Bottom-left
      { translateX: '30px', translateY: '30px' },    // Bottom-right
    ];
    
    return options[index % options.length];
  };
  
  const { translateX, translateY } = getAnimationProperties();
  const delay = (index % 3) * 100; // Stagger the animations within each row
  
  // Determine the thumbnail image to use
  const thumbnailImage = project.gameIcon || 
                        (manualData?.thumbnailUrl) || 
                        (gameData?.thumbnails) || 
                        '/placeholder-game.png';
  
  // Determine visit count from either API data or manual data
  const visitsCount = gameData?.visits || manualData?.visits;
  
  // Get stats from project.keyStats or manualData.manualStats
  const statsToShow = manualData?.manualStats || project.keyStats;
  
  // Generate Roblox game URL using gameId
  const robloxGameUrl = project.gameId 
    ? `https://www.roblox.com/games/${project.gameId}`
    : project.gameUrl || null; // Fallback to project.gameUrl if available
  
  return (
    <div
      ref={cardRef}
      className={`
        bg-white dark:bg-zinc-900 rounded-lg shadow-md overflow-hidden h-full flex flex-col
        transform transition-all duration-800 ease-out
        ${isInView ? 'opacity-100 translate-x-0 translate-y-0 scale-100' : `opacity-0 translate-x-[${translateX}] translate-y-[${translateY}] scale-95`}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="relative h-48">
        {thumbnailImage ? (
          <div 
            className={`
              w-full h-full overflow-hidden
              ${isInView ? 'animate-reveal-image' : ''}
            `}
          >
            <Image
              src={thumbnailImage}
              alt={project.name}
              fill
              className={`
                object-cover
                transition-all duration-1000 ease-out
                ${isInView ? 'scale-100 filter-none' : 'scale-110 blur-sm'}
              `}
              style={{ transitionDelay: `${delay + 200}ms` }}
              unoptimized={true}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder-game.png';
              }}
            />
          </div>
        ) : (
          <div className="w-full h-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
            <p className="text-zinc-500 dark:text-zinc-400">No image available</p>
          </div>
        )}
        
        <div className={`
          absolute top-0 left-0 m-3
          transition-all duration-500
          ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
        `}
        style={{ transitionDelay: `${delay + 400}ms` }}
        >
          <a
            href={project.companyWebsite}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-white dark:bg-zinc-900 shadow-md rounded-full py-1 px-3 hover:shadow-lg transition-shadow duration-300 group"
          >
            <Image
              src={project.companyIcon}
              alt={project.company}
              width={20}
              height={20}
              className="rounded-full"
              onError={(e) => {
                // Hide the image on error
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            <span className="text-xs font-medium">{project.company}</span>
            <ExternalLink className="h-3 w-3 text-zinc-400 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
      
      <div className="p-4 flex-grow">
		<h3 className={`
			text-2xl
			sm:text-2xl
			md:text-3xl
			font-bold
			tracking-tight
			mb-3 font-nanami
            transition-all duration-700 ease-out
            ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}
		`}
        style={{ transitionDelay: `${delay + 100}ms` }}
        >
			{project.name}
		</h3>
        
        <div className="h-5 mb-2">
          {visitsCount ? (
            <div className={`
              flex items-center text-sm text-zinc-600 dark:text-zinc-400
              transition-all duration-700 ease-out
              ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}
            `}
            style={{ transitionDelay: `${delay + 200}ms` }}
            >
              <Users className="h-4 w-4 mr-1" />
              <span>{formatNumber(visitsCount)} visits</span>
            </div>
          ) : (
            <div className="h-4"></div> // Empty placeholder for consistent spacing
          )}
        </div>
        
        <ul className="space-y-1 mb-2">
          {statsToShow.map((stat, statIndex) => (
            <li key={statIndex} className={`
              flex items-start
              transition-all duration-700 ease-out
              ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}
            `}
            style={{ transitionDelay: `${delay + 300 + (statIndex * 100)}ms` }}
            >
              <Award className="h-4 w-4 mr-2 mt-1 flex-shrink-0 text-zinc-500" />
              <span className="text-sm">{stat}</span>
            </li>
          ))}
        </ul>
        
        {/* Visit Game Button */}
        {robloxGameUrl && (
          <div 
            className={`
              mt-auto pt-2
              transition-all duration-700 ease-out
              ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
            style={{ transitionDelay: `${delay + 400}ms` }}
          >
            <a 
              href={robloxGameUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full py-2 px-4 bg-gradient-to-r from-purple-500 to-orange-500 hover:from-purple-600 hover:to-orange-600 text-white rounded-md transition-all duration-300 group"
            >
              <span>Visit Game</span>
              <ExternalLink className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

// Add to your global CSS or create a style tag in your layout
const styles = `
@keyframes revealImage {
  0% { clip-path: inset(0 100% 0 0); }
  100% { clip-path: inset(0 0 0 0); }
}
.animate-reveal-image {
  animation: revealImage 1.2s ease-out forwards;
}
`;

// Add the styles to the document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
} 