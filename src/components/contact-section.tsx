'use client';

import React from 'react';
import { Box, Typography, Container, Paper, TextField, Button, Stack, List, ListItem, ListItemIcon, ListItemText, Link as MuiLink } from '@mui/material';
import Grid from '@mui/material/Grid';
import PersonIcon from '@mui/icons-material/Person';
import SendIcon from '@mui/icons-material/Send';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Image from 'next/image';
import HolographicImage from './holographic-image';
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
        animated={false}
        rotateAnimation={false}
        gradientFade={true}
        gradientAngle={225}
        edgeFade={true}
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
            <Paper 
              elevation={3} 
              sx={{ 
                p: 3, 
                mb: 4,
                borderRadius: 2,
                backgroundColor: 'background.paper',
                boxShadow: theme => `0 8px 24px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.1)'}`,
                position: 'relative',
                zIndex: 2,
                transition: 'box-shadow 0.4s ease',
                minHeight: {xs: 'auto', md: '320px'},
                '&:hover': {
                  boxShadow: theme => `0 12px 28px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.15)'}`
                }
              }}
            >
              <Box 
                sx={{ 
                  mb: 4,
                  transition: 'transform 0.4s ease',
                  willChange: 'transform'
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
                  mb: 2,
                  transition: 'all 0.5s ease'
                }}
              >
                <Box sx={{ 
                  mb: 2, 
                  p: 2, 
                  borderRadius: 2, 
                  backgroundColor: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)', 
                  boxShadow: 1,
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  transition: 'box-shadow 0.2s',
                  '&:hover': {
                    boxShadow: 2
                  },
                  cursor: 'pointer'
                }}>
                  <MuiLink 
                    href="https://www.roblox.com/users/247354738/profile" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    color="inherit"
                    underline="none"
                    sx={{ display: 'block' }}
                  >
                    <ListItem 
                      disableGutters 
                      sx={{ 
                        py: 1,
                        display: 'flex',
                        justifyContent: 'space-between'
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ListItemIcon sx={{ minWidth: 48 }}>
                          <Box
                            sx={{
                              position: 'relative',
                              width: 32,
                              height: 32,
                              filter: 'invert(41%) sepia(57%) saturate(7414%) hue-rotate(199deg) brightness(91%) contrast(101%)',
                              transition: 'transform 0.2s',
                              '&:hover': {
                                transform: 'scale(1.1)'
                              }
                            }}
                          >
                            <Image 
                              src="/images/roblox-icon.png" 
                              alt="Roblox"
                              width={32}
                              height={32}
                              style={{
                                width: '100%',
                                height: '100%'
                              }}
                            />
                          </Box>
                        </ListItemIcon>
                        <ListItemText 
                          primary="b_rowl" 
                          primaryTypographyProps={{ 
                            variant: 'body1',
                            fontWeight: 500,
                            fontSize: '1.1rem'
                          }}
                        />
                      </Box>
                      <OpenInNewIcon 
                        fontSize="small" 
                        color="action" 
                        sx={{ 
                          opacity: 0.7,
                          ml: 1
                        }} 
                      />
                    </ListItem>
                  </MuiLink>
                </Box>
                
                <Box sx={{ 
                  mb: 2,
                  p: 2, 
                  borderRadius: 2, 
                  backgroundColor: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)', 
                  boxShadow: 1,
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  transition: 'box-shadow 0.2s',
                  '&:hover': {
                    boxShadow: 2
                  },
                  cursor: 'pointer'
                }}>
                  <MuiLink 
                    href="https://www.linkedin.com/in/benjamin-rowlands/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    color="inherit"
                    underline="none"
                    sx={{ display: 'block' }}
                  >
                    <ListItem 
                      disableGutters 
                      sx={{ 
                        py: 1,
                        display: 'flex',
                        justifyContent: 'space-between'
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ListItemIcon sx={{ minWidth: 48 }}>
                          <Box
                            sx={{
                              position: 'relative',
                              width: 32,
                              height: 32,
                              filter: 'invert(41%) sepia(57%) saturate(7414%) hue-rotate(199deg) brightness(91%) contrast(101%)',
                              transition: 'transform 0.2s',
                              '&:hover': {
                                transform: 'scale(1.1)'
                              }
                            }}
                          >
                            <Image 
                              src="/images/linkedin-icon.png" 
                              alt="LinkedIn"
                              width={32}
                              height={32}
                              style={{
                                width: '100%',
                                height: '100%'
                              }}
                            />
                          </Box>
                        </ListItemIcon>
                        <ListItemText 
                          primary="Benjamin Rowlands" 
                          primaryTypographyProps={{ 
                            variant: 'body1',
                            fontWeight: 500,
                            fontSize: '1.1rem'
                          }}
                        />
                      </Box>
                      <OpenInNewIcon 
                        fontSize="small" 
                        color="action" 
                        sx={{ 
                          opacity: 0.7,
                          ml: 1
                        }} 
                      />
                    </ListItem>
                  </MuiLink>
                </Box>
                
                <Box sx={{ 
                  p: 2, 
                  borderRadius: 2, 
                  backgroundColor: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)', 
                  boxShadow: 1,
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  transition: 'box-shadow 0.2s',
                  '&:hover': {
                    boxShadow: 2
                  }
                }}>
                  <ListItem disableGutters sx={{ py: 1 }}>
                    <ListItemIcon sx={{ minWidth: 48 }}>
                      <Box
                        sx={{
                          position: 'relative',
                          width: 32,
                          height: 32,
                          filter: 'invert(41%) sepia(57%) saturate(7414%) hue-rotate(199deg) brightness(91%) contrast(101%)',
                          transition: 'transform 0.2s',
                          '&:hover': {
                            transform: 'scale(1.1)'
                          }
                        }}
                      >
                        <Image 
                          src="/images/email-icon.png" 
                          alt="Email"
                          width={32}
                          height={32}
                          style={{
                            width: '100%',
                            height: '100%'
                          }}
                        />
                      </Box>
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
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={7}>
            <Paper elevation={2} sx={{ 
              p: 4,
              minHeight: {xs: 'auto', md: '320px'},
              height: '100%',
              transform: 'translate3d(0, 0, 0)'
            }}>
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