import React from 'react';
import '../../assets/css/Duty.css';
import logo from '../../assets/images/logo1.png'; // Adjust the path as needed
import profilePicture from '../../assets/images/profile.png'; // Adjust the path as needed

import {Link} from 'react-router-dom';
import Logout from '../../logout';

const DutyE = () => {
    return (
      <div className="dashboard-container">
        <header className="header">
        <img src={logo} alt="Logo" className="logo" />
          <div className="user-info">
            <span>GALLE</span>
            <img src={profilePicture} alt="Profile" className="profile" />
            <button className="logout" onClick={Logout}>Log Out</button>
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
            <Link to="/oic/Duty" style={{textDecoration: 'none'}}><li className="dashboard">Duty List</li></Link>
          </ul>
          </aside>
          <main className="main-content">
          <div className="topnav">
      <a href="/oic/Duty">Morning Shift</a>
      <a href="/oic/DutyE" className='select-one'>Evening Shift</a>
      <a href="/oic/DutyN">Night Shift</a>
    </div>
          <table className="accident-table1">
            <thead>
              <tr>
                <th>Officer Name</th>
                <th>Officer Id</th>
            
                <th>Duty</th>
                <th>Option</th>
              </tr>
            </thead>
            <tbody>
            <tr>
                <td>A B C Perera</td>
                <td>12323</td>
                
                <td><button className="Approve-btn">Assign to 119</button></td>
                <td><button className="Suspend-btn">Suspend</button>
                <button className="details-btn">Details</button></td>
              </tr>
              <tr>
                <td>A K weerasinghe</td>
                <td>56248</td>
                <td><button className="Approve-btn">Assign to 119</button></td>
                <td><button className="Suspend-btn">Suspend</button>
                <button className="details-btn">Details</button></td>
              </tr>
              <tr>
                <td>A S Wickramasinghe</td>
                <td>78452</td>
                <td><button className="Approve-btn">Assign to 119</button></td>
                <td><button className="Suspend-btn">Suspend</button>
                <button className="details-btn">Details</button></td>
              </tr>
              <tr>
                <td>D Perera</td>
                <td>12323</td>
                <td><button className="Approve-btn">Assign to 119</button></td>
                <td><button className="Suspend-btn">Suspend</button>
                <button className="details-btn">Details</button></td>
              </tr>
              <tr>
                <td>K Mendis</td>
                <td>12323</td>
                <td><button className="Approve-btn">Assign to 119</button></td>
                <td><button className="Suspend-btn">Suspend</button>
                <button className="details-btn">Details</button></td>
              </tr>
            </tbody>
          </table>
          </main>
          </div>
      </div>
    );
  };
  
  export default DutyE;