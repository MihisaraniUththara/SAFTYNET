import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../assets/css/TrafficPolice.css';
import logo from '../assets/images/logo1.png';
import profilePicture from '../assets/images/profile.png';
import chart1 from '../assets/images/chart1.png';
import chart2 from '../assets/images/chart2.png';
import chart3 from '../assets/images/chart4.png';
import map from '../assets/images/map.jpg';

const TrafficPolice = () => {
  const location = useLocation();

  return (
    <div className="dashboard-container">
      <header className="header">
        <img src={logo} alt="Logo" className="logo" />
        <div className="user-info">
          <span className="location">GALLE</span>
          <img src={profilePicture} alt="Profile" className="profile" />
          <button className="logout">Log Out</button>
        </div>
      </header>

      <div className="dashboard">
        <aside className="sidebar">
          <img src={profilePicture} alt="Profile" className="profile-pic" />
          <p className="user-name">A B C PERERA</p>
          <ul className="menu">
            <Link
              to="/traffic-police"
              className={`menu-item ${location.pathname === '/traffic-police' ? 'active' : ''}`}
            >
              Dashboard
            </Link>
            <Link
              to="/OnProgress"
              className={`menu-item ${location.pathname === '/OnProgress' ? 'active' : ''}`}
            >
              Accidents on Progress
            </Link>
            <Link
              to="/Accident"
              className={`menu-item ${location.pathname === '/Accident' ? 'active' : ''}`}
            >
              Accident Details
            </Link>
            <Link
              to="/Report"
              className={`menu-item ${location.pathname === '/Report' ? 'active' : ''}`}
            >
              Reports
            </Link>
            <Link
              to="/Analysis"
              className={`menu-item ${location.pathname === '/Analysis' ? 'active' : ''}`}
            >
              Analysis
            </Link>
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
            <img src={chart3} alt="Chart 3" className="chart-img" />
            <img src={map} alt="Map" className="map-img" />
            <img src={chart1} alt="Chart 1" className="chart-img" />
            <img src={chart2} alt="Chart 2" className="chart-img" />
          </div>
        </main>
      </div>
    </div>
  );
};

export default TrafficPolice;
