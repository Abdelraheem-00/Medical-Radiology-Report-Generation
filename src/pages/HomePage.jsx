import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SecurityIcon from '@mui/icons-material/Security';
import MemoryIcon from '@mui/icons-material/Memory';
import InsightsIcon from '@mui/icons-material/Insights';

const HomePage = () => {
  

  const features = [
    {
      icon: <AutoAwesomeIcon sx={{ fontSize: 50, color: '#ffffff' }} />,
      title: 'AI-POWERED INSIGHTS',
      description: 'Transform your data into actionable intelligence with enterprise-grade AI solutions.',
    },
    {
      icon: <MemoryIcon sx={{ fontSize: 50, color: '#ffffff' }} />,
      title: 'SCALABLE INFRASTRUCTURE',
      description: 'Built for enterprise scale with industry-leading performance and reliability.',
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 50, color: '#ffffff' }} />,
      title: 'ENTERPRISE SECURITY',
      description: 'Bank-level security with compliance standards for the most regulated industries.',
    },
    {
      icon: <InsightsIcon sx={{ fontSize: 50, color: '#ffffff' }} />,
      title: 'REAL-TIME ANALYTICS',
      description: 'Monitor and optimize your operations with real-time data processing capabilities.',
    },
  ];

  return (
    <Container>
      <Box sx={{ py: 4 }}>
        {/* Hero Section */}
        <Box
          sx={{
            textAlign: 'center',
            py: { xs: 8, md: 16 },
            mb: { xs: 8, md: 16 },
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '150%',
              height: '100%',
              background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
              zIndex: -1,
              pointerEvents: 'none',
            },
          }}
        >
          <Typography 
            variant="h1" 
            component="h1" 
            sx={{ 
              fontWeight: 800,
              fontSize: { xs: '3.25rem', md: '5.5rem', lg: '6.5rem' },
              letterSpacing: '-0.04em',
              lineHeight: 0.95,
              color: '#ffffff',
              mb: 4,
              textTransform: 'uppercase',
            }}
          >
            Medical Radiology
            <br />
            <Box 
              component="span" 
              sx={{ 
                background: 'linear-gradient(135deg, #8b5cf6 0%, #d1aad7 50%, #a78bfa 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                display: 'inline-block',
              }}
            >
              Report Generation
            </Box>
          </Typography>
          <Typography 
            variant="h4" 
            component="p" 
            sx={{ 
              mb: 6, 
              color: '#a1a1aa',
              fontWeight: 400,
              fontSize: { xs: '1.25rem', md: '1.5rem' },
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.4,
            }}
          >
            Generate accurate, structured radiology reports from imaging studies with AI assistance
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              component={Link}
              to="/reports"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                borderRadius: 2,
                textTransform: 'uppercase',
                fontWeight: 600,
                letterSpacing: '0.05em',
                background: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
                color: '#ffffff',
                boxShadow: '0 4px 20px rgba(139, 92, 246, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 25px rgba(139, 92, 246, 0.4)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Generate Report
            </Button>
            <Button
              variant="outlined"
              size="large"
              component={Link}
              to="/technology"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                borderRadius: 2,
                textTransform: 'uppercase',
                fontWeight: 600,
                letterSpacing: '0.05em',
                border: '2px solid transparent',
                background: 'linear-gradient(#0a0a0a, #0a0a0a) padding-box, linear-gradient(135deg, #8b5cf6, #a78bfa) border-box',
                color: '#ffffff',
                '&:hover': {
                  background: 'linear-gradient(rgba(139, 92, 246, 0.1), rgba(139, 92, 246, 0.1)) padding-box, linear-gradient(135deg, #8b5cf6, #a78bfa) border-box',
                  transform: 'translateY(-1px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Learn the tech
            </Button>
          </Box>
        </Box>

        {/* Features Grid */}
        <Box 
          sx={{ 
            mb: 16, 
            py: 8,
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '120%',
              height: '120%',
              background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.08) 0%, transparent 60%)',
              zIndex: -1,
              pointerEvents: 'none',
            },
          }}
        >
          <Box>
            <Typography
              variant="h2"
              component="h2"
              sx={{
                textAlign: 'center',
                fontWeight: 700,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                color: '#ffffff',
                mb: 2,
                textTransform: 'uppercase',
                letterSpacing: '-0.02em',
              }}
            >
              BUILT FOR RADIOLOGY
            </Typography>
            <Typography
              variant="h4"
              component="p"
              sx={{
                textAlign: 'center',
                color: '#a1a1aa',
                mb: 8,
                fontSize: { xs: '1.25rem', md: '1.5rem' },
                fontWeight: 400,
              }}
            >
              Radiologists, Residents, and Imaging Centers
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: '1fr 1fr',
                lg: '1fr 1fr 1fr 1fr',
              },
              gap: 6,
            }}
          >
            {features.map((feature, index) => (
              <Box 
                key={index} 
                sx={{ 
                  textAlign: 'center', 
                  px: 2,
                  py: 4,
                  borderRadius: 3,
                  background: 'rgba(15, 15, 15, 0.5)',
                  border: '1px solid rgba(139, 92, 246, 0.2)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    border: '1px solid rgba(139, 92, 246, 0.4)',
                    boxShadow: '0 10px 30px rgba(139, 92, 246, 0.2)',
                  },
                }}
              >
                <Box 
                  sx={{ 
                    mb: 4,
                    padding: 2,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(167, 139, 250, 0.1) 100%)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography 
                  variant="h6" 
                  component="h3" 
                  sx={{ 
                    fontWeight: 600,
                    color: '#ffffff',
                    mb: 3,
                    fontSize: '0.875rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{
                    color: '#a1a1aa',
                    lineHeight: 1.6,
                    fontSize: '1rem',
                  }}
                >
                  {feature.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* CTA Section */}
        <Box 
          sx={{ 
            textAlign: 'center',
            py: { xs: 8, md: 12 },
            borderTop: '1px solid #1a1a1a',
            mt: 8,
          }}
        >
          <Typography 
            variant="h2" 
            component="h2" 
            sx={{
              fontWeight: 700,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              color: '#ffffff',
              mb: 4,
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
            }}
          >
            READY TO SCALE?
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 6, 
                maxWidth: 600, 
                mx: 'auto',
                color: '#a1a1aa',
                lineHeight: 1.5,
                fontWeight: 400,
                fontSize: { xs: '1.25rem', md: '1.5rem' },
            }}
          >
            Join thousands of teams building the future of AI
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;