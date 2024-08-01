import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
// import './call.css';
import logo from '../../assets/images/logo1.png';
import profilePicture from '../../assets/images/profile.png';
import { Container, Snackbar, Alert, Typography, Box } from '@mui/material';
import CardView from './CardView';

const ManageAccidents = () => {
  const [selectedStation, setSelectedStation] = useState(null); // State for selected station
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const location = useLocation();

  const handleStationChange = (station) => {
    setSelectedStation(station);
  };

  const openSnackbar = (message) => {
    setSnackbarMessage(message);

    
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = () => {
    if (!selectedStation) {
      openSnackbar('Please select a station before submitting.');
      return;
    }

    // Show a success message using Snackbar
    openSnackbar('Message is submitted');
  };

  const accidents = [
    { id: '001', location: { lat: 6.9271, long: 79.9556 }, time: '10:00 AM' },
    { id: '002', location: { lat: 6.9272, long: 79.9557 }, time: '11:00 AM' },
    { id: '003', location: { lat: 6.9273, long: 79.9558 }, time: '12:00 PM' },
    { id: '004', location: { lat: 6.9274, long: 79.9559 }, time: '01:00 PM' },
    { id: '005', location: { lat: 6.9275, long: 79.9560 }, time: '02:00 PM' },
  ];

  return (
    <div className="dashboard-container">
      <header className="header">
        <img src={logo} alt="Logo" className="logo" />
        <div className="user-info">
          <img src={profilePicture} alt="Profile" className="profile" />
          <button className="logout">Log Out</button>
        </div>
      </header>

      <div className="dashboard">
        <aside className="sidebar">
          <img src={profilePicture} alt="Profile" className="profile-pic" />
          <p className="user-name">A B C PERERA</p>
          <ul className="menu">
          <Link to="/HeadOffice" style={{textDecoration: 'none'}}><li className="dashboard">Manage Accidents</li></Link>
            <Link to="/HeadOffice/Accident" style={{textDecoration: 'none'}}><li>Accident Details</li></Link>
            {/* <Link to="/HeadOffice/ReportApp" style={{textDecoration: 'none'}}><li>Report Approval</li></Link>
            <Link to="" style={{textDecoration: 'none'}}><li>Reports</li></Link>
            <Link to="/HeadOffice/Analysis" style={{textDecoration: 'none'}}><li>Analysis</li></Link> */}
            {/* <Link to="#" style={{textDecoration: 'none'}}><li>Announcement</li></Link> */}
          </ul>
        </aside>
          <Container sx={{marginTop: 4, marginBottom: 4}}>
            {accidents.length === 0 ? (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', padding: 2 }}>
                <Typography variant="h6" color="textSecondary">
                  No accidents data available.
                </Typography>
              </Box>
            ) : (
              accidents.map((accident) => (
                <CardView
                  key={accident.id}
                  accidentId={accident.id}
                  location={accident.location}
                  time={accident.time}
                  onSubmit={handleSubmit}
                  onStationChange={handleStationChange}
                  isFirst={accident.id === '001'}
                />
              ))
            )}
          </Container>
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarMessage.includes('Please') ? 'warning' : 'success'}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ManageAccidents;
