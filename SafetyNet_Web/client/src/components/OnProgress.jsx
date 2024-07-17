import React from 'react';
import '../assets/css/onProgress.css';
import logo from '../assets/images/logo1.png'; // Adjust the path as needed
import profilePicture from '../assets/images/profile.png'; // Adjust the path as needed

import {Link} from 'react-router-dom';

const OnProgress = () => {
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
          <Link to="/traffic-police"><li>Dashboard</li></Link>
            <Link to="/OnProgress"><li className = "dashboard">Accidents on progress</li></Link>
            <Link to="/Accident"><li>Accident Details</li></Link>
            <Link to="/traffic-police"><li>Reports</li></Link>
            <Link to="/traffic-police"><li>Analysis</li></Link>
          </ul>
        </aside>

<main className="main-content">
<div className="ui-design">
    <div className="date-group">
      <h3>2024/06/29</h3>
      <div className="ui-row">
        <div className="ui-cell">A00158</div>
        <div className="ui-cell">6.920265, 79.856830</div>
        <div className="ui-cell ui-status n-a">N/A</div>
        <div className="ui-cell ui-action in-charge">In-charge</div>
        <div className="ui-cell ui-action details">Details</div>
      </div>
      <div className="ui-row">
        <div className="ui-cell">A00025</div>
        <div className="ui-cell">6.920265, 79.856830</div>
        <div className="ui-cell ui-status pending">Pending</div>
        <div className="ui-cell ui-action in-charge">In-charge</div>
        <div className="ui-cell ui-action details">Details</div>
      </div>
      <div className="ui-row">
        <div className="ui-cell">A00058</div>
        <div className="ui-cell">6.920265, 79.856830</div>
        <div className="ui-cell ui-status completed">Completed</div>
        <div className="ui-cell ui-action in-charge">In-charge</div>
        <div className="ui-cell ui-action details">Details</div>
      </div>
      <div className="ui-row">
        <div className="ui-cell">A00112</div>
        <div className="ui-cell">6.920265, 79.856830</div>
        <div className="ui-cell ui-status approved">Approved</div>
        <div className="ui-cell ui-action in-charge">In-charge</div>
        <div className="ui-cell ui-action details">Details</div>
      </div>
    </div>

    <div className="date-group">
      <h3>2024/06/28</h3>
      <div className="ui-row">
        <div className="ui-cell">A00148</div>
        <div className="ui-cell">6.920265, 79.856830</div>
        <div className="ui-cell ui-status completed">Completed</div>
        <div className="ui-cell ui-action in-charge">In-charge</div>
        <div className="ui-cell ui-action details">Details</div>
      </div>
      <div className="ui-row">
        <div className="ui-cell">A00111</div>
        <div className="ui-cell">6.920265, 79.856830</div>
        <div className="ui-cell ui-status completed">Completed</div>
        <div className="ui-cell ui-action in-charge">In-charge</div>
        <div className="ui-cell ui-action details">Details</div>
      </div>
    </div>
  </div>


</main>
      </div>
    </div>
  );
};

export default OnProgress;