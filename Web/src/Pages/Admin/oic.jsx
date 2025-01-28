import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, query, orderBy, updateDoc, doc, where } from 'firebase/firestore';

const oic = () => {

  const [oicDetails, setOicDetails] = useState([]);
  const [filteredDetails, setFilteredDetails] = useState([]);
  const [stationFilter, setStationFilter] = useState('');
  const [stationList, setStationList] = useState([]);
  const [officerNameFilter, setOfficerNameFilter] = useState('');

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedOfficer, setSelectedOfficer] = useState(null);
  const [division, setDivision] = useState('');
  const [badgeNumbers, setBadgeNumbers] = useState([]);
  const [nics, setNics] = useState([]);
  const [officerNames, setOfficerNames] = useState([]);

  const [station, setStation] = useState('');
  const [policeData, setPoliceData] = useState([]);

  const [formData, setFormData] = useState({
    badgeNumber: '',
    nic: '',
    name: '',
  });

  // Fetch OIC details from `oic` collection
  useEffect(() => {
    const fetchOICDetails = async () => {
      try {
        const oicQuery = query(
          collection(db, 'oic'),
          orderBy('station', 'asc') // Sort alphabetically by station
        );

        const snapshot = await getDocs(oicQuery);
        const oicData = snapshot.docs.map((doc) => ({
          id: doc.id,
          station: doc.data().station || '', // Default to an empty string if missing
          name: doc.data().name || '',
          ...doc.data(),
        }));

        setOicDetails(oicData);
        setFilteredDetails(oicData);
      } catch (error) {
        console.error('Error fetching OIC details:', error);
      }
    };

    fetchOICDetails();
  }, []);

  // Fetch station list from `police_station` collection
  useEffect(() => {
    const fetchStations = async () => {
      try {
        const stationSnapshot = await getDocs(collection(db, 'police_stations'));
        const stationData = stationSnapshot.docs.map((doc) => doc.data().station_name || '');
        setStationList(stationData.sort());
      } catch (error) {
        console.error('Error fetching station list:', error);
      }
    };

    fetchStations();
  }, []);



  // Fetch badgeNumbers, nics, and officer names
  useEffect(() => {
    const fetchPoliceDetails = async () => {
      try {
        const policeSnapshot = await getDocs(collection(db, 'police'));
        const policeData = policeSnapshot.docs.map((doc) => doc.data());
        setBadgeNumbers(policeData.map((p) => p.badgeNumber));
        setNics(policeData.map((p) => p.nic));
        setOfficerNames(policeData.map((p) => p.name));
      } catch (error) {
        console.error('Error fetching police details:', error);
      }
    };

    fetchPoliceDetails();
  }, []);

   // Fetch police data
   useEffect(() => {
    const fetchPoliceData = async () => {
      const policeSnapshot = await getDocs(collection(db, 'police'));
      const policeList = policeSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPoliceData(policeList);
    };

    fetchPoliceData();
  }, []);


  // Handle filters
  useEffect(() => {
    const filtered = oicDetails.filter((oic) => {
      const matchesStation =
      stationFilter === '' || (oic.station && oic.station.toLowerCase() === stationFilter.toLowerCase());      
      const matchesName =
      officerNameFilter === '' || (oic.name && oic.name.toLowerCase().includes(officerNameFilter.toLowerCase()));
    return matchesStation && matchesName;
    });

    setFilteredDetails(filtered);
  }, [stationFilter, officerNameFilter, oicDetails]);








// new............................................



  // Handle update button click
  const handleUpdateClick =  async (oic) => {
    setSelectedOfficer(oic);
    setStation(oic.station); // Set station field for updating the police collection
    setFormData({
      badgeNumber: oic.badgeNumber || '',
      nic: oic.nic || '',
      name: oic.name || '',
      email: oic.email || '',
    dob: oic.dob || '',
    phone: oic.phone || '',
    appointmentDate: oic.appointmentDate || '',
    });

    // Fetch division for the selected station
      const stationSnapshot = await getDocs(
        query(collection(db, 'police_stations'), where('station_name', '==', oic.station))
      );
      if (!stationSnapshot.empty) {
        setDivision(stationSnapshot.docs[0].data().division.toUpperCase());
      }

    setIsPopupOpen(true);
  };

  // Handle form field changes
  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Update other fields dynamically based on the selected value
    if (field === 'badgeNumber' || field === 'nic' || field === 'name') {
      const selectedPolice = policeData.find((police) => police[field] === value);
      if (selectedPolice) {
        setFormData({
          badgeNumber: selectedPolice.badgeNumber,
          nic: selectedPolice.nic,
          name: selectedPolice.name,
          email: selectedPolice.email,
          dob: selectedPolice.dob,
          appointmentDate: selectedPolice.appointmentDate,
          phone: selectedPolice.phone || selectedPolice.phoneNumber,
        });
      }
    }
  };

  // Handle popup close
  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedOfficer(null);
    setFormData({
      badgeNumber: '',
      nic: '',
      name: '',
    });
  };

  // Handle form submission
  const handleUpdateOfficer = async (e) => {
    e.preventDefault();

    if (!selectedOfficer) return;

    // Default appointmentDate if not set
  const defaultAppointmentDate = '2010-09-11';

    // Update the selected OIC document in the Firestore `oic` collection
    const oicDocRef = doc(db, 'oic', selectedOfficer.id);
    await updateDoc(oicDocRef, {
      badgeNumber: formData.badgeNumber,
      nic: formData.nic,
      name: formData.name,
      email: formData.email || selectedOfficer.email || '', // Use updated email or fallback to existing
      dob: formData.dob || selectedOfficer.dob || '',       // Use updated DOB or fallback
      phone: formData.phone || selectedOfficer.phone || '', // Use updated phone or fallback
      appointmentDate: formData.appointmentDate || selectedOfficer.appointmentDate || defaultAppointmentDate,
  });

    // Update the corresponding police document in the Firestore `police` collection
    const selectedPolice = policeData.find((police) => police.badgeNumber === formData.badgeNumber);
    if (selectedPolice) {
      const policeDocRef = doc(db, 'police', selectedPolice.id);
      await updateDoc(policeDocRef, {
        station,
        role: 'OIC',
      });
    }

    alert('Officer details updated successfully!');
    handleClosePopup();
  };










// new end...................................


  return (
    <div className="bg-white px-4 pb-4 pt-4 py-4 rounded-sm border border-gray-200 text-black w-full">
      <strong>
        <h1 className="text-2xl font-bold text-center text-black">
          <center>OIC (Officer Incharge) Details</center>
        </h1>
      </strong>

{/* Filters */}
<div className="mt-4 mb-3 flex gap-4">
        {/* Station Filter */}
        <div className="relative w-1/2">
          <input
            type="text"
            placeholder="Filter by station"
            value={stationFilter}
            onChange={(e) => setStationFilter(e.target.value)}
            className="border px-3 py-2 rounded-md w-full"
          />
          {stationFilter && (
            <div className="absolute z-10 bg-white border rounded-md shadow-md max-h-40 overflow-y-auto mt-1 w-full">
              {stationList
  .filter((station) =>
    station && station.toLowerCase().includes(stationFilter.toLowerCase())
  )
                .map((station, index) => (
                  <div
                    key={index}
                    onClick={() => setStationFilter(station)}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {station}
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Officer Name Filter */}
        <input
          type="text"
          placeholder="Filter by officer name"
          value={officerNameFilter}
          onChange={(e) => setOfficerNameFilter(e.target.value)}
          className="border px-3 py-2 rounded-md w-1/2"
        />
      </div>


      <div className="mt-3 p-3">
        <table className="w-full table-auto">
          <thead className="bg-gray-100 border-gray-400 font-semibold">
            <tr>
              <th className="p-3 tracking-wide">Station</th>
              <th className="p-3 tracking-wide">Officer Name</th>
              <th className="p-3 tracking-wide">Officer ID</th>
              <th className="p-3 tracking-wide">Email</th>
              <th className="p-3 tracking-wide">Phone Number</th>
              <th className="p-3 tracking-wide">Option</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {filteredDetails.map((oic) => (
              <tr key={oic.id} className="border-b border-gray-300">
                <td className="p-3">{oic.station}</td>
                <td className="p-3">{oic.name}</td>
                <td className="p-3">{oic.badgeNumber}</td>
                <td className="p-3">{oic.email}</td>
                <td className="p-3">{oic.phone || oic.phoneNumber}</td>
                <td className="p-3 flex gap-2 justify-center">
                  <button
                    className="bg-yellow-button hover:bg-yellow text-black font-bold px-3 py-1 rounded-md"
                    onClick={() => alert(`Viewing details for ${oic.name}`)}
                  >
                    Details
                  </button>
                  <button
                    className="bg-green-500 text-black font-bold px-3 py-1 rounded-md"
                    onClick={() => handleUpdateClick(oic)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
            </table>
            </div>

            





{/*new changes for pop up */}


      {/* Popup for updating officer details */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 relative">
            <button
              className="absolute top-2 right-2 text-black hover:text-gray-800"
              onClick={handleClosePopup}
            >
              ✖
            </button>
            <h2 className="text-xl font-bold mb-4 text-center">{station}</h2>
            <p className="text-sm text-gray-600 text-center">Division: {division}</p>
            <form onSubmit={handleUpdateOfficer}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Officer ID:</label>
                <select
                  value={formData.badgeNumber}
                  onChange={(e) => handleFieldChange('badgeNumber', e.target.value)}
                  className="border px-3 py-2 rounded-md w-full"
                >
                  <option value="">Select Officer ID</option>
                  {policeData.map((police) => (
                    <option key={police.id} value={police.badgeNumber}>
                      {police.badgeNumber}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">NIC:</label>
                <select
                  value={formData.nic}
                  onChange={(e) => handleFieldChange('nic', e.target.value)}
                  className="border px-3 py-2 rounded-md w-full"
                >
                  <option value="">Select NIC</option>
                  {policeData.map((police) => (
                    <option key={police.id} value={police.nic}>
                      {police.nic}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Officer Name:</label>
                <select
                  value={formData.name}
                  onChange={(e) => handleFieldChange('name', e.target.value)}
                  className="border px-3 py-2 rounded-md w-full"
                >
                  <option value="">Select Officer Name</option>
                  {policeData.map((police) => (
                    <option key={police.id} value={police.name}>
                      {police.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
  <label className="block text-sm font-medium mb-1">Email:</label>
  <input
    type="email"
    value={formData.email}
    onChange={(e) => handleFieldChange('email', e.target.value)}
    className="border px-3 py-2 rounded-md w-full"
  />
</div>
<div className="mb-4">
  <label className="block text-sm font-medium mb-1">Date of Birth:</label>
  <input
    type="date"
    value={formData.dob}
    onChange={(e) => handleFieldChange('dob', e.target.value)}
    className="border px-3 py-2 rounded-md w-full"
  />
</div>
<div className="mb-4">
  <label className="block text-sm font-medium mb-1">Phone:</label>
  <input
    type="tel"
    value={formData.phone}
    onChange={(e) => handleFieldChange('phone', e.target.value)}
    className="border px-3 py-2 rounded-md w-full"
  />
</div>
<div className="mb-4">
  <label className="block text-sm font-medium mb-1">Appointment Date:</label>
  <input
    type="date"
    value={formData.appointmentDate}
    onChange={(e) => handleFieldChange('appointmentDate', e.target.value)}
    className="border px-3 py-2 rounded-md w-full"
  />
</div>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-md w-full"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      )}


{/* new changes end here*/}

          </div>
  )
}


export default oic