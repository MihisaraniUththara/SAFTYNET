import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';

const Analysis = () => {
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');
  const [analysType, setAnalysType] = useState('');
  const navigate = useNavigate();
  const [station, setStation] = useState(null);
  const { currentUser } = useContext(AuthContext);

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
    if (!startYear || !endYear || !analysType || !station) {
          alert('Please select start year, end year, and analys type.');
      return;
    }
    // Navigate to AccidentsReport with query parameters
    navigate(`/analysis/station/annual?startYear=${startYear}&endYear=${endYear}&type=${analysType}&station=${station}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen mt-10">
      <div className="max-w-4xl mx-auto bg-gray-50 p-5 rounded-md shadow-md">
        <h1 className="text-2xl font-bold text-center text-black">Analysis</h1>
        <div className='flex-wrap '>
        <div className="mb-4 rounded-md shadow-md p-3">
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
        <label className="block font-medium mb-2 text-black">Select Analysis Type:</label>
        <select
          value={analysType}
          onChange={(e) => setAnalysType(e.target.value)}
          className="w-full p-2 border rounded-md text-black"
        >
          <option value="">-- Select Analys Type --</option>
          <option value="day">Accidents By Day</option>
          <option value="urban">Accidents By Urban/Rural</option>
          <option value="vehicle">Accidents By Vehicle</option>
          <option value="severity">Accidents By severity</option>
          <option value="age">Accidents By Age</option>
          <option value="gender">Accidents By Gender</option>
        </select>
      </div>

      <button
        onClick={handleGenerateReport}
        className="w-full bg-yellow-button text-black font-semibold py-2 rounded-md hover:bg-yellow"
      >
        Analyze
      </button>
    </div>
</div>
</div>



        </div>
    </div>
  )
}

export default Analysis





