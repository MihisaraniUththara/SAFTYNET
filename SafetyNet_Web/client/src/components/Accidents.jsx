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
          <main className="main-content">
          <div className="search-filter-container">
            <input type="text" placeholder="Search by Accident Number" className="search-bar" />
            <input type="text" placeholder="Search by Vehicle Number" className="search-bar" />
            <div className="date-filter">
              <label>From:</label>
              <input type="date" />
              <label>To:</label>
              <input type="date" />
            </div>
            <button className="filter-btn">Filter</button>
          </div>
          <table className="accident-table">
            <thead>
              <tr>
                <th>Accident Number</th>
                <th>Location</th>
                <th>Incharge</th>
                <th>Accident Type</th>
                <th>Status</th>
                <th>Option</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>A00158</td>
                <td>6.920265, 79.856830</td>
                <td>Officer A</td>
                <td>Minor</td>
                <td><span className="status completed">Completed</span></td>
                <td><button className="details-btn">Details</button></td>
              </tr>
              <tr>
                <td>A00025</td>
                <td>6.920265, 79.856830</td>
                <td>Officer B</td>
                <td>Major</td>
                <td><span className="status pending">Pending</span></td>
                <td><button className="details-btn">Details</button></td>
              </tr>
              <tr>
                <td>A00058</td>
                <td>6.920265, 79.856830</td>
                <td>Officer C</td>
                <td>Minor</td>
                <td><span className="status in-progress">In Progress</span></td>
                <td><button className="details-btn">Details</button></td>
              </tr>
            </tbody>
          </table>
        </main>
        </div>
      </div>
    );
  };
  
  export default Accident;