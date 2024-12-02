import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, Timestamp, orderBy } from 'firebase/firestore';
import AccidentDetailsModal from './../Components/StationWise/Model/AccidentDetailsModal';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { db } from '../firebase'; // Ensure you configure Firebase correctly

const AccidentDetails = () => {
  const [accidents, setAccidents] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedSeverity, setSelectedSeverity] = useState('');
  const [stationFilter, setStationFilter] = useState(''); 


  const fetchAccidentData = async () => {
    try {
      // Query to filter accident reports based on submit, oicApp, and headApp
      let q = query(
        collection(db, 'accident_report'),
        orderBy('createdAt', 'desc'),
        where('submit', '==', 1),
        where('oicApp', '==', 1),
        where('headApp', '==', 1)
      );

      if (startDate && endDate) {
        q = query(
          q,
          where('createdAt', '>=', Timestamp.fromDate(startDate)),
          where('createdAt', '<=', Timestamp.fromDate(endDate))
        );
      }

      if (selectedSeverity) {
        q = query(q, where('A.A6', '==', (selectedSeverity)));
      }

      if (stationFilter.trim()) {
        // Case-insensitive filtering
        q = query(q, where('A.A2', '>=', stationFilter.toLowerCase()), where('A.A2', '<=', stationFilter.toLowerCase() + '\uf8ff'));
      }
  
      

      const querySnapshot = await getDocs(q);
      const accidentData = [];



      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();

        if (data.A) {
          accidentData.push({
            date: data.A?.A3 || 'N/A', // A3 is Date
            time: data.A?.A4 || 'N/A', // A4 is Time
            accidentId: data.A?.A5 || 'N/A', // A5 is Accident ID
            station: data.A?.A2 || 'N/A', // A2 is Station
            action: data.A?.A30 || null, // A30 is Action
            severity: data.A?.A6 || null,// A6 is Severity
            AccidentId: data.A?.A5 || 'N/A',
            Urban_Rural: data.A?.A7 || '0',
            A8: data.A?.A8 || '0',
            A9: data.A?.A9 || '0',
            A10: data.A?.A10 || 'NO Road Number',
            A11: data.A?.A11 || 'No Road Name',
            A20: data.A?.A20 || '0',
            A21: data.A?.A21 || '0',
            A22: data.A?.A22 || '0',
            A23: data.A?.A23 || '0',
            A24: data.A?.A24 || '0',
            A25: data.A?.A25 || '0',
            A26: data.A?.A26 || '0',
            A27: data.A?.A27 || '0',
            A30: data.A?.A30 || '0',
            A28: data.A?.A28 || '60',
            A29: data.A?.A29 || '40',
            A31: data.A?.A31 || 'No prosecution',
            submit: data.submit || 0,
            oicApp: data.oicApp || 0,
            headApp: data.headApp || 0,
          });
        }
      });

      setAccidents(accidentData);
    } catch (error) {
      console.error('Error fetching accident data:', error);
    }
  };

  useEffect(() => {
    fetchAccidentData();
  }, [startDate, endDate, selectedSeverity, stationFilter]);

  const getActionText = (actionCode) => {
    const actions = {
      1: 'Prosecution initiated',
      2: 'No prosecution',
      3: 'Parties Settled',
      4: 'Offender unknown',
      5: 'Not known',
      null: 'NULL',
    };
    return actions[actionCode] || 'Unknown';
  };

  const getSeverityText = (severityCode) => {
    const severities = {
      1: 'Fatal',
      2: 'Serious',
      3: 'Minor',
      4: 'Damages only',
    };
    return severities[severityCode] || 'Unknown';
  };

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
      return <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
      Pending
    </span>;
    }
    if (submit === 1 && oicApp === 1 && headApp === 0) {
      return <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
      In Progress
    </span>;
    }
    if (submit === 1 && oicApp === 1 && headApp === 1) {
      return <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
      Completed
    </span>;
    }
    if (submit === 0 && oicApp === 0 && headApp === 0) {
      return <span className="inline-flex items-center rounded-md bg-red-200 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
      Rejected
    </span>;
    }
    return <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
    Unknown
  </span>
;
  };

  const handleDetails = (report) => {
    setSelectedReport(report);
  };

  const closeDetails = () => {
    setSelectedReport(null);
  };


  return (
    <div className='bg-white px-4 pb-4 py-4 rounded-sm border border-gray-200 text-black w-full'>
      <strong>
        <h1>
          <center>Accident Details</center>
        </h1>
      </strong>

      <div className="date-filters flex flex-wrap items-center gap-4 p-3 mt-2 bg-gray-100 rounded-md">
  <div className="flex items-center gap-3 ml-8">
    <label className="font-medium">Start Date:</label>
    <DatePicker
      className="p-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
      selected={startDate}
      onChange={(date) => setStartDate(date)}
    />
  </div>

  <div className="flex items-center gap-3">
    <label className="font-medium">End Date:</label>
    <DatePicker
      className="p-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
      selected={endDate}
      onChange={(date) => setEndDate(date)}
    />
  </div>

  <div className="flex items-center gap-3">
    <label className="font-medium">Severity:</label>
    <select
      className="p-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
      value={selectedSeverity}
      onChange={(e) => setSelectedSeverity(e.target.value)}
    >
      <option value="">All</option>
      <option value="1">Fatal</option>
      <option value="2">Serious</option>
      <option value="3">Minor</option>
      <option value="4">Damages only</option>
    </select>
  </div>

  <div className="flex items-center gap-3">
          <label className="font-medium">Station:</label>
          <input
            type="text"
            className="p-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            placeholder="Type station name"
            value={stationFilter}
            onChange={(e) => setStationFilter(e.target.value)}
          />
        </div>

  {/* <div className="flex justify-end mt-2 sm:mt-0">
    <button
      className="bg-yellow-button hover:bg-yellow text-black font-semibold py-2 px-4 rounded text-sm"
      onClick={fetchAccidentData}
    >
      Apply
    </button>
  </div> */}
</div>


      <div className='mt-3 p-3'>
        <table className='w-full table-auto'>
          <thead className='bg-gray-100 border-gray-400 font-semibold'>
            <tr>
              <th className='p-3 tracking-wide'>Date</th>
              <th className='p-3 tracking-wide'>Time</th>
              <th className='p-3 tracking-wide'>Accident Id</th>
              <th className='p-3 tracking-wide'>Station</th>
              <th className='p-3 tracking-wide'>Action</th>
              <th className='p-3 tracking-wide'>Severity</th>
              <th className='p-3 tracking-wide'>Option</th>
            </tr>
          </thead>
          <tbody>
            {accidents.map((accident, index) => (
              <tr key={index} className='border-b'>
                <td className='text-center p-3'>{accident.date}</td>
                <td className='text-center p-3'>{accident.time}</td>
                <td className='text-center p-3'>{accident.accidentId}</td>
                <td className='text-center p-3'>{accident.station}</td>
                <td className='text-center p-3'>{getActionText(accident.action)}</td>
                <td className='text-center p-3'>{getSeverityText(accident.severity)}</td>
                <td className='text-center p-3'>
                  <button className='bg-yellow-button hover:bg-yellow text-black font-semibold py-1 px-1 rounded text-sm'
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

export default AccidentDetails;
