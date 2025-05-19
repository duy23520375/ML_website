import React from 'react';
import { Box, Typography, Grid, Avatar, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import SchoolIcon from '@mui/icons-material/School';
import GroupIcon from '@mui/icons-material/Group';

const AboutPage = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  // Team members data
  const teamMembers = [
    {
      name: 'Nguyễn Hữu Khánh Duy',
      role: 'Team Leader',
      color: '#6a3de8',
      avatarBg: 'linear-gradient(45deg, #6a3de8 30%, #8561f0 90%)'
    },
    {
      name: 'Phạm Khương Duy',
      role: 'Team Member',
      color: '#00c853',
      avatarBg: 'linear-gradient(45deg, #00c853 30%, #69f0ae 90%)'
    },
    {
      name: 'Lâm Quang Huy',
      role: 'Team Member',
      color: '#ff6d00',
      avatarBg: 'linear-gradient(45deg, #ff6d00 30%, #ff9e40 90%)'
    },
    {
      name: 'Hoàng Hải Dương',
      role: 'Team Member',
      color: '#2196f3',
      avatarBg: 'linear-gradient(45deg, #2196f3 30%, #64b5f6 90%)'
    }
  ];

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Team Section - Full width with alternating layout */}
        <motion.div variants={itemVariants}>
          <Box sx={{ width: '100%', py: 8, px: { xs: 3, md: 8 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 6, justifyContent: 'center' }}>
              <GroupIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
              <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold' }}>
                Project Team
              </Typography>
            </Box>
            
            <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
              {teamMembers.map((member, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <motion.div
                    whileHover={{ y: -10, transition: { duration: 0.3 } }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Paper
                      elevation={3}
                      sx={{
                        p: 3,
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        borderRadius: 4,
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          boxShadow: `0 10px 30px rgba(0, 0, 0, 0.15)`,
                          transform: 'translateY(-5px)'
                        }
                      }}
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          height: '5px',
                          background: member.avatarBg
                        }}
                      />
                      <Avatar
                        sx={{
                          width: 100,
                          height: 100,
                          mb: 2,
                          background: member.avatarBg,
                          fontSize: '2rem',
                          fontWeight: 'bold',
                          color: '#fff',
                          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
                        }}
                      >
                        {member.name.charAt(0)}
                      </Avatar>
                      <Typography
                        variant="h5"
                        component="h3"
                        align="center"
                        gutterBottom
                        sx={{ fontWeight: 'bold', color: member.color }}
                      >
                        {member.name}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        align="center"
                        sx={{ color: 'text.secondary', fontWeight: 500 }}
                      >
                        {member.role}
                      </Typography>
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>
        </motion.div>
      </motion.div>
    </Box>
  );
};

export default AboutPage;