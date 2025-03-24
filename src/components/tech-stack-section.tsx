'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Box, Typography, Container, Paper, useTheme, alpha } from '@mui/material';
import TechBackground from './tech-background';
import { useScrollAnimation } from '@/lib/use-scroll-animation';

// Tech stack items - moved outside component to prevent recreation
const techStack = [
  { name: 'Luau', icon: '/images/tech/luau.png', description: 'Roblox\'s Lua variant with typed features' },
  { name: 'TypeScript', icon: '/images/tech/typescript.png', description: 'Typed JavaScript for scalable applications' },
  { name: 'React', icon: '/images/tech/react.png', description: 'UI library for building interfaces' },
  { name: 'Next.js', icon: '/images/tech/nextjs.png', description: 'React framework for production' },
  { name: 'Material UI', icon: '/images/tech/mui.png', description: 'React component library' },
  { name: 'Tailwind CSS', icon: '/images/tech/tailwind.png', description: 'Utility-first CSS framework' },
];

// Compute card styles once per card
const getCardColor = (index: number) => index % 2 === 0 ? '#9b4dca' : '#0070F3';

// Memoize orbital positions and styles
const orbitRadiusConfig = { xs: '130px', sm: '160px', md: '200px' };
const orbitDuration = 60; // Slower animation to reduce CPU usage

export default function TechStackSection() {
  const theme = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Heavily throttled mouse movement to minimize renders
  const handleMouseMove = useCallback((e: MouseEvent) => {
    // Only update state when there's sufficient mouse movement
    const x = Math.round(e.clientX / window.innerWidth * 10) / 10;
    const y = Math.round(e.clientY / window.innerHeight * 10) / 10;
    
    setMousePosition(prev => {
      // Only update if changed by a meaningful amount
      if (Math.abs(prev.x - x) > 0.1 || Math.abs(prev.y - y) > 0.1) {
        return { x, y };
      }
      return prev;
    });
  }, []);
  
  // Set up mouse move event with throttling
  useEffect(() => {
    let isThrottled = false;
    const throttleTime = 150; // ms between updates
    
    const throttledMouseMove = (e: MouseEvent) => {
      if (!isThrottled) {
        handleMouseMove(e);
        isThrottled = true;
        setTimeout(() => { isThrottled = false; }, throttleTime);
      }
    };
    
    window.addEventListener('mousemove', throttledMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', throttledMouseMove);
  }, [handleMouseMove]);

  // Memoize section styles
  const sectionStyles = useMemo(() => ({
    py: { xs: 8, md: 12 },
    position: 'relative',
    overflow: 'hidden',
    transition: 'background-color 0.5s ease-in-out'
  }), [theme.palette.mode]);

  // Memoize the orbit animation styles
  const orbitAnimationStyles = useMemo(() => ({
    position: 'relative',
    height: { xs: '500px', md: '600px' },
    perspective: '1000px',
    mx: 'auto',
    overflow: 'hidden',
    // Orbit animation for the container element
    '@keyframes orbit': {
      '0%': { 
        transform: 'translate(-50%, -50%) rotate(var(--start-angle)) translateX(var(--orbit-radius))' 
      },
      '100%': { 
        transform: 'translate(-50%, -50%) rotate(calc(var(--start-angle) + 360deg)) translateX(var(--orbit-radius))' 
      }
    },
    // Counter-rotation for the card itself
    '@keyframes counterRotate': {
      '0%': { 
        transform: 'rotate(calc(var(--start-angle) * -1))' 
      },
      '100%': { 
        transform: 'rotate(calc((var(--start-angle) + 360deg) * -1))' 
      }
    }
  }), []);
  
  // Render tech cards without re-computing for every render
  const techCards = useMemo(() => (
    techStack.map((tech, index) => (
      <OrbitalTechCard 
        key={tech.name} 
        tech={tech} 
        index={index} 
        totalCards={techStack.length} 
        orbitDuration={orbitDuration}
      />
    ))
  ), []);

  return (
    <Box 
      component="section" 
      id="tech-stack"
      className="section-container"
      sx={sectionStyles}
    >
      <TechBackground 
        variant="dots" 
        opacity={0.04} // Further reduced opacity
        animated={false} // Disable animation for better performance
        rotateAnimation={false}
        gradientFade={true}
        gradientAngle={120}
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
          minHeight: {xs: 'auto', md: '600px'}, // Reduced height
          width: '100%'
        }}
      >
        {/* Section heading */}
        <Box 
          sx={{ 
            mb: 6,
            textAlign: 'center',
            transition: 'transform 0.4s ease',
            transform: 'translate3d(0, 0, 0)',
            '.section-container:hover &': {
              transform: 'translate3d(0, -5px, 0)'
            }
          }}
        >
          <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom>
            Tech Stack
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Technologies and tools I work with
          </Typography>
        </Box>
        
        {/* Orbital Tech Display */}
        <Box sx={orbitAnimationStyles}>
          {/* Central Glow Effect - Static, no animations */}
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: { xs: '160px', md: '180px' },
              height: { xs: '160px', md: '180px' },
              borderRadius: '50%',
              background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.12)} 0%, transparent 70%)`,
              opacity: 0.6
            }}
          />
          
          {/* Render pre-memoized tech cards */}
          {techCards}
        </Box>
      </Container>
    </Box>
  );
}

// Pure component for tech cards to prevent unnecessary renders
const OrbitalTechCard = React.memo(function OrbitalTechCard({ 
  tech, 
  index, 
  totalCards,
  orbitDuration
}: { 
  tech: { name: string; icon: string; description: string }, 
  index: number,
  totalCards: number,
  orbitDuration: number
}) {
  const theme = useTheme();
  const { ref, scrollProgress } = useScrollAnimation({
    threshold: 0.1, // Increased threshold to reduce calculations
    opacity: { start: 0, end: 1 },
    translateY: { start: 15, end: 0 }, // Further reduced movement
    scale: { start: 0.97, end: 1 }, // Minimal scaling
    delay: index * 80,
    duration: 500, // Faster animation
  });
  
  // Calculate orbital parameters - evenly space cards around a circle
  const startAngle = (index * (360 / totalCards)); // Starting angle in degrees
  
  // Memoize orbital styles - this is the orbit path
  const orbitStyles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    // Use CSS variables for consistent animation
    '--start-angle': `${startAngle}deg`,
    '--orbit-radius': orbitRadiusConfig,
    // Use simpler animation with longer duration
    animation: `orbit ${orbitDuration}s linear infinite`,
    zIndex: totalCards - index, // Static z-index
  } as React.CSSProperties;

  // Card container styles - this keeps the card upright
  const cardContainerStyles = {
    animation: `counterRotate ${orbitDuration}s linear infinite`,
    transformOrigin: 'center center',
  } as React.CSSProperties;
  
  // Base opacity based on scroll progress
  const baseOpacity = 0.4 + (scrollProgress * 0.6);
  
  // Pre-computed card color for better performance
  const cardColor = getCardColor(index);
  
  return (
    <Box
      ref={ref}
      sx={orbitStyles}
      className="tech-card-orbit"
    >
      <Box sx={cardContainerStyles}>
        <Paper
          elevation={0} // No elevation to improve performance
          sx={{
            width: { xs: '85px', sm: '100px', md: '120px' }, // Slightly smaller cards
            borderRadius: 2,
            backgroundColor: alpha(theme.palette.background.paper, 0.75), // Simpler background
            opacity: baseOpacity,
            overflow: 'hidden',
            transform: `scale(${0.95 + (scrollProgress * 0.05)})`,
            transformOrigin: 'center center',
            // Only transition opacity and transform, not all properties
            transition: 'transform 250ms ease, opacity 250ms ease',
            cursor: 'pointer',
            // Simpler hover effect
            '&:hover': {
              transform: 'scale(1.08)',
              zIndex: 10,
              '& .card-content': {
                opacity: 1,
                maxHeight: '50px', // Further reduced height
              }
            },
            // Simplified static border
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '3px',
              backgroundColor: cardColor,
              opacity: 0.7,
            }
          }}
        >
          <Box sx={{ p: { xs: 1.25, md: 1.75 } }}> {/* Further reduced padding */}
            <Box
              sx={{
                width: { xs: '44px', sm: '50px', md: '60px' }, // Smaller icons
                height: { xs: '44px', sm: '50px', md: '60px' },
                mb: 1,
                mx: 'auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {/* Explicitly set image dimensions for better CLS */}
              <img 
                src={tech.icon} 
                alt={`${tech.name} icon`}
                width="100%"
                height="100%"
                style={{ 
                  objectFit: 'contain',
                }} 
              />
            </Box>
            
            <Typography variant="subtitle2" fontWeight="bold" align="center" gutterBottom>
              {tech.name}
            </Typography>
            
            <Box 
              className="card-content"
              sx={{ 
                opacity: 0, 
                maxHeight: 0,
                transition: 'opacity 250ms ease, max-height 250ms ease',
                overflow: 'hidden'
              }}
            >
              <Typography variant="caption" color="text.secondary" align="center">
                {tech.description}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}, (prevProps, nextProps) => {
  // Custom comparison to prevent unnecessary re-renders
  return prevProps.tech.name === nextProps.tech.name && prevProps.index === nextProps.index;
}); 