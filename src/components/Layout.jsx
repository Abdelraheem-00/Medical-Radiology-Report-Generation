import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  useTheme,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import PsychologyIcon from '@mui/icons-material/Psychology';
import HomeIcon from '@mui/icons-material/Home';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import InfoIcon from '@mui/icons-material/Info';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Layout = ({ children }) => {
  const theme = useTheme();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  

  const navItems = [
    { path: '/', label: 'Home', icon: <HomeIcon /> },
    { path: '/technology', label: 'Technology', icon: <AutoAwesomeIcon /> },
    { path: '/reports', label: 'Generate', icon: <PsychologyIcon /> },
    { path: '/about', label: 'About', icon: <InfoIcon /> },
    { path: '/contact', label: 'Contact', icon: <InfoIcon /> },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ width: 250 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderBottom: '1px solid rgba(0, 212, 255, 0.2)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <PsychologyIcon sx={{ mr: 1, color: '#00d4ff' }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold', background: 'linear-gradient(45deg, #00d4ff, #4de6ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            MedRadio AI
          </Typography>
        </Box>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item.path}
            component={Link}
            to={item.path}
            onClick={handleDrawerToggle}
            sx={{
              backgroundColor: location.pathname === item.path ? theme.palette.primary.light : 'transparent',
              color: location.pathname === item.path ? 'white' : 'inherit',
              '&:hover': {
                backgroundColor: theme.palette.primary.light,
                color: 'white',
              },
            }}
          >
            <ListItemIcon sx={{ color: location.pathname === item.path ? 'white' : 'inherit' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="sticky" elevation={0}>
        <Toolbar sx={{ minHeight: '80px', justifyContent: 'space-between' }}>
          <Typography 
            variant="h5" 
            component={Link}
            to="/"
            sx={{ 
              fontWeight: 700,
              color: '#ffffff',
              textDecoration: 'none',
              fontSize: '1.5rem',
              letterSpacing: '-0.02em',
              '&:hover': {
                color: '#ffffff',
              },
              transition: 'color 0.2s ease',
            }}
          >
            Medical Radiology AI
          </Typography>
          
          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4 }}>
            {navItems.map((item) => (
              <Button
                key={item.path}
                color="inherit"
                component={Link}
                to={item.path}
                sx={{
                  color: '#ffffff',
                  textTransform: 'none',
                  fontWeight: 500,
                  fontSize: '1rem',
                  '&:hover': {
                    color: '#ffffff',
                    backgroundColor: 'transparent',
                  },
                  transition: 'color 0.2s ease',
                }}
              >
                {item.label}
              </Button>
            ))}
            <Button
              variant="contained"
              sx={{
                background: '#ffffff',
                color: '#000000',
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: 1,
                px: 3,
                '&:hover': {
                  background: '#e5e5e5',
                },
                transition: 'all 0.2s ease',
              }}
            >
              Get Started
            </Button>
          </Box>

          {/* Mobile Navigation Button */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              color="inherit"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Navigation Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
        }}
      >
        {drawer}
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>

      <Box 
        component="footer" 
        sx={{
          backgroundColor: '#000000',
          py: 4,
          mt: 'auto',
          borderTop: '1px solid #1a1a1a',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" color="#a1a1aa" align="center">
            © 2025 Scale. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;