// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axiosInstance from '../services/axiosConfig';
// import '../assets/css/LoginPage.css';
// import logo from '../assets/images/logo.png';
// import mainImage from '../assets/images/main.png';

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   const { email, password } = formData;

//   const onChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleSignIn = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axiosInstance.post('/api/auth/login', {
//         email,
//         password,
//       });

//       localStorage.setItem('token', response.data.token); // Store token in local storage
//       navigate('/traffic-police'); // Redirect to desired page upon successful login
//     } catch (error) {
//       console.error('Login error:', error);
//       // Handle error (show error message, etc.)
//     }
//   };

//   return (
//     <div className="container">
//       <div className="toggle-container">
//         <div className="toggle"></div>
//       </div>
//       <div className="form-container">
//         <div className="sign-in">
//           <div className="toggle-panel toggle-left">
//             <h2>Welcome Back!</h2>
//             <p>Please sign in to continue.</p>
//             <form onSubmit={handleSignIn}>
//               <input
//                 type="email"
//                 id="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={onChange}
//                 required
//               />
//               <input
//                 type="password"
//                 id="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={onChange}
//                 required
//               />
//               <button type="submit">Sign In</button>
//             </form>
//             <a href="#forgot-password">Forgot password?</a>
//           </div>
//           <div className="toggle-panel toggle-right">
//             <h2>Join Us</h2>
//             <p>Don't have an account? Sign up now!</p>
//             <button className="hidden" onClick={() => navigate('/signup')}>
//               Sign Up
//             </button>
//           </div>
//         </div>
//         <div className="image-section">
//           <img src={logo} alt="SafetyNet Logo" />
//         </div>
//       </div>
//       <div className="social-icons">
//         {/* Add social media icons if needed */}
//       </div>
//     </div>
//   );
// };

// export default LoginPage;




import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/LoginPage.css'; // Make sure this CSS file includes your styles
import logo from '../assets/images/logo.png';
import mainImage from '../assets/images/main.png';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '', // Added for signup
  });

  const { email, password, name } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      // Add your login logic here
      navigate('/traffic-police'); // Redirect upon successful login
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      // Add your signup logic here
      navigate('/traffic-police'); // Redirect upon successful signup
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <div className="container" id="container">
      <div className="form-container sign-up">
        <form onSubmit={handleSignUp}>
          <h1>Create Account</h1>
          <div className="social-icons">
            <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
          </div>
          <span>or use your email for registration</span>
          <input type="text" id="name" placeholder="Name" value={name} onChange={onChange} required />
          <input type="email" id="email" placeholder="Email" value={email} onChange={onChange} required />
          <input type="password" id="password" placeholder="Password" value={password} onChange={onChange} required />
          <button type="submit">Sign Up</button>
        </form>
      </div>
      <div className="form-container sign-in">
        <form onSubmit={handleSignIn}>
          <h1>Sign In</h1>
          <div className="social-icons">
            <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
          </div>
          <span>or use your email and password</span>
          <input type="email" id="email" placeholder="Email" value={email} onChange={onChange} required />
          <input type="password" id="password" placeholder="Password" value={password} onChange={onChange} required />
          <a href="#">Forgot Your Password?</a>
          <button type="submit">Sign In</button>
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all of site features</p>
            <button className="hidden" id="login">Sign In</button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Hello, Friend!</h1>
            <p>Register with your personal details to use all of site features</p>
            <button className="hidden" id="register">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
