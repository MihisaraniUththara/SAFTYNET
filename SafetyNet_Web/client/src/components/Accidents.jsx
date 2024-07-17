import React from 'react';
import '../assets/css/accident.css';
import logo from '../assets/images/logo1.png'; // Adjust the path as needed
import profilePicture from '../assets/images/profile.png'; // Adjust the path as needed

import {Link} from 'react-router-dom';

const Accident = () => {
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
              <Link to="/traffic-police"><li className = "dashboard">Accident Details</li></Link>
              <Link to="/traffic-police"><li>Reports</li></Link>
              <Link to="/traffic-police"><li>Analysis</li></Link>
            </ul>
          </aside>
  
  
  
        </div>
      </div>
    );
  };
  
  export default Accident;