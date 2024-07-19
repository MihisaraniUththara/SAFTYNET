/* import React from 'react';
import '../assets/css/TrafficPolice.css';
import logo from '../assets/images/logo1.png'; // Adjust the path as needed
import profilePicture from '../assets/images/profile.png'; // Adjust the path as needed

const TrafficPolice = () => {
  return (
    <div className="dashboard">
      <header className="header">
        <img src={logo} alt="Logo" className="logo" />
        <div className="user-info">
          <span>GALLE</span>
          <img src={profilePicture} alt="Profile" className="profile" />
          <button className="logout">Log Out</button>
        </div>
      </header>

      <aside className="sidebar">
        <img src={profilePicture} alt="Profile" className="profile-pic" />
        <p>A B C PERERA</p>
        <ul className="menu">
          <li>Dashboard</li>
          <li>Accidents on progress</li>
          <li>Accident Details</li>
          <li>Reports</li>
          <li>Analysis</li>
        </ul>
      </aside>

      <main className="main-content">
        <div className="stats">
          <div className="stat-card">TODAY ACCIDENTS 10</div>
          <div className="stat-card">Fatal Accidents 3</div>
          <div className="stat-card">Fatal Accidents 3</div>
          <div className="stat-card">Fatal Accidents 3</div>
        </div>
        <div className="charts">
          <img src="./assets/images/chart1.png" alt="Chart 1" />
          <img src="./assets/images/chart2.png" alt="Chart 2" />
          <img src="./assets/images/map.png" alt="Map" />
        </div>
      </main>
    </div>
  );
};

export default TrafficPolice; */

import React from 'react';
import '../assets/css/TrafficPolice.css';
import logo from '../assets/images/logo1.png'; // Adjust the path as needed
import profilePicture from '../assets/images/profile.png'; // Adjust the path as needed
import chart1 from '../assets/images/chart1.png';
import chart2 from '../assets/images/chart2.png';
import chart3 from '../assets/images/chart3.jpeg';
import map from '../assets/images/map.jpg';
import {Link} from 'react-router-dom';

const TrafficPolice = () => {
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
          <Link to="/traffic-police"><li className="dashboard">Dashboard</li></Link>
            <Link to="/OnProgress"><li>Accidents on progress</li></Link>
            <Link to="/Accident"><li>Accident Details</li></Link>
            <Link to="/Report"><li>Reports</li></Link>
            <Link to="/Analysis"><li>Analysis</li></Link>
          </ul>
        </aside>

<main className="main-content">
  <div className="stats">
  <div className="stat-card">
  <span className="stat-title">TODAY ACCIDENTS</span>
  <span className="stat-number">10</span>
</div>
<div className="stat-card">
  <span className="stat-title">Fatal Accidents</span>
  <span className="stat-number">3</span>
</div>
<div className="stat-card">
  <span className="stat-title">Fatal Accidents</span>
  <span className="stat-number">3</span>
</div>
<div className="stat-card">
  <span className="stat-title">Fatal Accidents</span>
  <span className="stat-number">3</span>
</div>
  </div>
  <div className="charts">
  <img src={chart3} alt="Chart 3" />
  <img src={map} alt="Map" />
    <img src={chart1} alt="Chart 1" />
    <img src={chart2} alt="Chart 2" />
    
  </div>
</main>
      </div>
    </div>
  );
};

export default TrafficPolice;

