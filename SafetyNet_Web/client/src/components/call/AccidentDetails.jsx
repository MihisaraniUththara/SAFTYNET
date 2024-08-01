import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './call.css';
import logo from '../../assets/images/logo1.png';
import profilePicture from '../../assets/images/profile.png';

const AccidentDetails = () => {
  const location = useLocation();


  
  return (
    <div className="dashboard-container">
      <header className="header">
        <img src={logo} alt="Logo" className="logo" />
        <div className="user-info">
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
              to="/callOperator/ManageAccidents"
              className={`menu-item ${location.pathname === '/callOperator/ManageAccidents' ? 'active' : ''}`}
            >
              Manage Accidents
            </Link>
            <Link
              to="/callOperator/AccidentDetails"
              className={`menu-item ${location.pathname === '/callOperator/AccidentDetails' ? 'active' : ''}`}
            >
              Accident Details
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
        </main>
      </div>
    </div>
  );
};

export default AccidentDetails;
