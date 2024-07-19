import React from 'react';
import '../assets/css/accident.css';
import logo from '../assets/images/logo1.png'; // Adjust the path as needed
import profilePicture from '../assets/images/profile.png'; // Adjust the path as needed

import {Link} from 'react-router-dom';

const Report = () => {
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
            <Link to="/traffic-police"><li>Dashboard</li></Link>
              <Link to="/OnProgress"><li>Accidents on progress</li></Link>
              <Link to="/Accident"><li>Accident Details</li></Link>
              <Link to="/traffic-police"><li className = "dashboard">Reports</li></Link>
              <Link to="/Analysis"><li>Analysis</li></Link>
            </ul>
          </aside>
          <main className="main-content">
          <div className="buttons-container">
            <Link to="/accident-details"><button className="rect-button">Accident Details</button></Link>
            <br></br><Link to="/no-of-deaths"><button className="rect-button">No of deaths</button></Link>
            <br></br><Link to="/reasons-for-accidents"><button className="rect-button">Reasons for Accidents</button></Link>
            <br></br><Link to="/responsible-vehicles"><button className="rect-button">Responsible Vehicles for Accidents</button></Link>
            <br></br><Link to="/time-of-accidents"><button className="rect-button">Time of Accidents</button></Link>
            <br></br><Link to="/age-groups-involved"><button className="rect-button">Age Groups Involved in Accidents</button></Link>
            <br></br><Link to="/location-of-accidents"><button className="rect-button">Location of Accidents</button></Link>
            <br></br><Link to="/court-cases"><button className="rect-button">Court Cases</button></Link>
            <br></br><Link to="/severity-of-accident"><button className="rect-button">Severity of Accident</button></Link>
            <br></br><Link to="/others"><button className="rect-button">Others</button></Link>
          </div>
        </main>
        </div>
      </div>
    );
  };
  
  export default Report;