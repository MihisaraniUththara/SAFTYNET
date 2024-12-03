// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { DatePicker } from 'antd'; // Using Ant Design's DatePicker for calendar
// import { collection, getDocs, query, where } from 'firebase/firestore';
// import { db } from '../../../firebase'; // Adjust import path
// import moment from 'moment';

// const { RangePicker } = DatePicker;

// const AnnualReport = () => {
//   const [dateRange, setDateRange] = useState([]);
//   const [reportType, setReportType] = useState('');
//   const navigate = useNavigate();

//   const handleGenerateReport = async () => {
//     if (!dateRange.length || !reportType) {
//       alert('Please select a date range and report type.');
//       return;
//     }

//     const [startDate, endDate] = dateRange;

//     try {
//       const q = query(
//         collection(db, 'accident_report'),
//         where('createdAt', '>=', startDate.toDate()),
//         where('createdAt', '<=', endDate.toDate())
//       );

//       const querySnapshot = await getDocs(q);
//       const filteredReports = querySnapshot.docs.map((doc) => doc.data());

//       console.log('Filtered Reports:', filteredReports);

//       navigate(
//         `/reports/annual?startDate=${startDate.format('YYYY-MM-DD')}&endDate=${endDate.format('YYYY-MM-DD')}&type=${reportType}`,
//         { state: { filteredReports } }
//       );
//     } catch (error) {
//       console.error('Error fetching reports:', error);
//     }
//   };

//   return (
//     <div className="space-y-4">
//       {/* Date Range Picker */}
//       <div>
//         <label className="block font-medium mb-2 text-black">Select Date Range:</label>
//         <RangePicker
//           value={dateRange}
//           onChange={(dates) => setDateRange(dates)}
//           className="w-full p-2 border rounded-md"
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


import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthContext';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase'; // Adjust based on your Firebase setup

const AnnualReport = () => {
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');
  const [reportType, setReportType] = useState('');
  const [station, setStation] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStation = async () => {
      if (currentUser?.email) {
        try {
          const stationQuery = query(
            collection(db, 'police'),
            where('email', '==', currentUser.email.toLowerCase())
          );
          onSnapshot(stationQuery, (querySnapshot) => {
            if (!querySnapshot.empty) {
              const policeStation = querySnapshot.docs[0].data()?.station || 'Unknown';
              setStation(policeStation.toLowerCase()); // Normalize station name
            } else {
              setStation(null);
              console.log('No station found'); // No station found
            }
          });
        } catch (error) {
          console.error('Error fetching station:', error);
        }
      }
    };

    fetchStation();
  }, [currentUser]);

  const handleGenerateReport = () => {
    if (!startYear || !endYear || !reportType || !station) {
      alert('Please select start year, end year, report type, and ensure station is set.');
      return;
    }

    // Navigate to AccidentsReport with query parameters
    navigate(`/reports/Station/annual?startYear=${startYear}&endYear=${endYear}&type=${reportType}&station=${station}`);
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
