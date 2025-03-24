'use client';

import React, { useState, useEffect } from 'react';
import { Box, useTheme } from '@mui/material';

interface TechBackgroundProps {
  variant?: 'grid' | 'circuit' | 'dots' | 'hexagons' | 'matrix';
  opacity?: number;
  color?: string;
  inverted?: boolean;
  animated?: boolean;
  rotateAnimation?: boolean;
  gradientFade?: boolean;
  gradientAngle?: number;
  edgeFade?: boolean;
  hoverInteraction?: boolean;
  children?: React.ReactNode;
  sx?: any;
}

export default function TechBackground({
  variant = 'grid',
  opacity = 0.05, 
  color,
  inverted = false,
  animated = false,
  rotateAnimation = false,
  gradientFade = false,
  gradientAngle,
  edgeFade = false,
  hoverInteraction = false,
  children,
  sx = {},
}: TechBackgroundProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [angle, setAngle] = useState(gradientAngle || Math.floor(Math.random() * 360));
  
  // Change angle periodically for animated gradients
  useEffect(() => {
    if (gradientFade && !gradientAngle) {
      const timer = setInterval(() => {
        setAngle(Math.floor(Math.random() * 360));
      }, 10000); // Change every 10 seconds
      
      return () => clearInterval(timer);
    }
  }, [gradientFade, gradientAngle]);
  
  // Determine color based on theme and inverted prop
  const defaultColor = isDark ? '#ffffff' : '#000000';
  const effectiveColor = color || defaultColor;
  const finalColor = inverted ? (isDark ? '#000000' : '#ffffff') : effectiveColor;
  
  // Creates a mask for gradient fade effect
  const getGradientMask = () => {
    const currentAngle = gradientAngle || angle;
    if (edgeFade) {
      return {
        maskImage: `radial-gradient(circle at center, rgba(0,0,0,1) 10%, rgba(0,0,0,0.2) 40%, transparent 70%)`,
        WebkitMaskImage: `radial-gradient(circle at center, rgba(0,0,0,1) 10%, rgba(0,0,0,0.2) 40%, transparent 70%)`,
      };
    }
    return {
      maskImage: `linear-gradient(${currentAngle}deg, transparent 10%, rgba(0,0,0,${opacity * 1.5}) 40%, rgba(0,0,0,1) 70%)`,
      WebkitMaskImage: `linear-gradient(${currentAngle}deg, transparent 10%, rgba(0,0,0,${opacity * 1.5}) 40%, rgba(0,0,0,1) 70%)`,
    };
  };
  
  // Generate rotation animation keyframes
  const getRotationAnimation = () => {
    if (!rotateAnimation) return {};
    
    // Use transform: translate3d to trigger GPU acceleration
    return {
      animation: `${getBaseAnimation()} ${variant === 'grid' ? ', rotate 120s cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite alternate' : ''}`,
      '@keyframes rotate': {
        '0%': { transform: 'translate3d(0, 0, 0) rotate(0deg)' },
        '100%': { transform: 'translate3d(0, 0, 0) rotate(360deg)' }
      }
    };
  };
  
  // Get base animation for the variant - optimize animations to reduce layout shifts
  const getBaseAnimation = () => {
    if (!animated) return '';
    
    switch (variant) {
      case 'circuit':
        return 'circuitMove 60s ease-in-out infinite alternate-reverse';
      case 'dots':
        return 'dotsPulse 10s ease-in-out infinite';
      case 'hexagons':
        return 'hexRotate 80s cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite alternate';
      case 'matrix':
        return 'matrixPan 100s cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite alternate';
      case 'grid':
      default:
        return 'gridShift 60s ease-in-out infinite alternate';
    }
  };
  
  // Generate hover interaction styles - modified to prevent layout shifts
  const getHoverInteraction = () => {
    if (hoverInteraction) {
      return {
        transition: 'all 1.5s ease-in-out',
        willChange: 'transform, opacity',
        '.section-container:hover &': {
          transform: 'translate3d(0, 0, 0) scale(1.05) rotate(2deg)',
          opacity: opacity * 1.3,
        }
      };
    }
    return {
      transition: 'all 1.5s ease-in-out',
    };
  };
  
  // Generate the pattern based on variant - with larger background sizes
  const getBackgroundPattern = () => {
    let basePattern = {};
    
    switch (variant) {
      case 'circuit':
        basePattern = {
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10h5v5h-5z M30 10h5v5h-5z M50 10h5v5h-5z M70 10h5v5h-5z M90 10h5v5h-5z M10 30h5v5h-5z M30 30h5v5h-5z M50 30h5v5h-5z M70 30h5v5h-5z M90 30h5v5h-5z M10 50h5v5h-5z M30 50h5v5h-5z M50 50h5v5h-5z M70 50h5v5h-5z M90 50h5v5h-5z M10 70h5v5h-5z M30 70h5v5h-5z M50 70h5v5h-5z M70 70h5v5h-5z M90 70h5v5h-5z M10 90h5v5h-5z M30 90h5v5h-5z M50 90h5v5h-5z M70 90h5v5h-5z M90 90h5v5h-5z' fill='${finalColor.replace('#', '%23')}' fill-opacity='${opacity}' /%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px', // Doubled size
          '@keyframes circuitMove': {
            '0%': { backgroundPosition: '0 0' },
            '50%': { backgroundPosition: '100px 100px' },
            '100%': { backgroundPosition: '200px 200px' } // Adjusted for new size
          }
        };
        break;
      case 'dots':
        basePattern = {
          backgroundImage: `radial-gradient(${finalColor} ${opacity * 20}%, transparent ${opacity * 20}%)`,
          backgroundSize: '60px 60px', // 3x larger
          backgroundPosition: '0 0, 30px 30px',
          '@keyframes dotsPulse': {
            '0%': { backgroundSize: '60px 60px' },
            '50%': { backgroundSize: '75px 75px' },
            '100%': { backgroundSize: '60px 60px' }
          }
        };
        break;
      case 'hexagons':
        basePattern = {
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='${finalColor.replace('#', '%23')}' fill-opacity='${opacity}'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '84px 147px', // 3x larger
          '@keyframes hexRotate': {
            '0%': { backgroundPosition: '0 0' },
            '50%': { backgroundPosition: '42px 0' },
            '100%': { backgroundPosition: '0 0' } // Return to start position smoothly
          }
        };
        break;
      case 'matrix':
        basePattern = {
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='320' viewBox='0 0 800 800'%3E%3Cg fill='none' stroke='${finalColor.replace('#', '%23')}' stroke-width='1'%3E%3Cpath d='M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63'/%3E%3Cpath d='M-31 229L237 261 390 382 603 493 308.5 537.5 101.5 381.5M370 905L295 764'/%3E%3Cpath d='M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880'/%3E%3Cpath d='M520-140L578.5 42.5 731-63M603 493L539 269 237 261 370 105M902 382L539 269M390 382L102 382'/%3E%3Cpath d='M-222 42L126.5 79.5 370 105 539 269 577.5 41.5 927 80 769 229 902 382 603 493 731 737M295-36L577.5 41.5M578 842L295 764M40-201L127 80M102 382L-261 269'/%3E%3C/g%3E%3Cg fill='${finalColor.replace('#', '%23')}' fill-opacity='${opacity / 4}'%3E%3Ccircle cx='769' cy='229' r='5'/%3E%3Ccircle cx='539' cy='269' r='5'/%3E%3Ccircle cx='603' cy='493' r='5'/%3E%3Ccircle cx='731' cy='737' r='5'/%3E%3Ccircle cx='520' cy='660' r='5'/%3E%3Ccircle cx='309' cy='538' r='5'/%3E%3Ccircle cx='295' cy='764' r='5'/%3E%3Ccircle cx='40' cy='599' r='5'/%3E%3Ccircle cx='102' cy='382' r='5'/%3E%3Ccircle cx='127' cy='80' r='5'/%3E%3Ccircle cx='370' cy='105' r='5'/%3E%3Ccircle cx='578' cy='42' r='5'/%3E%3Ccircle cx='237' cy='261' r='5'/%3E%3Ccircle cx='390' cy='382' r='5'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '150% 150%', // Larger coverage
          '@keyframes matrixPan': {
            '0%': { 
              backgroundPosition: '0% 0%',
              transform: 'scale(1) rotate(0deg)'
            },
            '25%': { 
              backgroundPosition: '25% 25%',
              transform: 'scale(1.02) rotate(1deg)'
            },
            '50%': { 
              backgroundPosition: '50% 50%',
              transform: 'scale(1.05) rotate(2deg)'
            },
            '75%': { 
              backgroundPosition: '75% 75%',
              transform: 'scale(1.02) rotate(1deg)'
            },
            '100%': { 
              backgroundPosition: '0% 0%',
              transform: 'scale(1) rotate(0deg)'
            }
          }
        };
        break;
      case 'grid':
      default:
        basePattern = {
          backgroundImage: `linear-gradient(to right, ${finalColor} 1px, transparent 1px), linear-gradient(to bottom, ${finalColor} 1px, transparent 1px)`,
          backgroundSize: '60px 60px', // 3x larger
          opacity: opacity,
          '@keyframes gridShift': {
            '0%': { backgroundPosition: '0 0' },
            '50%': { backgroundPosition: '30px 30px' },
            '100%': { backgroundPosition: '0 0' } // Return to start position smoothly
          }
        };
        break;
    }
    
    return {
      ...basePattern,
      ...(gradientFade || edgeFade ? getGradientMask() : {}),
      ...getRotationAnimation(),
      ...getHoverInteraction(),
    };
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        zIndex: 0,
        transformOrigin: 'center center',
        willChange: animated || rotateAnimation ? 'transform, background-position' : 'auto',
        transform: 'translate3d(0, 0, 0)', // Force GPU acceleration
        backfaceVisibility: 'hidden', // Additional GPU acceleration
        ...getBackgroundPattern(),
        ...sx,
      }}
    >
      {children}
    </Box>
  );
} 