import React, { useEffect, useState, useContext } from 'react';
import { collection, getDocs, query, where, Timestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { AuthContext } from '../../Context/AuthContext';

const AccidentProgress = () => {
  const { currentUser } = useContext(AuthContext); // Access user context
  const [station, setStation] = useState(null); // State for station
  const [accidentData, setAccidentData] = useState([]);

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
            setStation(policeStation.toLowerCase()); // Normalize station name
          } else {
            setStation(null); // No station found
          }
        } catch (error) {
          console.error('Error fetching station:', error);
        }
      }
    };

    fetchStation();
  }, [currentUser]);

  useEffect(() => {
    const fetchData = async () => {
      if (!station) return;

      try {
        // Calculate timestamp for 30 days ago
        const thirtyDaysAgo = Timestamp.fromDate(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));

        // Query to fetch documents with createdAt within the last 30 days
        const q = query(
          collection(db, 'accident_report'),
          where('A.A1', '==', station.toLowerCase()),
          where('createdAt', '>=', thirtyDaysAgo)
        );

        const querySnapshot = await getDocs(q);

        const data = querySnapshot.docs.map(doc => {
          const docData = doc.data();

          // Extract nested fields
          const accidentInfo = docData.A || {}; // Assume 'A' contains nested fields
          const officerId = docData.officerID || 'N/A'; // officerId in the main doc

          return {
            date: accidentInfo.A3 || 'N/A',
            AccidentId: accidentInfo.A5 || 'N/A',
            InchargeOfficer: officerId || 'N/A',
            Status: docData.status || 'Pending'
          };
        });

        setAccidentData(data);
      } catch (error) {
        console.error('Error fetching accident reports:', error);
      }
    };

    fetchData();
  }, [station]);

  return (
    <div className='bg-white px-4 pb-4 py-4 rounded-sm border border-gray-200 text-black w-full'>
      <strong><h1><center>Recent Accidents</center></h1></strong>
      <div className='mt-3 p-3'>
        <table className='w-full table-auto'>
          <thead className='bg-gray-100 border-gray-400 font-semibold'>
            <tr>
              <th className='p-3 tracking-wide'>Date</th>
              <th className='p-3 tracking-wide'>Accident Id</th>
              <th className='p-3 tracking-wide'>Incharge Officer</th>
              <th className='p-3 tracking-wide'>Status</th>
              <th className='p-3 tracking-wide'>Option</th>
            </tr>
          </thead>
          <tbody>
            {accidentData.map((accident, index) => (
              <tr key={index}>
                <td className='text-center p-3'>{accident.date}</td>
                <td className='text-center p-3'>{accident.AccidentId}</td>
                <td className='text-center p-3'>{accident.InchargeOfficer}</td>
                <td className='text-center p-3 font-semibold'>
                  {accident.Status === 'Pending' && (
                    <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                      Pending
                    </span>
                  )}
                  {accident.Status === 'In Progress' && (
                    <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                      In Progress
                    </span>
                  )}
                  {accident.Status !== 'Pending' && accident.Status !== 'In Progress' && (
                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                      Completed
                    </span>
                  )}
                </td>
                <td className='text-center p-3'>
                  <button className='bg-yellow-button hover:bg-yellow text-black font-semibold py-1 px-1 rounded text-sm'>
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

export default AccidentProgress;
