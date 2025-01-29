import React, { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Context/AuthContext';
import { db } from '../../firebase';
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore';

const Duty = () => {
  const { currentUser } = useContext(AuthContext);
  const [station, setStation] = useState(null);
  const [dayDutyOfficers, setDayDutyOfficers] = useState([]);
  const [nightDutyOfficers, setNightDutyOfficers] = useState([]);

  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => new Date().toISOString().split('T')[0];

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

  // Fetch duty officers (day or night)
  const fetchDutyOfficers = async (dutyType, setOfficers) => {
    const todayDate = getTodayDate();

    try {
      // Query all duty records for today's date and specific duty type
      const dutyQuery = query(
        collection(db, 'duty'),
        where('date', '==', todayDate),
        where('duty', '==', dutyType)
      );

      const dutySnapshot = await getDocs(dutyQuery);

      if (!dutySnapshot.empty) {
        // Combine emails from all records
        const allEmails = dutySnapshot.docs.flatMap((doc) => doc.data().emails);

        // Remove duplicates
        const uniqueEmails = [...new Set(allEmails)];

        // Query the traffic collection to get details for the emails
        const trafficQuery = query(
          collection(db, 'traffic'),
          where('email', 'in', uniqueEmails)
        );

        const trafficSnapshot = await getDocs(trafficQuery);

        const officers = trafficSnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          email: doc.data().email,
        }));

        setOfficers(officers);
      } else {
        setOfficers([]);
      }
    } catch (error) {
      console.error(`Error fetching ${dutyType} duty officers:`, error);
      setOfficers([]);
    }
  };

  // Fetch Day and Night Duty officers
  useEffect(() => {
    fetchDutyOfficers('day', setDayDutyOfficers);
    fetchDutyOfficers('night', setNightDutyOfficers);
  }, []);

  // Deallocate officer from duty
  const handleDeallocate = async (id, email, dutyType, setOfficers) => {
    try {
      // Update traffic collection to set the duty to false
      const officerRef = doc(db, 'traffic', id);
      await updateDoc(officerRef, { [dutyType]: false });

      // Remove the email from the duty collection
      const todayDate = getTodayDate();
      const dutyQuery = query(
        collection(db, 'duty'),
        where('date', '==', todayDate),
        where('duty', '==', dutyType)
      );

      const dutySnapshot = await getDocs(dutyQuery);

      if (!dutySnapshot.empty) {
        for (const dutyDoc of dutySnapshot.docs) {
          const updatedEmails = dutyDoc.data().emails.filter((e) => e !== email);

          // Update the duty document with the new email list
          const dutyRef = doc(db, 'duty', dutyDoc.id);
          await updateDoc(dutyRef, { emails: updatedEmails });
        }
      }

      Swal.fire('Success', `Officer deallocated from ${dutyType} duty`, 'success');

      // Refresh duty officers
      setOfficers((prev) => prev.filter((officer) => officer.id !== id));
    } catch (error) {
      console.error(`Error deallocating officer from ${dutyType} duty:`, error);
      Swal.fire('Error', `Failed to deallocate officer from ${dutyType} duty`, 'error');
    }
  };

  // Show officer details
  const handleDetails = (officer) => {
    Swal.fire({
      title: 'Officer Details',
      html: `
        <div style="text-align: left;">
          <p><strong>Name:&nbsp;&nbsp;&nbsp;</strong>${officer.name}</p>
          <p><strong>Email:&nbsp;&nbsp;&nbsp;</strong>${officer.email}</p>
        </div>
      `,
    });
  };

  return (
    <div className='bg-white px-4 pb-4 py-4 rounded-sm border border-gray-200 text-black w-full'>
      <h1 className="text-2xl font-bold text-center text-black">Today Duty List</h1>
      <div className='text-black'>
        <h3 className='text-black'>{station && station.charAt(0).toUpperCase() + station.slice(1)}</h3>

        {/* Day Shift */}
        <h2 className='mt-5 bg-gray-200 px-3 py-1 font-semibold text-black'>Day Shift</h2>
        {dayDutyOfficers.length > 0 ? (
          <table className='w-full text-center border mt-3'>
            <thead className='font-semibold'>
              <tr>
                <th className='border px-4 py-2'>Officer Name</th>
                <th className='border px-4 py-2'>Officer Email</th>
                <th className='border px-4 py-2'>Option</th>
              </tr>
            </thead>
            <tbody>
              {dayDutyOfficers.map((officer) => (
                <tr key={officer.id}>
                  <td className='border px-4 py-2'>{officer.name}</td>
                  <td className='border px-4 py-2'>{officer.email}</td>
                  <td className='border px-4 py-2'>
                    <button
                      className='bg-yellow-button text-black px-3 py-1 rounded mr-2'
                      onClick={() => handleDetails(officer)}
                    >
                      Details
                    </button>
                    <button
                      className='bg-red-500 text-white px-3 py-1 rounded'
                      onClick={() => handleDeallocate(officer.id, officer.email, 'day', setDayDutyOfficers)}
                    >
                      Deallocate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className='py-3 px-4 text-red-600 text-center'>No officers on day duty.</p>
        )}

        {/* Night Shift */}
        <h2 className='mt-5 bg-gray-200 px-3 py-1 font-semibold text-black'>Night Shift</h2>
        {nightDutyOfficers.length > 0 ? (
          <table className='w-full text-center border mt-3'>
            <thead className='font-semibold'>
              <tr>
                <th className='border px-4 py-2'>Officer Name</th>
                <th className='border px-4 py-2'>Officer Email</th>
                <th className='border px-4 py-2'>Option</th>
              </tr>
            </thead>
            <tbody>
              {nightDutyOfficers.map((officer) => (
                <tr key={officer.id}>
                  <td className='border px-4 py-2'>{officer.name}</td>
                  <td className='border px-4 py-2'>{officer.email}</td>
                  <td className='border px-4 py-2'>
                    <button
                      className='bg-yellow-button text-black px-3 py-1 rounded mr-2'
                      onClick={() => handleDetails(officer)}
                    >
                      Details
                    </button>
                    <button
                      className='bg-red-500 text-white px-3 py-1 rounded'
                      onClick={() => handleDeallocate(officer.id, officer.email, 'night', setNightDutyOfficers)}
                    >
                      Deallocate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className='py-3 px-4 text-red-600 text-center'>No officers on night duty.</p>
        )}
      </div>
    </div>
  );
};

export default Duty;
