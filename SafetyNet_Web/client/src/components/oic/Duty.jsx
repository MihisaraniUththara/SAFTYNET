import React from 'react';
import '../../assets/css/ReportApp.css';
import logo from '../../assets/images/logo1.png'; // Adjust the path as needed
import profilePicture from '../../assets/images/profile.png'; // Adjust the path as needed

import {Link} from 'react-router-dom';

const ReportApp = () => {
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
            <Link to="/oic/OnProgress" style={{textDecoration: 'none'}}><li>Accidents on progress</li></Link>
            <Link to="/oic/Accident" style={{textDecoration: 'none'}}><li>Accident Details</li></Link>
            <Link to="/oic/ReportApp" style={{textDecoration: 'none'}}><li>Report Approval</li></Link>
            <Link to="#" style={{textDecoration: 'none'}}><li>Reports</li></Link>
            <Link to="/oic/Analysis" style={{textDecoration: 'none'}}><li>Analysis</li></Link>
            <Link to="#" style={{textDecoration: 'none'}}><li className="dashboard">Duty List</li></Link>
          </ul>
          </aside>
          <main className="main-content">
          <table className="accident-table1">
            <thead>
              <tr>
                <th>Accident Number</th>
                <th>Location</th>
                <th>Incharge</th>
                <th>Accident Type</th>
                <th>Option</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>A00158</td>
                <td>6.920265, 79.856830</td>
                <td>Officer A</td>
                <td>Minor</td>
                <td><button className="Approve-btn">Approve</button>
                <button className="Reject-btn">Reject</button>
                <button className="details-btn">Details</button></td>
              </tr>
              <tr>
                <td>A00025</td>
                <td>6.920265, 79.856830</td>
                <td>Officer B</td>
                <td>Major</td>
                <td><button className="Approve-btn">Approve</button>
                <button className="Reject-btn">Reject</button>
                <button className="details-btn">Details</button></td>
              </tr>
              <tr>
                <td>A00058</td>
                <td>6.920265, 79.856830</td>
                <td>Officer C</td>
                <td>Minor</td>
                <td><button className="Approve-btn">Approve</button>
                <button className="Reject-btn">Reject</button>
                <button className="details-btn">Details</button></td>
              </tr>
            </tbody>
          </table>
          </main>
          </div>
      </div>
    );
  };
  
  export default ReportApp;