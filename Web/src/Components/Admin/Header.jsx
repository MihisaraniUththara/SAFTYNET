import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import logo from '../assets/images/logo1.png';

export default function Header() {

  const location = useLocation();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function pathMatchRoute(route) {
    return window.location.pathname === route;
  }
  

  return (
    <div className="bg-primary border-b shadow-md sticky top-0 z-40 p-2 sm:p-4">
  <header className="flex flex-col sm:flex-row justify-between max-w-6xl">

    <div className="flex flex-row justify-between w-full">

    <img
        src={logo} // Update path as needed
        alt="logo"
        className={`h-12 cursor-pointer rounded-lg transition-transform transform`}
        onClick={() => navigate("/")}
      />

    <button 
      className="sm:hidden text-gray-600 hover:text-blue-500 focus:outline-none justify-end"
      onClick={() => setIsMenuOpen(!isMenuOpen)}
    >
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
      </svg>
    </button>

    </div>

    <nav className={`w-full justify-between ${isMenuOpen ? 'block' : 'hidden'} sm:block`}>
      <ul className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 w-full">
        <li
          className={`cursor-pointer py-2 px-4 text-sm font-semibold rounded-lg transition-colors ${
            pathMatchRoute("/") ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-500"
          }`}
          onClick={() => navigate("/")}
        >
          Home
        </li>
        <li
          className={`cursor-pointer py-2 px-4 text-sm font-semibold rounded-lg transition-colors ${
            pathMatchRoute("/aboutUs") ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-500"
          }`}
          onClick={() => navigate("/aboutUs")}
        >
          About Us
        </li>
        <li
          className={`cursor-pointer py-2 px-4 text-sm font-semibold rounded-lg transition-colors ${
            pathMatchRoute("/profile") ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-500"
          }`}
          onClick={() => navigate("/contactUs")}
        >
          Contact Us
        </li>
      </ul>
    </nav>
  </header>
</div>
  );
}
