'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Box, styled } from '@mui/material';

// Styled component for the holographic overlay
const HolographicOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundImage: 'linear-gradient(135deg, rgba(255,0,255,0.5), rgba(0,255,255,0.5), rgba(255,255,0,0.5))',
  mixBlendMode: 'color-dodge',
  opacity: 0.7,
  pointerEvents: 'none',
  animation: 'holographic-shift 3s ease-in-out infinite alternate',
  '@keyframes holographic-shift': {
    '0%': {
      backgroundPosition: '0% 0%',
      filter: 'hue-rotate(0deg)',
    },
    '50%': {
      backgroundPosition: '100% 100%',
      filter: 'hue-rotate(180deg)',
    },
    '100%': {
      backgroundPosition: '0% 0%',
      filter: 'hue-rotate(360deg)',
    },
  },
}));

// Styled component for the shine effect
const ShineEffect = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: '-100%',
  width: '200%',
  height: '200%',
  background: 'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)',
  transform: 'rotate(30deg)',
  animation: 'shine-animation 4s ease-in-out infinite',
  '@keyframes shine-animation': {
    '0%': {
      transform: 'translateX(-100%) rotate(30deg)',
    },
    '100%': {
      transform: 'translateX(100%) rotate(30deg)',
    },
  },
  pointerEvents: 'none',
}));

interface HolographicImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
  onMouseMove?: boolean; // Enable mouse movement interaction
  showShine?: boolean; // Control visibility of shine effect
}

export default function HolographicImage({ 
  src, 
  alt, 
  width, 
  height, 
  className, 
  style,
  priority = false,
  onMouseMove = false,
  showShine = false // Disabled by default
}: HolographicImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  // Mark component as mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!onMouseMove || !containerRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      // Use requestAnimationFrame for better performance
      requestAnimationFrame(() => {
        const rect = containerRef.current!.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        setPosition({ x, y });
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [onMouseMove]);
  
  const dynamicStyle = onMouseMove ? {
    backgroundPosition: `${position.x * 100}% ${position.y * 100}%`,
    filter: `hue-rotate(${(position.x + position.y) * 360}deg)`,
  } : {};

  // Calculate dimensions for container to prevent layout shifts
  const containerStyle = {
    position: 'relative',
    overflow: 'hidden',
    display: 'inline-block',
    width: width ? `${width}px` : 'auto',
    height: height ? `${height}px` : 'auto',
    aspectRatio: width && height ? `${width} / ${height}` : 'auto',
    willChange: onMouseMove ? 'transform, background-position' : 'auto',
    transform: 'translate3d(0, 0, 0)',
    ...style
  };

  if (!mounted) {
    // Return a placeholder with the same dimensions during SSR
    return (
      <Box 
        sx={{
          ...containerStyle,
          background: 'rgba(0,0,0,0.1)'
        }}
        className={className}
      />
    );
  }

  return (
    <Box 
      ref={containerRef}
      sx={containerStyle}
      className={className}
    >
      <Image 
        src={src} 
        alt={alt} 
        width={width} 
        height={height}
        style={{ 
          filter: 'grayscale(100%)',
          position: 'relative',
          zIndex: 1,
          maxWidth: '100%',
          height: 'auto',
          display: 'block'
        }}
        priority={priority}
      />
      <HolographicOverlay sx={{...dynamicStyle, willChange: onMouseMove ? 'background-position, filter' : 'auto'}} />
      {showShine && <ShineEffect sx={{willChange: 'transform'}} />}
    </Box>
  );
} 