// import React, { useState } from 'react';
// import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
// import { getFirestore, doc, setDoc } from 'firebase/firestore';
// import { app } from '../firebase';

// const SignUp = () => {
//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     password: '',
//     mobile_number: '',
//     nic: '',
//     police_id: '',
//     role: '',
//     station: '',
//     status: ''
//   });

//   const auth = getAuth(app);
//   const db = getFirestore(app);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
//       const user = userCredential.user;

//       await setDoc(doc(db, 'users', user.uid), {
//         name: form.name,
//         email: form.email,
//         mobile_number: form.mobile_number,
//         nic: form.nic,
//         police_id: form.police_id,
//         role: form.role,
//         station: form.station,
//         status: form.status
//       });

//       alert('User signed up successfully');
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>Name:</label>
//         <input type="text" name="name" value={form.name} onChange={handleChange} required />
//       </div>
//       <div>
//         <label>Email:</label>
//         <input type="email" name="email" value={form.email} onChange={handleChange} required />
//       </div>
//       <div>
//         <label>Password:</label>
//         <input type="password" name="password" value={form.password} onChange={handleChange} required />
//       </div>
//       <div>
//         <label>Mobile Number:</label>
//         <input type="text" name="mobile_number" value={form.mobile_number} onChange={handleChange} required />
//       </div>
//       <div>
//         <label>NIC:</label>
//         <input type="text" name="nic" value={form.nic} onChange={handleChange} required />
//       </div>
//       <div>
//         <label>Police ID:</label>
//         <input type="text" name="police_id" value={form.police_id} onChange={handleChange} required />
//       </div>
//       <div>
//         <label>Role:</label>
//         <select name="role" value={form.role} onChange={handleChange} required>
//           <option value="OneOne">OneOne</option>
//           <option value="OneOneHead">OneOneHead</option>
//           <option value="Traffic">Traffic</option>
//           <option value="TrafficHead">TrafficHead</option>
//           <option value="OIC">OIC</option>
//           <option value="Other">Other</option>
//         </select>
//       </div>
//       <div>
//         <label>Station:</label>
//         <input type="text" name="station" value={form.station} onChange={handleChange} required />
//       </div>
//       <div>
//         <label>Status:</label>
//         <input type="text" name="status" value={form.status} onChange={handleChange} required />
//       </div>
//       <button type="submit">Sign Up</button>
//     </form>
//   );
// };

// export default SignUp;

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";

const SignUp = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("OON");
  const [station, setStation] = useState("");
  const [nic, setNic] = useState("");
  const [error, setError] = useState("");

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
        nic
      });
      console.log("User created with role:", role);
    } catch (err) {
      setError(err.message);
    }
  };
  
  return (
    <div className="signup">
      <form onSubmit={handleSignup}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <input type="text" placeholder="NIC" value={nic} onChange={(e) => setNic(e.target.value)} required />
        <input type="text" placeholder="Station" value={station} onChange={(e) => setStation(e.target.value)} required />
        <select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="OON">OON</option>
          <option value="OONH">OONH</option>
          <option value="Traffic">Traffic</option>
          <option value="TrafficH">TrafficH</option>
          <option value="OIC">OIC</option>
          <option value="Other">Other</option>
          <option value="Admin">Admin</option>
        </select>
        <button type="submit">Sign Up</button>
        {error && <span className="error">{error}</span>}
      </form>
    </div>
  );
};

export default SignUp