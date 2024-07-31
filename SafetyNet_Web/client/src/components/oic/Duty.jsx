// import React from 'react';
// import '../../assets/css/Duty.css';
// import logo from '../../assets/images/logo1.png'; // Adjust the path as needed
// import profilePicture from '../../assets/images/profile.png'; // Adjust the path as needed

// import {Link} from 'react-router-dom';

// const ReportApp = () => {
//     return (
//       <div className="dashboard-container">
//         <header className="header">
//         <img src={logo} alt="Logo" className="logo" />
//           <div className="user-info">
//             <span>GALLE</span>
//             <img src={profilePicture} alt="Profile" className="profile" />
//             <button className="logout">Log Out</button>
//           </div>
//         </header>
  
//         <div className="dashboard">
//           <aside className="sidebar">
            
//             <img src={profilePicture} alt="Profile" className="profile-pic" />
//             <p className="user-name">A B C PERERA</p>
//             <ul className="menu">
//           <Link to="/oic/Dashboad" style={{textDecoration: 'none'}}><li>Dashboard</li></Link>
//             <Link to="/oic/OnProgress" style={{textDecoration: 'none'}}><li>Accidents on progress</li></Link>
//             <Link to="/oic/Accident" style={{textDecoration: 'none'}}><li>Accident Details</li></Link>
//             <Link to="/oic/ReportApp" style={{textDecoration: 'none'}}><li>Report Approval</li></Link>
//             <Link to="#" style={{textDecoration: 'none'}}><li>Reports</li></Link>
//             <Link to="/oic/Analysis" style={{textDecoration: 'none'}}><li>Analysis</li></Link>
//             <Link to="/oic/Duty" style={{textDecoration: 'none'}}><li className="dashboard">Duty List</li></Link>
//           </ul>
//           </aside>
//           <main className="main-content">
//           <div className="topnav">
//       <a href="/oic/Duty" className='select-one'>Morning Shift</a>
//       <a href="/oic/DutyE">Evening Shift</a>
//       <a href="/oic/DutyN">Night Shift</a>
//     </div>
//           <table className="accident-table1">
//             <thead>
//               <tr>
//                 <th>Officer Name</th>
//                 <th>Officer Id</th>
//                 <th>Duty</th>
//                 <th>Option</th>
//               </tr>
//             </thead>
//             <tbody>
//             <tr>
//                 <td>A B C Perera</td>
//                 <td>12323</td>
//                 <td><button className="Approve1-btn">Assign to 119</button></td>
//                 <td><button className="Suspend-btn">Suspend</button>
//                 <button className="details-btn">Details</button></td>
//               </tr>
//               <tr>
//                 <td>A K weerasinghe</td>
//                 <td>56248</td>
//                 <td><button className="Approve-btn">Assign to 119</button></td>
//                 <td><button className="Suspend-btn">Suspend</button>
//                 <button className="details-btn">Details</button></td>
//               </tr>
//               <tr>
//                 <td>A S Wickramasinghe</td>
//                 <td>78452</td>
//                 <td><button className="Approve-btn">Assign to 119</button></td>
//                 <td><button className="Suspend-btn">Suspend</button>
//                 <button className="details-btn">Details</button></td>
//               </tr>
//               <tr>
//                 <td>D Perera</td>
//                 <td>12323</td>
//                 <td><button className="Approve1-btn">Assign to 119</button></td>
//                 <td><button className="Suspend-btn">Suspend</button>
//                 <button className="details-btn">Details</button></td>
//               </tr>
//               <tr>
//                 <td>K Mendis</td>
//                 <td>12323</td>
//                 <td><button className="Approve-btn">Assign to 119</button></td>
//                 <td><button className="Suspend-btn">Suspend</button>
//                 <button className="details-btn">Details</button></td>
//               </tr>
//             </tbody>
//           </table>
//           </main>
//           </div>
//       </div>
//     );
//   };
  
//   export default ReportApp;



import React, { useEffect, useState } from 'react';
import '../../assets/css/Duty.css';
import logo from '../../assets/images/logo1.png'; // Adjust the path as needed
import profilePicture from '../../assets/images/profile.png'; // Adjust the path as needed

import { Link } from 'react-router-dom';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';

const ReportApp = () => {
  const [officers, setOfficers] = useState([]);

  useEffect(() => {
    const fetchOfficers = async () => {
      const officersCollection = collection(db, 'police');
      const officerSnapshot = await getDocs(officersCollection);
      const officerList = officerSnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(officer => officer.role === 'OON' || officer.role === 'Traffic');
      setOfficers(officerList);
    };

    fetchOfficers();
  }, []);

  const handleApproval = async (id) => {
    const officerRef = doc(db, 'police', id);
    await updateDoc(officerRef, { status: true });
    setOfficers(officers.map(officer => officer.id === id ? { ...officer, status: true } : officer));

    setTimeout(async () => {
      await updateDoc(officerRef, { status: false });
      setOfficers(officers.map(officer => officer.id === id ? { ...officer, status: false } : officer));
    }, 24 * 60 * 60 * 1000); // 24 hours
  };

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
            <Link to="/oic/Dashboad" style={{ textDecoration: 'none' }}><li>Dashboard</li></Link>
            <Link to="/oic/OnProgress" style={{ textDecoration: 'none' }}><li>Accidents on progress</li></Link>
            <Link to="/oic/Accident" style={{ textDecoration: 'none' }}><li>Accident Details</li></Link>
            <Link to="/oic/ReportApp" style={{ textDecoration: 'none' }}><li>Report Approval</li></Link>
            <Link to="#" style={{ textDecoration: 'none' }}><li>Reports</li></Link>
            <Link to="/oic/Analysis" style={{ textDecoration: 'none' }}><li>Analysis</li></Link>
            <Link to="/oic/Duty" style={{ textDecoration: 'none' }}><li className="dashboard">Duty List</li></Link>
          </ul>
        </aside>
        <main className="main-content">
          <div className="topnav">
            <a href="/oic/Duty" className='select-one'>Morning Shift</a>
            <a href="/oic/DutyE">Evening Shift</a>
            <a href="/oic/DutyN">Night Shift</a>
          </div>
          <table className="accident-table1">
            <thead>
              <tr>
                <th>Officer Name</th>
                <th>Officer email</th>
                <th>Duty</th>
                <th>Option</th>
              </tr>
            </thead>
            <tbody>
              {officers.map((officer, index) => (
                <tr key={index}>
                  <td>{officer.name}</td>
                  <td>{officer.email}</td>
                  <td><button
                    className={officer.status ? "Approve1-btn green" : "Approve1-btn"}
                    onClick={() => handleApproval(officer.id)}
                  >
                    Assign to 119
                  </button></td>
                  <td>
                    <button className="Suspend-btn">Suspend</button>
                    <button className="details-btn">Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
};

export default ReportApp;

