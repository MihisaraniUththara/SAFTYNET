import React from 'react';
import './dashboad.css';
import logo from '../../assets/images/logo1.png'; // Adjust the path as needed
import profilePicture from '../../assets/images/profile.png'; // Adjust the path as needed
// import chart1 from '../assets/images/chart1.png';
// import chart2 from '../assets/images/chart2.png';
// import chart3 from '../assets/images/chart4.png';
// import map from '../assets/images/map.jpg';
import {Link} from 'react-router-dom';

const Dashboad = () => {
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
          <Link to="/Admin-Dashboard" style={{textDecoration: 'none'}}><li className="dashboard" >Dashboard</li></Link>
            <Link to="/SignUp" style={{textDecoration: 'none'}}><li>Officer Registration</li></Link>
            <Link to="#" style={{textDecoration: 'none'}}><li>Complaint Handling</li></Link>
            <Link to="/Report" style={{textDecoration: 'none'}}><li>Reports</li></Link>
            <Link to="/Analysis" style={{textDecoration: 'none'}}><li>Analysis</li></Link>
          </ul>
        </aside>

<main className="main-content">
  <div className="stats">
  <div className="stat-card">
  <span className="stat-title">Drivers</span>
  <span className="stat-number">90</span>
</div>
<div className="stat-card">
  <span className="stat-title">Accidents in Last Month</span>
  <span className="stat-number">30</span>
</div>
<div className="stat-card">
  <span className="stat-title">Police Officers</span>
  <span className="stat-number">3</span>
</div>
<div className="stat-card">
  <span className="stat-title">Suspends</span>
  <span className="stat-number">3</span>
</div>
  </div>
  <div className="charts">
  {/* <img src={chart3} alt="Chart 3" />
  <img src={map} alt="Map" />
    <img src={chart1} alt="Chart 1" />
    <img src={chart2} alt="Chart 2" /> */}
    
  </div>
</main>
      </div>
    </div>
  );
};

export default Dashboad;

