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

import React from 'react';
import '../assets/css/LoginPage.css';
import logo from '../assets/images/logo.png';
import mainImage from '../assets/images/main.png';

const LoginPage = () => {
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
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Value" required />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Value" required />

            <button type="submit">Sign In</button>
          </form>
          <a href="#forgot-password"><br></br>Forgot password?</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
