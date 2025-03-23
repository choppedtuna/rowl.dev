'use client';

import { Box, Typography, Button, Container, Stack, Avatar } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import HolographicButton from './holographic-button';
import TechBackground from './tech-background';

export default function HeroSection() {
  return (
    <Box 
      component="section" 
      className="section-container"
      sx={{ 
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.5s ease-in-out',
        '&:hover': {
          transform: 'scale(1.01)'
        }
      }}
    >
      <TechBackground 
        variant="matrix" 
        opacity={0.09} 
        animated={true}
        rotateAnimation={true}
        gradientFade={true}
        gradientAngle={225}
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
        <Stack spacing={4} alignItems="center" textAlign="center">
          <Box 
            sx={{
              width: 200,
              height: 200,
              position: 'relative',
              borderRadius: '50%',
              overflow: 'hidden',
              mb: 2,
              boxShadow: 3,
              transition: 'all 0.5s ease',
              '.section-container:hover &': {
                transform: 'scale(1.05)',
                boxShadow: 6
              }
            }}
          >
            <Image
              src="/images/profile/portrait.jpeg"
              alt="Ben Rowlands portrait"
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </Box>
          
          <Typography 
            variant="h2" 
            component="h1" 
            fontWeight="bold" 
            gutterBottom
            sx={{
              transition: 'all 0.4s ease',
              '.section-container:hover &': {
                transform: 'translateY(-5px)',
                textShadow: '0 10px 20px rgba(0,0,0,0.1)'
              }
            }}
          >
            Ben Rowlands
          </Typography>
          
          <Typography 
            variant="h5" 
            color="text.secondary" 
            sx={{ 
              maxWidth: 700, 
              mx: 'auto',
              transition: 'all 0.4s ease',
              '.section-container:hover &': {
                transform: 'translateY(-3px)'
              }
            }}
          >
            Creating immersive experiences and engaging gameplay for millions of players on the ROBLOX platform
          </Typography>
          
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={2} 
            mt={2}
            sx={{
              transition: 'all 0.5s ease',
              '.section-container:hover &': {
                transform: 'translateY(-2px) scale(1.03)'
              }
            }}
          >
            <Button 
              component={Link} 
              href="#contact" 
              variant="contained" 
              size="large"
              disableElevation
            >
              Contact Me
            </Button>
            <HolographicButton 
              component={Link} 
              href="#projects" 
              variant="outlined" 
              size="large"
            >
              View My Work
            </HolographicButton>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
} 