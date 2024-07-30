import React from 'react';
import '../../assets/css/onProgress.css';
import logo from '../../assets/images/logo1.png'; // Adjust the path as needed
import profilePicture from '../../assets/images/profile.png'; // Adjust the path as needed

import {Link} from 'react-router-dom';

const OICOnProgress = () => {
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
            <Link to="/oic/OnProgress" style={{textDecoration: 'none'}}><li className="dashboard">Accidents on progress</li></Link>
            <Link to="/oic/Accident" style={{textDecoration: 'none'}}><li>Accident Details</li></Link>
            <Link to="/oic/ReportApp" style={{textDecoration: 'none'}}><li>Report Approval</li></Link>
            <Link to="#" style={{textDecoration: 'none'}}><li>Reports</li></Link>
            <Link to="/oic/Analysis" style={{textDecoration: 'none'}}><li>Analysis</li></Link>
            <Link to="/oic/Duty" style={{textDecoration: 'none'}}><li>Duty List</li></Link>
          </ul>
        </aside>

{/* <main className="main-content">
<div className="ui-design">
    <div className="date-group">
      <h3>2024/06/29</h3>
      <div className="ui-row">
        <div className="ui-cell">A00158</div>
        <div className="ui-cell">6.920265, 79.856830</div>
        <div className="ui-cell ui-status n-a">N/A</div>
        <div className="ui-cell ui-action in-charge">In-charge</div>
        <div className="ui-cell ui-action details">Details</div>
      </div>
      <div className="ui-row">
        <div className="ui-cell">A00025</div>
        <div className="ui-cell">6.920265, 79.856830</div>
        <div className="ui-cell ui-status pending">Pending</div>
        <div className="ui-cell ui-action in-charge">In-charge</div>
        <div className="ui-cell ui-action details">Details</div>
      </div>
      <div className="ui-row">
        <div className="ui-cell">A00058</div>
        <div className="ui-cell">6.920265, 79.856830</div>
        <div className="ui-cell ui-status completed">Completed</div>
        <div className="ui-cell ui-action in-charge">In-charge</div>
        <div className="ui-cell ui-action details">Details</div>
      </div>
      <div className="ui-row">
        <div className="ui-cell">A00112</div>
        <div className="ui-cell">6.920265, 79.856830</div>
        <div className="ui-cell ui-status approved">Approved</div>
        <div className="ui-cell ui-action in-charge">In-charge</div>
        <div className="ui-cell ui-action details">Details</div>
      </div>
    </div>

    <div className="date-group">
      <h3>2024/06/28</h3>
      <div className="ui-row">
        <div className="ui-cell">A00148</div>
        <div className="ui-cell">6.920265, 79.856830</div>
        <div className="ui-cell ui-status completed">Completed</div>
        <div className="ui-cell ui-action in-charge">In-charge</div>
        <div className="ui-cell ui-action details">Details</div>
      </div>
      <div className="ui-row">
        <div className="ui-cell">A00111</div>
        <div className="ui-cell">6.920265, 79.856830</div>
        <div className="ui-cell ui-status completed">Completed</div>
        <div className="ui-cell ui-action in-charge">In-charge</div>
        <div className="ui-cell ui-action details">Details</div>
      </div>
    </div>
  </div>


</main> */}

<main className="main-content">
<table className="accident-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Accident ID</th>
                <th>Incharge Officer</th>
                <th>Status</th>
                <th>Progress</th>
                <th>Option</th>
              </tr>
            </thead>
            <tbody>
             <tr>
              <td>27/07/2024</td>
              <td>A2341</td>
              <td>A B C Perera</td>
              <td><span className="status pending">Pending</span></td>
              <td> <div className='progress-cell'><div className="progress-bar-container">
            <div className="progress-bar" style={{ width: '40%' }}></div>
          </div></div></td>
              <td><button className="details-btn">Details</button></td>
             </tr>
             <tr>
              <td>27/07/2024</td>
              <td>A2241</td>
              <td>K Perera</td>
              <td><span className="status pending">Pending</span></td>
              <td> <div className='progress-cell'><div className="progress-bar-container">
            <div className="progress-bar" style={{ width: '30%' }}></div>
          </div></div></td>
              <td><button className="details-btn">Details</button></td>
             </tr>
             <tr>
              <td>27/07/2024</td>
              <td>A2111</td>
              <td>w Hasaranga</td>
              <td><span className="status in-progress">In Progress</span></td>
              <td> <div className='progress-cell'><div className="progress-bar-container">
            <div className="progress-bar" style={{ width: '50%' }}></div>
          </div></div></td>
              <td><button className="details-btn">Details</button></td>
             </tr>
             <tr>
              <td>26/07/2024</td>
              <td>A1917</td>
              <td>K Perera</td>
              <td><span className="status completed">Completed</span></td>
              <td> <div className='progress-cell'><div className="progress-bar-container">
            <div className="progress-bar" style={{ width: '100%' }}></div>
          </div></div></td>
              <td><button className="details-btn">Details</button></td>
             </tr>
             <tr>
              <td>26/07/2024</td>
              <td>A1817</td>
              <td>A B C Perera</td>
              <td><span className="status completed">Completed</span></td>
              <td> <div className='progress-cell'><div className="progress-bar-container">
            <div className="progress-bar" style={{ width: '100%' }}></div>
          </div></div></td>
              <td><button className="details-btn">Details</button></td>
             </tr>
            </tbody>
            </table>

</main>


      </div>
    </div>
  );
};

export default OICOnProgress;