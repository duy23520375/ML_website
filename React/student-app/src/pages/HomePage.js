import React from 'react';
import { Container, Typography, Box, Button, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';

const HomePage = () => {
  return (
    <Container maxWidth="lg" sx={{ 
      py: 8,
      backgroundImage: 'url(/anhnen_home.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative'
    }}>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          zIndex: 1
        }}
      />
      <Box sx={{ position: 'relative', zIndex: 2, width: '100%' }}>
      <Grid container spacing={6} alignItems="center">
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography 
              component="div" 
              sx={{ mb: 2 }}
            >
              <Box component="span" sx={{ 
                display: 'block',
                color: '#ff8f8f', 
                fontSize: '2rem',
                letterSpacing: '4px',
                mb: 1,
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
              }}>
                STUDENTS
              </Box>
              <Box component="span" sx={{ 
                display: 'block',
                color: '#ffffff', 
                fontSize: '4.5rem',
                fontWeight: 'bold',
                lineHeight: 1.1,
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
              }}>
                RETENTION
              </Box>
              <Box component="span" sx={{ 
                display: 'block',
                color: '#4caf50', 
                fontSize: '4.5rem',
                fontWeight: 'bold',
                lineHeight: 1.1,
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
              }}>
                PREDICTION
              </Box>
            </Typography>
            
            <Typography variant="h6" paragraph sx={{ mb: 4, color: '#ffffff' }}>
              We understand the invisible pressures students face every day — from academic
              demands and expectations to loneliness. This platform was created to stand by your
              side, detect early signs of dropout risk, and provide practical support to
              help you thrive throughout your academic journey.
            </Typography>
            
            <Button 
              variant="contained" 
              size="large" 
              component={RouterLink} 
              to="/prediction"
              sx={{ 
                backgroundColor: '#6a3de8', 
                px: 4, 
                py: 1.5, 
                borderRadius: 2,
                '&:hover': { backgroundColor: '#5835b0' }
              }}
            >
              PREDICT NOW
            </Button>
          </motion.div>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Box sx={{ position: 'relative' }}>
              <Box
                component="img"
                src="https://cdn.pixabay.com/photo/2018/01/17/07/06/laptop-3087585_1280.jpg"
                alt="Student working on computer"
                sx={{
                  width: '100%',
                  borderRadius: 4,
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: -20,
                  right: -20,
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: '#00c853',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 40,
                  left: -20,
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  backgroundColor: '#ff6b6b',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: 40,
                  right: 40,
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  backgroundColor: '#3f51b5',
                }}
              />
            </Box>
          </motion.div>
        </Grid>
      </Grid>
      </Box>
    </Container>
  );
};

export default HomePage;