import React from 'react';
import '../assets/css/ReportApp.css';
import logo from '../assets/images/logo1.png'; // Adjust the path as needed
import profilePicture from '../assets/images/profile.png'; // Adjust the path as needed

import {Link} from 'react-router-dom';

const Report = () => {
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
            <div className="buttons-container">
              <div className="card-row">
                <Link to="/accident-details" className="card-link">
                  <button className="rect-button">Accident Details</button>
                </Link>
                <Link to="/no-of-deaths" className="card-link">
                  <button className="rect-button">No of Deaths</button>
                </Link>
                <Link to="/reasons-for-accidents" className="card-link">
                  <button className="rect-button">Reasons for Accidents</button>
                </Link>
                <Link to="/responsible-vehicles" className="card-link">
                  <button className="rect-button">Responsible Vehicles</button>
                </Link>
                <Link to="/time-of-accidents" className="card-link">
                  <button className="rect-button">Time of Accidents</button>
                </Link>
              </div>
              <div className="card-row">
                <Link to="/age-groups-involved" className="card-link">
                  <button className="rect-button">Age Groups Involved</button>
                </Link>
                <Link to="/location-of-accidents" className="card-link">
                  <button className="rect-button">Location of Accidents</button>
                </Link>
                <Link to="/court-cases" className="card-link">
                  <button className="rect-button">Court Cases</button>
                </Link>
                <Link to="/severity-of-accident" className="card-link">
                  <button className="rect-button">Severity of Accident</button>
                </Link>
                <Link to="/others" className="card-link">
                  <button className="rect-button">Others</button>
                </Link>
              </div>
            </div>
          </main>

        </div>
      </div>
    );
  };
  
  export default Report;