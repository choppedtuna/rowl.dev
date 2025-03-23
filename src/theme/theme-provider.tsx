import { ReactNode } from 'react';
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as NextThemeProvider, useTheme } from 'next-themes';
import { PaletteMode } from '@mui/material';

// Light theme colors
const lightTheme = createTheme({
  palette: {
    mode: 'light',
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

// Dark theme colors
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
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

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      themes={['light', 'dark']}
    >
      <MUIThemeProviderWithNextTheme>
        <CssBaseline />
        {children}
      </MUIThemeProviderWithNextTheme>
    </NextThemeProvider>
  );
}

function MUIThemeProviderWithNextTheme({ children }: { children: ReactNode }) {
  // Get the theme mode from next-themes
  const { resolvedTheme } = useTheme();
  const mode = (resolvedTheme as PaletteMode) || 'light';
  
  // Use the appropriate theme based on the mode
  const theme = mode === 'dark' ? darkTheme : lightTheme;

  return <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>;
} 