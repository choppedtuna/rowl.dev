'use client';

import React from 'react';
import { Box, Typography, Stack, Paper, Slider } from '@mui/material';
import Image from 'next/image';
import InlineHolographicImage from './inline-holographic-image';

export default function HolographicDemo() {
  const [intensity, setIntensity] = React.useState(0.7);
  const [mouseInteraction, setMouseInteraction] = React.useState(true);
  
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Holographic Effect Demo</Typography>
      
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} sx={{ mb: 4 }}>
        <Paper elevation={3} sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', bgcolor: 'background.paper' }}>
          <Typography variant="h6" gutterBottom>Original Image</Typography>
          <Box sx={{ p: 2, bgcolor: 'black', borderRadius: 1 }}>
            <Image 
              src="/images/roblox-icon.png" 
              alt="Original Roblox Icon" 
              width={100} 
              height={100} 
            />
          </Box>
        </Paper>
        
        <Paper elevation={3} sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', bgcolor: 'background.paper' }}>
          <Typography variant="h6" gutterBottom>Holographic Effect</Typography>
          <Box sx={{ p: 2, bgcolor: 'black', borderRadius: 1 }}>
            <InlineHolographicImage 
              src="/images/roblox-icon.png" 
              alt="Holographic Roblox Icon" 
              width={100} 
              height={100}
              intensity={intensity}
              onMouseMove={mouseInteraction}
            />
          </Box>
        </Paper>
      </Stack>
      
      <Paper elevation={2} sx={{ p: 3, maxWidth: 500, mx: 'auto' }}>
        <Typography gutterBottom>Effect Intensity: {intensity.toFixed(2)}</Typography>
        <Slider
          value={intensity}
          onChange={(_, newValue) => setIntensity(newValue as number)}
          min={0}
          max={1}
          step={0.05}
          valueLabelDisplay="auto"
          sx={{ mb: 3 }}
        />
        
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          The holographic effect applies colored filters and drop-shadows directly to the image content, 
          respecting the transparency and original shape of the icon.
        </Typography>
      </Paper>
    </Box>
  );
} 