// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const AnnualReport = () => {
//   const [startYear, setStartYear] = useState('');
//   const [endYear, setEndYear] = useState('');
//   const [reportType, setReportType] = useState('');
//   const navigate = useNavigate(); // Initialize useNavigate

//   const handleGenerateReport = () => {
//     if (!startYear || !endYear || !reportType) {
//       alert('Please select start year, end year, and report type.');
//       return;
//     }
//     // Logic to navigate or fetch the report
//     console.log('Generating Annual Report:', { startYear, endYear, reportType });
//     navigate(`/reports/annual?startYear=${startYear}&endYear=${endYear}&type=${reportType}`);
//   };

//   return (
//     <div className="space-y-4">
//       {/* Start Year Dropdown */}
//       <div>
//         <label className="block font-medium mb-2 text-black">Select Start Year:</label>
//         <input
//           type="number"
//           value={startYear}
//           onChange={(e) => setStartYear(e.target.value)}
//           placeholder="Enter Start Year"
//           className="w-full p-2 border rounded-md text-black"
//         />
//       </div>

//       {/* End Year Dropdown */}
//       <div>
//         <label className="block font-medium mb-2 text-black">Select End Year:</label>
//         <input
//           type="number"
//           value={endYear}
//           onChange={(e) => setEndYear(e.target.value)}
//           placeholder="Enter End Year"
//           className="w-full p-2 border rounded-md text-black"
//         />
//       </div>

//       {/* Report Type Dropdown */}
//       <div>
//         <label className="block font-medium mb-2 text-black">Select Report Type:</label>
//         <select
//           value={reportType}
//           onChange={(e) => setReportType(e.target.value)}
//           className="w-full p-2 border rounded-md text-black"
//         >
//           <option value="">-- Select Report Type --</option>
//           <option value="accidents">No of Accidents</option>
//           <option value="casualties">No of Casualties</option>
//           <option value="reasons">Reasons for Accident</option>
//           <option value="vehicles">Vehicles</option>
//           <option value="court">Court Cases</option>
//           <option value="day">Day</option>
//         </select>
//       </div>

//       {/* Generate Button */}
//       <button
//         onClick={handleGenerateReport}
//         className="w-full bg-yellow-button text-black font-semibold py-2 rounded-md hover:bg-yellow"
//       >
//         Generate Report
//       </button>
//     </div>
//   );
// };

// export default AnnualReport;






import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AnnualReport = () => {
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');
  const [reportType, setReportType] = useState('');
  const navigate = useNavigate();

  const handleGenerateReport = () => {
    if (!startYear || !endYear || !reportType) {
      alert('Please select start year, end year, and report type.');
      return;
    }
    // Navigate to AccidentsReport with query parameters
    navigate(`/reports/annual?startYear=${startYear}&endYear=${endYear}&type=${reportType}`);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block font-medium mb-2 text-black">Select Start Year:</label>
        <input
          type="number"
          value={startYear}
          onChange={(e) => setStartYear(e.target.value)}
          placeholder="Enter Start Year"
          className="w-full p-2 border rounded-md text-black"
        />
      </div>

      <div>
        <label className="block font-medium mb-2 text-black">Select End Year:</label>
        <input
          type="number"
          value={endYear}
          onChange={(e) => setEndYear(e.target.value)}
          placeholder="Enter End Year"
          className="w-full p-2 border rounded-md text-black"
        />
      </div>

      <div>
        <label className="block font-medium mb-2 text-black">Select Report Type:</label>
        <select
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
          className="w-full p-2 border rounded-md text-black"
        >
          <option value="">-- Select Report Type --</option>
          <option value="accidents">No of Accidents</option>
          <option value="casualties">No of Casualties</option>
          <option value="reasons">Reasons for Accident</option>
          <option value="vehicles">Vehicles</option>
          <option value="court">Court Cases</option>
          <option value="day">Day</option>
        </select>
      </div>

      <button
        onClick={handleGenerateReport}
        className="w-full bg-yellow-button text-black font-semibold py-2 rounded-md hover:bg-yellow"
      >
        Generate Report
      </button>
    </div>
  );
};

export default AnnualReport;
