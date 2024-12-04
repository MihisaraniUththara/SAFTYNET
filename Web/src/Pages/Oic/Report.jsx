import React from 'react';
import MonthlyReport from '../../Components/Report/StationWise/MonthlyReport';
import AnnualReport from './../../Components/Report/StationWise/AnnualReport';

const Report = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-gray-50 p-5 rounded-md shadow-md">
        <h1 className="text-2xl font-bold text-center text-black">Report Generation</h1>
        
        {/* Monthly Report Section */}
        <div className='flex-wrap '>
        <div className="mb-4 rounded-md shadow-md p-3">
          <h2 className="text-xl font-semibold mb-4 text-black">Monthly Report</h2>
          <MonthlyReport />
        </div>
        
        {/* Annual Report Section */}
        <div className='mt-4 rounded-md shadow-md p-3'>
          <h2 className="text-xl font-semibold mb-4 text-black">Annual Report</h2>
          <AnnualReport />
        </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
