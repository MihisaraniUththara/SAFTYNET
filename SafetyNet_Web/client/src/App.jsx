import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";
import HomePage from "./components/HomePage";
import LoginPage from './pages/login';
import SignUp from './pages/SignUp';
import TrafficPolice from './components/TrafficPolice';
import OnProgress from './components/OnProgress';
import Accident from './components/Accidents';
import Report from './components/Report';
import Analysis from './components/Analysis';
import OICDasboad from './components/oic/Dashboad';
import OICOnProgress from './components/oic/OnProgress';
import OICAccident from './components/oic/Accidents';
import OICReportApp from './components/oic/ReportApp';
import OICAnalysis from './components/oic/Analysis';
import HeadDash from './components/headOffice/Dashboad';
import HeadAccident from './components/headOffice/Accident';
import HeadReportApp from './components/headOffice/ReportApp';
import HeadAnalysis from './components/headOffice/Analysis';
import AdminD from './components/Admin/Dashboad';


const App = () => {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/traffic-police" element={<TrafficPolice />} />
      <Route path="/OnProgress" element={<OnProgress />} />
      <Route path="/Accident" element={<Accident />} />
      <Route path="/Report" element={<Report />} />
      <Route path="/Analysis" element={<Analysis />} />
      <Route path="/oic/Dashboad" element={<OICDasboad />} />
      <Route path="/oic/OnProgress" element={<OICOnProgress />} />
      <Route path="/oic/Accident" element={<OICAccident />} />
      <Route path="/oic/ReportApp" element={<OICReportApp />} />
      <Route path="/oic/Analysis" element={<OICAnalysis />} />
      <Route path="/HeadOffice" element={<HeadDash />} />
      <Route path="/HeadOffice/Accident" element={<HeadAccident />} />
      <Route path="/HeadOffice/ReportApp" element={<HeadReportApp />} />
      <Route path="/HeadOffice/Analysis" element={<HeadAnalysis/>} />
      <Route path="/Admin-Dashboard" element={<AdminD />} />
    </Routes>
  </Router>
  
  );
};

export default App;


// import React from 'react'
// import Login from './pages/login';

// const App = () => {
//   return (
//     <div>
//       <Login/>
//     </div>
//   )
// }

// export default App
