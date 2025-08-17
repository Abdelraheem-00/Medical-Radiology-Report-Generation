import React, { useState, useEffect } from 'react';
import {
  Box,
  Chip,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  Settings,
  CloudOff,
  Cloud,
  Info,
} from '@mui/icons-material';
import apiService from '../services/apiService.js';
import MockApiService from '../services/mockApiService.js';

const MockModeIndicator = () => {
  const [isMockMode, setIsMockMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    // Check initial mode
    setIsMockMode(MockApiService.shouldUseMock());
  }, []);

  const handleToggleMockMode = () => {
    apiService.toggleMockMode();
    setIsMockMode(MockApiService.shouldUseMock());
  };

  const handleEnableMockMode = () => {
    MockApiService.enableMockMode();
    setIsMockMode(true);
    setShowSettings(false);
  };

  return (
    <>
      <Box sx={{ 
        position: 'fixed', 
        top: 20, 
        right: 20, 
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        gap: 1
      }}>
        <Chip
          icon={isMockMode ? <CloudOff /> : <Cloud />}
          label={isMockMode ? 'Demo Mode' : 'Backend Mode'}
          color={isMockMode ? 'warning' : 'success'}
          variant="filled"
          sx={{
            fontWeight: 600,
            px: 1,
            '& .MuiChip-icon': {
              fontSize: '1rem'
            }
          }}
        />
        <Tooltip title="Settings">
          <IconButton
            onClick={() => setShowSettings(true)}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: '#ffffff',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              }
            }}
          >
            <Settings />
          </IconButton>
        </Tooltip>
      </Box>

      <Dialog open={showSettings} onClose={() => setShowSettings(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1,
          backgroundColor: 'rgba(139, 92, 246, 0.1)',
          borderBottom: '1px solid rgba(139, 92, 246, 0.3)'
        }}>
          <Settings color="primary" />
          Application Mode Settings
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Box sx={{ mb: 3 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={isMockMode}
                  onChange={handleToggleMockMode}
                  color="primary"
                />
              }
              label={
                <Box>
                  <Typography variant="body1" fontWeight={600}>
                    {isMockMode ? 'Demo Mode (Offline)' : 'Backend Mode (Online)'}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {isMockMode 
                      ? 'Using sample data and mock responses' 
                      : 'Connected to Flask backend server'
                    }
                  </Typography>
                </Box>
              }
            />
          </Box>

          <Box sx={{ p: 2, backgroundColor: 'rgba(33, 150, 243, 0.1)', borderRadius: 2, mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Info color="primary" fontSize="small" />
              <Typography variant="subtitle2" fontWeight={600}>
                Mode Information
              </Typography>
            </Box>
            
            <Typography variant="body2" color="textSecondary" paragraph>
              <strong>Backend Mode:</strong> Connects to the Flask server for AI-powered medical image analysis. 
              Requires the backend server to be running on localhost:5000.
            </Typography>
            
            <Typography variant="body2" color="textSecondary">
              <strong>Demo Mode:</strong> Works completely offline using realistic sample medical reports. 
              Perfect for demonstrations, development, or when the backend is unavailable.
            </Typography>
          </Box>

          <Box sx={{ p: 2, backgroundColor: 'rgba(255, 152, 0, 0.1)', borderRadius: 2 }}>
            <Typography variant="body2" color="textSecondary">
              <strong>Note:</strong> The application automatically switches to Demo Mode if the backend 
              becomes unavailable. You can manually control this setting here.
            </Typography>
          </Box>
        </DialogContent>
        
        <DialogActions sx={{ 
          p: 3, 
          backgroundColor: 'rgba(139, 92, 246, 0.05)',
          borderTop: '1px solid rgba(139, 92, 246, 0.1)'
        }}>
          <Button onClick={() => setShowSettings(false)} color="primary">
            Close
          </Button>
          {!isMockMode && (
            <Button 
              onClick={handleEnableMockMode} 
              variant="outlined" 
              color="warning"
              startIcon={<CloudOff />}
            >
              Switch to Demo Mode
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MockModeIndicator;