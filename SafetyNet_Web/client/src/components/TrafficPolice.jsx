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
    </div>
  );
};

export default TrafficPolice;

