// import React, { useState, useEffect, useContext } from 'react';
// import Swal from 'sweetalert2';
// import { db } from '../../firebase';
// import { collection, query, where, onSnapshot, updateDoc, doc, getDocs } from 'firebase/firestore';
// import emailjs from '@emailjs/browser';
// import { AuthContext } from '../../Context/AuthContext';

// const ReportApproval = () => {
//   const { currentUser } = useContext(AuthContext); // Access user context
//   const [reports, setReports] = useState([]);
//   const [officers, setOfficers] = useState({});
//   const [selectedReport, setSelectedReport] = useState(null);
//   const [station, setStation] = useState(null); // User's police station
//   const [filters, setFilters] = useState({
//     officerName: '',
//     accidentId: '',
//     severity: '',
//   });

//   // Fetch user's station based on currentUser email
//   useEffect(() => {
//     const fetchStation = async () => {
//       if (currentUser?.email) {
//         try {
//           const stationQuery = query(
//             collection(db, 'police'),
//             where('email', '==', currentUser.email.toLowerCase())
//           );
//           const querySnapshot = await getDocs(stationQuery);
//           if (!querySnapshot.empty) {
//             const policeStation = querySnapshot.docs[0].data()?.station || 'Unknown';
//             setStation(policeStation.toLowerCase()); // Normalize station name
//           } else {
//             setStation(null); // No station found
//           }
//         } catch (error) {
//           console.error('Error fetching station:', error);
//         }
//       }
//     };

//     fetchStation();
//   }, [currentUser]);

//   // Fetch officers from the police collection and map badgeNumber to name
//   const fetchOfficers = async () => {
//     try {
//       const officerSnapshot = await getDocs(collection(db, 'police'));
//       const officerData = {};
//       officerSnapshot.forEach((docSnap) => {
//         const data = docSnap.data();
//         if (data.badgeNumber && data.email) {
//           // Ensure both badgeNumber and email exist
//           officerData[data.badgeNumber] = { name: data.name, email: data.email };
//         }
//       });
//       setOfficers(officerData);
//     } catch (error) {
//       console.error('Error fetching officers:', error);
//     }
//   };

//   useEffect(() => {
//     fetchOfficers();
//   }, []);

//   // Fetch reports for the user's station
//   useEffect(() => {
//     if (station) {
//       const q = query(
//         collection(db, 'accident_report'),
//         where('submit', '==', 1),
//         where('oicApp', '==', 0),
//         where('A.A2', '==', station) // Match station with A.A2 in accident_report
//       );
//       const unsubscribe = onSnapshot(q, (querySnapshot) => {
//         const reportsData = [];
//         querySnapshot.forEach((docSnap) => {
//           reportsData.push({ id: docSnap.id, ...docSnap.data() });
//         });
//         setReports(reportsData);
//       });

//       // Cleanup subscription on unmount
//       return () => unsubscribe();
//     }
//   }, [station]);

//   const getSeverityText = (severityCode) => {
//     const severities = {
//       1: 'Fatal',
//       2: 'Serious',
//       3: 'Minor',
//       4: 'Damages only',
//     };
//     return severities[severityCode] || 'Unknown';
//   };

//   // Filter reports based on filter input
//   const filteredReports = reports.filter((report) => {
//     const officerName = officers[report.officerID]?.name || '';
//     const severityText = getSeverityText(report.A?.A6);

//     return (
//       officerName.toLowerCase().includes(filters.officerName.toLowerCase()) &&
//       report.A?.A5?.toLowerCase().includes(filters.accidentId.toLowerCase()) &&
//       (!filters.severity || severityText === filters.severity)
//     );
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prev) => ({ ...prev, [name]: value }));
//   };

//   return (
//     <div className="bg-white px-4 pb-4 py-4 rounded-sm border border-gray-200 text-black w-full">
//       <strong>
//         <h1>
//           <center>Submitted Accident Reports</center>
//         </h1>
//       </strong>

//       {/* Filters */}
//       <div className="mb-3 flex gap-4">
//         <input
//           type="text"
//           placeholder="Filter by Officer Incharge"
//           name="officerName"
//           value={filters.officerName}
//           onChange={handleInputChange}
//           className="border px-2 py-1 rounded w-1/3"
//         />
//         <input
//           type="text"
//           placeholder="Filter by Accident ID"
//           name="accidentId"
//           value={filters.accidentId}
//           onChange={handleInputChange}
//           className="border px-2 py-1 rounded w-1/3"
//         />
//         <select
//           name="severity"
//           value={filters.severity}
//           onChange={handleInputChange}
//           className="border px-2 py-1 rounded w-1/3"
//         >
//           <option value="">Filter by Severity</option>
//           <option value="Fatal">Fatal</option>
//           <option value="Serious">Serious</option>
//           <option value="Minor">Minor</option>
//           <option value="Damages only">Damages only</option>
//         </select>
//       </div>

//       {/* Reports Table */}
//       <div className="mt-3 p-3">
//         <table className="w-full table-auto">
//           <thead className="bg-gray-100 border-gray-400 font-semibold">
//             <tr>
//               <th className="p-3 tracking-wide">Date</th>
//               <th className="p-3 tracking-wide">Accident ID</th>
//               <th className="p-3 tracking-wide">Officer Incharge</th>
//               <th className="p-3 tracking-wide">Severity</th>
//               <th className="p-3 tracking-wide">Action</th>
//               <th className="p-3 tracking-wide">Options</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredReports.map((report) => (
//               <tr key={report.id} className="border-b">
//                 <td className="p-3 text-center">{report.A?.A3 || 'N/A'}</td>
//                 <td className="p-3 text-center">{report.A?.A5 || 'N/A'}</td>
//                 <td className="p-3 text-center">
//                   {officers[report.officerID]?.name || 'Unknown'}
//                 </td>
//                 <td className="p-3 text-center">{getSeverityText(report.A?.A6)}</td>
//                 <td className="p-3 text-center">
//                   {/* Approve and Reject buttons here */}
//                 </td>
//                 <td className="p-3 text-center">
//                   {/* Details button here */}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ReportApproval;





import React, { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import { db } from '../../firebase';
import { collection, query, where, onSnapshot, updateDoc, doc, getDocs } from 'firebase/firestore';
import emailjs from '@emailjs/browser';
import { AuthContext } from '../../Context/AuthContext';
import 'react-datepicker/dist/react-datepicker.css';

const ReportApproval = () => {
  const { currentUser } = useContext(AuthContext);
  const [reports, setReports] = useState([]);
  const [officers, setOfficers] = useState({});
  const [filters, setFilters] = useState({
    officerName: '',
    accidentId: '',
    severity: '',
    startDate: '',
    endDate: '',
  });

  const [station, setStation] = useState(null);

  useEffect(() => {
    const fetchStation = async () => {
      if (currentUser?.email) {
        try {
          const stationQuery = query(
            collection(db, 'police'),
            where('email', '==', currentUser.email.toLowerCase())
          );
          const querySnapshot = await getDocs(stationQuery);
          if (!querySnapshot.empty) {
            const policeStation = querySnapshot.docs[0].data()?.station || 'Unknown';
            setStation(policeStation.toLowerCase());
          } else {
            setStation(null);
          }
        } catch (error) {
          console.error('Error fetching station:', error);
        }
      }
    };

    fetchStation();
  }, [currentUser]);

  const fetchOfficers = async () => {
    try {
      const officerSnapshot = await getDocs(collection(db, 'police'));
      const officerData = {};
      officerSnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        if (data.badgeNumber && data.email) {
          officerData[data.badgeNumber] = { name: data.name, email: data.email };
        }
      });
      setOfficers(officerData);
    } catch (error) {
      console.error('Error fetching officers:', error);
    }
  };

  useEffect(() => {
    fetchOfficers();
  }, []);

  useEffect(() => {
    if (station) {
      const q = query(
        collection(db, 'accident_report'),
        where('submit', '==', 1),
        where('oicApp', '==', 0),
        where('A.A2', '==', station)
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const reportsData = [];
        querySnapshot.forEach((docSnap) => {
          reportsData.push({ id: docSnap.id, ...docSnap.data() });
        });
        setReports(reportsData);
      });

      return () => unsubscribe();
    }
  }, [station]);

  const getSeverityText = (severityCode) => {
    const severities = {
      1: 'Fatal',
      2: 'Serious',
      3: 'Minor',
      4: 'Damages only',
    };
    return severities[severityCode] || 'Unknown';
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleDateRangeChange = (name, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const filteredReports = reports.filter((report) => {
    const officerName = officers[report.officerID]?.name || '';
    const accidentId = report.A?.A5 || '';
    const severity = report.A?.A6;
    const date = new Date(report.A?.A3);

    return (
      officerName.toLowerCase().includes(filters.officerName.toLowerCase()) &&
      accidentId.toLowerCase().includes(filters.accidentId.toLowerCase()) &&
      (filters.severity === '' || severity == filters.severity) &&
      (!filters.startDate || date >= new Date(filters.startDate)) &&
      (!filters.endDate || date <= new Date(filters.endDate))
    );
  });

  return (
    <div className="bg-white px-4 pb-4 py-4 rounded-sm border border-gray-200 text-black w-full">
      <strong>
        <h1>
          <center>Submitted Accident Reports</center>
        </h1>
      </strong>
      <div className="flex space-x-4 my-4">
        <input
          type="text"
          name="officerName"
          placeholder="Filter by Officer Incharge"
          value={filters.officerName}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="accidentId"
          placeholder="Filter by Accident ID"
          value={filters.accidentId}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        />
        <select
          name="severity"
          value={filters.severity}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        >
          <option value="">All Severities</option>
          <option value="1">Fatal</option>
          <option value="2">Serious</option>
          <option value="3">Minor</option>
          <option value="4">Damages only</option>
        </select>
        <input
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={(e) => handleDateRangeChange('startDate', e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={(e) => handleDateRangeChange('endDate', e.target.value)}
          className="border p-2 rounded"
        />
      </div>
      <div className="mt-3 p-3">
        <table className="w-full table-auto">
          <thead className="bg-gray-100 border-gray-400 font-semibold">
            <tr>
              <th className="p-3 tracking-wide">Date</th>
              <th className="p-3 tracking-wide">Accident ID</th>
              <th className="p-3 tracking-wide">Officer Incharge</th>
              <th className="p-3 tracking-wide">Severity</th>
              <th className="p-3 tracking-wide">Action</th>
              <th className="p-3 tracking-wide">Options</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((report) => (
              <tr key={report.id} className="border-b">
                <td className="p-3 text-center">{report.A?.A3 || 'N/A'}</td>
                <td className="p-3 text-center">{report.A?.A5 || 'N/A'}</td>
                <td className="p-3 text-center">{officers[report.officerID]?.name || 'Unknown'}</td>
                <td className="p-3 text-center">{getSeverityText(report.A?.A6)}</td>
                <td className="p-3 text-center">
                  <button
                    className="bg-green-500 hover:bg-green-600 text-black font-semibold py-1 px-2 rounded text-sm mr-2"
                    onClick={() => handleApprove(report.id)}
                  >
                    Approve
                  </button>
                </td>
                <td className="p-3 text-center">
                  <button
                    className="bg-yellow-button hover:bg-yellow text-black font-semibold py-1 px-2 rounded text-sm"
                    onClick={() => handleDetails(report)}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportApproval;
