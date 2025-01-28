import React, { useContext, useState } from 'react'
import logo from './../assets/Images/logo1.png';
import {signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../firebase';
import { getDoc, doc, getDocs, collection, where, query } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './../Context/AuthContext';

const Login = () => {
    const [error, setError] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate()

    const {dispatch} = useContext(AuthContext)

    // const handleLogin = async (e) => {
    //     e.preventDefault();
    //     setError(false); // Reset error state before attempting login
    //     try {
    //         const userCredential = await signInWithEmailAndPassword(auth, email, password);
    //         const user = userCredential.user;
    //         const userDoc = await getDoc(doc(db, "police", user.uid));
    //         if (userDoc.exists()) {
    //           const userData = userDoc.data();
    //           console.log("User role:", userData.role);
    //           dispatch({type:"LOGIN", payload:user})
    //           // Redirect user based on role
    //           switch (userData.role) {
    //             case "Admin":
    //               navigate("/Admin");
    //               break;
    //             case "OON":
    //               navigate("/Traffic");
    //               break;
    //             case "OONH":
    //               navigate("/Traffic");
    //               break;
    //             case "Traffic":
    //               navigate("/Traffic");
    //               break;
    //             case "TrafficH":
    //               navigate("/Head");
    //               break;
    //             case "OIC":
    //               navigate("/oic");
    //               break;
    //             case "Other":
    //               setError(true);
    //               console.log("Other role")
    //               break;
    //             default:
    //                 setError(true);
    //                 console.log("Unknown role");
    //                 break;
    //           }
    //         } else {
    //           console.log("No such document!");
    //           setError(true); //new change
    //         }
    //         setError(false);
    //       } catch (err) {
    //         setError(true);
    //       }
        
    // };


    const handleLogin = async (e) => {
      e.preventDefault();
      setError(false);
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
    
        // Query the `police` collection for a document where officerID and NIC match
        const q = query(collection(db, "police"), where("email", "==", email));
        const querySnapshot = await getDocs(q);
    
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            const userData = doc.data();
            console.log("User role:", userData.role);
            dispatch({ type: "LOGIN", payload: user });
    
            // Navigate based on role
            switch (userData.role) {
              case "Admin":
                navigate("/Admin");
                break;
              case "OON":
              case "OONH":
              case "Traffic":
                navigate("/Traffic");
                break;
              case "TrafficH":
                navigate("/Head");
                break;
              case "OIC":
                navigate("/oic");
                break;
              case "Other":
                setError(true);
                console.log("Other role");
                break;
              default:
                setError(true);
                console.log("Unknown role");
                break;
            }
          });
        } else {
          console.log("No document found!");
          setError(true);
        }
      } catch (err) {
        console.error(err);
        setError(true);
      }
    };

    
  return (
    <div  className='bg-neutral-100 h-screen w-screen justify-center'>
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-16 w-auto" src={logo} alt="logo"/>
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleLogin}>
                    <div>
                        <label for="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
                        <div className="mt-2">
                            <input id="email" name="email" type="email" autocomplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow sm:text-sm/6" onChange={e=>setEmail(e.target.value)}/>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label for="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-yellow hover:text-yellow-button">Forgot password?</a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input id="password" name="password" type="password" autocomplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow sm:text-sm/6" onChange={e=>setPassword(e.target.value)}/>
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-yellow px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-yellow-button focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow">Sign in</button>
                    </div>
                </form>
                {error && <span className='text-red-600 mt-10 text-center text-sm/6'>Wrong Email or Password!</span>}

            </div>
           
        </div>
    </div>
  )
}

export default Login
