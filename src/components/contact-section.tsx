'use client';

import React from 'react';
import { Box, Typography, Container, Paper, TextField, Button, Stack, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import Grid from '@mui/material/Grid';
import PersonIcon from '@mui/icons-material/Person';
import SendIcon from '@mui/icons-material/Send';
import HolographicImage from './holographic-image';
import InlineHolographicImage from './inline-holographic-image';
import TechBackground from './tech-background';

export default function ContactSection() {
  return (
    <Box 
      component="section" 
      id="contact" 
      className="section-container"
      sx={{ 
        py: 8, 
        bgcolor: 'action.hover',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.6s ease-in-out',
        '&:hover': {
          bgcolor: theme => 
            theme.palette.mode === 'dark' 
              ? 'rgba(255,255,255,0.05)' 
              : theme.palette.action.selected
        }
      }}
    >
      <TechBackground 
        variant="matrix" 
        opacity={0.09} 
        animated={true}
        rotateAnimation={true}
        gradientFade={true}
        gradientAngle={225}
        hoverInteraction={false}
        sx={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0
        }}
      />
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={5}>
            <Box 
              sx={{ 
                mb: 4,
                transition: 'all 0.4s ease',
                '.section-container:hover &': {
                  transform: 'translateY(-5px)'
                }
              }}
            >
              <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom>
                Get in Touch
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Have a project idea or want to collaborate? Fill out the form and I'll get back to you as soon as possible.
              </Typography>
            </Box>
            
            <List 
              sx={{ 
                mb: 4,
                transition: 'all 0.5s ease',
                '.section-container:hover &': {
                  transform: 'translateY(-3px)'
                }
              }}
            >
              <Box sx={{ 
                mb: 2, 
                p: 2, 
                borderRadius: 2, 
                backgroundColor: 'background.paper', 
                boxShadow: 3,
                border: '1px solid rgba(255, 255, 255, 0.12)',
                '&:hover': {
                  boxShadow: 6,
                  transform: 'translateY(-2px)',
                  transition: 'all 0.2s'
                }
              }}>
                <ListItem disableGutters sx={{ py: 1 }}>
                  <ListItemIcon sx={{ minWidth: 48 }}>
                    <InlineHolographicImage 
                      src="/images/roblox-icon.png" 
                      alt="Roblox"
                      width={32}
                      height={32}
                      intensity={0.85}
                    />
                  </ListItemIcon>
                  <ListItemText 
                    primary="b_rowl" 
                    primaryTypographyProps={{ 
                      variant: 'body1',
                      fontWeight: 500,
                      fontSize: '1.1rem'
                    }}
                  />
                </ListItem>
              </Box>
              
              <Box sx={{ 
                p: 2, 
                borderRadius: 2, 
                backgroundColor: 'background.paper', 
                boxShadow: 3,
                border: '1px solid rgba(255, 255, 255, 0.12)',
                '&:hover': {
                  boxShadow: 6,
                  transform: 'translateY(-2px)',
                  transition: 'all 0.2s'
                }
              }}>
                <ListItem disableGutters sx={{ py: 1 }}>
                  <ListItemIcon sx={{ minWidth: 48 }}>
                    <InlineHolographicImage 
                      src="/images/email-icon.png" 
                      alt="Email"
                      width={32}
                      height={32}
                      intensity={0.85}
                    />
                  </ListItemIcon>
                  <ListItemText 
                    primary="browlands99@gmail.com" 
                    primaryTypographyProps={{ 
                      variant: 'body1',
                      fontWeight: 500,
                      fontSize: '1.1rem'
                    }}
                  />
                </ListItem>
              </Box>
            </List>
          </Grid>
          
          <Grid item xs={12} md={7}>
            <Paper elevation={2} sx={{ p: 4 }}>
              <form>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField 
                      fullWidth 
                      label="Name" 
                      variant="outlined"
                      required
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField 
                      fullWidth 
                      label="Email" 
                      variant="outlined" 
                      type="email"
                      required
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField 
                      fullWidth 
                      label="Subject" 
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField 
                      fullWidth 
                      label="Message" 
                      variant="outlined" 
                      multiline 
                      rows={4}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button 
                      type="submit" 
                      variant="contained" 
                      size="large" 
                      disableElevation
                      endIcon={<SendIcon />}
                      fullWidth
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
} 