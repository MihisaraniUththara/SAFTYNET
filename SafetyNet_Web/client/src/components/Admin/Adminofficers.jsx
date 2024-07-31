import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './officer.css';
import logo from '../../assets/images/logo1.png';
import profilePicture from '../../assets/images/profile.png';
import OfficersData from './officersData';
import Logout from '../../logout';

const AdminOfficers = () => {

  return (
    <div className="dashboard-container">
      <header className="header">
      <img src={logo} alt="Logo" className="logo" />
        <div className="user-info">
          {/* <span>GALLE</span> */}
          <img src={profilePicture} alt="Profile" className="profile" />
          <button className="logout" onClick={Logout}>Log Out</button>
        </div>
      </header>

      <div className="dashboard">
        <aside className="sidebar">
          
          <img src={profilePicture} alt="Profile" className="profile-pic" />
          <p className="user-name">A B C PERERA</p>
          <ul className="menu">
          <Link to="/Admin-Dashboard" style={{textDecoration: 'none'}}><li>Dashboard</li></Link>
            <Link to="/SignUp" style={{textDecoration: 'none'}}><li>Officer Registration</li></Link>
            <Link to="/Admin/officer" style={{textDecoration: 'none'}}><li className="dashboard">Officers</li></Link>
            <Link to="/Admin/Driver" style={{textDecoration: 'none'}}><li>Drivers</li></Link>
      
          </ul>
        </aside>
        
          <OfficersData/>

      </div>
    </div>
  );
};

export default AdminOfficers;
