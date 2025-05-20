import React, { useState, useEffect } from 'react';
import {
  Container, Box, Typography, TextField, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, IconButton, InputAdornment,
  Select, MenuItem, FormControl, InputLabel, Grid, Snackbar, Alert, Button
} from '@mui/material';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import api from '../api';

const HistoryPage = () => {
  const [predictions, setPredictions] = useState([]);
  const [filteredPredictions, setFilteredPredictions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Xóa dữ liệu khi tải lại trang
  useEffect(() => {
    // Kiểm tra nếu trang được tải lại (không phải chuyển hướng trong ứng dụng)
    const handlePageLoad = () => {
      sessionStorage.removeItem('predictions');
    };

    // Thêm event listener khi component mount
    window.addEventListener('load', handlePageLoad);

    // Cleanup event listener khi component unmount
    return () => {
      window.removeEventListener('load', handlePageLoad);
    };
  }, []);

  // Lấy dữ liệu dự đoán từ API
  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const response = await api.get('/predictions/');
        
        // Chuyển đổi dữ liệu từ API để hiển thị
        const formattedData = response.data.map(item => {
          // Ánh xạ Course ID sang tên khóa học
          const courseNames = {
            1: 'Biofuel Production Technologies',
            2: 'Animation and Multimedia Design',
            3: 'Social Service (evening attendance)',
            4: 'Agronomy',
            5: 'Communication Design',
            6: 'Veterinary Nursing',
            7: 'Informatics Engineering',
            8: 'Equiniculture',
            9: 'Management',
            10: 'Social Service',
            11: 'Tourism',
            12: 'Nursing',
            13: 'Oral Hygiene',
            14: 'Advertising and Marketing Management',
            15: 'Journalism and Communication',
            16: 'Basic Education',
            17: 'Management (evening attendance)'
          };
          
          // Tạo ngày hiện tại nếu không có thông tin ngày
          const date = new Date();
          const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
          
          return {
            ...item,
            date: formattedDate, // Trong thực tế, ngày nên được lưu trong database
            courseName: courseNames[item.Course] || `Course ${item.Course}`
          };
        });
        
        setPredictions(formattedData);
        setFilteredPredictions(formattedData);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu dự đoán:', error);
        setSnackbar({
          open: true,
          message: 'Could not load prediction data. Please try again later.',
          severity: 'error'
        });
      }
    };

    fetchPredictions();
  }, []);

  // Xử lý tìm kiếm
  useEffect(() => {
    const results = predictions.filter(item =>
      Object.values(item).some(
        value => value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredPredictions(results);
  }, [searchTerm, predictions]);

  // Xử lý sắp xếp
  useEffect(() => {
    const sortedData = [...filteredPredictions].sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    setFilteredPredictions(sortedData);
  }, [sortField, sortDirection]);

  // Xử lý xóa dự đoán
  const handleDelete = async (id) => {
    try {
      // Gọi API để xóa dữ liệu
      await api.delete(`/predictions/${id}`);
      
      // Cập nhật state sau khi xóa
      const updatedPredictions = predictions.filter(item => item.id !== id);
      setPredictions(updatedPredictions);
      setFilteredPredictions(filteredPredictions.filter(item => item.id !== id));
      
      setSnackbar({
        open: true,
        message: 'Prediction deleted successfully!',
        severity: 'success'
      });
    } catch (error) {
      console.error('Lỗi khi xóa dự đoán:', error);
      setSnackbar({
        open: true,
        message: 'Could not delete prediction. Please try again.',
        severity: 'error'
      });
    }
  };

  // Hiển thị thông báo khi không có dữ liệu
  const EmptyState = () => (
    <Box sx={{ textAlign: 'center', py: 5 }}>
      <Typography variant="h6" color="text.secondary" gutterBottom>
        No prediction data available
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Make predictions from the Prediction page to see results here
      </Typography>
      <Button 
        variant="contained" 
        component={RouterLink} 
        to="/prediction"
        sx={{ mt: 2 }}
      >
        Go to Prediction
      </Button>
    </Box>
  );

  // Xử lý thay đổi hướng sắp xếp
  const handleSortDirectionChange = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  // Đóng snackbar
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: 3 }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
            Prediction History
          </Typography>
          
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <FormControl fullWidth>
                    <InputLabel>Sort by</InputLabel>
                    <Select
                      value={sortField}
                      label="Sort by"
                      onChange={(e) => setSortField(e.target.value)}
                    >
                      <MenuItem value="date">Date</MenuItem>
                      <MenuItem value="Age_at_enrollment">Age_at_enrollment</MenuItem>
                      <MenuItem value="avg_enrolled">avg_enrolled</MenuItem>
                      <MenuItem value="avg_approved">avg_approved</MenuItem>
                      <MenuItem value="avg_grade">avg_grade</MenuItem>
                      <MenuItem value="courseName">Course</MenuItem>
                      <MenuItem value="Gender">Gender</MenuItem>
                      <MenuItem value="prediction">Result</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <IconButton 
                    onClick={handleSortDirectionChange}
                    sx={{ 
                      height: '100%', 
                      width: '100%', 
                      border: '1px solid rgba(0, 0, 0, 0.23)',
                      borderRadius: 1
                    }}
                  >
                    <SortIcon />
                    {sortDirection === 'asc' ? '↑' : '↓'}
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table>
              <TableHead sx={{ bgcolor: 'primary.main' }}>
                <TableRow>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Date</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Age</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>avg_enrolled</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>avg_approved</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>avg_grade</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Course</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Gender</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Result</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPredictions.length > 0 ? (
                  filteredPredictions.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>{item.Age_at_enrollment}</TableCell>
                      <TableCell>{item.avg_enrolled}</TableCell>
                      <TableCell>{item.avg_approved}</TableCell>
                      <TableCell>{item.avg_grade}</TableCell>
                      <TableCell>{item.courseName}</TableCell>
                      <TableCell>{item.Gender === 1 ? 'Male' : 'Female'}</TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: 'inline-block',
                            px: 2,
                            py: 0.5,
                            borderRadius: 1,
                            bgcolor: item.prediction === 'Graduate' ? 'success.light' : 'error.light',
                            color: 'white',
                            fontWeight: 'medium'
                          }}
                        >
                          {item.prediction === 'Graduate' ? 'Graduate' : 'Dropout'}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <IconButton 
                          color="error" 
                          onClick={() => handleDelete(item.id)}
                          size="small"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                      <EmptyState />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </motion.div>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default HistoryPage;