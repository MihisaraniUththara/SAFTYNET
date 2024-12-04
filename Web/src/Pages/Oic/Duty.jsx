import React, { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Context/AuthContext';
import { db } from '../../firebase';
import { collection, query, where, onSnapshot, doc, updateDoc, getDocs } from 'firebase/firestore';

const Duty = () => {
  const { currentUser } = useContext(AuthContext);
  const [station, setStation] = useState(null);
  const [dayShiftOfficers, setDayShiftOfficers] = useState([]);
  const [nightShiftOfficers, setNightShiftOfficers] = useState([]);

  // Fetch user's station based on currentUser email
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

  // Fetch officers for Day and Night shifts, excluding roles "OIC" and "TrafficH"
  useEffect(() => {
    if (!station) return;

    const officerQuery = query(
      collection(db, 'police'),
      where('station', '==', station),
      where('role', 'not-in', ['OIC', 'TrafficH'])
    );

    const unsubscribe = onSnapshot(officerQuery, (snapshot) => {
      const dayShift = [];
      const nightShift = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        const officer = { id: doc.id, name: data.name, email: data.email };

        if (data.day === true) dayShift.push(officer);
        if (data.night === true) nightShift.push(officer);
      });

      setDayShiftOfficers(dayShift);
      setNightShiftOfficers(nightShift);
    });

    return () => unsubscribe();
  }, [station]);

  // Deallocate officer for day or night shift
  const handleDeallocate = async (id, field) => {
    try {
      const officerRef = doc(db, 'police', id);
      await updateDoc(officerRef, { [field]: false });
      Swal.fire('Success', `Officer deallocated from ${field} shift`, 'success');
    } catch (error) {
      console.error(`Error updating ${field} shift:`, error);
      Swal.fire('Error', 'Failed to deallocate officer', 'error');
    }
  };

  return (
    <div className='bg-white w-screen h-screen'>
        <div className='m-3'>
      <h2 className='bg-gray-100 text-center text-black font-bold text-3xl py-2'>Duty Roster</h2>
      <div className='text-black'>
        <h3 className='text-black'>{station && station.charAt(0).toUpperCase() + station.slice(1)}</h3>
        <h3>{station}@gmail.com</h3>

        {/* Day Shift Table */}
        <h2 className='mt-5 bg-gray-200 px-3 py-1 font-semibold text-black'>Day Shift</h2>
        {dayShiftOfficers.length > 0 ? (
          <table className='w-full text-center border mt-3'>
            <thead className='font-semibold'>
              <tr>
                <th className='border px-4 py-2'>Officer Name</th>
                <th className='border px-4 py-2'>Officer Email</th>
                <th className='border px-4 py-2'>Option</th>
              </tr>
            </thead>
            <tbody>
              {dayShiftOfficers.map((officer) => (
                <tr key={officer.id}>
                  <td className='border px-4 py-2'>{officer.name}</td>
                  <td className='border px-4 py-2'>{officer.email}</td>
                  <td className='border px-4 py-2'>
                    <button
                      className='bg-red-500 text-white px-3 py-1 rounded'
                      onClick={() => handleDeallocate(officer.id, 'day')}
                    >
                      Deallocate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className='py-3 px-4 text-red-600 text-center'>No officers on day shift.</p>
        )}

        {/* Night Shift Table */}
        <h2 className='mt-5 bg-gray-200 px-3 py-1 font-semibold text-black'>Night Shift</h2>
        {nightShiftOfficers.length > 0 ? (
          <table className='w-full text-center border mt-3'>
            <thead className='font-semibold'>
              <tr>
                <th className='border px-4 py-2'>Officer Name</th>
                <th className='border px-4 py-2'>Officer Email</th>
                <th className='border px-4 py-2'>Option</th>
              </tr>
            </thead>
            <tbody>
              {nightShiftOfficers.map((officer) => (
                <tr key={officer.id}>
                  <td className='border px-4 py-2'>{officer.name}</td>
                  <td className='border px-4 py-2'>{officer.email}</td>
                  <td className='border px-4 py-2'>
                    <button
                      className='bg-red-500 text-white px-3 py-1 rounded'
                      onClick={() => handleDeallocate(officer.id, 'night')}
                    >
                      Deallocate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className='py-3 px-4 text-red-600 text-center'>No officers on night shift.</p>
        )}
      </div>
    </div>
    </div>
  );
};

export default Duty;

