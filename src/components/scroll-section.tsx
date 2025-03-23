'use client';

import React, { ReactNode } from 'react';
import { Box, SxProps, Theme } from '@mui/material';
import { useScrollAnimation } from '@/lib/use-scroll-animation';

interface ScrollSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  sx?: SxProps<Theme>;
  animationOptions?: {
    threshold?: number;
    rootMargin?: string;
    scale?: {
      start: number;
      end: number;
    };
    opacity?: {
      start: number;
      end: number;
    };
    translateY?: {
      start: number;
      end: number;
    };
    delay?: number;
    duration?: number;
  };
}

export default function ScrollSection({
  children,
  className = '',
  id,
  sx = {},
  animationOptions = {},
}: ScrollSectionProps) {
  const { ref, styles, scrollProgress } = useScrollAnimation(animationOptions);

  // Calculate a zoom factor as we scroll through the section
  // This creates the effect of the section expanding as we scroll
  const zoomFactor = 1 + scrollProgress * 0.05; // Max 5% zoom
  
  return (
    <Box
      component="section"
      ref={ref}
      id={id}
      className={`scroll-section ${className}`}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        ...styles,
        ...sx,
      }}
    >
      <Box
        sx={{
          height: '100%',
          width: '100%',
          transform: `scale(${zoomFactor})`,
          transformOrigin: 'center center',
          transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      >
        {children}
      </Box>
    </Box>
  );
} 