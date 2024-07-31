import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import './officer.css';
import logo from '../../assets/images/logo1.png';
import profilePicture from '../../assets/images/profile.png';
import DriverData from './DriverData';

const AdminDrivers = () => {
  return (
    <div className="dashboard-container">
      <header className="header">
      <img src={logo} alt="Logo" className="logo" />
        <div className="user-info">
          {/* <span>GALLE</span> */}
          <img src={profilePicture} alt="Profile" className="profile" />
          <button className="logout">Log Out</button>
        </div>
      </header>

      <div className="dashboard">
        <aside className="sidebar">
          
          <img src={profilePicture} alt="Profile" className="profile-pic" />
          <p className="user-name">A B C PERERA</p>
          <ul className="menu">
          <Link to="/Admin-Dashboard" style={{textDecoration: 'none'}}><li>Dashboard</li></Link>
            <Link to="/SignUp" style={{textDecoration: 'none'}}><li>Officer Registration</li></Link>
            <Link to="/Admin/officer" style={{textDecoration: 'none'}}><li>Officers</li></Link>
            <Link to="/Report" style={{textDecoration: 'none'}}><li className="dashboard">Drivers</li></Link>
      
          </ul>
        </aside>
        
          <DriverData/>

      </div>
    </div>
  );
};

export default AdminDrivers