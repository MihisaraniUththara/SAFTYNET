import React from 'react';
import '../../assets/css/report.css';
import logo from '../../assets/images/logo1.png'; // Adjust the path as needed
import profilePicture from '../../assets/images/profile.png'; // Adjust the path as needed

import { Link } from 'react-router-dom';
import StatCard from '../StatCard';
import Logout from '../../logout';

const Report = () => {

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
          <Link to="/HeadOffice" style={{textDecoration: 'none'}}><li>Dashboard</li></Link>
            <Link to="/HeadOffice/Accident" style={{textDecoration: 'none'}}><li>Accident Details</li></Link>
            <Link to="/HeadOffice/ReportApp" style={{textDecoration: 'none'}}><li className="dashboard">Report Approval</li></Link>
            <Link to="/oic/Report" style={{textDecoration: 'none'}}><li>Reports</li></Link>
            <Link to="/HeadOffice/Analysis" style={{textDecoration: 'none'}}><li>Analysis</li></Link>
            {/* <Link to="#" style={{textDecoration: 'none'}}><li>Announcement</li></Link> */}
          </ul>
        </aside>
        <main className='major-container'>
          <div className="topnav1">
            <a href="/oic/Report" className='select-one'>No Of Accidents</a>
            <a href="/Report/type">No Of Deaths</a>
            <a href="/Report/type/type">Court Cases</a>
          </div>
<center>
          <div className="stat-cards-container">
          <StatCard title="Police ID">
              <input type="text" placeholder="Type a string (e.g., 14856)" />
            </StatCard>

            <StatCard title="Vehicle Number">
              <input type="text" placeholder="Type a string (e.g., PG4014)" />
            </StatCard>

          
            <StatCard title="Year">
              <select className='choice'>
                <option value="">From</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
              </select>
              <select className='choice'>
                <option value="">To</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="All">Last Five Years</option>

              </select>
            </StatCard>

            <StatCard title="Accident Class">
              <select className='choice'>
                <option value="class1">Fatal</option>
                <option value="class2">Grievous</option>
                <option value="class3">Non-Grievous</option>
                <option value="class4">Damage Only</option>
              </select>
            </StatCard>

            <StatCard title="Vehicle Type">
              <select className='choice'>
                <option value="car">Car</option>
                <option value="dual-purpose">Dual Purpose Vehicle</option>
                <option value="lorry">Lorry</option>
                <option value="cycle">Cycle</option>
                <option value="motor-cycle">Motor Cycle</option>
                <option value="three-wheeler">Three Wheeler</option>
                <option value="sltb-bus">SLTB Bus</option>
                <option value="private-bus">Private Bus</option>
              </select>
            </StatCard>

            <StatCard title="Age">
              <select className='choice'>
                <option value="age1">18-25</option>
                <option value="age2">26-35</option>
                <option value="age3">36-45</option>
                <option value="age4">46-55</option>
                <option value="age5">56-65</option>
                <option value="age6">66 or Older </option>
                <option value="age7">Below 18</option>
                <option value="age8">Below 50 </option>
                <option value="age9">Above 50 </option>
              </select>
            </StatCard>


            <StatCard title="Day of Week">
              <select className='choice'>
                <option value="sunday">Sunday</option>
                <option value="monday">Monday</option>
                <option value="tuesday">Tuesday</option>
                <option value="wednesday">Wednesday</option>
                <option value="thursday">Thursday</option>
                <option value="friday">Friday</option>
                <option value="saturday">Saturday</option>
                <option value="week">Week Days</option>
                <option value="weekend">Weekend Days</option>
              </select>
            </StatCard>

            <StatCard title="Hour">
              <select className='choice'>
                <option value="">From</option>
                <option value="1">12 </option>
                <option value="2">1</option>
                <option value="3">2</option>
                <option value="4">3</option>
                <option value="5">4</option>
                <option value="6">5</option>
                <option value="7">6</option>
                <option value="8">7</option>
                <option value="9">8</option>
                <option value="10">9</option>
                <option value="11">10</option>
                <option value="12">11</option>
              </select>
              <select>
                <option value="am">AM</option>

                <option value="pm">PM</option>
              </select>
              
              <select className='choice'>
                <option value="">To</option>
                <option value="1">12 </option>
                <option value="2">1</option>
                <option value="3">2</option>
                <option value="4">3</option>
                <option value="5">4</option>
                <option value="6">5</option>
                <option value="7">6</option>
                <option value="8">7</option>
                <option value="9">8</option>
                <option value="10">9</option>
                <option value="11">10</option>
                <option value="12">11</option>

              </select>
              <select>
                <option value="am">AM</option>

                <option value="pm">PM</option>
              </select>
              
            </StatCard>

            <StatCard title="Reason For Accident">
              <select className='choice'>
                <option value="sunday">Speeding</option>
                <option value="monday">Aggresive or Negligent Driving</option>
                <option value="tuesday">Alchohol or Drug</option>
                <option value="wednesday">Distracted</option>
                <option value="thursday">Poor Eye Site</option>
                <option value="friday">Sudden Illness</option>
                <option value="saturday">Sun or Blinded by Othr Vehicle</option>
                <option value="week">Disobey</option>
                <option value="weekend">Unexpected Incidednts</option>
                <option value="road">Road Condition</option>
                <option value="michanical">Poor mechanical Condition</option>
              </select>
            </StatCard>
            
            
          </div>

          </center>
          
        </main>
      </div>
    </div>
  );
};

export default Report;
