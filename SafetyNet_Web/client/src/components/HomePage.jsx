import React from 'react';
import '../assets/css/HomePage.css'; 
import image from '../assets/images/img.png';
import logo from '../assets/images/logo1.png';
import {Link} from 'react-router-dom';


const HomePage = () => {
  return (
    <div>
      <header>
          <img src={logo} alt="SafetyNet Logo" />
          <nav>
              <a href="#home">Home</a>
              <a href="#about">About Us</a>
              <a href="#contact">Contact Us</a>
          </nav>
      </header>
      <main>
        <div className="content">
          <div className="text">
            <h1>Increase Your Productivity!</h1>
            <p><br></br>Reporting and Analyzing data can be a complex. We are here to make it Simple and much Better.<br></br></p>
            
            <br></br>
            <Link to="/login"><button>Sign In</button></Link>
          </div>
          <div className="image">
            <img src={image} alt="Police" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
