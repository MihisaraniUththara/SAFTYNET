//After reapeat ....................................................................

import React, { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Context/AuthContext';
import { db } from '../../firebase';
import {
  collection,
  query,
  where,
  updateDoc,
  doc,
  onSnapshot,
  setDoc,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';

const DutyNight = () => {
  const { currentUser } = useContext(AuthContext);
  const [station, setStation] = useState(null);
  const [trafficList, setTrafficList] = useState([]);
  const [selectedOfficers, setSelectedOfficers] = useState([]);

  // Fetch user's station based on currentUser email
  useEffect(() => {
    const fetchStation = async () => {
      if (currentUser?.email) {
        const stationQuery = query(
          collection(db, 'police'),
          where('email', '==', currentUser.email.toLowerCase())
        );

        const unsubscribe = onSnapshot(stationQuery, (snapshot) => {
          if (!snapshot.empty) {
            const userStation = snapshot.docs[0].data()?.station || 'Unknown';
            setStation(userStation);
          } else {
            setStation(null);
          }
        });

        return () => unsubscribe(); // Cleanup listener
      }
    };

    fetchStation();
  }, [currentUser]);

  // Real-time updates for traffic list based on station
  useEffect(() => {
    if (!station) return;

    const fetchTrafficData = async () => {
      const trafficQuery = query(
        collection(db, 'traffic'),
        where('station', '==', station),
        where('day', '==', false),
        where('night', '==', false),
        where('retire', '==', false),
        where('suspend', '==', false)
      );

      const unsubscribe = onSnapshot(trafficQuery, (snapshot) => {
        const data = snapshot.docs.map((trafficDoc) => {
          const trafficData = trafficDoc.data();
          const updatedData = {
            id: trafficDoc.id,
            ...trafficData,
            // Ensure fields are set to false if not defined
            day: trafficData.day ?? false,
            night: trafficData.night ?? false,
            retire: trafficData.retire ?? false,
            suspend: trafficData.suspend ?? false,
          };
          

          

          // Update missing fields in Firestore
          const trafficRef = doc(db, 'traffic', trafficDoc.id);
          updateDoc(trafficRef, {
            day: updatedData.day,
            night: updatedData.night,
            retire: updatedData.retire,
            suspend: updatedData.suspend,
          });

          return updatedData;
        });

        setTrafficList(data);
      });

      return () => unsubscribe(); // Cleanup listener
    };

    fetchTrafficData();
  }, [station]);

  console.log("Current User:", currentUser);
console.log("Station:", station);


  // Handle checkbox selection
  const handleCheckboxChange = (id) => {
    setSelectedOfficers((prev) =>
      prev.includes(id) ? prev.filter((officerId) => officerId !== id) : [...prev, id]
    );
  };

  // // Allocate selected officers to duty
  // const handleAllocate = async () => {
  //   if (selectedOfficers.length === 0) {
  //     Swal.fire('No Officers Selected', 'Please select officers to allocate.', 'warning');
  //     return;
  //   }

  //   try {
  //     const selectedEmails = trafficList
  //       .filter((officer) => selectedOfficers.includes(officer.id))
  //       .map((officer) => officer.email);

  //     await addDoc(collection(db, 'duty'), {
  //       emails: selectedEmails,
  //       date: new Date().toISOString().split('T')[0], // Today’s date
  //       duty: 'day',
  //       createdAt: serverTimestamp(),
  //     });

  //     Swal.fire('Allocated!', 'Officers allocated to day duty successfully.', 'success');

  //     // Clear selections after allocation
  //     setSelectedOfficers([]);
  //   } catch (error) {
  //     console.error('Error allocating duty:', error);
  //     Swal.fire('Error', 'Failed to allocate duty. Please try again.', 'error');
  //   }
  // };



  // Allocate selected officers to duty and update traffic collection
const handleAllocate = async () => {
  if (selectedOfficers.length === 0) {
    Swal.fire('No Officers Selected', 'Please select officers to allocate.', 'warning');
    return;
  }

  try {
    const selectedEmails = trafficList
      .filter((officer) => selectedOfficers.includes(officer.id))
      .map((officer) => officer.email);

    // Update traffic collection for each selected officer
    for (const officerId of selectedOfficers) {
      const officerRef = doc(db, 'traffic', officerId);
      await updateDoc(officerRef, { night: true });
    }

    // Add a new document to the duty collection
    await addDoc(collection(db, 'duty'), {
      emails: selectedEmails,
      date: new Date().toISOString().split('T')[0], // Today’s date
      duty: 'night',
      createdAt: serverTimestamp(),
    });

    Swal.fire('Allocated!', 'Officers allocated to night duty successfully.', 'success');

    // Clear selections after allocation
    setSelectedOfficers([]);
  } catch (error) {
    console.error('Error allocating duty:', error);
    Swal.fire('Error', 'Failed to allocate duty. Please try again.', 'error');
  }
};


  console.log("Traffic List:", trafficList);

  // Show officer details
  const handleDetails = (officer) => {
    Swal.fire({
      title: 'Officer Details',
      html: `
        <div style="text-align: left;">
          <p><strong>Name:&nbsp;&nbsp;&nbsp;</strong>${officer.name}</p>
          <p><strong>Email:&nbsp;&nbsp;&nbsp;</strong>${officer.email}</p>
          <p><strong>Phone:&nbsp;&nbsp;&nbsp;</strong>${officer.phone}</p>
          <p><strong>Badge Number:&nbsp;&nbsp;&nbsp;</strong>${officer.badgeNumber}</p>
          <p><strong>NIC:&nbsp;&nbsp;&nbsp;</strong>${officer.nic}</p>
        </div>
      `,
    });
  };

  return (
    <div className='bg-white px-4 pb-4 py-4 rounded-sm border border-gray-200 text-black w-full'>
      <h1 className='text-2xl font-bold text-center text-black'>Night Duty</h1>
      <div className='mt-3 p-3'>
        <table className='w-full table-auto text-center'>
          <thead className='bg-gray-100 border-gray-400 font-semibold'>
            <tr>
              <th className='p-3 tracking-wide'>Select</th>
              <th className='p-3 tracking-wide'>Officer Name</th>
              <th className='p-3 tracking-wide'>Office ID</th>
              <th className='p-3 tracking-wide'>NIC</th>
              <th className='p-3 tracking-wide'>Phone Number</th>
              <th className='p-3 tracking-wide'>Email</th>
              <th className='p-3 tracking-wide'>Option</th>
            </tr>
          </thead>
          <tbody>
            {trafficList.map((officer) => (
              <tr key={officer.id}>
                <td className='p-3'>
                  <input
                    type='checkbox'
                    checked={selectedOfficers.includes(officer.id)}
                    onChange={() => handleCheckboxChange(officer.id)}
                  />
                </td>
                <td className='p-3'>{officer.name}</td>
                <td className='p-3'>{officer.badgeNumber}</td>
                <td className='p-3'>{officer.nic}</td>
                <td className='p-3'>{officer.phone}</td>
                <td className='p-3'>{officer.email}</td>
                <td className='p-3'>
                  <button
                    className='bg-yellow-button hover:bg-yellow text-black font-semibold py-1 px-2 rounded text-sm'
                    onClick={() => handleDetails(officer)}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='flex justify-end mt-4'>
          <button
            className='bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded'
            onClick={handleAllocate}
          >
            Allocate
          </button>
        </div>
      </div>
    </div>
  );
};

export default DutyNight;
