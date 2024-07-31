/* import React from 'react';
import '../assets/css/LoginPage.css';

const LoginPage = () => {
  return (
    <div className="login-container">
      <h1>Login</h1>
      <form>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required />

        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default LoginPage; */
/* 
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../services/axiosConfig';
import '../assets/css/LoginPage.css';
import logo from '../assets/images/logo.png';
import mainImage from '../assets/images/main.png';
/* import {Link} from 'react-router-dom'; */


/*const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      localStorage.setItem('token', response.data.token); // Store token in local storage
      navigate('/traffic-police'); // Redirect to desired page upon successful login
    } catch (error) {
      console.error('Login error:', error);
      // Handle error (show error message, etc.)
    }
  };

  return (
    <div className="login-page">
      <div className="background">
        <img src={mainImage} alt="Background" className="main-image" />
      </div>
      <div className="login-container">
        <div className="image-section">
          <img src={logo} alt="SafetyNet Logo" />
        </div>
        <div className="form-section">
          <h1><center>LOGIN</center></h1>
          <form onSubmit={handleSignIn}>
            <label htmlFor="email">Email</label>
            {/* <input type="email" id="email" placeholder="Value" required /> }*/
           /* <input type="email" id="email" placeholder="Enter your email" value={email} onChange={onChange} required />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter your password" value={password} onChange={onChange} required />
            <button type="submit">Sign In</button>
            
          </form>
          <a href="#forgot-password"><br></br>Forgot password?</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; */


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../services/axiosConfig';
import '../assets/css/LoginPage.css';
import logo from '../assets/images/logo.png';
import mainImage from '../assets/images/main.png';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post('/api/auth/login', {
        email,
        password,
      });

      localStorage.setItem('token', response.data.token); // Store token in local storage
      navigate('/traffic-police'); // Redirect to desired page upon successful login
    } catch (error) {
      console.error('Login error:', error);
      // Handle error (show error message, etc.)
    }
  };

  return (
    <div className="login-page">
      <div className="background">
        <img src={mainImage} alt="Background" className="main-image" />
      </div>
      <div className="login-container">
        <div className="image-section">
          <img src={logo} alt="SafetyNet Logo" />
        </div>
        <div className="form-section">
          <h1><center>LOGIN</center></h1>
        

          <form>
            <input type="email" placeholder="email"/>
            <input type="password" placeholder="password"/>
          </form>
          <a href="#forgot-password">Forgot password?</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

