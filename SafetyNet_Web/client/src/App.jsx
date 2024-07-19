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
    </Routes>
  </Router>
  );
};

export default App;