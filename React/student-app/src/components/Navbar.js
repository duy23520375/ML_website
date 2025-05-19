import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png'; // Import logo

const Navbar = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <AppBar position="static" sx={{ backgroundColor: '#190E49' }}>
        <Container>
          <Toolbar>
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <img src={logo} alt="logo" style={{ marginRight: '10px', height: '40px' }} />
              <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                MACHINE LEARNING
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button 
                color="inherit" 
                component={RouterLink} 
                to="/"
                sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}
              >
                Home
              </Button>
              <Button 
                color="inherit" 
                component={RouterLink} 
                to="/prediction"
                sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}
              >
                Prediction
              </Button>
              <Button 
                color="inherit" 
                component={RouterLink} 
                to="/history"
                sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}
              >
                History
              </Button>
              <Button 
                color="inherit" 
                component={RouterLink} 
                to="/about"
                sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}
              >
                About
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </motion.div>
  );
};

export default Navbar;