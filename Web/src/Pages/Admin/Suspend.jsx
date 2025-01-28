import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../firebase';

const Suspend = () => {
  const [officers, setOfficers] = useState([]);
  const [filteredOfficers, setFilteredOfficers] = useState([]);
  const [stations, setStations] = useState([]);
  const [filters, setFilters] = useState({
    station: '',
    officerName: '',
    role: '',
  });

  const [selectedOfficer, setSelectedOfficer] = useState(null); // Store officer details for the popup
  const [suspensions, setSuspensions] = useState([]); // Store suspension details for the popup
  const [showPopup, setShowPopup] = useState(false); // Toggle the popup

  useEffect(() => {
    // Real-time fetching of suspended officers
    const fetchOfficers = () => {
      const officersQuery = query(collection(db, 'police'), where('suspend', '==', true));
      const unsubscribe = onSnapshot(officersQuery, (snapshot) => {
        const officersData = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          let role = '';
          if (data.role === 'Traffic') role = 'Traffic Police Officer';
          else if (data.role === 'TrafficH') role = 'Head Office Officer';
          else if (data.role === 'oic') role = 'OIC';
          officersData.push({ id: doc.id, ...data, role });
        });
        setOfficers(officersData);
        setFilteredOfficers(officersData); // Apply initial data to filtered officers
      });
      return unsubscribe;
    };

    // Real-time fetching of police stations
    const fetchStations = () => {
      const unsubscribe = onSnapshot(collection(db, 'police_stations'), (snapshot) => {
        const stationNames = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          if (data.station_name) stationNames.push(data.station_name);
        });
        setStations(stationNames);
      });
      return unsubscribe;
    };

    const unsubscribeOfficers = fetchOfficers();
    const unsubscribeStations = fetchStations();

    return () => {
      unsubscribeOfficers();
      unsubscribeStations();
    };
  }, []);

  // Filter officers dynamically based on input
  useEffect(() => {
    const { station, officerName, role } = filters;
    const filtered = officers.filter((officer) => {
      const matchesStation = station ? officer.station === station : true;
      const matchesOfficerName = officerName
        ? officer.name.toLowerCase().includes(officerName.toLowerCase())
        : true;
      const matchesRole = role ? officer.role === role : true;
      return matchesStation && matchesOfficerName && matchesRole;
    });
    setFilteredOfficers(filtered);
  }, [filters, officers]);

//...............................................
const fetchSuspensions = (email) => {
  const suspensionsQuery = query(collection(db, 'suspend'), where('email', '==', email));
  const unsubscribe = onSnapshot(suspensionsQuery, (snapshot) => {
    const suspensionsData = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      suspensionsData.push({
        id: doc.id,
        ...data,
        suspendedAt: data.suspendedAt ? new Date(data.suspendedAt) : null, // Parse string to Date object
      });
    });

    // Sort by date only if `suspendedAt` is valid
    suspensionsData.sort((a, b) => {
      if (a.suspendedAt && b.suspendedAt) {
        return b.suspendedAt - a.suspendedAt;
      }
      return 0; // Keep invalid dates as is
    });

    setSuspensions(suspensionsData);
  });
  return unsubscribe;
};



  const handleDetailsClick = (officer) => {
    setSelectedOfficer(officer);
    fetchSuspensions(officer.email);
    setShowPopup(true);
  };

//................................................


  return (
    <div className="bg-white px-4 pb-4 pt-4 rounded-sm border border-gray-200 text-black w-full">
      <strong>
        <h1 className="text-2xl font-bold text-center text-black">
          <center>Suspend Officers Details</center>
        </h1>
      </strong>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4 justify-between">
        <div className="flex-1 mt-3">
          
          <select
            id="station"
            className="border rounded w-full px-2 py-1"
            placeholder="Search by Station"
            value={filters.station}
            onChange={(e) => setFilters({ ...filters, station: e.target.value })}
          >
            <option value="">All Stations</option>
            {stations.map((station, index) => (
              <option key={index} value={station}>
                {station}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1 mt-3">
          
          <input
            type="text"
            id="officerName"
            className="border rounded w-full px-2 py-1"
            placeholder="Search by officer name"
            value={filters.officerName}
            onChange={(e) => setFilters({ ...filters, officerName: e.target.value })}
          />
        </div>
        <div className="flex-1 mt-3">
          
          <select
            id="role"
            className="border rounded w-full px-2 py-1"
            placeholder="Search by Role"
            value={filters.role}
            onChange={(e) => setFilters({ ...filters, role: e.target.value })}
          >
            <option value="">All Roles</option>
            <option value="Traffic Police Officer">Traffic Police Officer</option>
            <option value="Head Office Officer">Head Office Officer</option>
            <option value="OIC">OIC</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="mt-3 p-3">
        <table className="w-full table-auto">
          <thead className="bg-gray-100 border-gray-400 font-semibold">
            <tr>
              <th className="p-3 tracking-wide">Station</th>
              <th className="p-3 tracking-wide">Officer Name</th>
              <th className="p-3 tracking-wide">Officer ID</th>
              <th className="p-3 tracking-wide">Email</th>
              <th className="p-3 tracking-wide">Role</th>
              <th className="p-3 tracking-wide">Option</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {filteredOfficers.map((officer) => (
              <tr key={officer.id} className="border-b border-gray-300">
                <td className="p-3">{officer.station}</td>
                <td className="p-3">{officer.name}</td>
                <td className="p-3">{officer.badgeNumber}</td>
                <td className="p-3">{officer.email}</td>
                <td className="p-3">{officer.role}</td>
                <td className="p-3">
                  <button
                    className='bg-yellow-button hover:bg-yellow text-black font-semibold p-2 rounded text-sm'
                    onClick={() => handleDetailsClick(officer)}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    {/* Popup */}
    {showPopup && selectedOfficer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-3/4 max-w-lg">
            <h2 className="text-center text-xl font-bold mb-4">{selectedOfficer.name}</h2>
            <p>Email            : {selectedOfficer.email}</p>
            <p>Officer ID       : {selectedOfficer.badgeNumber}</p>
            <p>Phone Number     : {selectedOfficer.phone}</p>
            <p>Last Work Place  : {selectedOfficer.station}</p>
            <p>Last Worked Role : {selectedOfficer.role}</p>
            <p>Date of Birth    : {selectedOfficer.dob}</p>
            <p>Appointment Date : {selectedOfficer.appointmentDate}</p>

            <h3 className="text-lg font-semibold mt-4 text-red-700">Suspensions</h3>
            {suspensions.map((suspension) => (
              <div key={suspension.id} className="mt-2">
                <p>Suspend Date: {suspension.suspendedAt ? suspension.suspendedAt.toLocaleString() : 'N/A'}</p>
                <p>Reason: {suspension.suspendNote}</p>
              </div>
            ))}
            <center>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded mt-4"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button></center>
          </div>
        </div>
      )}
    </div>
  );
};

export default Suspend;