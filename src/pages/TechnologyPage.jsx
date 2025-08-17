import React from 'react';
import { Box, Container, Typography, Paper, Chip } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import InsightsIcon from '@mui/icons-material/Insights';
import SecurityIcon from '@mui/icons-material/Security';

const TechnologyPage = () => {
  const pillars = [
    {
      icon: <AutoAwesomeIcon sx={{ fontSize: 36, color: '#d1aad7' }} />,
      title: 'AI-Assisted Reporting',
      description:
        'Transformer-based language models generate structured radiology impressions aligned with clinical best practices.',
    },
    {
      icon: <InsightsIcon sx={{ fontSize: 36, color: '#8b5cf6' }} />,
      title: 'Vision Models',
      description:
        'Computer vision models analyze medical images to surface key findings and support decision-making.',
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 36, color: '#d1aad7' }} />,
      title: 'Privacy & Security',
      description:
        'Data is processed securely with strict access controls and auditability in mind.',
    },
  ];

  return (
    <Container>
      <Box sx={{ py: { xs: 6, md: 10 } }}>
        <Typography
          variant="h2"
          sx={{
            textAlign: 'center',
            mb: 2,
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
          }}
        >
          Technology
        </Typography>
        <Typography
          variant="h5"
          sx={{ color: '#a1a1aa', textAlign: 'center', mb: 8, maxWidth: 800, mx: 'auto' }}
        >
          The platform behind Medical Radiology Report Generation
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' },
            gap: 3,
          }}
        >
          {pillars.map((pillar, index) => (
            <Paper key={index} elevation={0} sx={{ p: 4 }}>
              <Box sx={{ mb: 2 }}>{pillar.icon}</Box>
              <Typography variant="h5" sx={{ mb: 1 }}>
                {pillar.title}
              </Typography>
              <Typography variant="body1" sx={{ color: '#a1a1aa' }}>
                {pillar.description}
              </Typography>
            </Paper>
          ))}
        </Box>

        <Box sx={{ mt: 10, textAlign: 'center' }}>
          <Chip
            label="DICOM, JPG/PNG"
            sx={{ mr: 1, borderColor: '#333', color: '#a1a1aa' }}
            variant="outlined"
          />
          <Chip
            label="HIPAA-conscious UI"
            sx={{ mr: 1, borderColor: '#333', color: '#a1a1aa' }}
            variant="outlined"
          />
          <Chip
            label="Model-assisted workflows"
            sx={{ borderColor: '#333', color: '#a1a1aa' }}
            variant="outlined"
          />
        </Box>
      </Box>
    </Container>
  );
};

export default TechnologyPage;
