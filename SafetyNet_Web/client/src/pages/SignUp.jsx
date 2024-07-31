

// import { useState } from "react";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth, db } from "../firebase";
// import "./signup.css";
// import { setDoc, doc } from "firebase/firestore";
// import logo from '../assets/images/logo1.png';
// import profilePicture from '../assets/images/profile.png';
// import {Link} from 'react-router-dom';

// const SignUp = () => {

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("");
//   const [station, setStation] = useState("");
//   const [nic, setNic] = useState("");
//   const [error, setError] = useState("");

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;
//       // Save additional user info in Firestore
//       await setDoc(doc(db, "police", user.uid), {
//         name,
//         email,
//         role,
//         station,
//         nic
//       });
//       console.log("User created with role:", role);
//     } catch (err) {
//       setError(err.message);
//     }
//   };
  
//   return (

//     <div className="dashboard-container">
//       <header className="header">
//       <img src={logo} alt="Logo" className="logo" />
//         <div className="user-info">
//           <span>GALLE</span>
//           <img src={profilePicture} alt="Profile" className="profile" />
//           <button className="logout">Log Out</button>
//         </div>
//       </header>
//       <div className="dashboard">
//         <aside className="sidebar">
          
//           <img src={profilePicture} alt="Profile" className="profile-pic" />
//           <p className="user-name">A B C PERERA</p>
//           <ul className="menu">
//           <Link to="/" style={{textDecoration: 'none'}}><li>Dashboard</li></Link>
//             <Link to="/" style={{textDecoration: 'none'}}><li className="dashboard">Officer Registration</li></Link>
//             <Link to="/" style={{textDecoration: 'none'}}><li>Officers</li></Link>
//             <Link to="/" style={{textDecoration: 'none'}}><li>Drivers</li></Link>
//             {/* <Link to="/Analysis" style={{textDecoration: 'none'}}><li>Analysis</li></Link> */}
//           </ul>
//         </aside>

//         <main className="main-content">

//     <div className="signup">
//       <form onSubmit={handleSignup}>
//         <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
//         <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//         <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//         <input type="text" placeholder="NIC" value={nic} onChange={(e) => setNic(e.target.value)} required />
        
//         <input type="text" placeholder="Station" value={station} onChange={(e) => setStation(e.target.value)} required />
//         <select value={role} onChange={(e) => setRole(e.target.value)} required>
//           <option value="">Select Relevent Role</option>
//           <option value="OON">119 Unit</option>
//           <option value="OONH">119 Head Office</option>
//           <option value="Traffic">Traffic Police Unit</option>
//           <option value="TrafficH">Traffic Police Head Office</option>
//           <option value="OIC">OIC</option>
          
//         </select>
//         <button type="submit">Sign Up</button>
//         {error && <span className="error">{error}</span>}
//       </form>
//     </div>
//     </main>
//     </div>
//     </div>
//   );
// };

// export default SignUp


import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import "./signup.css";
import { setDoc, doc } from "firebase/firestore";
import logo from '../assets/images/logo1.png';
import profilePicture from '../assets/images/profile.png';
import { Link } from 'react-router-dom';

const SignUp = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [station, setStation] = useState("");
  const [nic, setNic] = useState("");
  const [badgeNumber, setBadgeNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // Save additional user info in Firestore
      await setDoc(doc(db, "police", user.uid), {
        name,
        email,
        role,
        station,
        nic,
        badgeNumber,
        phoneNumber
      });
      setSuccess("Register Successful");
      setTimeout(() => {
        window.location.reload();
      }, 2000); // Reloads the page after 2 seconds
    } catch (err) {
      setError(err.message);
    }
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
            <Link to="/Admin-Dashboard" style={{textDecoration: 'none'}}><li>Dashboard</li></Link>
            <Link to="/SignUp" style={{textDecoration: 'none'}}><li className="dashboard">Officer Registration</li></Link>
            <Link to="/Admin/officer" style={{textDecoration: 'none'}}><li>Officers</li></Link>
            <Link to="/" style={{textDecoration: 'none'}}><li>Drivers</li></Link>
            {/* <Link to="/Analysis" style={{textDecoration: 'none'}}><li>Analysis</li></Link> */}
          </ul>
        </aside>
        <main className="main-content">
          <div className="signup">
            <form onSubmit={handleSignup}>
              <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <input type="text" placeholder="NIC" value={nic} onChange={(e) => setNic(e.target.value)} required />
              <input type="text" placeholder="Badge Number" value={badgeNumber} onChange={(e) => setBadgeNumber(e.target.value)} required pattern="[0-9]*" />
              <input type="text" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
              <input type="text" placeholder="Station" value={station} onChange={(e) => setStation(e.target.value)} required />
              <select value={role} onChange={(e) => setRole(e.target.value)} required>
                <option value="">Select Relevant Role</option>
                <option value="OON">119 Unit</option>
                <option value="OONH">119 Head Office</option>
                <option value="Traffic">Traffic Police Unit</option>
                <option value="TrafficH">Traffic Police Head Office</option>
                <option value="OIC">OIC</option>
              </select>
              <button type="submit">Sign Up</button>
              {error && <span className="error">{error}</span>}
              {success && <span className="success">{success}</span>}
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SignUp;
