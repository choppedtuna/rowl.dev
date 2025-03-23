'use client';

import { Box, Typography, Button, Container, Stack, Avatar } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Link from 'next/link';
import Image from 'next/image';
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
              border: '4px solid rgba(100, 0, 180, 0.3)',
              transition: 'all 0.5s ease',
              '.section-container:hover &': {
                transform: 'scale(1.05)',
                boxShadow: 6,
                border: '4px solid rgba(0, 180, 200, 0.4)'
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
          
          <Box
            sx={{
              py: 3,
              px: 5,
              borderRadius: 2,
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.4s ease',
              '.section-container:hover &': {
                transform: 'translateY(-3px)',
                boxShadow: '0 6px 30px rgba(0,0,0,0.08)'
              },
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: (theme) => theme.palette.background.paper,
                boxShadow: (theme) => `0 0 15px 15px ${theme.palette.background.paper}`,
                zIndex: -1,
                transition: 'all 0.4s ease',
                borderRadius: 2,
                opacity: 0.95,
                '.section-container:hover &': {
                  opacity: 0.98
                }
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: -2,
                borderRadius: 2,
                transition: 'all 0.4s ease',
              }
            }}
          >
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
            
            <Stack 
              direction="row" 
              spacing={1} 
              alignItems="center" 
              justifyContent="center"
              mb={2}
              sx={{
                transition: 'all 0.3s ease',
                '.section-container:hover &': {
                  transform: 'translateY(-2px)'
                }
              }}
            >
              <LocationOnIcon 
                fontSize="small" 
                color="action" 
                sx={{ 
                  fontSize: 20,
                  opacity: 0.7
                }}
              />
              <Typography 
                variant="subtitle1" 
                color="text.secondary"
              >
                Cardiff, UK
              </Typography>
            </Stack>
            
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
              With over 10 years of experience creating immersive experiences and engaging gameplay for millions of players on the ROBLOX platform
            </Typography>
            
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={2} 
              mt={3}
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
              <Button 
                component={Link} 
                href="#portfolio" 
                variant="contained" 
                size="large"
                disableElevation
              >
                View My Work
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
} 