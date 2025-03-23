'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button, styled } from '@mui/material';
import { ButtonProps } from '@mui/material/Button';

const StyledButton = styled(Button)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: 'linear-gradient(135deg, rgba(100,0,180,0.15), rgba(0,70,130,0.15), rgba(0,180,200,0.15))',
    mixBlendMode: 'hard-light',
    opacity: 0.65,
    zIndex: 0,
    animation: 'holographic-shift 3.5s ease-in-out infinite alternate',
    pointerEvents: 'none',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    boxShadow: '0 0 7px 1.5px rgba(0, 130, 255, 0.5) inset',
    filter: 'brightness(1.3) contrast(1.2)',
    animation: 'glow-pulse 2.5s ease-in-out infinite alternate',
    pointerEvents: 'none',
    zIndex: 0,
  },
  '& .MuiButton-startIcon, & .MuiButton-endIcon, & .MuiButton-label': {
    position: 'relative',
    zIndex: 1,
  },
  '@keyframes holographic-shift': {
    '0%': {
      backgroundPosition: '0% 0%',
      filter: 'hue-rotate(0deg) contrast(1.2)',
    },
    '50%': {
      backgroundPosition: '100% 100%',
      filter: 'hue-rotate(180deg) contrast(1.3)',
    },
    '100%': {
      backgroundPosition: '0% 0%',
      filter: 'hue-rotate(360deg) contrast(1.2)',
    },
  },
  '@keyframes glow-pulse': {
    '0%': {
      filter: 'brightness(1.1) contrast(1.1) blur(0.5px)',
    },
    '100%': {
      filter: 'brightness(1.3) contrast(1.2) blur(0.75px)',
    },
  },
}));

const ShineEffect = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'linear-gradient(to right, rgba(255,255,255,0.0) 0%, rgba(255,255,255,0.075) 50%, rgba(255,255,255,0.0) 100%)',
  transform: 'rotate(30deg)',
  animation: 'shine-animation 7s ease-in-out infinite',
  pointerEvents: 'none',
  zIndex: 0,
  '@keyframes shine-animation': {
    '0%': {
      transform: 'translateX(-150%) rotate(30deg)',
    },
    '25%': {
      transform: 'translateX(150%) rotate(30deg)',
    },
    '100%': {
      transform: 'translateX(150%) rotate(30deg)',
    },
  },
});

interface HolographicButtonProps extends ButtonProps {
  intensity?: number;
}

export default function HolographicButton({
  children,
  intensity = 0.65,
  ...props
}: HolographicButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!buttonRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!buttonRef.current) return;
      
      const rect = buttonRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      setPosition({ x, y });
    };

    buttonRef.current.addEventListener('mousemove', handleMouseMove);
    return () => {
      buttonRef.current?.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  const dynamicStyle = {
    '--x': `${position.x * 100}%`,
    '--y': `${position.y * 100}%`,
    '--intensity': intensity,
  } as React.CSSProperties;

  return (
    <StyledButton
      ref={buttonRef}
      style={dynamicStyle}
      {...props}
    >
      <ShineEffect />
      {children}
    </StyledButton>
  );
} 