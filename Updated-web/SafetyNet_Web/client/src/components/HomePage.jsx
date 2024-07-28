import React from 'react';
import '../assets/css/HomePage.css'; 
import image from '../assets/images/img1.png';
import logo from '../assets/images/logo1.png';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HomePage = () => {
  return (
    <div>
      <header>
        <div className="logo">
          <motion.img 
            src={logo} 
            alt="SafetyNet Logo" 
            whileHover={{ scale: 1.1 }}
          />
        </div>
        <nav>
          <Link to="#home">
            <i className="fas fa-home"></i>
            <span>Home</span>
          </Link>
          <Link to="#about">
            <i className="fas fa-info-circle"></i>
            <span>About Us</span>
          </Link>
          <Link to="#contact">
            <i className="fas fa-envelope"></i>
            <span>Contact Us</span>
          </Link>
        </nav>
      </header>
      <main>
        <div className="content">
          <motion.div
            className="text"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h1>Increase Your Productivity!</h1>
            <p>Reporting and Analyzing data can be complex. We are here to make it Simple and much Better.</p>
            <Link to="/login">
              <button type="button" className="button">Sign In</button>
            </Link>
            <p></p>
            <p>or, Don't have an account?</p>
            <Link to="/SignUp">
              <button type="button" className="sign-up-button">Sign Up</button>
            </Link>
          </motion.div>
          <motion.div
            className="image"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <img src={image} alt="Police" />
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
