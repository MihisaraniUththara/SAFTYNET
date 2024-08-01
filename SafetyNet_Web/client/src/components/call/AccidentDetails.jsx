import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './call.css';
import logo from '../../assets/images/logo1.png';
import profilePicture from '../../assets/images/profile.png';
import Logout from '../../logout';

const AccidentDetails = () => {
  const location = useLocation();


  
  return (
    <div className="dashboard-container">
      <header className="header">
        <img src={logo} alt="Logo" className="logo" />
        <div className="user-info">
          <img src={profilePicture} alt="Profile" className="profile" />
          <button className="logout"onClick={Logout}>Log Out</button>
        </div>
      </header>

      <div className="dashboard">
        <aside className="sidebar">
          <img src={profilePicture} alt="Profile" className="profile-pic" />
          <p className="user-name">A B C PERERA</p>
          <ul className="menu">
          <Link to="/Manage" style={{textDecoration: 'none'}}><li>Manage Accidents</li></Link>
            <Link to="/All" style={{textDecoration: 'none'}}><li className="dashboard">Accident Details</li></Link>
            {/* <Link to="/HeadOffice/ReportApp" style={{textDecoration: 'none'}}><li>Report Approval</li></Link>
            <Link to="" style={{textDecoration: 'none'}}><li>Reports</li></Link>
            <Link to="/HeadOffice/Analysis" style={{textDecoration: 'none'}}><li>Analysis</li></Link> */}
            {/* <Link to="#" style={{textDecoration: 'none'}}><li>Announcement</li></Link> */}
          </ul>
        </aside>

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

export default AccidentDetails;
