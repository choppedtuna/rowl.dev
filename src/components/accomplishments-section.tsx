'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Paper, Avatar, CircularProgress, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import PublicIcon from '@mui/icons-material/Public';
import CodeIcon from '@mui/icons-material/Code';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import TechBackground from './tech-background';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface AccomplishmentCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

function AccomplishmentCard({ title, description, icon }: AccomplishmentCardProps) {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        height: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 3,
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)'
        }
      }}
    >
      <Avatar
        sx={{
          bgcolor: 'primary.main',
          width: 48,
          height: 48,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon}
      </Avatar>
      <Box>
        <Typography variant="h6" component="h3" gutterBottom fontWeight="bold">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </Box>
    </Paper>
  );
}

// GitHub Contribution Graph Component
function GitHubContributions({ username = 'choppedtuna' }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [contributionData, setContributionData] = useState<any>(null);
  const [cumulativeData, setCumulativeData] = useState<any[]>([]);
  const theme = useTheme();
  
  // Define GitHub theme color
  const githubGreen = '#2ea44f';
  
  useEffect(() => {
    async function fetchContributions() {
      try {
        // Using our new API route
        const response = await fetch(`/api/github-contributions?username=${username}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch GitHub data');
        }
        
        const data = await response.json();
        setContributionData(data);
        
        // Generate mock cumulative data for the chart
        // In a real implementation, this would come from the API
        const mockCumulativeData = generateCumulativeData(data.fun_metrics.yearly_commits || 78);
        setCumulativeData(mockCumulativeData);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching GitHub contributions:', err);
        setError('Could not load GitHub contributions');
        
        // Generate fallback cumulative data
        const fallbackData = generateCumulativeData(78);
        setCumulativeData(fallbackData);
        
        setLoading(false);
      }
    }
    
    fetchContributions();
  }, [username]);
  
  // Function to generate mock cumulative commit data
  const generateCumulativeData = (totalCommits: number) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = new Date().getMonth();
    const result = [];
    
    // Start from 11 months ago and move forward to current month
    let remainingCommits = totalCommits;
    let cumulativeCount = 0;
    
    // Create an array of the past 12 months in chronological order
    const monthsInOrder = [];
    for (let i = 11; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12;
      monthsInOrder.push(months[monthIndex]);
    }
    
    // Distribute commits across the past year with a realistic pattern
    // Fewer commits in older months, gradually increasing for recent months
    for (let i = 0; i < 12; i++) {
      const month = monthsInOrder[i];
      
      // Calculate commits for this month (higher for recent months)
      const weight = Math.max(0.5, (i + 1) / 12);
      const monthlyCommits = i === 11 
        ? Math.ceil(remainingCommits * 0.15) // Current month
        : Math.ceil(remainingCommits * weight * 0.1);
      
      if (monthlyCommits > remainingCommits) {
        remainingCommits = 0;
      } else {
        remainingCommits -= monthlyCommits;
      }
      
      cumulativeCount += monthlyCommits;
      
      result.push({
        month,
        commits: monthlyCommits,
        cumulative: cumulativeCount
      });
      
      if (remainingCommits <= 0) {
        // Fill the rest of the months with the same cumulative value
        for (let j = i + 1; j < 12; j++) {
          result.push({
            month: monthsInOrder[j],
            commits: 0,
            cumulative: cumulativeCount
          });
        }
        break;
      }
    }
    
    return result;
  };
  
  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Paper
          elevation={3}
          sx={{
            p: 2,
            backgroundColor: 'background.paper',
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography variant="subtitle2" fontWeight="bold">
            {label}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Monthly: {payload[0].payload.commits} commits
          </Typography>
          <Typography variant="body2" sx={{ color: githubGreen }}>
            Total: {payload[0].payload.cumulative} commits
          </Typography>
        </Paper>
      );
    }
    return null;
  };
  
  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)'
        }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
        <Avatar
          sx={{
            bgcolor: githubGreen,
            width: 48,
            height: 48,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <GitHubIcon />
        </Avatar>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" component="h3" fontWeight="bold">
            GitHub Contributions
          </Typography>
          <a 
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginLeft: '8px', color: 'inherit' }}
          >
            <OpenInNewIcon fontSize="small" />
          </a>
        </Box>
      </Box>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress size={40} sx={{ color: githubGreen }} />
        </Box>
      ) : error ? (
        <Box sx={{ py: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <Typography color="error" variant="body2">
            {error}
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center">
            Displaying fallback GitHub contribution data.
          </Typography>
          
          {/* Fallback chart */}
          <Box sx={{ width: '100%', height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={cumulativeData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorCommits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={githubGreen} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={githubGreen} stopOpacity={0.2}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="cumulative" 
                  stroke={githubGreen} 
                  fillOpacity={1} 
                  fill="url(#colorCommits)" 
                  strokeWidth={2}
                  activeDot={{ r: 6 }} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </Box>
          
          {/* Fallback metrics */}
          <Box sx={{ mt: 2, width: '100%' }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Paper sx={{ p: 1.5, textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Commits (1yr)
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    78
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper sx={{ p: 1.5, textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Years Active
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    3
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Box>
      ) : (
        <Box sx={{ 
          height: '100%', 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}>
          {/* Cumulative Commits Chart */}
          <Box sx={{ width: '100%', height: 200, mt: 1 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={cumulativeData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorCommits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={githubGreen} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={githubGreen} stopOpacity={0.2}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="cumulative" 
                  stroke={githubGreen} 
                  fillOpacity={1} 
                  fill="url(#colorCommits)" 
                  strokeWidth={2}
                  activeDot={{ r: 6 }} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </Box>
          
          {/* Fun Metrics */}
          <Box sx={{ width: '100%', mt: 2 }}>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={6}>
                <Paper sx={{ p: 1.5, textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Commits (1yr)
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    {contributionData?.fun_metrics?.yearly_commits || 78}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper sx={{ p: 1.5, textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Years Active
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    {contributionData?.fun_metrics?.years_active || 3}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
    </Paper>
  );
}

export default function AccomplishmentsSection() {
  const accomplishments = [
    {
      title: "10 Million Total Plays",
      description: "Across all published games and experiences",
      icon: <WhatshotIcon />
    },
    {
      title: "Featured Game",
      description: "Featured on ROBLOX front page for 3 weeks",
      icon: <EmojiEventsIcon />
    },
    {
      title: "Top-Rated Developer",
      description: "Consistently high ratings across published work",
      icon: <HeadsetMicIcon />
    },
    {
      title: "ROBLOX Innovation Award",
      description: "For unique game mechanics and innovation",
      icon: <AutoAwesomeIcon />
    },
    {
      title: "Community Recognition",
      description: "Active community engagement and support",
      icon: <PublicIcon />
    },
    {
      title: "Development Expertise",
      description: "Advanced scripting and game architecture skills",
      icon: <CodeIcon />
    }
  ];

  return (
    <Box 
      component="section" 
      id="achievements" 
      className="section-container"
      sx={{ 
        py: 8,
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.5s ease-in-out',
        '&:hover': {
          transform: 'scale(1.005)'
        }
      }}
    >
      <TechBackground 
        variant="dots" 
        opacity={0.08} 
        animated={true}
        rotateAnimation={true}
        gradientFade={true}
        gradientAngle={45}
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
        <Box 
          sx={{ 
            mb: 6,
            transition: 'all 0.4s ease',
            '.section-container:hover &': {
              transform: 'translateY(-5px)'
            }
          }}
        >
          <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom>
            Achievements
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Key milestones and achievements from my ROBLOX development journey
          </Typography>
        </Box>
        
        <Grid 
          container 
          spacing={3}
          sx={{
            transition: 'all 0.5s ease',
            '.section-container:hover &': {
              transform: 'translateY(-2px)'
            }
          }}
        >
          {accomplishments.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <AccomplishmentCard {...item} />
            </Grid>
          ))}
        </Grid>
        
        {/* GitHub Contribution Graph */}
        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" component="h3" fontWeight="bold" gutterBottom>
            My Activity
          </Typography>
          <Box sx={{ mt: 3 }}>
            <GitHubContributions username="choppedtuna" />
          </Box>
        </Box>
      </Container>
    </Box>
  );
} 