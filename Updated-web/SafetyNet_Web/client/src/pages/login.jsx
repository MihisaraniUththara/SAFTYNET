// import { useState } from "react";
// import { useNavigate } from 'react-router-dom';
// import "./login.css";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth, db } from "../firebase";
// import { getDoc, doc } from "firebase/firestore";

// const Login = () => {
//   const [error, setError] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;
//       const userDoc = await getDoc(doc(db, "police", user.uid));
//       if (userDoc.exists()) {
//         const userData = userDoc.data();
//         console.log("User role:", userData.role);
//         // Redirect user based on role
//         switch (userData.role) {
//           case "Admin":
//             navigate("/Admin-Dashboard");
//             break;
//           case "OON":
//             navigate("/../components/HomePage");
//             break;
//           case "OONH":
//             navigate("/../components/HomePage");
//             break;
//           case "Traffic":
//             navigate("/traffic-police");
//             break;
//           case "TrafficH":
//             navigate("/HeadOffice");
//             break;
//           case "OIC":
//             navigate("/oic/Dashboad");
//             break;
//           case "Other":
//             navigate("/../components/HomePage");
//             break;
//           default:
//             console.log("Unknown role");
//             break;
//         }
//       } else {
//         console.log("No such document!");
//       }
//       setError(false);
//     } catch (err) {
//       setError(true);
//     }
//   };

//   return (
//     <div className="login">
//       <form onSubmit={handleLogin}>
//         {error && <span className="error">Wrong email or password</span>}
//         <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//         <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };


// //   const navigate = useNavigate();

// //   const handleLogin = (e) => {
// //     e.preventDefault();

// //     signInWithEmailAndPassword(auth, email, password)
// //       .then((userCredential) => {
// //         // Signed in 
// //         const user = userCredential.user;
// //         navigate("")
// //         // Clear error state if login is successful
// //         setError(false);
// //       })
// //       .catch((error) => {
// //         // Set error state if login fails
// //         setError(true);
// //       });
// //   };

// //   return (
// //     <div className="login">
// //       <form onSubmit={handleLogin}>
// //         {error && <span className="error">Wrong email or password</span>}
// //         <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
// //         <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
// //         <button type="submit">Login</button>
// //       </form>
// //     </div>
// //   );
// // };

// export default Login;


import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { getDoc, doc } from "firebase/firestore";

const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userDoc = await getDoc(doc(db, "police", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log("User role:", userData.role);
        // Redirect user based on role
        switch (userData.role) {
          case "Admin":
            navigate("/Admin-Dashboard");
            break;
          case "OON":
          case "OONH":
          case "Other":
            navigate("/../components/HomePage");
            break;
          case "Traffic":
            navigate("/traffic-police");
            break;
          case "TrafficH":
            navigate("/HeadOffice");
            break;
          case "OIC":
            navigate("/oic/Dashboad");
            break;
          default:
            console.log("Unknown role");
            break;
        }
      } else {
        console.log("No such document!");
      }
      setError(false);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className={`container ${isSignUp ? "active" : ""}`} id="container">
      {/* Sign Up Form */}
      <div className="form-container sign-up">
        <form>
          <h1>Create Account</h1>
          <span>or use your email for registration</span>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button type="button">Sign Up</button>
        </form>
      </div>

      {/* Sign In Form */}
      <div className="form-container sign-in">
        <form onSubmit={handleLogin}>
          <h1>Sign In</h1>
          <span>or use your email and password</span>
          {error && <span className="error">Wrong email or password</span>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <a href="#">Forget Your Password?</a>
          <button type="submit">Sign In</button>
        </form>
      </div>

      {/* Toggle Container */}
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all of site features</p>
            <button  onClick={() => setIsSignUp(false)}>Sign In</button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Hello, Friend!</h1>
            <p>Register with your personal details to use all of site features</p>
            <button onClick={() => setIsSignUp(true)}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
