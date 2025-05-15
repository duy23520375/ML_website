import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <AppBar position="static" sx={{ backgroundColor: '#6a3de8' }}>
        <Container>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
              Student Retention Prediction
            </Typography>
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