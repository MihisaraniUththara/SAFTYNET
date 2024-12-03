import React, { useState, useEffect } from 'react';
import AccidentDetailsModal from './StationWise/Model/AccidentDetailsModal'
import { db } from '../firebase'; // Ensure your Firebase config is correct
import { collection, getDocs, query, orderBy, updateDoc, doc } from 'firebase/firestore';


const AccidentProgress = () => {
  const [accidents, setAccidents] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [filteredAccidents, setFilteredAccidents] = useState([]);
  const [filters, setFilters] = useState({
    station: '',
    accidentId: '',
    startDate: '', // Start date for filtering
  endDate: '', 
});
  const [selectedStatus, setSelectedStatus] = useState('All');



  useEffect(() => {
    const fetchAccidents = async () => {
      try {
        const accidentQuery = query(
          collection(db, 'accident_report'),
          orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(accidentQuery);

        const accidentsData = [];

        for (const docSnap of querySnapshot.docs) {
          let accident = docSnap.data();

          // Ensure fields submit, oicApp, headApp exist
          if (!('submit' in accident)) {
            await updateDoc(doc(db, 'accident_report', docSnap.id), {
              submit: 1,
              oicApp: 0,
              headApp: 0,
            });
            accident.submit = 1;
            accident.oicApp = 0;
            accident.headApp = 0;
          }

          // Log each accident to verify fields
          console.log('Fetched accident:', accident);

          accidentsData.push({
            id: docSnap.id,
            ...accident,
            AccidentId: accident.A?.A5 || 'N/A',
            Urban_Rural: accident.A?.A7 || '0',
            A8: accident.A?.A8 || '0',
            A9: accident.A?.A9 || '0',
            A10: accident.A?.A10 || 'NO Road Number',
            A11: accident.A?.A11 || 'No Road Name',
            A20: accident.A?.A20 || '0',
            A21: accident.A?.A21 || '0',
            A22: accident.A?.A22 || '0',
            A23: accident.A?.A23 || '0',
            A24: accident.A?.A24 || '0',
            A25: accident.A?.A25 || '0',
            A26: accident.A?.A26 || '0',
            A27: accident.A?.A27 || '0',
            A30: accident.A?.A30 || '0',
            A28: accident.A?.A28 || '60',
            A29: accident.A?.A29 || '40',
            A31: accident.A?.A31 || 'No prosecution',
          });
        }

        setAccidents(accidentsData);
        setFilteredAccidents(accidentsData); // Set initially to all accidents
      } catch (error) {
        console.error('Error fetching accidents:', error);
      }
    };

    fetchAccidents();
  }, []);

  const getUrban = (Urban_Rural) => {
    if (Urban_Rural == '1') {
      return (
        <span>Urban</span>
      );
    }
    if (Urban_Rural == '2') {
      return (
        <span>Rural</span>
      );
    }
    return (
      <span>Unknown</span>
    );
  };

  const A8F = (A8) => {
    if (A8 == '1') {
      return (
      <span>Normal Working Day</span>
    );
    }
    if (A8 == '2') {
      return (
      <span>Normal Weekend</span>
    );
    }
    if (A8 == '3') {
      return (
      <span>Public Holiday</span>
    );
    }
    if (A8 == '4') {
      return (
      <span>Festival Day</span>
    );
    }
    if (A8 == '5') {
      return (
      <span>Election Day or May 1st</span>
    );
    }
    if (A8 == '0') {
      return (
      <span>Normal Day</span>
    );
    }
  };

  const A9F = (A9) => {
    if (A9 == '1') {
      return (
      <span>Sunday</span>
    );
    }
    if (A9 == '2') {
      return (
      <span>Monday</span>
    );
    }
    if (A9 == '3') {
      return (
      <span>Tuesday</span>
    );
    }
    if (A9 == '4') {
      return (
      <span>Wednesday</span>
    );
    }if (A9 == '5') {
      return (
      <span>Thursday</span>
    );
    }if (A9 == '6') {
      return (
      <span>Friday</span>
    );
    }if (A9 == '7') {
      return (
      <span>Saturday</span>
    );
    }if (A9 == '0') {
      return (
      <span>Null</span>
    );
    }
  };

  const A20F = (A20) => {
    if (A20 == '1') {
      return (
      <span>With Other Vehicle</span>
    );
    }
    if (A20 == '2') {
      return (
      <span>With Pedestrian</span>
    );
    }if (A20 == '3') {
      return (
      <span>With Fixed Object</span>
    );
    }if (A20 == '9') {
      return (
      <span>Other</span>
    );
    }if (A20 == '0') {
      return (
      <span>No Second Collision</span>
    );
    }
  };

  const A21F = (A21) => {
    if (A21 == '1') {
      return (
      <span>Dry</span>
    );
    }
    if (A21 == '2') {
      return (
      <span>Wet</span>
    );
    }
    if (A21 == '3') {
      return (
      <span>Flooded with water</span>
    );
    }
    if (A21 == '4') {
      return (
      <span>Slippery</span>
    );
    }
    if (A21 == '5') {
      return (
      <span>Others</span>
    );
    }if (A21 == '0') {
      return (
      <span>No Special Condition</span>
    );
    }
  };

  const A22F = (A22)=> {
    if (A22 == '1') {
      return (
      <span>clear</span>
    );
    }
    if (A22 == '2') {
      return (
      <span>Cloudy</span>
    );
    }
    if (A22 == '3') {
      return (
      <span>Rain</span>
    );
    }
    if (A22 == '4') {
      return (
      <span>Fog/Mist</span>
    );
    }
    if (A22 == '9') {
      return (
      <span>Other</span>
    );
    }
    if (A22 == '0') {
      return (
      <span>Not Known</span>
    );
    }
  };

  const A23F = (A23) => {
    if (A23 == '1') {
      return (
      <span>Day light</span>
    );
    }
    if (A23 == '2') {
      return (
      <span>Night, No street Lights</span>
    );
    }
    if (A23 == '3') {
      return (
      <span>Dusk, Dawn</span>
    );
    }
    if (A23 == '4') {
      return (
      <span>Night, Improper Street Lightning</span>
    );
    }
    if (A23 == '5') {
      return (
      <span>Night, Good street lights</span>
    );
    }
    return (
      <span>Not Known</span>
    );
  };

  const A24F = (A24) => {
    if (A24 == '1') {
      return (
      <span>Stretch of road no junction within 10 meters</span>
    );
    }
    if (A24 == '2') {
      return (
      <span>4-leg junction</span>
    );
    }
    if (A24 == '3') {
      return (
      <span>T junction</span>
    );
    }
    if (A24 == '4') {
      return (
      <span>y junction</span>
    );
    }
    if (A24 == '5') {
      return (
      <span>Roundabout</span>
    );
    }
    if (A24 == '6') {
      return (
      <span>Multiple road junction</span>
    );
    }
    if (A24 == '7') {
      return (
      <span>Entrance, By road</span>
    );
    }
    if (A24 == '8') {
      return (
      <span>Railway Crossing</span>
    );
    }
    return (
      <span>Others</span>
    );
  };

  const A25F = (A25) => {
    if (A25 == '1') {
      return (
      <span>On pedestrian Crossing</span>
    );
    }
    if (A25 == '2') {
      return (
      <span>Pedestrian Crossing with in 50 meters</span>
    );
    }
    if (A25 == '3') {
      return (
      <span>Pedestrian Crossing beyond in 50 meters</span>
    );
    }
    if (A25 == '4') {
      return (
      <span>Pedestrian over-pass bridge or under pass tunnel within 50 meters</span>
    );
    }
    if (A25 == '5') {
      return (
      <span>Hit outside sidewalk</span>
    );
    }
    if (A25 == '6') {
      return (
      <span>Hit on side walk</span>
    );
    }
    if (A25 == '7') {
      return (
      <span>Hit on road without sidewalk</span>
    );
    }
    return (
      <span>Not involved</span>
    );
  };

  const A26F = (A26) => {
    if (A26 == '1') {
      return (
      <span>Police</span>
    );
    }
    if (A26 == '2') {
      return (
      <span>Traffic lights</span>
    );
    }
    if (A26 == '3') {
      return (
      <span>Stop sign or marking</span>
    );
    }
    if (A26 == '4') {
      return (
      <span>Give way sign</span>
    );
    }
    if (A26 == '5') {
      return (
      <span>Controlled by traffic warden</span>
    );
    }
    if (A26 == '6') {
      return (
      <span>No control</span>
    );
    }
    return (
      <span>Other</span>
    );
  };

  const A27F = (A27) => {
    if (A27 == '1') {
      return (
      <span>Yes</span>
    );
    }
    if (A27 == '2') {
      return (
      <span>No</span>
    );
    }
    return (
      <span>Other</span>
    );
  };

  const A30F = (A30) => {
    if (A30 == '1') {
      return (
      <span>Prosecution initiated</span>
    );
    }
    if (A30 == '2') {
      return (
      <span>No Prosecution</span>
    );
    }
    if (A30 == '3') {
      return (
      <span>Parties settled</span>
    );
    }
    return (
      <span>Offender Unknown</span>
    );
  };

  const getStatus = (submit, oicApp, headApp) => {
    if (submit === 1 && oicApp === 0 && headApp === 0) {
      return (
        <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
          Pending
        </span>
      );
    }
    if (submit === 1 && oicApp === 1 && headApp === 0) {
      return (
        <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
          In Progress
        </span>
      );
    }
    if (submit === 1 && oicApp === 1 && headApp === 1) {
      return (
        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
          Completed
        </span>
      );
    }
    return (
      <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
        Pending
      </span>
    );
  };

  const handleDetails = (report) => {
    setSelectedReport(report);
  };

  const closeDetails = () => {
    setSelectedReport(null);
  };


  // const filterByStatus = (status) => {
  //   if (status === 'All') {
  //     setFilteredAccidents(accidents);
  //   } else {
  //     const filtered = accidents.filter((accident) => {
  //       const { submit, oicApp, headApp } = accident;
  //       const station = accident.A?.A2 || '';
  //       const matchesStatus = 
  //       (status === 'Pending' && submit === 1 && oicApp === 0 && headApp === 0) ||
  //         (status === 'In Progress' && submit === 1 && oicApp === 1 && headApp === 0) ||
  //         (status === 'Completed' && submit === 1 && oicApp === 1 && headApp === 1) ||
  //         status == 'All';
  //       return (
  //         matchesStatus &&
  //         accident.A?.A5?.toLowerCase().includes(filters.accidentId.toLowerCase()) &&
  //         station.toLowerCase().includes(filters.station.toLowerCase())
          
  //       );
  //     });
  //     setFilteredAccidents(filtered);
  //   }
  // };

  // Function to apply all filters
const applyFilters = () => {
  const filtered = accidents.filter((accident) => {
    const { submit, oicApp, headApp } = accident;
    const station = accident.A?.A2 || '';
    const accidentId = accident.A?.A5 || '';
    const createdAt = accident.createdAt?.toDate(); // Convert Firestore timestamp to JavaScript Date

    // Status filter
    const matchesStatus =
      (selectedStatus === 'All') ||
      (selectedStatus === 'Pending' && submit === 1 && oicApp === 0 && headApp === 0) ||
      (selectedStatus === 'In Progress' && submit === 1 && oicApp === 1 && headApp === 0) ||
      (selectedStatus === 'Completed' && submit === 1 && oicApp === 1 && headApp === 1);

    // Station and Accident ID filters
    const matchesStation = station.toLowerCase().includes(filters.station.toLowerCase());
    const matchesAccidentId = accidentId.toLowerCase().includes(filters.accidentId.toLowerCase());

    const matchesDate =
      (!filters.startDate || (createdAt && new Date(filters.startDate) <= createdAt)) &&
      (!filters.endDate || (createdAt && new Date(filters.endDate) >= createdAt));

    return matchesStatus && matchesStation && matchesAccidentId && matchesDate;
  });

  setFilteredAccidents(filtered);
};

// Call applyFilters whenever filters change
useEffect(() => {
  applyFilters();
}, [selectedStatus, filters]);


  // const handleStatusChange = (event) => {
  //   const status = event.target.value;
  //   setSelectedStatus(status);
  //   filterByStatus(status);
  // };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };


  return (
    <div className="bg-white px-4 pb-4 py-4 rounded-sm border border-gray-200 text-black w-full">
      <strong><h1 className="text-2xl font-bold text-center text-black"><center>Recent Accidents</center></h1></strong>

      <div className="flex flex-wrap items-center gap-2 p-3 mt-2 bg-gray-100 rounded-md">

        <div className="flex items-center gap-2">
          <label className="font-medium">Start Date:</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={filters.startDate}
            onChange={handleInputChange}
            className="p-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="font-medium">Start Date:</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={filters.endDate}
            onChange={handleInputChange}
            className="p-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="font-medium">Accident ID:</label>
          <input
            type="text"
            placeholder="Filter by Accident ID"
            name="accidentId"
            value={filters.accidentId}
            onChange={handleInputChange}
            className="p-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className='flex items-center gap-2'>
          <label className='font-medium'>Station</label>
            <input
              type="text"
              placeholder="Filter by station"
              name="station"
              value={filters.station}
              onChange={handleInputChange}
              className="p-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
        </div>

        <div className='flex items-center gap-2'>
          <label htmlFor="statusFilter" className="mr-2 font-medium">Status:</label>
            <select
              id="statusFilter"
              value={selectedStatus}
              onChange={handleStatusChange}
              className="p-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
        </div>

      </div>


      <div className="mt-3 p-3">
        <table className="w-full table-auto">
          <thead className="bg-gray-100 border-gray-400 font-semibold">
            <tr>
              <th className="p-3 tracking-wide">Date</th>
              <th className="p-3 tracking-wide">Accident ID</th>
              <th className="p-3 tracking-wide">Station</th>
              <th className="p-3 tracking-wide">Status</th>
              <th className="p-3 tracking-wide">Option</th>
            </tr>
          </thead>
          <tbody>
  {filteredAccidents.map((accident) => (
    <tr key={accident.id} className='text-center'>
      <td className="p-3">{accident.A?.A3 || 'N/A'}</td>
      <td className="p-3">{accident.A?.A5 || 'N/A'}</td>
      <td className="p-3">{accident.A?.A2 || 'N/A'}</td>
      <td className="p-3">{getStatus(accident.submit, accident.oicApp, accident.headApp)}</td>
      <td className="text-center p-3">
        <button className="bg-yellow-button hover:bg-yellow text-black font-semibold py-1 px-1 rounded text-sm"
        onClick={() => handleDetails(accident)}
        >  
        Details
        </button>
      </td>
    </tr>
  ))}
</tbody>

        </table>
      </div>

      {selectedReport && (
        <AccidentDetailsModal
          report={selectedReport}
          getStatus={getStatus}
          getUrban={getUrban}
          A8F={A8F}
          A9F={A9F}
          A20F={A20F}
          A21F={A21F}
          A22F={A22F}
          A23F={A23F}
          A24F={A24F}
          A25F={A25F}
          A26F={A26F}
          A27F={A27F}
          A30F={A30F}
          onClose={closeDetails}
        />
      )}

    </div>
  );
};

export default AccidentProgress;
