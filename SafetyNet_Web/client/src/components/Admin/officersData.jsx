import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TableSortLabel, IconButton, Tooltip, Chip } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const generateVariedData = () => {
  const ranks = ['Constable', 'Sergeant', 'Inspector', 'Captain', 'Chief'];
  const departments = ['Traffic', 'Criminal Investigation', 'Special Forces', 'Cyber Crime'];
  const names = [
    { firstName: 'Janaka', lastName: 'Perera' },
    { firstName: 'Kumara', lastName: 'Fernando' },
    { firstName: 'Nimal', lastName: 'Rajapakse' },
    { firstName: 'Chamara', lastName: 'Silva' },
    { firstName: 'Saman', lastName: 'Gunaratne' },
    { firstName: 'Suhaila', lastName: 'Mendis' },
    { firstName: 'Indika', lastName: 'Kumarasinghe' },
    { firstName: 'Kavinda', lastName: 'Gamage' },
    { firstName: 'Nadeesha', lastName: 'Jayasundara' },
    { firstName: 'Ruwan', lastName: 'Seneviratne' },
    { firstName: 'Dulani', lastName: 'Bandara' },
    { firstName: 'Ravi', lastName: 'Rathnayake' },
    { firstName: 'Ayesha', lastName: 'Jeyarathnam' },
    { firstName: 'Nuwan', lastName: 'Dissanayake' },
    { firstName: 'Anushka', lastName: 'Tharanga' },
    { firstName: 'Haritha', lastName: 'Weerasinghe' },
    { firstName: 'Lakshman', lastName: 'Ariyadasa' },
  ];

  const data = [];

  for (let i = 1; i <= names.length; i++) {
    const name = names[i % names.length];
    data.push({
      id: i,
      firstName: name.firstName,
      lastName: name.lastName,
      rank: ranks[i % ranks.length],
      department: departments[i % departments.length],
      badgeNumber: `${1000 + i}`,
      email: `${name.firstName.toLowerCase()}.${name.lastName.toLowerCase()}${i}@police.lk`,
      phone: `077${(1000000 + i).toString().slice(-7)}`,
    });
  }

  return data;
};

const officers = generateVariedData();

const OfficersData = () => {
  return (
    <TableContainer sx={{padding: 4, background:'#fdfdfd'}}>
      <Typography variant="h4" align="center" sx={{ mb: 2, fontWeight: 'bold', background:'#fdfdfd' }}>
        Registered Officers
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel>First Name</TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel>Last Name</TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel>Rank</TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel>Department</TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel>Badge Number</TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel>Email</TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel>Phone</TableSortLabel>
            </TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {officers.map((officer) => (
            <TableRow key={officer.id}>
              <TableCell>{officer.firstName}</TableCell>
              <TableCell>{officer.lastName}</TableCell>
              <TableCell>
                <Chip label={officer.rank} color="primary" />
              </TableCell>
              <TableCell>
                <Chip label={officer.department} color="secondary" />
              </TableCell>
              <TableCell>{officer.badgeNumber}</TableCell>
              <TableCell>{officer.email}</TableCell>
              <TableCell>{officer.phone}</TableCell>
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

export default OfficersData;
