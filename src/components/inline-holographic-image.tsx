'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Box, styled } from '@mui/material';

// This component ensures the holographic effect appears inside the image itself
interface InlineHolographicImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
  onMouseMove?: boolean; // Enable mouse movement interaction
  intensity?: number; // Control the intensity of the effect
  showShine?: boolean; // Control visibility of shine effect
}

// The main container that handles masking
const MaskedContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'inline-block',
}));

// The base image that will be overlaid - invisible but provides structure
const BaseImageLayer = styled(Box)<{ src: string }>(({ src }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundImage: `url(${src})`,
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  opacity: 0, // Hidden but provides structure
}));

// Holographic fill layer
const HolographicFill = styled(Box)<{ src: string }>(({ src }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundImage: 'linear-gradient(135deg, rgba(100,0,180,0.9), rgba(0,70,130,0.9), rgba(0,180,200,0.9))',
  maskImage: `url(${src})`,
  WebkitMaskImage: `url(${src})`,
  maskSize: 'contain',
  WebkitMaskSize: 'contain',
  maskRepeat: 'no-repeat',
  WebkitMaskRepeat: 'no-repeat',
  maskPosition: 'center',
  WebkitMaskPosition: 'center',
  mixBlendMode: 'hard-light',
  animation: 'holographic-shift 3s ease-in-out infinite alternate',
  '@keyframes holographic-shift': {
    '0%': {
      backgroundPosition: '0% 0%',
      filter: 'hue-rotate(0deg) contrast(1.3)',
    },
    '50%': {
      backgroundPosition: '100% 100%',
      filter: 'hue-rotate(180deg) contrast(1.5)',
    },
    '100%': {
      backgroundPosition: '0% 0%',
      filter: 'hue-rotate(360deg) contrast(1.3)',
    },
  },
}));

// Edge glow layer
const EdgeGlow = styled(Box)<{ src: string }>(({ src }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  maskImage: `url(${src})`,
  WebkitMaskImage: `url(${src})`,
  maskSize: 'contain',
  WebkitMaskSize: 'contain',
  maskRepeat: 'no-repeat',
  WebkitMaskRepeat: 'no-repeat',
  maskPosition: 'center',
  WebkitMaskPosition: 'center',
  boxShadow: '0 0 10px 3px rgba(0, 130, 255, 0.9) inset',
  filter: 'brightness(1.5) contrast(1.3)',
  animation: 'glow-pulse 2s ease-in-out infinite alternate',
  '@keyframes glow-pulse': {
    '0%': {
      filter: 'brightness(1.2) contrast(1.2) blur(0.5px)',
    },
    '100%': {
      filter: 'brightness(1.5) contrast(1.4) blur(1px)',
    },
  },
}));

// Shine effect
const ShineEffect = styled(Box)<{ src: string }>(({ src }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0) 100%)',
  maskImage: `url(${src})`,
  WebkitMaskImage: `url(${src})`,
  maskSize: 'contain',
  WebkitMaskSize: 'contain',
  maskRepeat: 'no-repeat',
  WebkitMaskRepeat: 'no-repeat',
  maskPosition: 'center',
  WebkitMaskPosition: 'center',
  transform: 'rotate(30deg)',
  mixBlendMode: 'overlay',
  animation: 'shine-animation 4s ease-in-out infinite',
  '@keyframes shine-animation': {
    '0%': {
      transform: 'translateX(-100%) rotate(30deg)',
    },
    '100%': {
      transform: 'translateX(100%) rotate(30deg)',
    },
  },
}));

export default function InlineHolographicImage({ 
  src, 
  alt, 
  width, 
  height, 
  className, 
  style,
  priority = false,
  onMouseMove = false,
  intensity = 0.85,
  showShine = false // Disabled by default
}: InlineHolographicImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const imageRef = useRef<HTMLImageElement>(null);

  // Get image dimensions after load
  useEffect(() => {
    if (imageRef.current) {
      const updateDimensions = () => {
        setDimensions({
          width: imageRef.current?.offsetWidth || 0,
          height: imageRef.current?.offsetHeight || 0
        });
      };

      // Initial update
      updateDimensions();

      // Update on resize
      window.addEventListener('resize', updateDimensions);
      return () => window.removeEventListener('resize', updateDimensions);
    }
  }, []);

  useEffect(() => {
    if (!onMouseMove || !containerRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      setPosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [onMouseMove]);
  
  const dynamicStyle = onMouseMove ? {
    backgroundPosition: `${position.x * 100}% ${position.y * 100}%`,
    filter: `hue-rotate(${(position.x + position.y) * 360}deg) contrast(1.5)`,
    opacity: intensity
  } : {
    opacity: intensity,
    filter: 'contrast(1.5)'
  };

  return (
    <MaskedContainer 
      ref={containerRef}
      sx={{
        borderRadius: 'inherit',
        overflow: 'hidden',
        width: dimensions.width || width,
        height: dimensions.height || height,
        ...style
      }}
      className={className}
    >
      {/* Original visible image - this will be the base layer */}
      <Image 
        ref={imageRef as any}
        src={src} 
        alt={alt} 
        width={width} 
        height={height}
        style={{ 
          position: 'relative',
          zIndex: 1,
          display: 'block',
          maxWidth: '100%',
          height: 'auto',
          opacity: 0.85, // More transparent to let darker effects show through
        }}
        priority={priority}
      />
      
      {/* Holographic fill - sits on top with hard-light blend mode */}
      <HolographicFill 
        src={src}
        sx={{
          ...dynamicStyle,
          zIndex: 2,
        }} 
      />
      
      {/* Edge glow - blue glow around edges */}
      <EdgeGlow 
        src={src}
        sx={{
          zIndex: 3,
          opacity: intensity * 0.95
        }} 
      />
      
      {/* Shine effect - moving highlight */}
      {showShine && (
        <ShineEffect 
          src={src}
          sx={{
            zIndex: 4,
            opacity: intensity * 0.8
          }} 
        />
      )}
    </MaskedContainer>
  );
} 