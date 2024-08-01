import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Box, Snackbar, Alert, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';
import Select from 'react-select';

const stations = [
  { label: 'Colombo Fort', value: 'Colombo Fort' },
  { label: 'Kandy', value: 'Kandy' },
  { label: 'Galle', value: 'Galle' },
  { label: 'Jaffna', value: 'Jaffna' },
  { label: 'Batticaloa', value: 'Batticaloa' },
  { label: 'Matara', value: 'Matara' },
  { label: 'Kurunegala', value: 'Kurunegala' },
];

const CardView = ({ accidentId, location, time, onSubmit, isFirst, onStationChange }) => {
  const [selectedStation, setSelectedStation] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleStationChange = (selectedOption) => {
    setSelectedStation(selectedOption);
    if (onStationChange) {
      onStationChange(selectedOption);
    }
  };

  const handleSubmit = () => {
    if (!selectedStation) {
      setSnackbarMessage('Please select a station before submitting.');
      setSnackbarOpen(true);
      return;
    }
    
    setIsVisible(false);
    onSubmit();
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (!isVisible) return null;

  // Fixed height for the card
  const cardHeight = 160; // Example height
  const cardWidth = cardHeight * 7; // Width is 4 times the height

  return (
    <>
      <Card
        sx={{
          height: cardHeight,
          width: cardWidth,
          mb: 2,
          mt: 3,
          margin: 'auto',
          position: 'relative',
          overflow: 'hidden', // Ensure content scrolls if needed
        }}
        className="debug-card"
      >
        <CardContent>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell><strong>Acc ID:</strong>   {accidentId}</TableCell>
                  <TableCell><strong>Location:</strong>   {`Latitude: ${location.lat}, Longitude: ${location.long}`}</TableCell>
                  <TableCell><strong>Time:</strong>   {time}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
            <Box sx={{ flex: 3, mr: 1 }}>
              <Select
                options={stations}
                value={selectedStation}
                onChange={handleStationChange}
                placeholder="Select a station"
                menuPortalTarget={document.body}
                styles={{
                  menuPortal: (provided) => ({
                    ...provided,
                    zIndex: 9999,
                  }),
                  menu: (provided) => ({
                    ...provided,
                    zIndex: 9999,
                  }),
                }}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                Submit
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="warning">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CardView;
