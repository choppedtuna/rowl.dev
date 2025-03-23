'use client';

import React from 'react';
import { Box, Typography, Container, Card, CardMedia, CardContent, Stack, Chip } from '@mui/material';
import Grid from '@mui/material/Grid';
import PeopleIcon from '@mui/icons-material/People';
import StarIcon from '@mui/icons-material/Star';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  plays: string;
  rating: string;
}

function ProjectCard({ title, description, image, plays, rating }: ProjectCardProps) {
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
          alt={title}
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
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
          {description}
        </Typography>
        <Stack direction="row" spacing={2}>
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
      </CardContent>
    </Card>
  );
}

export default function ProjectsSection() {
  const projects = [
    {
      title: "Zombie Survival",
      description: "A thrilling survival game where players must defend against waves of zombies",
      image: "/game1.jpg",
      plays: "2.5M+ Plays",
      rating: "95% Rating"
    },
    {
      title: "Tycoon Adventure",
      description: "Build and manage your own empire in this addictive tycoon simulator",
      image: "/game2.jpg",
      plays: "3.8M+ Plays",
      rating: "92% Rating"
    },
    {
      title: "Racing Simulator",
      description: "Race against friends and competitors in high-speed action",
      image: "/game3.jpg",
      plays: "1.7M+ Plays",
      rating: "89% Rating"
    }
  ];

  return (
    <Box component="section" id="projects" sx={{ py: 8, bgcolor: 'action.hover' }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom>
            Projects
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Check out my most popular ROBLOX games and experiences
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          {projects.map((project, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <ProjectCard {...project} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
} 