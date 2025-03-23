"use client"

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { IconButton, Tooltip } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // When mounted on client, now we can show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return empty div with same dimensions to prevent layout shift
    return <IconButton disabled aria-label="Loading theme" />;
  }
  
  return (
    <Tooltip title={resolvedTheme === 'dark' ? 'Light mode' : 'Dark mode'}>
      <IconButton 
        onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
        color="inherit"
        aria-label="Toggle theme"
      >
        {resolvedTheme === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Tooltip>
  );
} 