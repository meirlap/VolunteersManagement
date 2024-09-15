// HomePage.js
import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to the Volunteer Management System
      </Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button variant="contained" color="primary" onClick={() => navigate('/volunteers-management')}>
          Manage Volunteers
        </Button>
        <Button variant="contained" color="primary" onClick={() => navigate('/volunteers')}>
          View Volunteers
        </Button>
        <Button variant="contained" color="primary" onClick={() => navigate('/needs')}>
          Manage Needs
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;
