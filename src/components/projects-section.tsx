'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Card, CardMedia, CardContent, Stack, Chip, CircularProgress, Button, Divider, Avatar } from '@mui/material';
import Grid from '@mui/material/Grid';
import PeopleIcon from '@mui/icons-material/People';
import StarIcon from '@mui/icons-material/Star';
import LaunchIcon from '@mui/icons-material/Launch';
import TechBackground from './tech-background';

// Configure universe IDs here - easy to modify
const PROJECTS_CONFIG = [
	// Chicken Life
  {
    gameId: '6149941304',
    name: 'Chicken Life',
    company: 'Talewind Studio',
    companyIcon: '/images/companies/talewind.webp',
    companyWebsite: 'https://www.talewind.co.uk/',
  },
  {
	gameId: '15432848623',
	name: 'Netflix NextWorld',
	company: 'Buoy Studio',
	companyIcon: '/images/companies/buoy.png',
	companyWebsite: 'https://www.buoy.studio/',
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
}

function ProjectCard({ name, image, plays, rating, company, gameId, companyIcon, companyWebsite }: ProjectCardProps) {
  return (
    <Card elevation={2} sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      transition: 'transform 0.3s',
      '&:hover': {
        transform: 'translateY(-4px)'
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
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
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
            mb: 1.5,
            bgcolor: 'action.hover',
            borderRadius: 1,
            px: 1.5,
            py: 0.75,
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
                sx={{ width: 20, height: 20 }}
              />
            )}
            <Typography variant="body2" color="text.secondary">
              at {company}
            </Typography>
          </Stack>
        </Box>
        
        <Divider sx={{ mb: 1.5 }} />
        
        <Stack direction="row" spacing={2} sx={{ mb: 2, mt: 2, flexGrow: 1 }}>
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

export default function ProjectsSection() {
  const [games, setGames] = useState<RobloxGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRobloxData() {
      try {
        setLoading(true);
        
        const fetchedGames = await Promise.all(
          PROJECTS_CONFIG.map(async (project) => {
            // Use our API route instead of directly calling Roblox API
            const response = await fetch(`/api/roblox/games?gameIds=${project.gameId}`);
            
            if (!response.ok) {
              throw new Error(`API request failed with status ${response.status}`);
            }
            
            const data = await response.json();
            
            // Check if we have valid data
            if (data.details?.data && data.details.data.length > 0 && data.thumbnails?.data) {
              const game = data.details.data[0];
              const thumbnail = data.thumbnails.data[0];
              
              return {
                id: game.id,
                gameId: project.gameId,
                name: project.name || game.name, // Use custom name if provided, fall back to API name
                description: "No description available", // Not used, but needed for interface compliance
                thumbnail: thumbnail?.imageUrl || "/placeholder.jpg",
                visits: game.visits || 0,
                favoritedCount: game.favoritedCount || 0,
                company: project.company,
                companyIcon: project.companyIcon,
                companyWebsite: project.companyWebsite
              };
            }
            return null;
          })
        );
        
        setGames(fetchedGames.filter(game => game !== null) as RobloxGame[]);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching Roblox data:", err);
        setError("Failed to load projects data");
        setLoading(false);
      }
    }
    
    fetchRobloxData();
  }, []);

  // Format number with suffix (K, M, B)
  const formatNumber = (num: number): string => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B+';
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M+';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K+';
    }
    return num.toString();
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
      companyWebsite: "https://example.com/survival-games"
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
      companyWebsite: "https://example.com/tycoon-masters"
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
      companyWebsite: "https://example.com/speed-studios"
    }
  ];

  return (
    <Box 
      component="section" 
      id="portfolio" 
      className="section-container"
      sx={{ 
        py: 10,
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.6s ease-in-out',
        '&:hover': {
          backgroundColor: theme => theme.palette.mode === 'dark' 
            ? 'rgba(255,255,255,0.03)' 
            : 'rgba(0,0,0,0.01)'
        }
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
            mb: 6,
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
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" sx={{ textAlign: 'center' }}>
            {error} - Showing fallback data instead
          </Typography>
        ) : null}
        
        <Grid container spacing={4}>
          {(games.length > 0 ? games : fallbackProjects).map((project, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
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
                />
              ) : (
                <ProjectCard {...(project as any)} />
              )}
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
} 