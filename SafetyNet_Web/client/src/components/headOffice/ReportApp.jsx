import React from 'react';
import '../../assets/css/ReportApp.css';
import logo from '../../assets/images/logo1.png'; // Adjust the path as needed
import profilePicture from '../../assets/images/profile.png'; // Adjust the path as needed

import {Link} from 'react-router-dom';
import Logout from '../../logout';

const ReportApp = () => {
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
            <Link to="/HeadOffice/ReportApp" style={{textDecoration: 'none'}}><li className="dashboard">Report Approval</li></Link>
            <Link to="#" style={{textDecoration: 'none'}}><li>Reports</li></Link>
            <Link to="/HeadOffice/Analysis" style={{textDecoration: 'none'}}><li>Analysis</li></Link>
            {/* <Link to="#" style={{textDecoration: 'none'}}><li>Announcement</li></Link> */}
          </ul>
          </aside>
          <main className="main-content">
          <div className="search-filter-container">
            <input type="text" placeholder="Search by Station" className="search-bar" />
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
                <th>Station</th>
                <th>Approved OIC</th>
                <th>Accident Type</th>
                <th>Option</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>A00158</td>
                <td>6.920265, 79.856830</td>
                <td>Officer A</td>
                <td>Galle</td>
                <td>A B C Perera</td>
                <td>Minor</td>
                <td><button className="details-btn">Details</button>
                <button className="Approve-btn">Approve</button>
                <button className="Reject-btn">Reject</button></td>
              </tr>
              <tr>
                <td>A00025</td>
                <td>6.920265, 79.856830</td>
                <td>Officer B</td>
                <td>Bambalapitiya</td>
                <td>S R Ranathunge</td>
                <td>Major</td>
                <td><button className="details-btn">Details</button>
                <button className="Approve-btn">Approve</button>
                <button className="Reject-btn">Reject</button></td>
              </tr>
              <tr>
                <td>A00058</td>
                <td>6.920265, 79.856830</td>
                <td>Officer C</td>
                <td>Matara</td>
                <td>S A Weerasinghe</td>
                <td>Minor</td>
                <td><button className="details-btn">Details</button>
                <button className="Approve-btn">Approve</button>
                <button className="Reject-btn">Reject</button></td>
              </tr>
            </tbody>
          </table>
        </main>
        </div>
      </div>
    );
  };
  
  export default ReportApp;