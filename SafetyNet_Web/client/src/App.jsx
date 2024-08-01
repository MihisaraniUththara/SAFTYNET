import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";
import HomePage from "./components/HomePage";
import LoginPage from './pages/login';
import SignUp from './pages/SignUp';
import TrafficPolice from './components/TrafficPolice';
import OnProgress from './components/OnProgress';
import MyC from './components/myCases';
import Accident from './components/Accidents';
import Report from './components/Report';
import ReportDeath from './components/ReportDeath';
import ReportCourt from './components/ReportCourt';
import Analysis from './components/Analysis';
import OICDasboad from './components/oic/Dashboad';
import OICOnProgress from './components/oic/OnProgress';
import OICAccident from './components/oic/Accidents';
import OICReportApp from './components/oic/ReportApp';
import OICReport from './components/oic/Report';
import OICAnalysis from './components/oic/Analysis';
import OICDuty from './components/oic/Duty';
import OICDutyE from './components/oic/DutyE';
import OICDutyN from './components/oic/DutyN';
import HeadDash from './components/headOffice/Dashboad';
import HeadAccident from './components/headOffice/Accident';
import HeadReportApp from './components/headOffice/ReportApp';
import HeadReport from './components/headOffice/Report';
import HeadAnalysis from './components/headOffice/Analysis';
import AdminD from './components/Admin/Dashboad';
import AdminOfficer from './components/Admin/Adminofficers';
import AdminDriver from './components/Admin/AdminDrivers';
import Call from './components/call/ManageAccidents';

import { UserProvider } from './context/UserContext';


const App = () => {
  return (
    <UserProvider>
    <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/traffic-police" element={<TrafficPolice />} />
      <Route path="/OnProgress" element={<OnProgress />} />
      <Route path="/OnProgress/my-cases" element={<MyC/>} />
      <Route path="/Accident" element={<Accident />} />
      <Route path="/Report" element={<Report />} />
      <Route path="/Report/type" element={<ReportDeath />} />
      <Route path="/Report/type/type" element={<ReportCourt />} />
      <Route path="/Analysis" element={<Analysis />} />
      <Route path="/oic/Dashboad" element={<OICDasboad />} />
      <Route path="/oic/OnProgress" element={<OICOnProgress />} />
      <Route path="/oic/Accident" element={<OICAccident />} />
      <Route path="/oic/ReportApp" element={<OICReportApp />} />
      <Route path="/oic/Report" element={<OICReport />} />
      <Route path="/oic/Analysis" element={<OICAnalysis />} />
      <Route path="/oic/Duty" element={<OICDuty />} />
      <Route path="/oic/DutyE" element={<OICDutyE />} />
      <Route path="/oic/DutyN" element={<OICDutyN />} />
      <Route path="/HeadOffice" element={<HeadDash />} />
      <Route path="/HeadOffice/Accident" element={<HeadAccident />} />
      <Route path="/HeadOffice/ReportApp" element={<HeadReportApp />} />
      <Route path="/HeadOffice/Report" element={<HeadReport />} />
      <Route path="/HeadOffice/Analysis" element={<HeadAnalysis/>} />
      <Route path="/Admin-Dashboard" element={<AdminD />} />
      <Route path="/Admin/officer" element={<AdminOfficer />} />
      <Route path="/Admin/Driver" element={<AdminDriver />} />
      <Route path="/Manage" element={<Call />} />
    </Routes>
  </Router>
  </UserProvider>
  
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
