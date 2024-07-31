import React, { useEffect, useState } from 'react';
import '../assets/css/accident.css';
import logo from '../assets/images/logo1.png'; // Adjust the path as needed
import profilePicture from '../assets/images/profile.png'; // Adjust the path as needed
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const Accident = () => {
  const [accidents, setAccidents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const accidentCollection = collection(db, 'accidents');
      const accidentSnapshot = await getDocs(accidentCollection);
      const accidentList = accidentSnapshot.docs.map(doc => ({ A_id: doc.A_id, ...doc.data() }));
      setAccidents(accidentList);
    };

    fetchData();
  }, []);

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
            <Link to="/traffic-police" style={{ textDecoration: 'none' }}><li>Dashboard</li></Link>
            <Link to="/OnProgress" style={{ textDecoration: 'none' }}><li>Accidents on progress</li></Link>
            <Link to="/Accident" style={{ textDecoration: 'none' }}><li className="dashboard">Accident Details</li></Link>
            <Link to="/Report" style={{ textDecoration: 'none' }}><li>Reports</li></Link>
            <Link to="/Analysis" style={{ textDecoration: 'none' }}><li>Analysis</li></Link>
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
              {accidents.map(accident => (
                <tr key={accident.A_id}>
                  <td>{accident.A5}</td> {/* Adjust according to your field names */}
                  <td>{accident.A11}</td> {/* Adjust according to your field names */}
                  <td>{accident.p_id}</td> {/* Adjust according to your field names */}
                  <td>{accident.A6}</td> {/* Adjust according to your field names */}
                  <td>
                    {/* <span className={`status ${accident.status1 === false ? 'completed' : 'in-progress'}`}>
                      {accident.statusoic === false ? 'Completed' : 'In Progress'}
                    </span> */}
                  </td>
                  <td><button className="details-btn">Details</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
};

export default Accident;
