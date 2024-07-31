import React, { useState } from 'react';
import { TextField, Button, Grid, Container, Typography, MenuItem, Snackbar, IconButton, InputAdornment } from '@mui/material';
import { AccountCircle, Email, Phone, Badge, Info, Lock } from '@mui/icons-material';
import MuiAlert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';

const ranks = ['Constable', 'Sergeant', 'Inspector', 'Captain', 'Chief'];
const departments = ['Traffic', 'Criminal Investigation', 'Special Forces', 'Cyber Crime'];

const Alert = styled(MuiAlert)(({ theme }) => ({
  '& .MuiAlert-icon': {
    color: theme.palette.info.main,
  },
}));

const PoliceOfficerRegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    rank: '',
    department: '',
    badgeNumber: '',
    email: '',
    phone: '',
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form Data:', formData);
    setSnackbarMessage('Registration successful!');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, background:'#fdfdfd', borderRadius: 10}}>
      <Typography variant="h4" gutterBottom align="center" color="black" sx={{ fontWeight: 'bold', color: 'black', mb: 5}}>
        Registration
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              select
              label="Rank"
              variant="outlined"
              fullWidth
              name="rank"
              value={formData.rank}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Info />
                  </InputAdornment>
                ),
              }}
            >
              {ranks.map((rank) => (
                <MenuItem key={rank} value={rank}>
                  {rank}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Badge Number"
              variant="outlined"
              fullWidth
              name="badgeNumber"
              value={formData.badgeNumber}
              onChange={handleChange}
              required
              InputProps={{
                  startAdornment: (
                  <InputAdornment position="start">
                    <Badge />
                  </InputAdornment>
                ),
            }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Phone"
              variant="outlined"
              fullWidth
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
              <TextField
                select
                label="Department"
                variant="outlined"
                fullWidth
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Info />
                    </InputAdornment>
                  ),
                }}
              >
                {departments.map((department) => (
                  <MenuItem key={department} value={department}>
                    {department}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

          <Grid item xs={12} sx={{ mt: 4, borderRadius: 10}}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default PoliceOfficerRegistrationForm;
