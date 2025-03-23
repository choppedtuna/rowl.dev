'use client';

import React from 'react';
import { Box, Typography, Container, Paper, Avatar } from '@mui/material';
import Grid from '@mui/material/Grid';
import TechBackground from './tech-background';
import experiences, { Experience, ExperienceSectionConfig, defaultConfig } from '../data/experiences';

interface ExperienceSectionProps {
  config?: Partial<ExperienceSectionConfig>;
}

// Experience card component that spans horizontally
function ExperienceCard(props: Experience & { showSkills: boolean }) {
  const { title, organization, period, description, skills, icon, showSkills } = props;
  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        transition: 'transform 0.2s',
        willChange: 'transform',
        transform: 'translate3d(0, 0, 0)',
        '&:hover': {
          transform: 'translate3d(0, -4px, 0)'
        }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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
          <Typography variant="h6" component="h3" fontWeight="bold">
            {title}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {organization} • {period}
          </Typography>
        </Box>
      </Box>
      
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
      
      {showSkills && skills && skills.length > 0 && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
          {skills.map((skill: string, index: number) => (
            <Box 
              key={index}
              sx={{
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                px: 1,
                py: 0.5,
                fontSize: '0.75rem',
              }}
            >
              {skill}
            </Box>
          ))}
        </Box>
      )}
    </Paper>
  );
}

export default function ExperienceSection({ config = {} }: ExperienceSectionProps) {
  // Merge default config with any provided config
  const finalConfig: ExperienceSectionConfig = { ...defaultConfig, ...config };
  const { sectionTitle, sectionSubtitle, itemsPerRow, showSkills, animate } = finalConfig;
  
  // Calculate grid size based on itemsPerRow
  const gridSize = {
    xs: 12,
    md: itemsPerRow === 1 ? 12 : itemsPerRow === 2 ? 6 : 4
  };

  return (
    <Box 
      component="section" 
      id="experience" 
      className="section-container"
      sx={{ 
        py: 8,
        position: 'relative',
        overflow: 'hidden',
        transition: animate ? 'transform 0.5s ease-in-out' : 'none',
        willChange: animate ? 'transform' : 'auto',
        transform: 'translate3d(0, 0, 0)',
        '&:hover': animate ? {
          transform: 'translate3d(0, 0, 0) scale(1.005)'
        } : {}
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
          minHeight: {xs: 'auto', md: '600px'},
          width: '100%'
        }}
      >
        <Box 
          sx={{ 
            mb: 6,
            transition: animate ? 'transform 0.4s ease' : 'none',
            willChange: animate ? 'transform' : 'auto',
            transform: 'translate3d(0, 0, 0)',
            '.section-container:hover &': animate ? {
              transform: 'translate3d(0, -5px, 0)'
            } : {}
          }}
        >
          <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom>
            {sectionTitle}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {sectionSubtitle}
          </Typography>
        </Box>
        
        <Grid 
          container 
          spacing={4}
          sx={{
            transition: animate ? 'transform 0.5s ease' : 'none',
            willChange: animate ? 'transform' : 'auto',
            transform: 'translate3d(0, 0, 0)',
            '.section-container:hover &': animate ? {
              transform: 'translate3d(0, -2px, 0)'
            } : {}
          }}
        >
          {experiences.map((item: Experience, index: number) => (
            <Grid item xs={gridSize.xs} md={gridSize.md} key={index}>
              <ExperienceCard {...item} showSkills={showSkills} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
} 