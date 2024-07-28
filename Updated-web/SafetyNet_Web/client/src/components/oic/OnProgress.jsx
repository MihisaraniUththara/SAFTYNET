import React from 'react';
import '../../assets/css/onProgress.css';
import logo from '../../assets/images/logo1.png'; // Adjust the path as needed
import profilePicture from '../../assets/images/profile.png'; // Adjust the path as needed

import {Link} from 'react-router-dom';

const OICOnProgress = () => {
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

{/* <main className="main-content">
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


</main> */}

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
      <br></br>
      <div className="notification">
        <p>A1108 accident has happened on 6.920265, 79.856830 location</p>
        <div className="notification-actions">
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: '60%' }}></div>
          </div>
          <button className="details-button">Details</button>
        </div>
      </div>
      <br></br>
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

export default OICOnProgress;