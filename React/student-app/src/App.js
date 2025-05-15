import React from 'react';
import { ThemeProvider, createTheme, CssBaseline, Container, Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import PredictionForm from './PredictionForm';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';

// Tạo các trang Home, History và About dưới dạng component đơn giản

const HistoryPage = () => (
  <Container maxWidth="lg" sx={{ py: 4 }}>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: 3 }}>
        <h2>Lịch sử dự đoán</h2>
        <p>Trang này sẽ hiển thị lịch sử các dự đoán đã thực hiện.</p>
      </Box>
    </motion.div>
  </Container>
);

const AboutPage = () => (
  <Container maxWidth="lg" sx={{ py: 4 }}>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: 3 }}>
        <h2>Về dự án</h2>
        <p>Dự án "Prediction retention of student" nhằm dự đoán khả năng học sinh tiếp tục theo học hay bỏ học dựa trên các yếu tố khác nhau.</p>
        <p>Dự án sử dụng các thuật toán học máy để phân tích dữ liệu và đưa ra dự đoán chính xác.</p>
      </Box>
    </motion.div>
  </Container>
);

// Trang Prediction sử dụng component PredictionForm đã có
const PredictionPage = () => (
  <Container maxWidth="lg" sx={{ py: 4 }}>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <PredictionForm />
    </motion.div>
  </Container>
);

const theme = createTheme({
  palette: {
    primary: {
      main: '#6a3de8',
    },
    secondary: {
      main: '#00c853',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <Box component="main" sx={{ flexGrow: 1, py: 2 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/prediction" element={<PredictionPage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
