import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TableSortLabel, IconButton, Tooltip } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const generateDriverData = () => {
  const drivers = [
    { name: 'John Doe', nic: '123456789V', email: 'john.doe@example.com', numOfVehicles: 3, phone: '0771234567', emergencyContact: '0777654321' },
    { name: 'Jane Smith', nic: '987654321V', email: 'jane.smith@example.com', numOfVehicles: 2, phone: '0777654321', emergencyContact: '0771234567' },
    // Add more driver data here...
  ];

  return drivers;
};

const drivers = generateDriverData();

const DriverData = () => {
  return (
    <TableContainer component={Paper} sx={{ padding: 4, background: '#fdfdfd' }}>
      <Typography variant="h4" align="center" sx={{ mb: 2, fontWeight: 'bold', background: '#fdfdfd' }}>
        Registered Drivers
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel>Name</TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel>NIC</TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel>Email</TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel>No of Vehicles</TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel>Phone</TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel>Emergency Contact</TableSortLabel>
            </TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {drivers.map((driver, index) => (
            <TableRow key={index}>
              <TableCell>{driver.name}</TableCell>
              <TableCell>{driver.nic}</TableCell>
              <TableCell>{driver.email}</TableCell>
              <TableCell>{driver.numOfVehicles}</TableCell>
              <TableCell>{driver.phone}</TableCell>
              <TableCell>{driver.emergencyContact}</TableCell>
              <TableCell>
                <Tooltip title="Edit">
                  <IconButton color="primary" sx={{ mr: 1 }}>
                    <Edit />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton color="error">
                    <Delete />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DriverData;
