import React from 'react';
import image from '../assets/images/img1.png';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const HomePage: React.FC = () => {
  return (
    <>
    <Header/>
    <main className="flex justify-center items-center p-8">
        <div className="flex flex-row items-center justify-between max-w-screen-xl w-full p-4 bg-gradient-to-br from-white to-[#f0f4f7] shadow-lg rounded-2xl text-center">
          <div className="flex-1 p-4">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Increase Your Productivity!</h1>
            <p className="text-lg text-gray-600 mb-4">Reporting and Analyzing data can be complex. We are here to make it Simple and much Better.</p>
            <Link to="/sign-in">
              <button 
                type="button" 
                className="inline-block px-6 py-3 rounded-full text-black font-bold text-base bg-gradient-to-r from-yellow-300 to-yellow-500 shadow-lg transition-colors duration-300 hover:from-yellow-400 hover:to-yellow-600 hover:text-white w-1/2"
              >
                Sign In
              </button>
            </Link>
            <p className="my-4">or, Don't have an account?</p>
            <Link to="/sign-up">
              <button 
                type="button" 
                className="inline-block px-6 py-3 rounded-full text-white font-bold text-base bg-gradient-to-r from-yellow-500 to-yellow-300 shadow-lg transition-colors duration-300 hover:from-yellow-600 hover:to-yellow-400 hover:text-black w-1/2"
              >
                Sign Up
              </button>
            </Link>
          </div>
          <div className="flex-1 justify-center w-full mt-6 hidden sm:block">
            <img src={image} alt="Police" className="w-full max-w-lg rounded-2xl" />
          </div>
        </div>
    </main>
    <footer className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 text-center z-10">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} SafetyNet. All rights reserved.</p>
    </footer>
    </>

  );
};

export default HomePage;
