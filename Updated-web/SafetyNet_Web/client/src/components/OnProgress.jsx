import React from 'react';
import '../assets/css/onProgress.css';
import logo from '../assets/images/logo1.png'; // Adjust the path as needed
import profilePicture from '../assets/images/profile.png'; // Adjust the path as needed
import { Link } from 'react-router-dom';

const OnProgress = () => {
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
          <div className="notification-list">
            <div className="date-group">
              <h3>Today</h3>
              <div className="notification">
                <p>A1108 accident has happened on 6.920265, 79.856830 location</p>
                <div className="notification-actions">
                  <div className="progress-bar-container">
                    <div className="progress-bar" style={{ width: '50%' }}></div>
                  </div>
                  <button className="details-button">Details</button>
                </div>
              </div>
              <br />
              <div className="notification">
                <p>A1108 accident has happened on 6.920265, 79.856830 location</p>
                <div className="notification-actions">
                  <div className="progress-bar-container">
                    <div className="progress-bar" style={{ width: '60%' }}></div>
                  </div>
                  <button className="details-button">Details</button>
                </div>
              </div>
              <br />
              <div className="notification">
                <p>A1105 accident has happened on 6.920265, 79.856830 location</p>
                <div className="notification-actions">
                  <div className="progress-bar-container">
                    <div className="progress-bar" style={{ width: '80%' }}></div>
                  </div>
                  <button className="details-button">Details</button>
                </div>
              </div>
            </div>
            <div className="date-group">
              <h3>Yesterday</h3>
              <div className="notification">
                <p>A1109 accident has happened on 6.920265, 79.856830 location</p>
                <div className="notification-actions">
                  <div className="progress-bar-container">
                    <div className="progress-bar" style={{ width: '30%' }}></div>
                  </div>
                  <button className="details-button">Details</button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OnProgress;
