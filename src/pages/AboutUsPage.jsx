import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Card, 
  CardContent, 
  Avatar, 
  Chip, 
  Container, 
  useTheme, 
  IconButton 
} from '@mui/material';
import { 
  School, 
  Code, 
  Psychology, 
  LinkedIn, 
  GitHub 
} from '@mui/icons-material';

const AboutUsPage = () => {
  const theme = useTheme();

  const teamMembers = [
    {
      name: 'Kareem Abdelaziz',
      role: 'Team Leader',
      specialization: 'Biomedical Engineer',
      avatar: 'KA',
      bio: 'Leads the team with expertise in biomedical engineering and AI implementation in healthcare. Passionate about bridging medical technology with practical applications.',
      skills: ['Biomedical Engineering', 'AI in Healthcare', 'Team Leadership', 'Medical Devices', 'Python'],
      email: 'Kareem.abdelaziz62@gmail.com',
      linkedin: 'https://www.linkedin.com/in/kareem-abdelaziz-',
      github: 'https://github.com/Biokareem',
      color: '#1e3a8a',
    },
    {
      name: 'Alyaa Ahmed',
      role: 'AI Engineer',
      specialization: 'Communication and Information Engineering',
      avatar: 'AA',
      bio: 'Specializes in artificial intelligence applications and communication systems. Develops intelligent solutions for medical image processing.',
      skills: ['AI Engineering', 'Communication Systems', 'Machine Learning', 'Signal Processing', 'Python'],
      email: 'alyaaahmed019@gmail.com',
      linkedin: 'www.linkedin.com/in/alyaa-ahmed-239151315',
      github: 'https://github.com/alyaaahmed019',
      color: '#2563eb',
    },
    {
      name: 'Abdelruhman Diaa',
      role: 'Biomedical Engineer',
      specialization: 'Biomedical Engineering',
      avatar: 'AD',
      bio: 'Expert in biomedical systems and medical imaging technologies. Ensures clinical accuracy and medical compliance in AI solutions.',
      skills: ['Biomedical Engineering', 'Medical Imaging', 'Healthcare Technology', 'Clinical Systems'],
      email: 'abdelruhmanfiaa2@gmail.com',
      linkedin: 'https://www.linkedin.com/in/abdelruhman-diaa-44917b305',
      github: '',
      color: '#3b82f6',
    },
    {
      name: 'Abdelraheem Mohamed',
      role: 'AI Engineer',
      specialization: 'AI Engineer',
      avatar: 'AM',
      bio: 'Develops comprehensive software solutions with expertise in both frontend and backend technologies. Implements scalable medical applications.',
      skills: ['React', 'JavaScript', 'Medical Software', 'Backend Development', 'AI Integration', 'Python'],
      email: '',
      linkedin: 'https://www.linkedin.com/in/abdelraheem-mohamed-939b23278/',
      github: 'https://github.com/Abdelraheem-00',
      color: '#60a5fa',
    },
  ];

  const ntiPrograms = [
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Paper elevation={0} sx={{ p: 6, mb: 6, textAlign: 'center' }}>
          <School sx={{ fontSize: 80, mb: 2 }} />
          <Typography variant="h3" component="h1" gutterBottom>
            About Our Team
          </Typography>
          <Typography variant="h6" sx={{ color: 'text.secondary', maxWidth: 800, mx: 'auto' }}>
            We are four dedicated students from the National Telecommunications Institute (NTI) Egypt, 
            combining our expertise in technology and healthcare to revolutionize medical radiology reporting.
          </Typography>
        </Paper>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4, textAlign: 'center' }}>
          Meet Our Team
        </Typography>

        <Box
          sx={{
            mb: 6,
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: '1fr 1fr',
            },
            gap: 4,
          }}
        >
          {teamMembers.map((member, index) => (
            <Card 
              key={index}
              sx={{ 
                height: '100%',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 8,
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                  <Avatar 
                    sx={{ 
                      width: 70, 
                      height: 70, 
                      bgcolor: member.color,
                      mr: 2,
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                    }}
                  >
                    {member.avatar}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="h3">
                      {member.name}
                    </Typography>
                    <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 'medium' }}>
                      {member.role}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {member.specialization}
                    </Typography>
                  </Box>
                </Box>
                
                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                  {member.bio}
                </Typography>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {member.skills.map((skill, skillIndex) => (
                    <Chip 
                      key={skillIndex} 
                      label={skill} 
                      size="small" 
                      sx={{ 
                        bgcolor: `${member.color}15`,
                        color: member.color,
                        border: `1px solid ${member.color}30`,
                      }}
                    />
                  ))}
                </Box>
                <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                  {member.linkedin && (
                    <IconButton
                      component="a"
                      href={member.linkedin.startsWith('http') ? member.linkedin : `https://${member.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ color: '#0A66C2' }}
                    >
                      <LinkedIn />
                    </IconButton>
                  )}
                  {member.github && (
                    <IconButton
                      component="a"
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ color: '#171515' }}
                    >
                      <GitHub />
                    </IconButton>
                  )}
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Paper elevation={2} sx={{ p: 4, mb: 4, bgcolor: theme.palette.background.default }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <School sx={{ mr: 2, color: theme.palette.primary.main }} />
            About NTI Egypt
          </Typography>
          <Typography variant="body1" paragraph>
            The National Telecommunications Institute (NTI), established in 1983, is a leading educational institution 
            in Egypt that excels in telecommunications education, research, and technical consultation. Operating under 
            the Ministry of Communications and Information Technology (MCIT), NTI plays a crucial role in advancing 
            Egypt's ICT capabilities and human resource development.
          </Typography>
          <Typography variant="body1" paragraph>
            Through programs like the Egyptian Talents Academy (ETA) in partnership with Huawei, NTI provides 
            comprehensive training to Egyptian youth in next-generation ICT technologies, preparing them for the 
            demands of local and global labor markets.
          </Typography>
        </Paper>

        <Card sx={{ p: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Code sx={{ mr: 2, color: theme.palette.secondary.main }} />
            Our Training Programs at NTI
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: '1fr 1fr',
                md: '1fr 1fr 1fr',
              },
              gap: 2,
            }}
          >
            {ntiPrograms.map((program, index) => (
              <Paper key={index} elevation={0} sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                  {program}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Card>

        <Paper elevation={0} sx={{ p: 4, mt: 4, textAlign: 'center' }}>
          <Psychology sx={{ fontSize: 60, mb: 2 }} />
          <Typography variant="h5" component="h2" gutterBottom>
            Our Mission
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: 800, mx: 'auto', color: 'text.secondary' }}>
            To leverage cutting-edge artificial intelligence and medical expertise to create innovative solutions 
            that enhance healthcare delivery, improve diagnostic accuracy, and ultimately contribute to better 
            patient outcomes in the field of medical radiology.
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default AboutUsPage;
