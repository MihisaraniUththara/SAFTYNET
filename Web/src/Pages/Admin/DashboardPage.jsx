import React, { useEffect, useState } from 'react';
import SidebarHeader from '../Admin1/SideBar';
import { FiUsers, FiAlertTriangle, FiUserCheck, FiSlash, FiHome } from 'react-icons/fi';
import AccidentStatChart from '../Admin1/Table_AccidentStat';
import VehicleTypesChart from '../Admin1/Table_VehicleTypes';
import SeverityChart from '../Admin1/Table_Severity';

import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';


const Dashboard = () => {

  const [drivers, setDrivers] = useState([]);
  const [officers, setOfficers] = useState([]);
  const [accidents, setAccidents] = useState([]);
  const [stations, setStations] = useState([]);



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

  // Fetch accident data from Firestore
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

  // Fetch station data from Firestore
  const fetchStationData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'police_stations'));
      const stationData = [];
      querySnapshot.forEach((doc) => {
        stationData.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setStations(stationData);
    } catch (error) {
      console.error('Error fetching stations:', error);
    }
  };

  useEffect(() => {
    fetchStationData();
  }, []);

  return (
    <div>
      <div>
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
        <FiHome size={36} className="text-yellow" />
        </div>
        <div className="flex flex-col ml-auto text-right">
        <span className="text-gray-600 text-sm font-semibold">Stations</span>
        <span className="text-3xl font-bold text-black">{stations.length}</span>
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
