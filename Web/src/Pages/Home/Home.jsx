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



// import React from 'react';
// import Header from './../../Components/Header';
// import { useNavigate } from 'react-router-dom';
// import image from './../../../src/assets/Images/img.png'
// import logo2 from './../../../src/assets/Images/logo.png'

// const Home = () => {
//   const navigate = useNavigate();

//   const handleLoginRedirect = () => {
//     navigate('/login'); // Update this path based on your routing setup
//   };

//   return (
//     <div className="bg-white h-screen w-screen">
//       <Header />
//       <div className="flex items-center justify-between h-full px-10">
//         {/* Left Side: Text and Button */}
//         <div className="text-black max-w-md text-center ml-20">
//           <div><img src={logo2}/></div>
//           <button
//             onClick={handleLoginRedirect}
//             className="px-6 py-2 bg-yellow-button text-black font-medium rounded hover:bg-yellow transition mt-10"
//           >
//             Login
//           </button>
//         </div>

//         {/* Right Side: Image */}
//         <div>
//           <img
//             src={image}
//             alt="Police illustration"
//             className="w-250 h-auto pr-20"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;


import React from 'react';
import './Home.css'; 
import Header from './../../Components/Header';
import image from './../../assets/Images/img.png';
import {Link} from 'react-router-dom';


const Home = () => {
  return (
    <div>
      <Header/>
          
      <main className='bg-white w-screen h-screen'>
        <div className="content bg-white w-screen h-screen">
          <div className="text">
            <h1 className='font-mono text-black text-center'>STOP ACCIDENTS BEFORE THEY STOP YOU!</h1>
            <p><br></br>To Provide Innovative Solutions That Enhance Road Safety And Simplify Accident Management.<br></br></p>
            
            <br></br>
            <Link to="/login" style={{textDecoration: 'none'}}><button>Sign In</button></Link>
          </div>
          <div className="image">
            <img src={image} alt="Police" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
