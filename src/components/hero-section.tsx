'use client';

import { Box, Typography, Button, Container, Stack, Avatar } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Stack spacing={4} alignItems="center" textAlign="center">
          <Box 
            sx={{
              width: 200,
              height: 200,
              position: 'relative',
              borderRadius: '50%',
              overflow: 'hidden',
              mb: 2,
              boxShadow: 3
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
          
          <Typography variant="h2" component="h1" fontWeight="bold" gutterBottom>
            Ben Rowlands
          </Typography>
          
          <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
            Creating immersive experiences and engaging gameplay for millions of players on the ROBLOX platform
          </Typography>
          
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mt={2}>
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
              href="#projects" 
              variant="outlined" 
              size="large"
            >
              View My Work
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
} 