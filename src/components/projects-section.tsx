'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Card, CardMedia, CardContent, Stack, Chip, CircularProgress, Button, Divider, Avatar, Alert, useTheme, useMediaQuery } from '@mui/material';
import Grid from '@mui/material/Grid';
import PeopleIcon from '@mui/icons-material/People';
import StarIcon from '@mui/icons-material/Star';
import LaunchIcon from '@mui/icons-material/Launch';
import InsightsIcon from '@mui/icons-material/Insights';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TechBackground from './tech-background';
import Slider from 'react-slick';
// Import slick carousel styles
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Configure universe IDs here - easy to modify
const PROJECTS_CONFIG = [
	// Chicken Life
  {
    gameId: '6149941304',
    name: 'Chicken Life',
    company: 'Talewind Studio',
    companyIcon: '/images/companies/talewind.webp',
    companyWebsite: 'https://www.talewind.co.uk/',
    keyStats: [
      'Increased Spend by 20x through improved Shop surfacing & content updates',
      'Created a comprehensive building system',
      'Peak of 10K concurrent players'
    ]
  },
  {
	gameId: '15432848623',
	name: 'Netflix NextWorld',
	company: 'Buoy Studio',
	companyIcon: '/images/companies/buoy.png',
	companyWebsite: 'https://www.buoy.studio/',
	keyStats: [
      'Over 20 IP activations launched (including Squid Game and NFL)',
      'Improved UGC strategy leading to a sustained increase in player engagement',
      'Peak of 7K concurrent players'
    ]
  },
  {
	gameId: '16164895787',
	name: 'Netflix One Piece',
	company: 'Buoy Studio',
	companyIcon: '/images/companies/buoy.png',
	companyWebsite: 'https://www.buoy.studio/',
	keyStats: [
      'Created a responsive and energetic combat & enemy system',
	  'Pushing the limits of ROBLOX constraints - over 300 enemies on screen at once',
	  'Peak of 5K concurrent players'
    ]
  }
];

interface RobloxGame {
  id: string;
  gameId: string;
  name: string; // This can be a custom name from config or API name
  description: string; // Kept for backward compatibility but not displayed
  thumbnail: string;
  visits: number;
  favoritedCount: number;
  company: string;
  companyIcon?: string;
  companyWebsite?: string;
  keyStats?: string[]; // Added key stats field
}

interface ProjectCardProps {
  name: string;
  description?: string;
  image: string;
  plays: string;
  rating: string;
  company: string;
  gameId: string;
  companyIcon?: string;
  companyWebsite?: string;
  keyStats?: string[]; // Added key stats field
}

function ProjectCard({ name, image, plays, rating, company, gameId, companyIcon, companyWebsite, keyStats }: ProjectCardProps) {
  return (
    <Card elevation={2} sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      transition: 'box-shadow 0.3s',
      '&:hover': {
        boxShadow: 4
      }
    }}>
      <Box sx={{ position: 'relative', pt: '56.25%' }}> {/* 16:9 aspect ratio */}
        <CardMedia
          component="img"
          image={image}
          alt={name}
          sx={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </Box>
      <CardContent sx={{ 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column',
        py: 1.75, // Reduced from py: 2
        pb: 1.25, // Reduced from pb: 1.5
      }}>
        <Typography variant="h6" component="h3" gutterBottom fontWeight="bold">
          {name}
        </Typography>
        
        <Box 
          component={companyWebsite ? "a" : "div"}
          href={companyWebsite}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ 
            display: 'inline-block',
            mb: 1.25, // Reduced from mb: 1.5
            bgcolor: 'action.hover',
            borderRadius: 1,
            px: 1.25, // Reduced from px: 1.5
            py: 0.6, // Reduced from py: 0.75
            textDecoration: 'none',
            transition: 'background-color 0.2s',
            cursor: companyWebsite ? 'pointer' : 'default',
            '&:hover': {
              bgcolor: companyWebsite ? 'action.selected' : 'action.hover'
            }
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            {companyIcon && (
              <Avatar 
                src={companyIcon} 
                alt={company}
                sx={{ width: 18, height: 18 }} // Reduced from width: 20, height: 20
              />
            )}
            <Typography variant="body2" color="text.secondary">
              at {company}
            </Typography>
          </Stack>
        </Box>
        
        <Divider sx={{ mb: 1.25 }} /> {/* Reduced from mb: 1.5 */}
        
        {/* Key Stats section */}
        {keyStats && keyStats.length > 0 && (
          <Box sx={{ mb: 1.5, minHeight: '70px' }}> {/* Reduced from mb: 2, minHeight: '80px' */}
            <Stack direction="row" spacing={0.75} alignItems="center" sx={{ mb: 0.75 }}> {/* Reduced from spacing: 1, mb: 1 */}
              <InsightsIcon fontSize="small" color="primary" />
              <Typography variant="subtitle2" fontWeight="bold">
                Key Stats:
              </Typography>
            </Stack>
            <Box component="ul" sx={{ 
              pl: 1.5, // Reduced from pl: 2
              m: 0,
              listStyleType: 'none'
            }}>
              {keyStats.map((stat, index) => (
                <Typography 
                  component="li" 
                  variant="body2" 
                  key={index} 
                  sx={{ 
                    mb: 0.5,
                    position: 'relative',
                    pl: 2.25, // Reduced from pl: 2.5
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: 7, // Reduced from width: 8
                      height: 7, // Reduced from height: 8
                      borderRadius: '50%',
                      background: theme => 
                        `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                      boxShadow: theme => 
                        `0 1px 3px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.2)'}`
                    }
                  }}
                >
                  {stat}
                </Typography>
              ))}
            </Box>
          </Box>
        )}
        
        <Box sx={{ flexGrow: 1 }} /> {/* Push plays and button to bottom */}
        
        <Stack direction="row" spacing={1.5} sx={{ mb: 1.25 }}> {/* Reduced from spacing: 2, mb: 1.5 */}
          <Chip 
            icon={<PeopleIcon />} 
            label={plays} 
            size="small" 
            variant="outlined" 
          />
          <Chip 
            icon={<StarIcon />} 
            label={rating} 
            size="small" 
            variant="outlined" 
          />
        </Stack>
        <Button 
          variant="contained" 
          color="primary" 
          size="small" 
          endIcon={<LaunchIcon />}
          href={`https://www.roblox.com/games/${gameId}`}
          target="_blank"
          rel="noopener noreferrer"
          fullWidth
        >
          View on ROBLOX
        </Button>
      </CardContent>
    </Card>
  );
}

function HireMeCard() {
  return (
    <Card elevation={2} sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      transition: 'box-shadow 0.3s',
      backgroundColor: 'background.paper',
      position: 'relative',
      overflow: 'hidden',
      borderRadius: 2
    }}>
      <Box sx={{ position: 'relative', pt: '56.25%' }}> {/* Match project card aspect ratio */}
        <CardMedia
          component="img"
          image="/images/code-keyboard.jpg"
          alt="Your Game Could Be Next"
          sx={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: theme => theme.palette.mode === 'dark' 
              ? 'brightness(0.7) contrast(1.2)' 
              : 'brightness(0.9)',
          }}
        />
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: theme => theme.palette.mode === 'dark'
            ? 'linear-gradient(rgba(0,0,0,0.5), rgba(10,10,30,0.8))'
            : 'linear-gradient(rgba(255,255,255,0.5), rgba(200,200,255,0.8))',
          zIndex: 1
        }}>
          <Typography 
            variant="h5" 
            component="div" 
            sx={{ 
              color: 'text.primary', 
              fontWeight: 'bold',
              textAlign: 'center',
              textShadow: theme => theme.palette.mode === 'dark'
                ? '0 2px 4px rgba(0,0,0,0.5)'
                : '0 2px 4px rgba(0,0,0,0.2)',
              px: 2
            }}
          >
            Your Vision, My Code
          </Typography>
        </Box>
      </Box>
      <CardContent sx={{ 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column',
        position: 'relative',
        zIndex: 1,
        py: 1.75, // Reduced from py: 2
        pb: 1.25, // Reduced from pb: 1.5
      }}>
        <Typography variant="h6" component="h3" gutterBottom fontWeight="bold" color="text.primary">
          Your Game Could Be Next
        </Typography>
        
        <Typography variant="body2" sx={{ mb: 1.25, color: 'text.secondary' }}> {/* Reduced from mb: 1.5 */}
          Have a concept for the next hit ROBLOX game? Let's bring it to life together with professional development.
        </Typography>

        {/* Price Box - Styled similarly to Key Stats section */}
        <Box sx={{ mb: 1.5, minHeight: '70px' }}> {/* Reduced from mb: 2, minHeight: '80px' */}
          <Stack direction="row" spacing={0.75} alignItems="center" sx={{ mb: 0.75 }}> {/* Reduced from spacing: 1, mb: 1 */}
            <InsightsIcon fontSize="small" color="primary" />
            <Typography variant="subtitle2" fontWeight="bold">
              Rates & Availability:
            </Typography>
          </Stack>
          
          <Typography 
            component="div" 
            variant="body2" 
            sx={{ 
              mb: 1.25, // Reduced from mb: 1.5
              pl: 2.25, // Reduced from pl: 2.5
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                width: 7, // Reduced from width: 8
                height: 7, // Reduced from height: 8
                borderRadius: '50%',
                background: theme => 
                  `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                boxShadow: theme => 
                  `0 1px 3px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.2)'}`
              }
            }}
          >
            Generalist Programmer
          </Typography>
          
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              borderRadius: '10px',
              border: theme => `1px solid ${theme.palette.divider}`,
              overflow: 'hidden',
              padding: 1.5, // Reduced from padding: 2
              background: theme => theme.palette.mode === 'dark' 
                ? 'linear-gradient(135deg, rgba(25,118,210,0.15), rgba(25,118,210,0.05))' 
                : 'linear-gradient(135deg, rgba(25,118,210,0.1), rgba(25,118,210,0.05))',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
            }}
          >
            <Typography 
              variant="body1" 
              component="span" 
              color="primary" 
              fontWeight="bold"
              sx={{ textAlign: 'center' }}
            >
              Reach out to discuss rates
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ flexGrow: 1 }} /> {/* Push content to bottom, matching project card */}
        
        <Stack direction="row" spacing={1.5} sx={{ mb: 1.25 }}> {/* Reduced from spacing: 2, mb: 1.5 */}
          <Chip 
            icon={<StarIcon />} 
            label="100% Dedication" 
            size="small" 
            variant="outlined"
            color="primary"
          />
        </Stack>
        <Button 
          variant="contained" 
          color="primary" 
          size="small" 
          href="#contact"
          fullWidth
          sx={{ fontWeight: 'bold' }}
        >
          Let's Work Together
        </Button>
      </CardContent>
    </Card>
  );
}

// Store successful responses to localStorage
function useLocalStorageCache() {
  // Get data from localStorage
  const getCache = (key: string) => {
    if (typeof window === 'undefined') return null;
    
    try {
      const item = localStorage.getItem(key);
      if (!item) return null;
      
      const parsed = JSON.parse(item);
      // Check if cache is expired (24 hours)
      if (parsed.timestamp && Date.now() - parsed.timestamp < 24 * 60 * 60 * 1000) {
        return parsed.data;
      }
      return null;
    } catch (e) {
      console.error('Error reading from localStorage', e);
      return null;
    }
  };
  
  // Set data to localStorage
  const setCache = (key: string, data: any) => {
    if (typeof window === 'undefined') return;
    
    try {
      const item = {
        data,
        timestamp: Date.now()
      };
      localStorage.setItem(key, JSON.stringify(item));
    } catch (e) {
      console.error('Error writing to localStorage', e);
    }
  };
  
  return { getCache, setCache };
}

// Custom arrow components for the carousel
function PrevArrow(props: any) {
  const { onClick } = props;
  return (
    <Box
      sx={{
        position: 'absolute',
        left: { xs: '-15px', sm: '-25px' },
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: { xs: '30px', sm: '40px' },
        height: { xs: '30px', sm: '40px' },
        borderRadius: '50%',
        backgroundColor: 'background.paper',
        boxShadow: 2,
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: 'action.hover'
        }
      }}
      onClick={onClick}
    >
      <ArrowBackIcon fontSize="small" />
    </Box>
  );
}

function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <Box
      sx={{
        position: 'absolute',
        right: { xs: '-15px', sm: '-25px' },
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: { xs: '30px', sm: '40px' },
        height: { xs: '30px', sm: '40px' },
        borderRadius: '50%',
        backgroundColor: 'background.paper',
        boxShadow: 2,
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: 'action.hover'
        }
      }}
      onClick={onClick}
    >
      <ArrowForwardIcon fontSize="small" />
    </Box>
  );
}

export default function ProjectsSection() {
  const [games, setGames] = useState<RobloxGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [displayedVisits, setDisplayedVisits] = useState(0);
  const [totalVisits, setTotalVisits] = useState(0);
  const [apiLimited, setApiLimited] = useState(false);
  const { getCache, setCache } = useLocalStorageCache();
  
  // Theme and responsive breakpoints
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    async function fetchRobloxData() {
      try {
        setLoading(true);
        
        const fetchedGames = await Promise.all(
          PROJECTS_CONFIG.map(async (project) => {
            try {
              // Check localStorage cache first
              const cacheKey = `roblox-game-${project.gameId}`;
              const cachedData = getCache(cacheKey);
              
              if (cachedData) {
                console.log(`Using cached data for ${project.name}`);
                return cachedData;
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
                  return cachedData;
                }
                
                return {
                  id: project.gameId,
                  gameId: project.gameId,
                  name: project.name,
                  description: "No description available",
                  thumbnail: "/placeholder.jpg",
                  visits: 0,
                  favoritedCount: 0,
                  company: project.company,
                  companyIcon: project.companyIcon,
                  companyWebsite: project.companyWebsite,
                  keyStats: project.keyStats
                };
              }
              
              const data = await response.json();
              
              // Check if we have valid data
              if (data.details?.data && data.details.data.length > 0 && data.thumbnails?.data) {
                const game = data.details.data[0];
                const thumbnail = data.thumbnails.data[0];
                
                const gameData = {
                  id: game.id,
                  gameId: project.gameId,
                  name: project.name || game.name, // Use custom name if provided, fall back to API name
                  description: "No description available", // Not used, but needed for interface compliance
                  thumbnail: thumbnail?.imageUrl || "/placeholder.jpg",
                  visits: game.visits || 0,
                  favoritedCount: game.favoritedCount || 0,
                  company: project.company,
                  companyIcon: project.companyIcon,
                  companyWebsite: project.companyWebsite,
                  keyStats: project.keyStats // Add key stats to the game object
                };
                
                // Save to localStorage cache
                setCache(cacheKey, gameData);
                
                return gameData;
              }
              
              // If we don't have valid data, return a fallback with the project config data
              return {
                id: project.gameId,
                gameId: project.gameId,
                name: project.name,
                description: "No description available",
                thumbnail: "/placeholder.jpg",
                visits: 0,
                favoritedCount: 0,
                company: project.company,
                companyIcon: project.companyIcon,
                companyWebsite: project.companyWebsite,
                keyStats: project.keyStats
              };
            } catch (err) {
              // Catch errors for each individual project fetch to prevent failing the entire batch
              console.error(`Error fetching data for ${project.name}:`, err);
              
              // Try to get from localStorage as fallback
              const cacheKey = `roblox-game-${project.gameId}`;
              const cachedData = getCache(cacheKey);
              if (cachedData) {
                return cachedData;
              }
              
              return {
                id: project.gameId,
                gameId: project.gameId,
                name: project.name,
                description: "No description available",
                thumbnail: "/placeholder.jpg",
                visits: 0,
                favoritedCount: 0,
                company: project.company,
                companyIcon: project.companyIcon,
                companyWebsite: project.companyWebsite,
                keyStats: project.keyStats
              };
            }
          })
        );
        
        // All fetchedGames will now have values, no need for filtering
        const validGames = fetchedGames as RobloxGame[];
        setGames(validGames);
        
        // Calculate total visits from all games
        const totalGameVisits = validGames.reduce((total, game) => total + game.visits, 0);
        setTotalVisits(totalGameVisits);
        setDisplayedVisits(totalGameVisits);
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching Roblox data:", err);
        setError("Failed to load projects data");
        setLoading(false);
      }
    }
    
    fetchRobloxData();
  }, []);

  // Effect to simulate increasing visits
  useEffect(() => {
    if (!loading && totalVisits > 0) {
      // Increase by ~100 players per second
      const interval = setInterval(() => {
        setDisplayedVisits(prev => {
          const increment = Math.floor(Math.random() * 20) + 90; // Random increment between 90-110
          return prev + increment;
        });
      }, 1000); // Update every second
      
      return () => clearInterval(interval);
    }
  }, [loading, totalVisits]);

  // Format number with suffix (K, M, B)
  const formatNumber = (num: number): string => {
    // Display number with commas for thousands separators
    return num.toLocaleString();
  };

  // Fallback data in case API fails
  const fallbackProjects = [
    {
      name: "Zombie Survival",
      description: "A thrilling survival game where players must defend against waves of zombies. I contributed to game mechanics and AI systems.",
      image: "/game1.jpg",
      plays: "2.5M+ Plays",
      rating: "95% Rating",
      company: "Survival Games Inc.",
      gameId: "12345",
      companyIcon: "/company-default.png",
      companyWebsite: "https://example.com/survival-games",
      keyStats: ["Procedural Map Generation", "Advanced AI Systems", "Weapon Crafting"]
    },
    {
      name: "Tycoon Adventure",
      description: "Build and manage your own empire in this addictive tycoon simulator. I designed the economic systems and progression mechanics.",
      image: "/game2.jpg",
      plays: "3.8M+ Plays",
      rating: "92% Rating",
      company: "Tycoon Masters",
      gameId: "23456",
      companyIcon: "/company-default.png",
      companyWebsite: "https://example.com/tycoon-masters",
      keyStats: ["Complex Economy", "80+ Unique Buildings", "Multi-Player Management"]
    },
    {
      name: "Racing Simulator",
      description: "Race against friends and competitors in high-speed action. I implemented the physics system and vehicle customization features.",
      image: "/game3.jpg",
      plays: "1.7M+ Plays",
      rating: "89% Rating",
      company: "Speed Studios",
      gameId: "34567",
      companyIcon: "/company-default.png",
      companyWebsite: "https://example.com/speed-studios",
      keyStats: ["Realistic Physics", "40+ Vehicles", "Custom Track Builder"]
    }
  ];

  // Configure the carousel settings
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: isMobile ? 1 : isTablet ? 2 : 3,
    slidesToScroll: isMobile ? 1 : isTablet ? 2 : 3,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    adaptiveHeight: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <Box 
      component="section" 
      id="portfolio" 
      className="section-container"
      sx={{ 
        py: { xs: 8, md: 9 },
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.6s ease-in-out'
      }}
    >
      <TechBackground 
        variant="grid" 
        opacity={0.08} 
        animated={true}
        rotateAnimation={true}
        gradientFade={true}
        gradientAngle={135}
        edgeFade={true}
        hoverInteraction={false}
        sx={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0
        }}
      />
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box 
          sx={{ 
            mb: 4,
            transition: 'all 0.4s ease',
            '.section-container:hover &': {
              transform: 'translateY(-5px)'
            }
          }}
        >
          <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom>
            Portfolio
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Check out my most popular ROBLOX games and experiences!
          </Typography>
        </Box>
        
        {apiLimited && (
          <Alert severity="info" sx={{ mb: 3 }}>
            Some data may be limited due to Roblox API rate limits. Refresh in a few minutes to see all project details.
          </Alert>
        )}
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" sx={{ textAlign: 'center' }}>
            {error} - Showing fallback data instead
          </Typography>
        ) : (
          <Box sx={{ 
            px: { xs: 1, sm: 3 },
            pb: { xs: 5, sm: 6 },
            pt: 1,
            '.slick-slide': {
              px: 1.5,
              pb: 4
            },
            '.slick-dots': {
              bottom: -20
            },
            '.slick-dots li button:before': {
              fontSize: 9,
              color: theme => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'
            },
            '.slick-dots li.slick-active button:before': {
              color: theme => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.9)'
            }
          }}>
            <Slider {...sliderSettings}>
              {/* Map all project cards */}
              {(games.length > 0 ? games : fallbackProjects).map((project, index) => (
                <Box key={index} sx={{ px: 0.75 }}>
                  {'id' in project ? (
                    <ProjectCard 
                      name={project.name}
                      description={project.description}
                      image={project.thumbnail}
                      plays={`${formatNumber(project.visits)} Plays`}
                      rating={`${formatNumber(project.favoritedCount)} Favorites`}
                      company={project.company}
                      gameId={project.gameId}
                      companyIcon={project.companyIcon}
                      companyWebsite={project.companyWebsite}
                      keyStats={project.keyStats}
                    />
                  ) : (
                    <ProjectCard {...(project as any)} />
                  )}
                </Box>
              ))}
              
              {/* Add the "Hire Me" card at the end */}
              <Box sx={{ px: 0.75 }}>
                <HireMeCard />
              </Box>
            </Slider>
          </Box>
        )}
        
        {/* Total Visits Counter */}
        {!loading && games.length > 0 && (
          <Box 
            sx={{ 
              mt: 8,
              p: 3,
              textAlign: 'center',
              position: 'relative',
              borderRadius: '14px',
              background: theme => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
              boxShadow: theme => theme.palette.mode === 'dark' ? '0 4px 20px rgba(0,0,0,0.2)' : '0 4px 20px rgba(0,0,0,0.05)',
              transition: 'box-shadow 0.4s ease',
              '&:hover': {
                boxShadow: theme => theme.palette.mode === 'dark' ? '0 8px 30px rgba(0,0,0,0.3)' : '0 8px 30px rgba(0,0,0,0.1)',
              }
            }}
          >
            <Stack 
              direction="row" 
              spacing={1.5}
              alignItems="center" 
              justifyContent="center"
            >
              <PeopleIcon 
                sx={{
                  fontSize: { xs: 28, sm: 32 },
                  color: theme => theme.palette.mode === 'dark' 
                    ? 'rgba(255,255,255,0.9)' 
                    : 'rgba(0,0,0,0.9)',
                  opacity: 0.85
                }}
              />
              <Typography 
                variant="h4"
                component="div" 
                fontWeight="bold" 
                gutterBottom
                sx={{
                  overflow: 'hidden',
                  display: 'inline-block',
                  transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)', // Spring animation
                  color: theme => theme.palette.mode === 'dark' 
                    ? 'rgba(255,255,255,0.95)' 
                    : 'rgba(0,0,0,0.95)',
                  textShadow: theme => theme.palette.mode === 'dark'
                    ? '0 2px 4px rgba(0,0,0,0.3)'
                    : '0 1px 2px rgba(0,0,0,0.1)'
                }}
              >
                {formatNumber(displayedVisits)}
              </Typography>
            </Stack>
            <Typography 
              variant="h6"
              component="div"
              sx={{
                mt: 0.5,
                color: theme => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.95)' : 'rgba(30,30,60,0.95)'
              }}
            >
              sessions and counting!
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
} 