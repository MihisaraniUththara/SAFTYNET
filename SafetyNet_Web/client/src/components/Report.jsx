import React from 'react';
import '../assets/css/report.css';
import logo from '../assets/images/logo1.png'; // Adjust the path as needed
import profilePicture from '../assets/images/profile.png'; // Adjust the path as needed

import { Link } from 'react-router-dom';
import { Box, FormControlLabel, Checkbox } from '@mui/material';

const Report = () => {
  const [checked, setChecked] = React.useState({
    parent1: false,
    child1_1: false,
    child1_2: false,
    parent2: false,
    child2_1: false,
    child2_2: false,
    parent3: false,
    child3_1: false,
    child3_2: false,
    parent4: false,
    child4_1: false,
    child4_2: false,
    parent5: false,
    child5_1: false,
    child5_2: false,
  });

  const handleParentChange = (event, parent, child1, child2) => {
    const { checked } = event.target;
    setChecked((prev) => ({
      ...prev,
      [parent]: checked,
      [child1]: checked,
      [child2]: checked,
    }));
  };

  const handleChildChange = (event, child) => {
    const { checked } = event.target;
    setChecked((prev) => ({
      ...prev,
      [child]: checked,
    }));
  };

  const renderParentWithChildren = (parent, child1, child2, label) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
      <FormControlLabel
        label={label}
        control={
          <Checkbox
            checked={checked[parent]}
            onChange={(e) => handleParentChange(e, parent, child1, child2)}
          />
        }
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
        <FormControlLabel
          label="Child 1"
          control={
            <Checkbox
              checked={checked[child1]}
              onChange={(e) => handleChildChange(e, child1)}
            />
          }
        />
        <FormControlLabel
          label="Child 2"
          control={
            <Checkbox
              checked={checked[child2]}
              onChange={(e) => handleChildChange(e, child2)}
            />
          }
        />
      </Box>
    </Box>
  );

  return (
    <div className="dashboard-container">
      <header className="header">
        <img src={logo} alt="Logo" className="logo" />
        <div className="user-info">
          <span>GALLE</span>
          <img src={profilePicture} alt="Profile" className="profile" />
          <button className="logout">Log Out</button>
        </div>
      </header>

      <div className="dashboard">
        <aside className="sidebar">
          <img src={profilePicture} alt="Profile" className="profile-pic" />
          <p className="user-name">A B C PERERA</p>
          <ul className="menu">
            <Link to="/traffic-police" style={{ textDecoration: 'none' }}>
              <li>Dashboard</li>
            </Link>
            <Link to="/OnProgress" style={{ textDecoration: 'none' }}>
              <li>Accidents on progress</li>
            </Link>
            <Link to="/Accident" style={{ textDecoration: 'none' }}>
              <li>Accident Details</li>
            </Link>
            <Link to="/traffic-police" style={{ textDecoration: 'none' }}>
              <li className="dashboard">Reports</li>
            </Link>
            <Link to="/Analysis" style={{ textDecoration: 'none' }}>
              <li>Analysis</li>
            </Link>
          </ul>
        </aside>
        <main className='major-container'>
          <div className="topnav1">
            <a href="/oic/Duty" className='select-one'>No Of Accidents</a>
            <a href="/oic/DutyE">No Of Deaths</a>
            <a href="/oic/DutyN">Court Cases</a>
          </div>

          {renderParentWithChildren('Year', '2020', '2021', '2022', 'Year')}
          {renderParentWithChildren('parent2', 'child2_1', 'child2_2', 'Parent 2')}
          {renderParentWithChildren('parent3', 'child3_1', 'child3_2', 'Parent 3')}
          {renderParentWithChildren('parent4', 'child4_1', 'child4_2', 'Parent 4')}
          {renderParentWithChildren('parent5', 'child5_1', 'child5_2', 'Parent 5')}
          
        </main>
      </div>
    </div>
  );
};

export default Report;
