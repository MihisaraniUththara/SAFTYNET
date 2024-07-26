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
          <Link to="/oic/Dashboad" style={{textDecoration: 'none'}}><li>Dashboard</li></Link>
            <Link to="/oic/OnProgress" style={{textDecoration: 'none'}}><li className="dashboard">Accidents on progress</li></Link>
            <Link to="/oic/Accident" style={{textDecoration: 'none'}}><li>Accident Details</li></Link>
            <Link to="/oic/ReportApp" style={{textDecoration: 'none'}}><li>Report Approval</li></Link>
            <Link to="#" style={{textDecoration: 'none'}}><li>Reports</li></Link>
            <Link to="/oic/Analysis" style={{textDecoration: 'none'}}><li>Analysis</li></Link>
            <Link to="#" style={{textDecoration: 'none'}}><li>Duty List</li></Link>
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