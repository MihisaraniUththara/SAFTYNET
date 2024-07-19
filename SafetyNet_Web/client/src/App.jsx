import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";
import HomePage from "./components/HomePage";
import LoginPage from './components/LoginPage';
import TrafficPolice from './components/TrafficPolice';
import OnProgress from './components/OnProgress';
import Accident from './components/Accidents';
import Report from './components/Report';
import Analysis from './components/Analysis';
import OICDasboad from './components/oic/Dashboad';
import OICOnProgress from './components/oic/OnProgress';
import OICAccident from './components/oic/Accidents';
import OICReportApp from './components/oic/ReportApp';


const App = () => {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/traffic-police" element={<TrafficPolice />} />
      <Route path="/OnProgress" element={<OnProgress />} />
      <Route path="/Accident" element={<Accident />} />
      <Route path="/Report" element={<Report />} />
      <Route path="/Analysis" element={<Analysis />} />
      <Route path="/oic/Dashboad" element={<OICDasboad />} />
      <Route path="/oic/OnProgress" element={<OICOnProgress />} />
      <Route path="/oic/Accident" element={<OICAccident />} />
      <Route path="/oic/ReportApp" element={<OICReportApp />} />
    </Routes>
  </Router>
  );
};

export default App;