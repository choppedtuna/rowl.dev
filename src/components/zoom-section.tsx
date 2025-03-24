'use client';

import React, { ReactNode } from 'react';
import { Box, SxProps, Theme } from '@mui/material';
import { useSectionZoom } from '@/lib/use-section-zoom';

interface ZoomSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  sx?: SxProps<Theme>;
  zoomOptions?: {
    threshold?: number;
    zoomFactor?: number;
    smoothness?: number;
  };
  blendOptions?: {
    blendTop?: boolean;
    blendBottom?: boolean;
    blendColor?: string;
    blendHeight?: number | string;
    blendOpacity?: number;
    depthEffect?: boolean;
  };
}

export default function ZoomSection({
  children,
  className = '',
  id,
  sx = {},
  zoomOptions = {},
  blendOptions = {
    blendTop: false,
    blendBottom: true,
    blendColor: 'currentcolor',
    blendHeight: '180px',
    blendOpacity: 0.12,
    depthEffect: true
  },
}: ZoomSectionProps) {
  const { setRef, zoomStyle, isInView } = useSectionZoom(zoomOptions);
  const { 
    blendTop, 
    blendBottom, 
    blendColor, 
    blendHeight, 
    blendOpacity = 0.12,
    depthEffect 
  } = blendOptions;

  return (
    <Box
      component="section"
      ref={setRef}
      id={id}
      className={`zoom-section ${className}`}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        transform: depthEffect ? 'perspective(1000px)' : 'none',
        '&:nth-of-type(odd)': depthEffect ? {
          transform: 'perspective(1000px) translateZ(-20px) scale(1.02)',
        } : {},
        '&:nth-of-type(even)': depthEffect ? {
          transform: 'perspective(1000px) translateZ(20px) scale(0.98)',
        } : {},
        ...sx,
      }}
    >
      {blendTop && (
        <Box
          sx={{
            position: 'absolute',
            top: '-20%',
            left: '-10%',
            right: '-10%',
            height: '120%',
            background: `linear-gradient(to bottom, 
              rgba(0, 0, 0, ${blendOpacity * 1.5}), 
              rgba(0, 0, 0, ${blendOpacity * 0.8}) 40%,
              rgba(0, 0, 0, 0))`,
            pointerEvents: 'none',
            zIndex: 2,
            backdropFilter: isInView ? 'none' : 'blur(2px)',
            transition: 'backdrop-filter 0.3s ease-out',
            '@media (prefers-reduced-motion: no-preference)': {
              willChange: 'backdrop-filter'
            }
          }}
        />
      )}

      <Box
        sx={{
          height: '100%',
          width: '100%',
          ...zoomStyle,
        }}
      >
        {children}
      </Box>

      {blendBottom && (
        <Box
          sx={{
            position: 'absolute',
            bottom: '-20%',
            left: '-10%',
            right: '-10%',
            height: '120%',
            background: `linear-gradient(to top, 
              rgba(0, 0, 0, ${blendOpacity * 1.5}), 
              rgba(0, 0, 0, ${blendOpacity * 0.8}) 40%,
              rgba(0, 0, 0, 0))`,
            pointerEvents: 'none',
            zIndex: 2,
            backdropFilter: isInView ? 'none' : 'blur(2px)',
            transition: 'backdrop-filter 0.15s ease-out',
            '@media (prefers-reduced-motion: no-preference)': {
              willChange: 'backdrop-filter'
            }
          }}
        />
      )}
    </Box>
  );
} 