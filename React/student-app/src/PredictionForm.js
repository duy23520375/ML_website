import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Grid, TextField, MenuItem, Button, CircularProgress, Alert } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import api from './api';

const PredictionForm = () => {
  const [formData, setFormData] = useState({
    Age: 20,
    avg_enrolled: 5,
    avg_approved: 4,
    avg_grade: 12,
    avg_without_evaluations: 1,
    Marital_status: 1,
    Application_mode: 1,
    Application_order: 1,
    Course: 1,
    Daytime_evening_attendance: 1,
    Previous_qualification: 1,
    Mother_qualification: 1,
    Father_qualification: 1,
    Mother_occupation: 5,
    Father_occupation: 5,
    Displaced: 1,
    Debtor: 1,
    Tuition_fees_up_to_date: 1,
    Gender: 1,
    Scholarship_holder: 1
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: parseFloat(value)
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    
    try {
      const response = await api.post('/predict/', formData);
      setResult(response.data.prediction); // Display only the prediction value
    } catch (error) {
      console.error('Lỗi khi dự đoán:', error);
      alert('Có lỗi xảy ra khi dự đoán. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card elevation={3} component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <CardContent>
        <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
          Student Retention Prediction
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Numeric Information
              </Typography>
              
              <TextField
                fullWidth
                label="Age"
                type="number"
                name="Age"
                value={formData.Age}
                onChange={handleInputChange}
                required
                sx={{ mb: 2 }}
              />
              
              <TextField
                fullWidth
                label="Average Enrolled Credits"
                type="number"
                inputProps={{ step: 0.1 }}
                name="avg_enrolled"
                value={formData.avg_enrolled}
                onChange={handleInputChange}
                required
                sx={{ mb: 2 }}
              />
              
              <TextField
                fullWidth
                label="Average Approved Credits"
                type="number"
                inputProps={{ step: 0.1 }}
                name="avg_approved"
                value={formData.avg_approved}
                onChange={handleInputChange}
                required
                sx={{ mb: 2 }}
              />
              
              <TextField
                fullWidth
                label="Average Grade"
                type="number"
                inputProps={{ step: 0.1 }}
                name="avg_grade"
                value={formData.avg_grade}
                onChange={handleInputChange}
                required
                sx={{ mb: 2 }}
              />
              
              <TextField
                fullWidth
                label="Average Credits Without Evaluations"
                type="number"
                inputProps={{ step: 0.1 }}
                name="avg_without_evaluations"
                value={formData.avg_without_evaluations}
                onChange={handleInputChange}
                required
                sx={{ mb: 2 }}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Categorical Information
              </Typography>
            
              <TextField
                select
                fullWidth
                label="Marital Status"
                name="Marital_status"
                value={formData.Marital_status}
                onChange={handleInputChange}
                required
                sx={{ mb: 2 }}
              >
                <MenuItem value={1}>Single</MenuItem>
                <MenuItem value={2}>Married</MenuItem>
                <MenuItem value={3}>Widower</MenuItem>
                <MenuItem value={4}>Divorced</MenuItem>
                <MenuItem value={5}>Facto Union</MenuItem>
                <MenuItem value={6}>Legally Separated</MenuItem>
              </TextField>
              
              <TextField
                select
                fullWidth
                label="Gender"
                name="Gender"
                value={formData.Gender}
                onChange={handleInputChange}
                required
                sx={{ mb: 2 }}
              >
                <MenuItem value={1}>Male</MenuItem>
                <MenuItem value={0}>Female</MenuItem>
              </TextField>
              
              <TextField
                select
                fullWidth
                label="Course"
                name="Course"
                value={formData.Course}
                onChange={handleInputChange}
                required
                sx={{ mb: 2 }}
              >
                <MenuItem value={1}>Biofuel Production Technologies</MenuItem>
                <MenuItem value={2}>Animation and Multimedia Design</MenuItem>
                <MenuItem value={3}>Social Service (evening attendance)</MenuItem>
                <MenuItem value={4}>Agronomy</MenuItem>
                <MenuItem value={5}>Communication Design</MenuItem>
                <MenuItem value={6}>Veterinary Nursing</MenuItem>
                <MenuItem value={7}>Informatics Engineering</MenuItem>
                <MenuItem value={8}>Equiniculture</MenuItem>
                <MenuItem value={9}>Management</MenuItem>
                <MenuItem value={10}>Social Service</MenuItem>
                <MenuItem value={11}>Tourism</MenuItem>
                <MenuItem value={12}>Nursing</MenuItem>
                <MenuItem value={13}>Oral Hygiene</MenuItem>
                <MenuItem value={14}>Advertising and Marketing Management</MenuItem>
                <MenuItem value={15}>Journalism and Communication</MenuItem>
                <MenuItem value={16}>Basic Education</MenuItem>
                <MenuItem value={17}>Management (evening attendance)</MenuItem>
              </TextField>

              <TextField
                select
                fullWidth
                label="Application Mode"
                name="Application_mode"
                value={formData.Application_mode}
                onChange={handleInputChange}
                required
                sx={{ mb: 2 }}
              >
                <MenuItem value={1}>1st Phase - General Contingent</MenuItem>
                <MenuItem value={2}>Ordinance No. 612/93</MenuItem>
                <MenuItem value={3}>1st Phase - Special Contingent (Azores Island)</MenuItem>
                <MenuItem value={4}>Holders of other Higher Course</MenuItem>
                <MenuItem value={5}>Holders of Post-Secondary Course</MenuItem>
                <MenuItem value={6}>2nd Phase - General Contingent</MenuItem>
                <MenuItem value={7}>3rd Phase - General Contingent</MenuItem>
                <MenuItem value={8}>International Student</MenuItem>
                <MenuItem value={9}>Ordinance No. 854-B/99</MenuItem>
                <MenuItem value={10}>Ordinance No. 533-A/99, item b2(Different Plan)</MenuItem>
                <MenuItem value={11}>Ordinance No. 533-A/99, item b3(Other Institution)</MenuItem>
                <MenuItem value={12}>Over 23 years old</MenuItem>
                <MenuItem value={13}>Transfer</MenuItem>
                <MenuItem value={14}>Change of Course</MenuItem>
                <MenuItem value={15}>Technological Specialization Diploma Holders</MenuItem>
                <MenuItem value={16}>Change in Institution/Course</MenuItem>
                <MenuItem value={17}>Short Cycle Diploma Holders</MenuItem>
                <MenuItem value={18}>Change in institution/course (International)</MenuItem>
              </TextField>

              <TextField
                select
                fullWidth
                label="Previous Qualification"
                name="Previous_qualification"
                value={formData.Previous_qualification}
                onChange={handleInputChange}
                required
                sx={{ mb: 2 }}
              >
                <MenuItem value={1}>Secondary Education</MenuItem>
                <MenuItem value={2}>Higher Education - Bachelor's Degree</MenuItem>
                <MenuItem value={3}>Higher Education - Degree</MenuItem>
                <MenuItem value={4}>Higher Education - Master's</MenuItem>
                <MenuItem value={5}>Higher Education - Doctorate</MenuItem>
                <MenuItem value={6}>Frequency of Higher Education</MenuItem>
                <MenuItem value={7}>12th Year of Schooling - Not Completed</MenuItem>
                <MenuItem value={8}>11th Year of Schooling - Not Completed</MenuItem>
                <MenuItem value={9}>Other - 11th Year of Schooling</MenuItem>
                <MenuItem value={10}>10th Year of Schooling</MenuItem>
                <MenuItem value={11}>10th Year of Schooling - Not Completed</MenuItem>
                <MenuItem value={12}>Basic Education 3rd Cycle (9th/10th/11th Year) or Equivalent</MenuItem>
                <MenuItem value={13}>Basic Education 2nd Cycle (6th/7th/8th Year) or Equivalent</MenuItem>
                <MenuItem value={14}>Technological Specialization Course</MenuItem>
                <MenuItem value={15}>Higher education—degree (1st cycle)</MenuItem>
                <MenuItem value={16}>Professional Higher Technical Course</MenuItem>
                <MenuItem value={17}>Higher education—master’s degree (2nd cycle)</MenuItem>
                
              </TextField>

              <TextField
                select
                fullWidth
                label="Mother's Qualification"
                name="Mother_qualification"
                value={formData.Mother_qualification}
                onChange={handleInputChange}
                required
                sx={{ mb: 2 }}
              >
                <MenuItem value={1}>Secondary Education—12th Year of Schooling or Equivalent</MenuItem>
                <MenuItem value={2}>Higher Education—bachelor’s degree</MenuItem>
                <MenuItem value={3}>Higher Education—degree</MenuItem>
                <MenuItem value={4}>Higher Education—master’s degree</MenuItem>
                <MenuItem value={5}>Higher Education—doctorate</MenuItem>
                <MenuItem value={6}>Frequency of Higher Education</MenuItem>
                <MenuItem value={7}>12th Year of Schooling—not completed</MenuItem>
                <MenuItem value={8}>11th Year of Schooling—not completed</MenuItem>
                <MenuItem value={9}>7th Year (Old)</MenuItem>
                <MenuItem value={10}>Other—11th Year of Schooling</MenuItem>
                <MenuItem value={11}>2nd year complementary high school course</MenuItem>
                <MenuItem value={12}>10th Year of Schooling</MenuItem>
                <MenuItem value={13}>General commerce course</MenuItem>
                <MenuItem value={14}>Basic Education 3rd Cycle (9th/10th/11th Year) or Equivalent</MenuItem>
                <MenuItem value={15}>Complementary High School Course</MenuItem>
                <MenuItem value={16}>Technical-professional course</MenuItem>
                <MenuItem value={17}>Complementary High School Course—not concluded</MenuItem>
                <MenuItem value={18}>7th year of schooling</MenuItem>
                <MenuItem value={19}>2nd cycle of the general high school course</MenuItem>
                <MenuItem value={20}>9th Year of Schooling—not completed</MenuItem>
                <MenuItem value={21}>8th year of schooling</MenuItem>
                <MenuItem value={22}>General Course of Administration and Commerce</MenuItem>
                <MenuItem value={23}>Supplementary Accounting and Administration</MenuItem>
                <MenuItem value={24}>Unknown</MenuItem>
                <MenuItem value={25}>Cannot read or write</MenuItem>
                <MenuItem value={26}>Can read without having a 4th year of schooling</MenuItem>
                <MenuItem value={27}>Basic education 1st cycle (4th/5th year) or equivalent</MenuItem>
                <MenuItem value={28}>Basic Education 2nd Cycle (6th/7th/8th Year) or equivalent</MenuItem>
                <MenuItem value={29}>Technological specialization course</MenuItem>
                <MenuItem value={30}>Higher education—degree (1st cycle)</MenuItem>
                <MenuItem value={31}>Specialized higher studies course</MenuItem>
                <MenuItem value={32}>Professional higher technical course</MenuItem>
                <MenuItem value={33}>Higher Education—master’s degree (2nd cycle)</MenuItem>
                <MenuItem value={34}>Higher Education—doctorate (3rd cycle)</MenuItem>
              </TextField>

              <TextField
                select
                fullWidth
                label="Father's Qualification"
                name="Father_qualification"
                value={formData.Father_qualification}
                onChange={handleInputChange}
                required
                sx={{ mb: 2 }}
              >
                <MenuItem value={1}>Secondary Education—12th Year of Schooling or Equivalent</MenuItem>
                <MenuItem value={2}>Higher Education—bachelor’s degree</MenuItem>
                <MenuItem value={3}>Higher Education—degree</MenuItem>
                <MenuItem value={4}>Higher Education—master’s degree</MenuItem>
                <MenuItem value={5}>Higher Education—doctorate</MenuItem>
                <MenuItem value={6}>Frequency of Higher Education</MenuItem>
                <MenuItem value={7}>12th Year of Schooling—not completed</MenuItem>
                <MenuItem value={8}>11th Year of Schooling—not completed</MenuItem>
                <MenuItem value={9}>7th Year (Old)</MenuItem>
                <MenuItem value={10}>Other—11th Year of Schooling</MenuItem>
                <MenuItem value={11}>2nd year complementary high school course</MenuItem>
                <MenuItem value={12}>10th Year of Schooling</MenuItem>
                <MenuItem value={13}>General commerce course</MenuItem>
                <MenuItem value={14}>Basic Education 3rd Cycle (9th/10th/11th Year) or Equivalent</MenuItem>
                <MenuItem value={15}>Complementary High School Course</MenuItem>
                <MenuItem value={16}>Technical-professional course</MenuItem>
                <MenuItem value={17}>Complementary High School Course—not concluded</MenuItem>
                <MenuItem value={18}>7th year of schooling</MenuItem>
                <MenuItem value={19}>2nd cycle of the general high school course</MenuItem>
                <MenuItem value={20}>9th Year of Schooling—not completed</MenuItem>
                <MenuItem value={21}>8th year of schooling</MenuItem>
                <MenuItem value={22}>General Course of Administration and Commerce</MenuItem>
                <MenuItem value={23}>Supplementary Accounting and Administration</MenuItem>
                <MenuItem value={24}>Unknown</MenuItem>
                <MenuItem value={25}>Cannot read or write</MenuItem>
                <MenuItem value={26}>Can read without having a 4th year of schooling</MenuItem>
                <MenuItem value={27}>Basic education 1st cycle (4th/5th year) or equivalent</MenuItem>
                <MenuItem value={28}>Basic Education 2nd Cycle (6th/7th/8th Year) or equivalent</MenuItem>
                <MenuItem value={29}>Technological specialization course</MenuItem>
                <MenuItem value={30}>Higher education—degree (1st cycle)</MenuItem>
                <MenuItem value={31}>Specialized higher studies course</MenuItem>
                <MenuItem value={32}>Professional higher technical course</MenuItem>
                <MenuItem value={33}>Higher Education—master’s degree (2nd cycle)</MenuItem>
                <MenuItem value={34}>Higher Education—doctorate (3rd cycle)</MenuItem>
              </TextField>

              <TextField
                select
                fullWidth
                label="Mother's Occupation"
                name="Mother_occupation"
                value={formData.Mother_occupation}
                onChange={handleInputChange}
                required
                sx={{ mb: 2 }}
              >
                <MenuItem value={1}>Student</MenuItem>
                <MenuItem value={2}>Representatives of the Legislative Power and Executive Bodies, Directors, Directors and Executive Managers</MenuItem>
                <MenuItem value={3}>Specialists in Intellectual and Scientific Activities</MenuItem>
                <MenuItem value={4}>Intermediate Level Technicians and Professions</MenuItem>
                <MenuItem value={5}>Administrative staff</MenuItem>
                <MenuItem value={6}>Personal Services, Security and Safety Workers, and Sellers</MenuItem>
                <MenuItem value={7}>Farmers and Skilled Workers in Agriculture, Fisheries,and Forestry</MenuItem>
                <MenuItem value={8}>Skilled Workers in Industry, Construction, and Craftsmen</MenuItem>
                <MenuItem value={9}>Installation and Machine Operators and Assembly Workers</MenuItem>
                <MenuItem value={10}>Unskilled Workers</MenuItem>
                <MenuItem value={11}>Armed Forces Professions</MenuItem>
                <MenuItem value={12}>Other Situation</MenuItem>
                <MenuItem value={13}>(blank)</MenuItem>
                <MenuItem value={14}>Armed Forces Officers</MenuItem>
                <MenuItem value={15}>Armed Forces Sergeants</MenuItem>
                <MenuItem value={16}>Other Armed Forces personnel</MenuItem>
                <MenuItem value={17}>Directors of administrative and commercial services</MenuItem>
                <MenuItem value={18}>Hotel, catering, trade, and other services directors</MenuItem>
                <MenuItem value={19}>Specialists in the physical sciences, mathematics, engineering,and related techniques</MenuItem>
                <MenuItem value={20}>Health professionals</MenuItem>
                <MenuItem value={21}>Teachers</MenuItem>
                <MenuItem value={22}>Specialists in finance, accounting, administrative organization,and public and commercial relations</MenuItem>
                <MenuItem value={23}>Intermediate level science and engineering techniciansand professions</MenuItem>
                <MenuItem value={24}>Technicians and professionals of intermediate level of health</MenuItem>
                <MenuItem value={25}>Intermediate level technicians from legal, social, sports, cultural,and similar services</MenuItem>
                <MenuItem value={26}>Information and communication technology technicians</MenuItem>
                <MenuItem value={27}>Office workers, secretaries in general, and data processing operators</MenuItem>
                <MenuItem value={28}>Data, accounting, statistical, financial services, and registry-related operators</MenuItem>
                <MenuItem value={29}>Other administrative support staff</MenuItem>
                <MenuItem value={30}>Personal service workers</MenuItem>
                <MenuItem value={31}>Sellers</MenuItem>
                <MenuItem value={32}>Personal care workers and the like</MenuItem>
                <MenuItem value={33}>Protection and security services personnel</MenuItem>
                <MenuItem value={34}>Market-oriented farmers and skilled agricultural and animal production workers</MenuItem>
                <MenuItem value={35}>Farmers, livestock keepers, fishermen, hunters and gatherers,and subsistence</MenuItem>
                <MenuItem value={36}>Skilled construction workers and the like, except electricians</MenuItem>
                <MenuItem value={37}>Skilled workers in metallurgy, metalworking, and similar</MenuItem>
                <MenuItem value={38}>Skilled workers in electricity and electronics</MenuItem>
                <MenuItem value={39}>Workers in food processing, woodworking, and clothing and other industries and crafts</MenuItem>
                <MenuItem value={40}>Fixed plant and machine operators</MenuItem>
                <MenuItem value={41}>Assembly workers</MenuItem>
                <MenuItem value={42}>Vehicle drivers and mobile equipment operators</MenuItem>
                <MenuItem value={43}>Unskilled workers in agriculture, animal production, and fisheries and forestry</MenuItem>
                <MenuItem value={44}>Unskilled workers in extractive industry, construction,manufacturing, and transport</MenuItem>
                <MenuItem value={45}>Meal preparation assistants</MenuItem>
                <MenuItem value={46}>Street vendors (except food) and street service providers</MenuItem>
              </TextField>

              <TextField
                select
                fullWidth
                label="Father's Occupation"
                name="Father_occupation"
                value={formData.Father_occupation}
                onChange={handleInputChange}
                required
                sx={{ mb: 2 }}
              >
                <MenuItem value={1}>Student</MenuItem>
                <MenuItem value={2}>Representatives of the Legislative Power and Executive Bodies, Directors, Directors and Executive Managers</MenuItem>
                <MenuItem value={3}>Specialists in Intellectual and Scientific Activities</MenuItem>
                <MenuItem value={4}>Intermediate Level Technicians and Professions</MenuItem>
                <MenuItem value={5}>Administrative staff</MenuItem>
                <MenuItem value={6}>Personal Services, Security and Safety Workers, and Sellers</MenuItem>
                <MenuItem value={7}>Farmers and Skilled Workers in Agriculture, Fisheries,and Forestry</MenuItem>
                <MenuItem value={8}>Skilled Workers in Industry, Construction, and Craftsmen</MenuItem>
                <MenuItem value={9}>Installation and Machine Operators and Assembly Workers</MenuItem>
                <MenuItem value={10}>Unskilled Workers</MenuItem>
                <MenuItem value={11}>Armed Forces Professions</MenuItem>
                <MenuItem value={12}>Other Situation</MenuItem>
                <MenuItem value={13}>(blank)</MenuItem>
                <MenuItem value={14}>Armed Forces Officers</MenuItem>
                <MenuItem value={15}>Armed Forces Sergeants</MenuItem>
                <MenuItem value={16}>Other Armed Forces personnel</MenuItem>
                <MenuItem value={17}>Directors of administrative and commercial services</MenuItem>
                <MenuItem value={18}>Hotel, catering, trade, and other services directors</MenuItem>
                <MenuItem value={19}>Specialists in the physical sciences, mathematics, engineering,and related techniques</MenuItem>
                <MenuItem value={20}>Health professionals</MenuItem>
                <MenuItem value={21}>Teachers</MenuItem>
                <MenuItem value={22}>Specialists in finance, accounting, administrative organization,and public and commercial relations</MenuItem>
                <MenuItem value={23}>Intermediate level science and engineering techniciansand professions</MenuItem>
                <MenuItem value={24}>Technicians and professionals of intermediate level of health</MenuItem>
                <MenuItem value={25}>Intermediate level technicians from legal, social, sports, cultural,and similar services</MenuItem>
                <MenuItem value={26}>Information and communication technology technicians</MenuItem>
                <MenuItem value={27}>Office workers, secretaries in general, and data processing operators</MenuItem>
                <MenuItem value={28}>Data, accounting, statistical, financial services, and registry-related operators</MenuItem>
                <MenuItem value={29}>Other administrative support staff</MenuItem>
                <MenuItem value={30}>Personal service workers</MenuItem>
                <MenuItem value={31}>Sellers</MenuItem>
                <MenuItem value={32}>Personal care workers and the like</MenuItem>
                <MenuItem value={33}>Protection and security services personnel</MenuItem>
                <MenuItem value={34}>Market-oriented farmers and skilled agricultural and animal production workers</MenuItem>
                <MenuItem value={35}>Farmers, livestock keepers, fishermen, hunters and gatherers,and subsistence</MenuItem>
                <MenuItem value={36}>Skilled construction workers and the like, except electricians</MenuItem>
                <MenuItem value={37}>Skilled workers in metallurgy, metalworking, and similar</MenuItem>
                <MenuItem value={38}>Skilled workers in electricity and electronics</MenuItem>
                <MenuItem value={39}>Workers in food processing, woodworking, and clothing and other industries and crafts</MenuItem>
                <MenuItem value={40}>Fixed plant and machine operators</MenuItem>
                <MenuItem value={41}>Assembly workers</MenuItem>
                <MenuItem value={42}>Vehicle drivers and mobile equipment operators</MenuItem>
                <MenuItem value={43}>Unskilled workers in agriculture, animal production, and fisheries and forestry</MenuItem>
                <MenuItem value={44}>Unskilled workers in extractive industry, construction,manufacturing, and transport</MenuItem>
                <MenuItem value={45}>Meal preparation assistants</MenuItem>
                <MenuItem value={46}>Street vendors (except food) and street service providers</MenuItem>
              </TextField>

              <TextField
                select
                fullWidth
                label="Daytime/Evening Attendance"
                name="Daytime_evening_attendance"
                value={formData.Daytime_evening_attendance}
                onChange={handleInputChange}
                required
                sx={{ mb: 2 }}
              >
                <MenuItem value={1}>Daytime</MenuItem>
                <MenuItem value={0}>Evening</MenuItem>
              </TextField>

              <TextField
                select
                fullWidth
                label="Application Order"
                name="Application_order"
                value={formData.Application_order}
                onChange={handleInputChange}
                required
                sx={{ mb: 2 }}
              >
                {[...Array(9)].map((_, i) => (
                  <MenuItem key={i + 1} value={i + 1}>{i + 1}</MenuItem>
                ))}
              </TextField>

              <TextField
                select
                fullWidth
                label="Displaced"
                name="Displaced"
                value={formData.Displaced}
                onChange={handleInputChange}
                required
                sx={{ mb: 2 }}
              >
                <MenuItem value={1}>Yes</MenuItem>
                <MenuItem value={0}>No</MenuItem>
              </TextField>

              <TextField
                select
                fullWidth
                label="Debtor"
                name="Debtor"
                value={formData.Debtor}
                onChange={handleInputChange}
                required
                sx={{ mb: 2 }}
              >
                <MenuItem value={1}>Yes</MenuItem>
                <MenuItem value={0}>No</MenuItem>
              </TextField>

              <TextField
                select
                fullWidth
                label="Tuition Fees Up to Date"
                name="Tuition_fees_up_to_date"
                value={formData.Tuition_fees_up_to_date}
                onChange={handleInputChange}
                required
                sx={{ mb: 2 }}
              >
                <MenuItem value={1}>Yes</MenuItem>
                <MenuItem value={0}>No</MenuItem>
              </TextField>

              <TextField
                select
                fullWidth
                label="Scholarship Holder"
                name="Scholarship_holder"
                value={formData.Scholarship_holder}
                onChange={handleInputChange}
                required
                sx={{ mb: 2 }}
              >
                <MenuItem value={1}>Yes</MenuItem>
                <MenuItem value={0}>No</MenuItem>
              </TextField>
            </Grid>
          </Grid>
          
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            disabled={loading}
            fullWidth
            sx={{ mt: 3, py: 1.5 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Predict'}
          </Button>

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                style={{ marginTop: '20px' }}
              >
                <Alert severity="success" sx={{ mt: 3 }}>
                  <strong>Prediction Result:</strong> {result}
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
      </CardContent>
    </Card>
    
  );
};

export default PredictionForm;