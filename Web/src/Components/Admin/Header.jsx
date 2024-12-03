import React from 'react';

const Header = () => {
  return (
    <header className="bg-white p-4 flex items-center justify-between shadow-md">
      {/* <div className="text-black text-lg font-bold">
        Admin Dashboard
      </div> */}
      <div className="text-right">
        <p className="text-black text-sm font-medium">
          Logged in as: <span className="font-bold">admin@gmail.com</span>
        </p>
        {/* <p className="text-black text-sm">
          Last Login: <span className="font-bold">2024-12-03 10:00 AM</span>
        </p> */}
      </div>
    </header>
  );
};

export default Header;
