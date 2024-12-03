import React from 'react';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 text-center z-10">
      <p className="text-gray-400">&copy; {new Date().getFullYear()} SafetyNet. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
