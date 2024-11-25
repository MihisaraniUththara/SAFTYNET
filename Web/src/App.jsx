import { Children, useContext, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Header from './Components/Header'
import Slider from './Components/Slider'
import Home from './Pages/Home/Home'
import Login from './Pages/Login'
import TrafficLayout from './Pages/Traffic/Layout'
import TrafficDashboad from './Pages/Traffic/Dashboad'
import TrafficAccidentProgress from './Pages/Traffic/AccidentProgress'
import TrafficAccidentProgressAll from './Pages/Traffic/AccidentProgressAll'
import TrafficAccidentProgressMyCases from './Pages/Traffic/AccidentProgressMyCases'
import OICD from './Pages/Oic/Dashboad'
import { AuthContext } from './Context/AuthContext';



function App() {

  const {currentUser} = useContext(AuthContext)

  const RequireAuth = ({children}) => {
    return currentUser ? (children) : <Navigate to="/Login" />;
  };

  

  console.log(currentUser)

  return (
    <div className='App'>
    <BrowserRouter>
    <Routes>
      <Route path='/'>
        <Route index element={<Home/>} />
        <Route path='Login' element={<Login />} />
        <Route path='Traffic' element={<RequireAuth><TrafficLayout /></RequireAuth>}>
          <Route index element={<RequireAuth><TrafficDashboad /></RequireAuth>} />
          <Route path='AccidentProgress' element={<RequireAuth><TrafficAccidentProgress /></RequireAuth>}> 
            <Route index element={<TrafficAccidentProgressAll/>} />
            <Route path='mycases' element={<TrafficAccidentProgressMyCases/>} />
          </Route>
        </Route>
      <Route path='oic' element={<RequireAuth><OICD/></RequireAuth>}/>
      </Route>
    </Routes>
  </BrowserRouter>,
   
    </div>
      
  )
}

export default App
