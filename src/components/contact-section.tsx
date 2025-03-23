'use client';

import React from 'react';
import { Box, Typography, Container, Paper, TextField, Button, Stack, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import Grid from '@mui/material/Grid';
import PersonIcon from '@mui/icons-material/Person';
import SendIcon from '@mui/icons-material/Send';
import HolographicImage from './holographic-image';
import InlineHolographicImage from './inline-holographic-image';

export default function ContactSection() {
  return (
    <Box component="section" id="contact" sx={{ py: 8, bgcolor: 'action.hover' }}>
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          <Grid item xs={12} md={5}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom>
                Get in Touch
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Have a project idea or want to collaborate? Fill out the form and I'll get back to you as soon as possible.
              </Typography>
            </Box>
            
            <List sx={{ mb: 4 }}>
              <ListItem disableGutters>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <InlineHolographicImage 
                    src="/images/roblox-icon.png" 
                    alt="Roblox"
                    width={24}
                    height={24}
                    intensity={0.85}
                  />
                </ListItemIcon>
                <ListItemText 
                  primary="@b_rowl" 
                  primaryTypographyProps={{ variant: 'body2' }}
                />
              </ListItem>
              <ListItem disableGutters>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <InlineHolographicImage 
                    src="/images/email-icon.png" 
                    alt="Email"
                    width={24}
                    height={24}
                    intensity={0.85}
                  />
                </ListItemIcon>
                <ListItemText 
                  primary="browlands99@gmail.com" 
                  primaryTypographyProps={{ variant: 'body2' }}
                />
              </ListItem>
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