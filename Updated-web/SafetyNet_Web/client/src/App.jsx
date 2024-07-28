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
import OICDashboard from './components/oic/Dashboard';
import OICOnProgress from './components/oic/OnProgress';
import OICAccident from './components/oic/Accidents';
import OICReportApp from './components/oic/ReportApp';
import OICAnalysis from './components/oic/Analysis';
import HeadDash from './components/headOffice/Dashboard';
import AdminD from './pages/Admin/Home';

import '@fortawesome/fontawesome-free/css/all.min.css';


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
      <Route path="/oic/Dashboard" element={<OICDashboard />} />
      <Route path="/oic/OnProgress" element={<OICOnProgress />} />
      <Route path="/oic/Accident" element={<OICAccident />} />
      <Route path="/oic/ReportApp" element={<OICReportApp />} />
      <Route path="/oic/Analysis" element={<OICAnalysis />} />
      <Route path="/HeadOffice" element={<HeadDash />} />
      <Route path="/Admin-Dashboard" element={<AdminD />} />
    </Routes>
  </Router>
  
  );
};

export default App;
