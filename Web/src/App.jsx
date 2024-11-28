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
import OicLayout from './Pages/Oic/Layout'
import OicDashboad from './Pages/Oic/Dashboad'
import HeadLayout from './Pages/Head/Layout'
import HeadDashboad from './Pages/Head/Dashboad'
import HeadAccidentProgress from './Pages/Head/AccidentProgress'
import HeadAccidentDetails from './Pages/Head/AccidentDetails'
import HeadReportSubmit from './Pages/Head/ReportSubmit'
import HeadAnalysis from './Pages/Head/Analysis'
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
        <Route path='Oic' element={<RequireAuth><OicLayout /></RequireAuth>}>
          <Route index element={<RequireAuth><OicDashboad /></RequireAuth>} />
        </Route>
        <Route path='Head' element={<RequireAuth><HeadLayout /></RequireAuth>}>
          <Route index element={<RequireAuth><HeadDashboad /></RequireAuth>} />
          <Route path='AccidentProgress' element={<RequireAuth><HeadAccidentProgress/></RequireAuth>}/>
          <Route path='AccidentDetails' element={<RequireAuth><HeadAccidentDetails/></RequireAuth>}/>
          <Route path='ReportSubmit' element={<RequireAuth><HeadReportSubmit/></RequireAuth>}/>
          <Route path='Analysis' element={<RequireAuth><HeadAnalysis/></RequireAuth>}/>
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>,
   
    </div>
      
  )
}

export default App
