import React from 'react';
import { Box, Container, Typography, TextField, Button, Paper } from '@mui/material';

const ContactPage = () => {
  return (
    <Container>
      <Box sx={{ py: { xs: 6, md: 10 }, maxWidth: 900, mx: 'auto' }}>
        <Typography
          variant="h2"
          sx={{ textAlign: 'center', mb: 2, textTransform: 'uppercase', letterSpacing: '-0.02em' }}
        >
          Contact Us
        </Typography>
        <Typography variant="h5" sx={{ color: '#a1a1aa', textAlign: 'center', mb: 8 }}>
          Tell us about your use case in medical radiology
        </Typography>

        <Paper elevation={0} sx={{ p: { xs: 3, md: 5 } }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
            <TextField label="Full Name" fullWidth required />
            <TextField label="Organization" fullWidth required />
            <TextField label="Email" type="email" fullWidth required />
            <TextField label="Phone" fullWidth />
          </Box>
          <Box sx={{ mt: 2 }}>
            <TextField label="How can we help?" fullWidth minRows={5} multiline required />
          </Box>
          <Box sx={{ mt: 3, textAlign: 'right' }}>
            <Button variant="contained" size="large">Submit</Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default ContactPage;
