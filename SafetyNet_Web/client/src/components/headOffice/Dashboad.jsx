import React from 'react';
import '../../assets/css/headoffice.css';
import logo from '../../assets/images/logo1.png'; // Adjust the path as needed
import profilePicture from '../../assets/images/profile.png'; // Adjust the path as needed
import chart1 from '../../assets/images/chart1.png';
import chart2 from '../../assets/images/chart2.png';
import chart3 from '../../assets/images/chart4.png';
import map from '../../assets/images/map1.png';

import {Link} from 'react-router-dom';
import Logout from '../../logout';

const HeadOffice = () => {
    return (
      <div className="dashboard-container">
        <header className="header">
        <img src={logo} alt="Logo" className="logo" />
          <div className="user-info">
            <img src={profilePicture} alt="Profile" className="profile" />
            <button className="logout" onClick={Logout}>Log Out</button>
          </div>
        </header>
  
        <div className="dashboard">
          <aside className="sidebar">
            
            <img src={profilePicture} alt="Profile" className="profile-pic" />
            <p className="user-name">A B C PERERA</p>
            <ul className="menu">
          <Link to="/HeadOffice" style={{textDecoration: 'none'}}><li className="dashboard">Dashboard</li></Link>
            <Link to="/HeadOffice/Accident" style={{textDecoration: 'none'}}><li>Accident Details</li></Link>
            <Link to="/HeadOffice/ReportApp" style={{textDecoration: 'none'}}><li>Report Approval</li></Link>
            <Link to="/HeadOffice/Report" style={{textDecoration: 'none'}}><li>Reports</li></Link>
            <Link to="/HeadOffice/Analysis" style={{textDecoration: 'none'}}><li>Analysis</li></Link>
            {/* <Link to="#" style={{textDecoration: 'none'}}><li>Announcement</li></Link> */}
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
  
  export default HeadOffice;
