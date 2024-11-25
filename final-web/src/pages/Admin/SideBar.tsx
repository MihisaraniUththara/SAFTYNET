import React, { useEffect, useState } from 'react';
import { FiHome, FiUsers, FiSettings, FiMenu, FiX, FiUserPlus } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo1.png';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';

const SidebarHeader: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string | null>(null);

  const navigate = useNavigate();

  const currentUser = auth.currentUser;


  // Save admin credentials (email and prompt for password to re-login later)
  const adminEmail = currentUser?.email;

  useEffect(() => {
    if(location.pathname !== '/admin/profile'){
      setActiveLink(location.pathname);
    }
  }, [location.pathname]);

    // Function to handle sign out
    const handleLogout = async () => {
      try {
        await signOut(auth);
        navigate("/"); // Redirect to home page after sign out
      } catch (error) {
        console.error("Sign-out error:", error);
      }
    };

  return (
    <div className="flex h-screen">

      {/* Sidebar */}
      <div
        className={`fixed top-16 left-0 h-[calc(100%-4rem)] w-64 bg-gray-800 text-white transform transition-transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } sm:translate-x-0 sm:relative sm:w-64`}
      >
        <nav className="flex flex-col p-4 space-y-6 mt-7">
          <Link
            to="/admin"
            className={`flex items-center space-x-3 p-2 rounded transition-colors ${
              activeLink === '/admin' ? 'bg-primary text-gray-800' : 'hover:bg-gray-700'
            }`}
            onClick={() => setActiveLink('/admin')}
          >
            <FiHome
              size={20}
              className={`transition-colors ${
                activeLink === '/admin' ? 'text-gray-800' : 'text-white'
              }`}
            />
            <span
              className={`transition-colors ${
                activeLink === '/admin' ? 'text-gray-800' : 'text-white'
              }`}
            >
              Home
            </span>
          </Link>
          <Link
            to="/admin/officerReg"
            className={`flex items-center space-x-3 p-2 rounded transition-colors ${
              activeLink === '/admin/officerReg' ? 'bg-primary text-gray-800' : 'hover:bg-gray-700'
            }`}
            onClick={() => setActiveLink('/admin/officerReg')}
          >
            <FiUserPlus
              size={20}
              className={`transition-colors ${
                activeLink === '/admin/officerReg' ? 'text-gray-800' : 'text-white'
              }`}
            />
            <span
              className={`transition-colors ${
                activeLink === '/admin/officerReg' ? 'text-gray-800' : 'text-white'
              }`}
            >
              Register Officers
            </span>
          </Link>
          <Link
            to="/admin/officers"
            className={`flex items-center space-x-3 p-2 rounded transition-colors ${
              activeLink === '/admin/officers' ? 'bg-primary text-gray-800' : 'hover:bg-gray-700'
            }`}
            onClick={() => setActiveLink('/admin/officers')}
          >
            <FiUsers
              size={20}
              className={`transition-colors ${
                activeLink === '/admin/officers' ? 'text-gray-800' : 'text-white'
              }`}
            />
            <span
              className={`transition-colors ${
                activeLink === '/admin/officers' ? 'text-gray-800' : 'text-white'
              }`}
            >
              Officers
            </span>
          </Link>
          <Link
            to="/admin/drivers"
            className={`flex items-center space-x-3 p-2 rounded transition-colors ${
              activeLink === '/admin/drivers' ? 'bg-primary text-gray-800' : 'hover:bg-gray-700'
            }`}
            onClick={() => setActiveLink('/admin/drivers')}
          >
            <FiUsers
              size={20}
              className={`transition-colors ${
                activeLink === '/admin/drivers' ? 'text-gray-800' : 'text-white'
              }`}
            />
            <span
              className={`transition-colors ${
                activeLink === '/admin/drivers' ? 'text-gray-800' : 'text-white'
              }`}
            >
              Drivers
            </span>
          </Link>
          <Link
            to="/admin/stations"
            className={`flex items-center space-x-3 p-2 rounded transition-colors ${
              activeLink === '/admin/stations' ? 'bg-primary text-gray-800' : 'hover:bg-gray-700'
            }`}
            onClick={() => setActiveLink('/admin/stations')}
          >
            <FiUsers
              size={20}
              className={`transition-colors ${
                activeLink === '/admin/stations' ? 'text-gray-800' : 'text-white'
              }`}
            />
            <span
              className={`transition-colors ${
                activeLink === '/admin/stations' ? 'text-gray-800' : 'text-white'
              }`}
            >
              Stations
            </span>
          </Link>
        </nav>
        <footer className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 text-center z-10">
          <p className="text-gray-400 text-xs">&copy; {new Date().getFullYear()} SafetyNet. All rights reserved.</p>
        </footer>
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-primary flex items-center justify-between p-4 shadow-md text-white z-10">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-white sm:hidden hover:bg-primary-dark p-2 rounded transition-colors"
          >
            {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
          <img
            src={logo}
            alt="logo"
            className="h-8 cursor-pointer rounded-lg transition-transform"
            onClick={() => navigate("/admin")}
          />
        </div>
        <nav className="hidden sm:flex items-center space-x-6">
          {/* <Link
            to="/admin"
            className="text-white text-lg font-semibold hover:text-primary-light transition-colors"
          >
            Home
          </Link> */}
          <Link
            to=""
            className="text-black text-lg font-semibold hover:text-primary-light transition-colors cursor-default"
          >
            {adminEmail}
          </Link>
          <Link
            to=""
            className=""
          >
            <button
              onClick={handleLogout}
              className="text-white text-base font-semibold hover:text-primary-light transition-colors border-2 p-1 px-2 rounded-lg bg-red-500"
            >
              Logout
            </button>
          </Link>
        </nav>
      </header>
    </div>
  );
};

export default SidebarHeader;
