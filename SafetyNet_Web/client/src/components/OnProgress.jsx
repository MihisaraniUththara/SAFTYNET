import React from 'react';
import '../assets/css/new.css';
import logo from '../assets/images/logo1.png'; // Adjust the path as needed
import profilePicture from '../assets/images/profile.png'; // Adjust the path as needed

import {Link} from 'react-router-dom';

const OnProgress = () => {
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
          <Link to="/traffic-police" style={{textDecoration: 'none'}}><li>Dashboard</li></Link>
            <Link to="/OnProgress" style={{textDecoration: 'none'}}><li className = "dashboard">Accidents on Progress</li></Link>
            <Link to="/Accident" style={{textDecoration: 'none'}}><li>Accident Details</li></Link>
            <Link to="/Report" style={{textDecoration: 'none'}}><li>Reports</li></Link>
            <Link to="/Analysis" style={{textDecoration: 'none'}}><li>Analysis</li></Link>
          </ul>
        </aside>

        <main className="m-content">
  {/* <div className="notification-list">
    <div className="date-group">
      <h3>Today</h3>
      <div className="notification">
        <p>A1108 accident has happened on 6.920265, 79.856830 location</p>
        <div className="notification-actions">
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: '50%' }}></div>
          </div>
          <button className="details-button">Details</button>
        </div>
      </div>
      <br></br>
      <div className="notification">
        <p>A1108 accident has happened on 6.920265, 79.856830 location</p>
        <div className="notification-actions">
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: '60%' }}></div>
          </div>
          <button className="details-button">Details</button>
        </div>
      </div>
      <br></br>
      <div className="notification">
        <p>A1105 accident has happened on 6.920265, 79.856830 location</p>
        <div className="notification-actions">
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: '80%' }}></div>
          </div>
          <button className="details-button">Details</button>
        </div>
      </div>
    </div>
    <div className="date-group">
      <h3>Yesterday</h3>
      <div className="notification">
        <p>A1109 accident has happened on 6.920265, 79.856830 location</p>
        <div className="notification-actions">
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: '30%' }}></div>
          </div>
          <button className="details-button">Details</button>
        </div>
      </div>
      
    </div>
    
  </div> */}

<div className="nav">
      <a href="/OnProgress"  className='select-one'>All</a>
      <a href="/OnProgress/my-cases">My Cases</a>
    </div>

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

export default OnProgress;