// import React, { useState, useEffect, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../../../Context/AuthContext';
// import { db } from '../../../firebase'; // Adjust the path to your Firebase configuration
// import { collection, getDocs, query, where } from 'firebase/firestore';

// const MonthlyReport = () => {
//   const [startMonth, setStartMonth] = useState('');
//   const [endMonth, setEndMonth] = useState('');
//   const [station, setStation] = useState(null);
//   const { currentUser } = useContext(AuthContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchStation = async () => {
//       if (!currentUser || !currentUser.email) return;

//       try {
//         const q = query(
//           collection(db, 'police'),
//           where('email', '==', currentUser.email)
//         );
//         const querySnapshot = await getDocs(q);

//         if (!querySnapshot.empty) {
//           const policeData = querySnapshot.docs[0].data();
//           setStation(policeData.station);
//         } else {
//           console.error('No matching user found in police collection.');
//         }
//       } catch (error) {
//         console.error('Error fetching station:', error);
//       }
//     };

//     fetchStation();
//   }, [currentUser]);

//   const handleGenerateReport = () => {
//     if (!startMonth || !endMonth || !station) {
//       alert('Please select both start and end months, and ensure the station is set.');
//       return;
//     }

//     // Map month name to its corresponding number
//     const monthMapping = {
//       January: 1,
//       February: 2,
//       March: 3,
//       April: 4,
//       May: 5,
//       June: 6,
//       July: 7,
//       August: 8,
//       September: 9,
//       October: 10,
//       November: 11,
//       December: 12,
//     };

//     const numericStartMonth = monthMapping[startMonth];
//     const numericEndMonth = monthMapping[endMonth];

//     if (numericStartMonth > numericEndMonth) {
//       alert('Start month must be earlier than or equal to end month.');
//       return;
//     }

//     // Navigate to the report display page with selected months and station
//     navigate(
//       `/Report/Monthly?startMonth=${numericStartMonth}&endMonth=${numericEndMonth}&station=${station}`
//     );
//   };

//   return (
//     <div className="space-y-4">
//       {/* Start Month Dropdown */}
//       <div>
//         <label className="block font-medium mb-2 text-black">Select Start Month:</label>
//         <select
//           value={startMonth}
//           onChange={(e) => setStartMonth(e.target.value)}
//           className="w-full p-2 border rounded-md text-black"
//         >
//           <option value="">-- Select Start Month --</option>
//           {[
//             'January',
//             'February',
//             'March',
//             'April',
//             'May',
//             'June',
//             'July',
//             'August',
//             'September',
//             'October',
//             'November',
//             'December',
//           ].map((m) => (
//             <option key={m} value={m}>
//               {m}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* End Month Dropdown */}
//       <div>
//         <label className="block font-medium mb-2 text-black">Select End Month:</label>
//         <select
//           value={endMonth}
//           onChange={(e) => setEndMonth(e.target.value)}
//           className="w-full p-2 border rounded-md text-black"
//         >
//           <option value="">-- Select End Month --</option>
//           {[
//             'January',
//             'February',
//             'March',
//             'April',
//             'May',
//             'June',
//             'July',
//             'August',
//             'September',
//             'October',
//             'November',
//             'December',
//           ].map((m) => (
//             <option key={m} value={m}>
//               {m}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Generate Button */}
//       <button
//         onClick={handleGenerateReport}
//         className="w-full bg-yellow-button py-2 rounded-md hover:bg-yellow text-black font-semibold"
//       >
//         Generate Report
//       </button>
//     </div>
//   );
// };

// export default MonthlyReport;


import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthContext';
import { db } from '../../../firebase'; // Ensure correct path to your Firebase configuration
import { collection, query, where, onSnapshot } from 'firebase/firestore';

const MonthlyReport = () => {
  const [month, setMonth] = useState('');
  const [station, setStation] = useState(null);
  const { currentUser } = useContext(AuthContext); // Get the current user from AuthContext
  const navigate = useNavigate(); // Initialize useNavigate

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
    if (!month) {
      alert('Please select a month.');
      return;
    }

    if (!station) {
      alert('Unable to fetch the station associated with the current user.');
      return;
    }

    // Map month name to its corresponding number
    const monthMapping = {
      January: 1,
      February: 2,
      March: 3,
      April: 4,
      May: 5,
      June: 6,
      July: 7,
      August: 8,
      September: 9,
      October: 10,
      November: 11,
      December: 12,
    };

    const numericMonth = monthMapping[month];

    if (!numericMonth) {
      alert('Invalid month selected.');
      return;
    }

    // Navigate to the report display page with the numeric month and station
    console.log('Generating Monthly Report:', { month, numericMonth, station });
    navigate(`/Report/Station/Monthly?month=${numericMonth}&station=${station}`);
  };

  return (
    <div className="space-y-4">
      {/* Month Dropdown */}
      <div>
        <label className="block font-medium mb-2 text-black">Select Month:</label>
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="w-full p-2 border rounded-md text-black"
        >
          <option value="">-- Select Month --</option>
          {[
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ].map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerateReport}
        className="w-full bg-yellow-button py-2 rounded-md hover:bg-yellow text-black font-semibold"
      >
        Generate Report
      </button>
    </div>
  );
};

export default MonthlyReport;
