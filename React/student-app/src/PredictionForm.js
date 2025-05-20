import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Grid, TextField, MenuItem, Button, CircularProgress, Alert, Stepper, Step, StepLabel, Paper } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Person, School, Group, SentimentVeryDissatisfied, SentimentVerySatisfied } from '@mui/icons-material';
import api from './api';
import { Stack } from '@mui/material';


const PredictionForm = () => {
  const [formData, setFormData] = useState({
    Marital_status: 1,
    Application_mode: 1,
    Course: 5,
    Daytime_evening_attendance: 1,
    Previous_qualification: 1,
    Mother_qualification: 22,
    Father_qualification: 27,
    Mother_occupation: 10,
    Father_occupation: 10,
    Displaced: 1,
    Debtor: 0,
    Tuition_fees_up_to_date: 0,
    Gender: 1,
    Scholarship_holder: 0,
    Age_at_enrollment: 19,
   
    avg_enrolled: 6,
    avg_approved: 0,
    avg_grade: 0
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const sections = [
    { label: 'Personal Info', icon: <Person /> },
    { label: 'Academic Info', icon: <School /> },
    { label: 'Family Background', icon: <Group /> }
  ];

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
    setResult(null);
    setIsSubmitted(false); // Reset before new prediction
  
    try {
      const response = await api.post('/predict/', formData);
      setResult(response.data.prediction);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Lỗi khi dự đoán:', error);
      // Consider setting a specific error message state here instead of alert
      setResult({ error: 'Có lỗi xảy ra khi dự đoán. Vui lòng thử lại.' }); 
      setIsSubmitted(true); // Still set to true to display the error message
    } finally {
      setLoading(false);
    }
  };
  

  const renderPersonalInfo = () => (
    <Card elevation={3} sx={{ p: 4, mb: 2, width: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Person sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6" color="primary">
            Personal Info
          </Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              fullWidth
              sx={{ minWidth: 250 }}
              label="Age at enrollment"
              type="number"
              name="Age_at_enrollment"
              inputProps={{ min: 0, max: 100 }}
              value={formData.Age_at_enrollment}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              select
              fullWidth
              sx={{ minWidth: 250 }}
              label="Gender"
              name="Gender"
              value={formData.Gender}
              onChange={handleInputChange}
              required
            >
              <MenuItem value={1}>Male</MenuItem>
              <MenuItem value={0}>Female</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              select
              fullWidth
              sx={{ minWidth: 250 }}
              label="Marital status"
              name="Marital_status"
              value={formData.Marital_status}
              onChange={handleInputChange}
              required
            >
              <MenuItem value={1}>Single</MenuItem>
              <MenuItem value={2}>Married</MenuItem>
              <MenuItem value={3}>Widower</MenuItem>
              <MenuItem value={4}>Divorced</MenuItem>
              <MenuItem value={5}>Cohabitant</MenuItem>
              <MenuItem value={6}>Legally separated</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              select
              fullWidth
              sx={{ minWidth: 250 }}
              label="Displaced (student away from home)"
              name="Displaced"
              value={formData.Displaced}
              onChange={handleInputChange}
              required
            >
              <MenuItem value={1}>Yes</MenuItem>
              <MenuItem value={0}>No</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              select
              fullWidth
              sx={{ minWidth: 250 }}
              label="Debtor"
              name="Debtor"
              value={formData.Debtor}
              onChange={handleInputChange}
              required
            >
              <MenuItem value={1}>Yes</MenuItem>
              <MenuItem value={0}>No</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              select
              fullWidth
              sx={{ minWidth: 250 }}
              label="Tuition fees up to date"
              name="Tuition_fees_up_to_date"
              value={formData.Tuition_fees_up_to_date}
              onChange={handleInputChange}
              required
            >
              <MenuItem value={1}>Yes</MenuItem>
              <MenuItem value={0}>No</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              select
              fullWidth
              sx={{ minWidth: 250 }}
              label="Scholarship holder"
              name="Scholarship_holder"
              value={formData.Scholarship_holder}
              onChange={handleInputChange}
              required
            >
              <MenuItem value={1}>Yes</MenuItem>
              <MenuItem value={0}>No</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  const renderAcademicInfo = () => (
    <Card elevation={3} sx={{ p: 4, mb: 2, width: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <School sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6" color="primary">
            Academic Info
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              sx={{ minWidth: 250 }}
              label="Average enrolled credits"
              type="number"
              name="avg_enrolled"
              inputProps={{ min: 0, max: 100 }}
              value={formData.avg_enrolled}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              sx={{ minWidth: 250 }}
              label="Average approved credits"
              type="number"
              name="avg_approved"
              inputProps={{ min: 0, max: 100 }}
              value={formData.avg_approved}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              sx={{ minWidth: 250 }}
              label="Average grade"
              type="number"
              inputProps={{ step: 0.1, min:0, max: 20 }}
              name="avg_grade"
              value={formData.avg_grade}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              sx={{ minWidth: 250 }}
              label="Daytime/evening attendance"
              name="Daytime_evening_attendance"
              value={formData.Daytime_evening_attendance}
              onChange={handleInputChange}
              required
            >
              <MenuItem value={1}>Daytime</MenuItem>
              <MenuItem value={0}>Evening</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              sx={{ minWidth: 250 }}
              label="Application mode"
              name="Application_mode"
              value={formData.Application_mode}
              onChange={handleInputChange}
              required
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
          </Grid>
          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              sx={{ minWidth: 250 }}
              label="Course"
              name="Course"
              value={formData.Course}
              onChange={handleInputChange}
              required
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
          </Grid>
          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              sx={{ minWidth: 250 }}
              label="Previous qualification"
              name="Previous_qualification"
              value={formData.Previous_qualification}
              onChange={handleInputChange}
              required
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
              <MenuItem value={17}>Higher education—master's degree (2nd cycle)</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );


const renderFamilyInfo = () => (
  <Card elevation={3} sx={{ p: 3, mb: 2, width: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Group sx={{ mr: 1, color: 'primary.main' }} />
        <Typography variant="h6" color="primary">
          Family Background
        </Typography>
      </Box>
      <Stack spacing={2}>
        <TextField
          select
          fullWidth
          label="Mother qualification"
          name="Mother_qualification"
          value={formData.Mother_qualification}
          onChange={handleInputChange}
          required
        >
          <MenuItem value={1}>Secondary Education—12th Year of Schooling or Equivalent</MenuItem>
          <MenuItem value={2}>Higher Education—bachelor's degree</MenuItem>
          <MenuItem value={3}>Higher Education—degree</MenuItem>
          <MenuItem value={4}>Higher Education—master's degree</MenuItem>
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
          <MenuItem value={33}>Higher Education—master's degree (2nd cycle)</MenuItem>
          <MenuItem value={34}>Higher Education—doctorate (3rd cycle)</MenuItem>
        </TextField>
        <TextField
          select
          fullWidth
          label="Father qualification"
          name="Father_qualification"
          value={formData.Father_qualification}
          onChange={handleInputChange}
          required
        >
          <MenuItem value={1}>Secondary Education—12th Year of Schooling or Equivalent</MenuItem>
          <MenuItem value={2}>Higher Education—bachelor's degree</MenuItem>
          <MenuItem value={3}>Higher Education—degree</MenuItem>
          <MenuItem value={4}>Higher Education—master's degree</MenuItem>
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
          <MenuItem value={33}>Higher Education—master's degree (2nd cycle)</MenuItem>
          <MenuItem value={34}>Higher Education—doctorate (3rd cycle)</MenuItem>
        </TextField>
        <TextField
          select
          fullWidth
          label="Mother occupation"
          name="Mother_occupation"
          value={formData.Mother_occupation}
          onChange={handleInputChange}
          required
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
          label="Father occupation"
          name="Father_occupation"
          value={formData.Father_occupation}
          onChange={handleInputChange}
          required
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
      </Stack>
    </CardContent>
  </Card>
);


  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 2, width: '100%' }}>
      <Paper elevation={3} sx={{ p: 4, mb: 3 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
          Dropout Prediction
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderPersonalInfo()}
            {renderAcademicInfo()}
            {renderFamilyInfo()}
          </motion.div>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              size="large"
            >
              {loading ? <CircularProgress size={24} /> : 'Predict'}
            </Button>
          </Box>
        </Box>

        {isSubmitted && result && (
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {result.error ? (
                  <Alert
                    severity="error"
                    sx={{ justifyContent: 'center', alignItems: 'center', py: 2, fontSize: '1.1rem' }}
                  >
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                      Prediction Error
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      {result.error}
                    </Typography>
                  </Alert>
                ) : result === 'Dropout' ? (
                  <Alert
                    severity="error" // Using error for Dropout as it's a negative outcome
                    icon={<SentimentVeryDissatisfied fontSize="inherit" sx={{ fontSize: '2rem' }} />}
                    sx={{ justifyContent: 'center', alignItems: 'center', py: 2, fontSize: '1.1rem' }}
                  >
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', ml: 1 }}>
                      Prediction: Dropout
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      This student is at risk of dropping out. Timely intervention measures are needed.
                    </Typography>
                  </Alert>
                ) : result === 'Graduate' ? (
                  <Alert
                    severity="success"
                    icon={<SentimentVerySatisfied fontSize="inherit" sx={{ fontSize: '2rem' }} />}
                    sx={{ justifyContent: 'center', alignItems: 'center', py: 2, fontSize: '1.1rem' }}
                  >
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', ml: 1 }}>
                      Prediction: Graduate
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      Congratulations! This student is predicted to graduate.
                    </Typography>
                  </Alert>
                ) : null}
              </motion.div>
            </AnimatePresence>
          </Box>
        )}

      </Paper>
    </Box>
  );
};

export default PredictionForm;