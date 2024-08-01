import React from 'react';
import '../../assets/css/Analysis.css';
import logo from '../../assets/images/logo1.png'; // Adjust the path as needed
import profilePicture from '../../assets/images/profile.png'; // Adjust the path as needed

import chart1 from '../../assets/images/vehicle.png';
import chart2 from '../../assets/images/fetal.png';
import chart3 from '../../assets/images/pie.png';
import chart4 from '../../assets/images/chart1.png';
import chart5 from '../../assets/images/chart2.png';
import chart6 from '../../assets/images/chart4.png';

import {Link} from 'react-router-dom';
import Logout from '../../logout';


const Analysis = () => {
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
          <Link to="/HeadOffice" style={{textDecoration: 'none'}}><li>Dashboard</li></Link>
            <Link to="/HeadOffice/Accident" style={{textDecoration: 'none'}}><li>Accident Details</li></Link>
            <Link to="/HeadOffice/ReportApp" style={{textDecoration: 'none'}}><li>Report Approval</li></Link>
            <Link to="/HeadOffice/Report" style={{textDecoration: 'none'}}><li>Reports</li></Link>
            <Link to="/HeadOffice/Analysis" style={{textDecoration: 'none'}}><li className="dashboard">Analysis</li></Link>
            {/* <Link to="#" style={{textDecoration: 'none'}}><li>Announcement</li></Link> */}
          </ul>
          </aside>
          <main className="main-content">

          <div className="filters">
    <div className="filter-group">
      <select>
        <option value="">Select One</option>
        <option value="year">Year</option>
        <option value="age">Age</option>
        <option value="vehicleType">Vehicle Type</option>
        <option value="time">Time</option>
        <option value="day">Day</option>
        <option value="location">Location</option>
      </select>
      <select>
      <option value="">Select One</option>
        <option value="accident">Accident</option>
        <option value="accidentType">Accident Type</option>
        <option value="deaths">Deaths</option>
        <option value="courtCases">Court Cases</option>
      </select>
      <button className="filter-button">Filter</button>
    </div>
  </div>


          <div className="charts-container">
            <img src={chart1} alt="Chart 1" className="chart" />
            <img src={chart2} alt="Chart 2" className="chart" />
            <img src={chart3} alt="Chart 3" className="chart" />
            <img src={chart4} alt="Chart 4" className="chart" />
            <img src={chart5} alt="Chart 5" className="chart" />
            <img src={chart6} alt="Chart 6" className="chart" />
          </div>
        </main>
          </div>
      </div>
    );
  };
  
  export default Analysis;