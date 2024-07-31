import React from 'react'
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





const DriverData = () => {
  return (
    <div>DriverData</div>
  )
}

export default DriverData