import React from 'react';
import { Box, Button, Typography, Container, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import heroImage from '../assets/hero_image.png';
import { Link as RouterLink } from 'react-router-dom';

const HomePage = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        position: 'relative',
        background: '#190E49',
        overflow: 'hidden',
      }}
    >
      {/* Hero image absolutely positioned for Figma-like layout */}
      <Box
        component="img"
        src={heroImage}
        alt="Hero"
        sx={{
          position: 'absolute',
          top: { xs: 0, md: -30 },
          left: { xs: 0, md: '900px' },
          width: { xs: '100vw', md: '1800px' },
          height: 'auto',
          zIndex: 0,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      />
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          maxWidth: 1280,
          ml: { xs: 0, md: '80px' },
          pt: { xs: 0, md: 0 },
          pb: { xs: 2, md: 2 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          position: 'relative',
          zIndex: 2
        }}
      >
        <Box sx={{ flex: 1, ml: { xs: 2, md: 12 }, mt: { xs: 0, md: -20 }, p: { xs: 2, md: 0 } }}>
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h2"
              sx={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 800,
                fontSize: { xs: '1.7rem', md: '2.4rem', lg: '50px' },
                lineHeight: 1.15,
                letterSpacing: 0,
                color: '#fff',
                mb: 6,
              }}
            >
              Student Dropout Risk<br />
              Prediction <Box component="span" sx={{ color: '#b6e0ff', fontWeight: 800 }}>WITH ML</Box>
            </Typography>
            <Typography
              variant="h6"
              sx={{ 
                fontFamily: "'Montserrat', sans-serif",
                color: '#fff', maxWidth: 700, mb: 4, fontWeight: 400,
                fontSize: { xs: '0.8rem', md: '1.1rem', lg: '18px' },
                lineHeight: 1.15, mb: 9 }}
            >
              Based on real student data, we recognize the everyday pressures — from academic stress to social challenges. This platform is here to detect early dropout risks and help your success throughout your academic journey.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
              <Button
                variant="contained"
                size="large"
                component={RouterLink}
                to="/prediction"
                sx={{
                  fontFamily: "'Montserrat', sans-serif",
                  background: '#651FFF',
                  color: '#fff',
                  fontSize: { xs: '1rem', md: '1.2rem', lg: '20px' },
                  fontWeight: 700,
                  px: 4,
                  py: 1.5,
                  border: '2px solid transparent',
                  borderRadius: 12,
                  boxShadow: '0 4px 24px 0 rgba(123,92,255,0.15)',
                  '&:hover': {
                    color: '#fff',
                    borderColor: '#fff',
                  },
                }}
              >
                START PREDICTING
              </Button>
              <Button
                variant="outlined"
                size="large"
                component={RouterLink}
                to="/about"
                sx={{
                  fontFamily: "'Montserrat', sans-serif",
                  color: '#fff',
                  borderColor: '#fff',
                  fontSize: { xs: '1rem', md: '1.2rem', lg: '20px' },
                  fontWeight: 700,
                  px: 4,
                  py: 1.5,
                  borderRadius: 8,
                  '&:hover': { color: '#fff', background: 'rgba(182,224,255,0.08)' },
                }}
              >
                ABOUT US
              </Button>
            </Stack>
          </motion.div>
        </Box>
        {/* The right side is visually handled by the hero image */}
      </Container>
    </Box>
  );
};

export default HomePage;