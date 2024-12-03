import React, { useEffect, useState } from 'react';
import SidebarHeader from './SideBar';
import { FiUsers, FiAlertTriangle, FiUserCheck, FiSlash } from 'react-icons/fi';
import AccidentStatChart from './Table_AccidentStat';
import VehicleTypesChart from './Table_VehicleTypes';
import SeverityChart from './Table_Severity';
import SideBarAdmin from '../../Components/SideBarAdmin';
import Header from '../../Components/Admin/Header';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';


const Dashboard = () => {

  const [drivers, setDrivers] = useState([]);
  const [officers, setOfficers] = useState([]);
  const [accidents, setAccidents] = useState([]);


  // Fetch driver data from Firestore
  const fetchDriverData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'drivers'));
      const driverData = [];
      querySnapshot.forEach((doc) => {
        driverData.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setDrivers(driverData);
    } catch (error) {
      console.error('Error fetching drivers:', error);
    }
  };

  useEffect(() => {
    fetchDriverData();
  }, []);

  // Fetch officer data from Firestore
  const fetchOfficerData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'police'));
      const officerData = [];
      querySnapshot.forEach((doc) => {
        officerData.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setOfficers(officerData);
    } catch (error) {
      console.error('Error fetching officers:', error);
    }
  };

  useEffect(() => {
    fetchOfficerData();
  }, []);

  // Fetch officer data from Firestore
  const fetchAccidentData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'accident_report'));
      const AccidentData = [];
      querySnapshot.forEach((doc) => {
        AccidentData.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setAccidents(AccidentData);
    } catch (error) {
      console.error('Error fetching Accidents:', error);
    }
  };

  useEffect(() => {
    fetchAccidentData();
  }, []);

  return (
    <div className="flex h-screen bg-neutral-100 w-screen overflow-hidden">
      <SideBarAdmin />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col p-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 p-4">
    <div className="bg-white shadow-lg rounded-lg p-5 flex items-center hover:shadow-xl transition-shadow h-25">
        <div className="flex-shrink-0">
        <FiUsers size={36} className="text-black" />
        </div>
        <div className="flex flex-col ml-auto text-right">
        <span className="text-gray-600 text-sm font-semibold">Drivers</span>
        <span className="text-3xl font-bold text-black">{drivers.length}</span>
        </div>
    </div>
    <div className="bg-white shadow-lg rounded-lg p-5 flex items-center hover:shadow-xl transition-shadow h-25">
        <div className="flex-shrink-0">
        <FiAlertTriangle size={36} className="text-red-500" />
        </div>
        <div className="flex flex-col ml-auto text-right">
        <span className="text-gray-600 text-sm font-semibold">Accidents</span>
        <span className="text-3xl font-bold text-black">{accidents.length}</span>
        </div>
    </div>
    <div className="bg-white shadow-lg rounded-lg p-5 flex items-center hover:shadow-xl transition-shadow h-25">
        <div className="flex-shrink-0">
        <FiUserCheck size={36} className="text-green-500" />
        </div>
        <div className="flex flex-col ml-auto text-right">
        <span className="text-gray-600 text-sm font-semibold">Police Officers</span>
        <span className="text-3xl font-bold text-black">{officers.length}</span>
        </div>
    </div>
    <div className="bg-white shadow-lg rounded-lg p-5 flex items-center hover:shadow-xl transition-shadow h-25">
        <div className="flex-shrink-0">
        <FiSlash size={36} className="text-yellow" />
        </div>
        <div className="flex flex-col ml-auto text-right">
        <span className="text-gray-600 text-sm font-semibold">Suspends</span>
        <span className="text-3xl font-bold text-black">3</span>
        </div>
    </div>
        </div>   

        <div className='flex flex-col sm:flex-row gap-7 '>
      <div className='flex-1 rounded-lg p-4 '>
        <AccidentStatChart />
      </div>

      <div className='flex-1  rounded-lg p-4'>
        <VehicleTypesChart />
      </div>

      <div className='flex-1 rounded-lg p-4'>
        <SeverityChart />
      </div>
    </div>

      </div>
        </div>
      
    </div>
  );
};

export default Dashboard;
