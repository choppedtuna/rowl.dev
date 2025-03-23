'use client';

import { ReactNode, useEffect, useState } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useTheme } from 'next-themes';
import { PaletteMode } from '@mui/material';

// Create theme based on the mode
const createAppTheme = (mode: PaletteMode) => {
  return createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            primary: {
              main: '#0070f3',
            },
            secondary: {
              main: '#f50057',
            },
            background: {
              default: '#ffffff',
              paper: '#ffffff',
            },
          }
        : {
            primary: {
              main: '#90caf9',
            },
            secondary: {
              main: '#f48fb1',
            },
            background: {
              default: '#121212',
              paper: '#1e1e1e',
            },
          }),
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
    },
  });
};

function MUIProviderWithNextTheme({ children }: { children: ReactNode }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Initialize with the correct theme based on local storage if available
  const [theme, setTheme] = useState(() => {
    // Default to dark theme to prevent flash
    return createAppTheme('dark');
  });
  
  useEffect(() => {
    setMounted(true);
    setTheme(createAppTheme((resolvedTheme as PaletteMode) || 'dark'));
  }, [resolvedTheme]);
  
  // Render a placeholder or simple UI while loading to prevent flash
  if (!mounted) {
    return (
      <MUIThemeProvider theme={createAppTheme('dark')}>
        <CssBaseline />
        <div style={{ visibility: 'hidden' }}>{children}</div>
      </MUIThemeProvider>
    );
  }

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}

export function Providers({ children }: { children: ReactNode }) {
  // Add useEffect to set color-scheme immediately
  useEffect(() => {
    // Try to get the theme from localStorage first
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark' || 
        (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.style.colorScheme = 'dark';
    }
  }, []);

  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      <MUIProviderWithNextTheme>{children}</MUIProviderWithNextTheme>
    </NextThemesProvider>
  );
} 