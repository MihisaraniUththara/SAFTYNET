import {children, useContext, useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Home from './Pages/Home/Home'
import Login from './Pages/Login'

import TrafficLayout from './Pages/Traffic/Layout'
import TrafficDashboad from './Pages/Traffic/Dashboad'
import TrafficAccidentProgress from './Pages/Traffic/AccidentProgress'
import TrafficAccidentProgressAll from './Pages/Traffic/AccidentProgressAll'
import TrafficAccidentProgressMyCases from './Pages/Traffic/AccidentProgressMyCases'
import TrafficAccidentProgressReject from './Pages/Traffic/AccidentProgressReject'
import TrafficAccidentDetails from './Pages/Traffic/AccidentDetails'
import TrafficReport from './Pages/Traffic/Report'
import ReportMonthly from './Components/Report/Monthly/ReportDisplay'
import ReportMonthlyStationWise from './Components/Report/Monthly/StationWise/ReportDisplay'
import ReportAnnualStationWise from './Components/Report/Anual/StationWise/AccidentsReport'
import TrafficAnalysis from './Pages/Traffic/Analysis'
import TrafficAnalysischarts from './Components/StationWise/AnalyzedData'

import OicLayout from './Pages/Oic/Layout'
import OicDashboad from './Pages/Oic/Dashboad'
import OicAccidentProgress from './Pages/Oic/AccidentProgress'
import OicAccidentDetails from './Pages/Oic/AccidentDetails'
import OicReportApproval from './Pages/Oic/ReportApprove'
import OicReport from './Pages/Oic/Report'
import DutyLayout from './Pages/Oic/DutyLayout'
import DayDuty from './Pages/Oic/DayDuty'
import NightDuty from './Pages/Oic/NightDuty'
import Shift from './Components/StationWise/Duty'
import OicAnalysis from './Pages/Oic/Analysis'

import HeadLayout from './Pages/Head/Layout'
import HeadDashboad from './Pages/Head/Dashboad'
import HeadAccidentProgress from './Pages/Head/AccidentProgress'
import HeadAccidentDetails from './Pages/Head/AccidentDetails'
import HeadReportSubmit from './Pages/Head/ReportSubmit'
import HeadAnalysis from './Pages/Head/Analysis'
import HeadReport from './Pages/Head/Report'
import AccidentsReport from './Components/Report/Anual/AccidentsReport';
import HeadAnalysischarts from './Components/AnalyzedData'


import AdminLayout from './Pages/Admin/Layout'
import AdminDashboard from './Pages/Admin/DashboardPage';
import OfficerReg from './Pages/Admin/OfficerReg';
import OfficersLayout from './Pages/Admin/OfficersLayout';
import Officers from './Pages/Admin/Officers';
import Oic from './Pages/Admin/oic';


import DutyList from './Pages/Oic/Duty'

import { AuthContext } from './Context/AuthContext';

// import Dashboard from './Pages/Admin1/DashboardPage';
// import OfficerReg from './Pages/Admin1/OfficerRegPage';
// import Officers from './Pages/Admin1/OfficersPage';
// import Drivers from './Pages/Admin1/DriversPage';
// import Stations from './Pages/Admin1/StationsPage';



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

        {/* Traffic police */}

        <Route path='Traffic' element={<TrafficLayout />}>
          <Route index element={<RequireAuth><TrafficDashboad /></RequireAuth>} />
          <Route path='AccidentProgress' element={<RequireAuth><TrafficAccidentProgress /></RequireAuth>}> 
            <Route index element={<TrafficAccidentProgressAll/>} />
            <Route path='mycases' element={<TrafficAccidentProgressMyCases/>} />
            <Route path='Reject' element={<TrafficAccidentProgressReject/>} />
          </Route>
          <Route path='AccidentDetails' element={<RequireAuth><TrafficAccidentDetails /></RequireAuth>} />
          <Route path='Report' element={<RequireAuth><TrafficReport/></RequireAuth>}/>
          <Route path='Analysis' element={<RequireAuth><TrafficAnalysis /></RequireAuth>} />
        </Route>
        <Route path='Report/monthly' element={<RequireAuth><ReportMonthly/></RequireAuth>}/>
        <Route path='Report/Station/monthly' element={<RequireAuth><ReportMonthlyStationWise/></RequireAuth>}/>
        <Route path='Reports/Station/annual' element={<RequireAuth><ReportAnnualStationWise/></RequireAuth>}/>
        <Route path='DutyList' element={<RequireAuth><DutyList/></RequireAuth>}/>
        <Route path='Analysis/Station/annual' element={<RequireAuth><TrafficAnalysischarts/></RequireAuth>}/>

        {/* OIC */}

        <Route path='Oic' element={<OicLayout />}>
          <Route index element={<RequireAuth><OicDashboad /></RequireAuth>} />
          <Route path='AccidentProgress' element={<RequireAuth><OicAccidentProgress/></RequireAuth>}/>
          <Route path='AccidentDetails' element={<RequireAuth><OicAccidentDetails/></RequireAuth>}/>
          <Route path='ReportApproval' element={<RequireAuth><OicReportApproval/></RequireAuth>}/>
          <Route path='Duty' element={<RequireAuth><DutyLayout/></RequireAuth>}>
            <Route index element={<Shift/>} />
            <Route path='Night' element={<RequireAuth><NightDuty/></RequireAuth>} />
            <Route path='Day' element={<RequireAuth><DayDuty/></RequireAuth>} />
          </Route>
          <Route path='Report' element={<RequireAuth><OicReport/></RequireAuth>}/>
          <Route path='Analysis' element={<RequireAuth><OicAnalysis /></RequireAuth>} />
        </Route>

        {/* Head Office */}

        <Route path='Head' element={<HeadLayout />}>
          <Route index element={<RequireAuth><HeadDashboad /></RequireAuth>} />
          <Route path='AccidentProgress' element={<RequireAuth><HeadAccidentProgress/></RequireAuth>}/>
          <Route path='AccidentDetails' element={<RequireAuth><HeadAccidentDetails/></RequireAuth>}/>
          <Route path='ReportSubmit' element={<RequireAuth><HeadReportSubmit/></RequireAuth>}/>
          <Route path='Analysis' element={<RequireAuth><HeadAnalysis/></RequireAuth>}/>
          <Route path='Report' element={<RequireAuth><HeadReport/></RequireAuth>}/>
        </Route>
        <Route path="/reports/annual" element={<AccidentsReport />} />
        <Route path='Analysis/annual' element={<RequireAuth><HeadAnalysischarts/></RequireAuth>}/>



        {/*Admin new mihisarani edited*/}
        <Route path='Admin' element={<AdminLayout />}>
          <Route index element={<RequireAuth><AdminDashboard /></RequireAuth>} />
          <Route path='officerReg' element={<RequireAuth><OfficerReg/></RequireAuth>}/>
          <Route path='officers' element={<RequireAuth><OfficersLayout/></RequireAuth>}>
            <Route index element={<RequireAuth><Officers/></RequireAuth>} />
            <Route path='oic' element={<RequireAuth><Oic/></RequireAuth>} />
          </Route>
        </Route>

        {/* Admin */}

          
          
          {/* <Route index element={<RequireAuth><Dashboard /></RequireAuth>} />
          <Route path='officerReg' element={<RequireAuth><OfficerReg/></RequireAuth>}/>
          <Route path='officers' element={<RequireAuth><Officers/></RequireAuth>}/>
          <Route path='drivers' element={<RequireAuth><Drivers/></RequireAuth>}/>
          <Route path='stations' element={<RequireAuth><Stations/></RequireAuth>}/> */}
        
      </Route>
    </Routes>
  </BrowserRouter>,
   
    </div>
      
  )
}

export default App
