import React from 'react';
import '../../assets/css/TrafficPolice.css';
import logo from '../../assets/images/logo1.png'; // Adjust the path as needed
import profilePicture from '../../assets/images/profile.png'; // Adjust the path as needed
import chart1 from '../../assets/images/chart1.png';
import chart2 from '../../assets/images/chart2.png';
import chart3 from '../../assets/images/chart3.jpeg';
import map from '../../assets/images/map.jpg';
import {Link} from 'react-router-dom';

const Dashboad = () => {
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
                to="/oic/Dashboard"
                className={`menu-item ${location.pathname === '/oic/Dashboard' ? 'active' : ''}`}
              >
                Dashboard
              </Link>
              <Link
                to="/oic/OnProgress"
                className={`menu-item ${location.pathname === '/oic/OnProgress' ? 'active' : ''}`}
              >
                Accidents on Progress
              </Link>
              <Link
                to="/oic/Accident"
                className={`menu-item ${location.pathname === '/oic/Accident' ? 'active' : ''}`}
              >
                Accident Details
              </Link>
              <Link
                to="/oic/ReportApp"
                className={`menu-item ${location.pathname === '/oic/ReportApp' ? 'active' : ''}`}
              >
                Report Approval
              </Link>
              <Link
                to="#"
                className={`menu-item ${location.pathname === '#' ? 'active' : ''}`}
              >
                Reports
              </Link>
              <Link
                to="/oic/Analysis"
                className={`menu-item ${location.pathname === '/oic/Analysis' ? 'active' : ''}`}
              >
                Analysis
              </Link>
              <Link
                to="#"
                className={`menu-item ${location.pathname === '#' ? 'active' : ''}`}
              >
                Duty List
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

export default Dashboad;

