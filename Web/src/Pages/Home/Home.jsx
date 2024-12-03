// import React from 'react'
// import Header from './../../Components/Header'
// // import Text from './Text'

// const Home = () => {
//   return (
//     <div className='bg-white h-screen w-screen '>
//         <Header/>
//         <div className='text-black'>
//           hellooooooooooooooooooooooooo</div>
        
//     </div>
//   )
// }

// export default Home



import React from 'react';
import Header from './../../Components/Header';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login'); // Update this path based on your routing setup
  };

  return (
    <div className="bg-white h-screen w-screen">
      <Header />
      <div className="flex items-center justify-between h-full px-10">
        {/* Left Side: Text and Button */}
        <div className="text-black max-w-md">
          <h1 className="text-4xl font-bold mb-4">Increase Your Productivity!</h1>
          <p className="text-lg mb-6">
            Reporting and Analyzing data can be complex. We are here to make it simple and much better.
          </p>
          <button
            onClick={handleLoginRedirect}
            className="px-6 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition"
          >
            Login
          </button>
        </div>

        {/* Right Side: Image */}
        <div>
          <img
            src="/path-to-your-image.png"
            alt="Police illustration"
            className="w-80 h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
