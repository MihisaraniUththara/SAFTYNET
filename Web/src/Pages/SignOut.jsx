import {React, useContext} from 'react';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from './../firebase';
import { HiOutlineLogout } from 'react-icons/hi'
import { AuthContext } from '../Context/AuthContext';

const SignOut = () => {
    const navigate = useNavigate();
    const {dispatch} = useContext(AuthContext);

    const handleLogout = async () => {
    //   try {
    //     await signOut(auth);
    //     // Navigate to the login page
    //     navigate('/login');
    //   } catch (error) {
    //     console.error('Error logging out:', error);
    //   }
    // };
    dispatch({ type: 'LOGOUT' }); // Dispatch LOGOUT action
    navigate('/login'); // Navigate to the login page
  };

  return (
    <div
      onClick={handleLogout}
      className="cursor-pointer text-red-500 flex items-center gap-3 font-medium px-3 py-5 hover:bg-yellow-button hover:no-underline active:bg-neutral-600 rounded-sm text-base"
    >
      <span className="text-xl">
        <HiOutlineLogout />
      </span>
      Logout
    </div>
  )
}

export default SignOut



