'use client';

import React from 'react';
import { Box, Typography, Container, Paper, Avatar } from '@mui/material';
import Grid from '@mui/material/Grid';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import PublicIcon from '@mui/icons-material/Public';
import CodeIcon from '@mui/icons-material/Code';
import TechBackground from './tech-background';

interface AccomplishmentCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

function AccomplishmentCard({ title, description, icon }: AccomplishmentCardProps) {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        height: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 3,
        transition: 'transform 0.2s',
        willChange: 'transform',
        transform: 'translate3d(0, 0, 0)',
        '&:hover': {
          transform: 'translate3d(0, -4px, 0)'
        }
      }}
    >
      <Avatar
        sx={{
          bgcolor: 'primary.main',
          width: 48,
          height: 48,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon}
      </Avatar>
      <Box>
        <Typography variant="h6" component="h3" gutterBottom fontWeight="bold">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </Box>
    </Paper>
  );
}

export default function AccomplishmentsSection() {
  const accomplishments = [
    {
      title: "10 Million Total Plays",
      description: "Across all published games and experiences",
      icon: <WhatshotIcon />
    },
    {
      title: "Featured Game",
      description: "Featured on ROBLOX front page for 3 weeks",
      icon: <EmojiEventsIcon />
    },
    {
      title: "Top-Rated Developer",
      description: "Consistently high ratings across published work",
      icon: <HeadsetMicIcon />
    },
    {
      title: "ROBLOX Innovation Award",
      description: "For unique game mechanics and innovation",
      icon: <AutoAwesomeIcon />
    },
    {
      title: "Community Recognition",
      description: "Active community engagement and support",
      icon: <PublicIcon />
    },
    {
      title: "Development Expertise",
      description: "Advanced scripting and game architecture skills",
      icon: <CodeIcon />
    }
  ];

  return (
    <Box 
      component="section" 
      id="achievements" 
      className="section-container"
      sx={{ 
        py: 8,
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.5s ease-in-out',
        willChange: 'transform',
        transform: 'translate3d(0, 0, 0)'
      }}
    >
      <TechBackground 
        variant="dots" 
        opacity={0.08} 
        animated={false}
        rotateAnimation={false}
        gradientFade={true}
        gradientAngle={45}
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
      <Container 
        maxWidth="lg" 
        sx={{ 
          position: 'relative', 
          zIndex: 1,
          // Set explicit dimensions to prevent layout shifts
          minHeight: {xs: 'auto', md: '600px'},
          width: '100%'
        }}
      >
        <Box 
          sx={{ 
            mb: 6,
            transition: 'transform 0.4s ease',
            willChange: 'transform',
            transform: 'translate3d(0, 0, 0)',
            '.section-container:hover &': {
              transform: 'translate3d(0, -5px, 0)'
            }
          }}
        >
          <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom>
            Achievements
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Key milestones and achievements from my ROBLOX development journey
          </Typography>
        </Box>
        
        <Grid 
          container 
          spacing={3}
          sx={{
            transition: 'transform 0.5s ease',
            willChange: 'transform',
            transform: 'translate3d(0, 0, 0)',
            '.section-container:hover &': {
              transform: 'translate3d(0, -2px, 0)'
            }
          }}
        >
          {accomplishments.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <AccomplishmentCard {...item} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
} 