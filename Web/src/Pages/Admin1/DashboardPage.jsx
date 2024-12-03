import React from 'react';
import SidebarHeader from './SideBar';
import { FiUsers, FiAlertTriangle, FiUserCheck, FiSlash } from 'react-icons/fi';
import AccidentStatChart from './Table_AccidentStat';
import VehicleTypesChart from './Table_VehicleTypes';
import SeverityChart from './Table_Severity';

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <SidebarHeader />
      <div className="flex-1 flex flex-col overflow-y-auto mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 p-4">
    <div className="bg-white shadow-lg rounded-lg p-5 flex items-center hover:shadow-xl transition-shadow h-25">
        <div className="flex-shrink-0">
        <FiUsers size={36} className="text-primary" />
        </div>
        <div className="flex flex-col ml-auto text-right">
        <span className="text-gray-600 text-sm font-semibold">Drivers</span>
        <span className="text-3xl font-bold text-primary">90</span>
        </div>
    </div>
    <div className="bg-white shadow-lg rounded-lg p-5 flex items-center hover:shadow-xl transition-shadow h-25">
        <div className="flex-shrink-0">
        <FiAlertTriangle size={36} className="text-red-500" />
        </div>
        <div className="flex flex-col ml-auto text-right">
        <span className="text-gray-600 text-sm font-semibold">Accidents</span>
        <span className="text-3xl font-bold text-primary">30</span>
        </div>
    </div>
    <div className="bg-white shadow-lg rounded-lg p-5 flex items-center hover:shadow-xl transition-shadow h-25">
        <div className="flex-shrink-0">
        <FiUserCheck size={36} className="text-green-500" />
        </div>
        <div className="flex flex-col ml-auto text-right">
        <span className="text-gray-600 text-sm font-semibold">Police Officers</span>
        <span className="text-3xl font-bold text-primary">3</span>
        </div>
    </div>
    <div className="bg-white shadow-lg rounded-lg p-5 flex items-center hover:shadow-xl transition-shadow h-25">
        <div className="flex-shrink-0">
        <FiSlash size={36} className="text-yellow-500" />
        </div>
        <div className="flex flex-col ml-auto text-right">
        <span className="text-gray-600 text-sm font-semibold">Suspends</span>
        <span className="text-3xl font-bold text-primary">3</span>
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
  );
};

export default Dashboard;