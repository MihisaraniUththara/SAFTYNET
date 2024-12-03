import React, { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Context/AuthContext';
import { db } from '../../firebase';
import { collection, query, where, updateDoc, doc, onSnapshot, getDocs } from 'firebase/firestore';

const DutyNight = () => {
  const { currentUser } = useContext(AuthContext);
  const [station, setStation] = useState(null);
  const [policeList, setPoliceList] = useState([]);

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

  // Listen for real-time updates
  useEffect(() => {
    let unsubscribe;

    if (station) {
      const policeQuery = query(
        collection(db, 'police'),
        where('station', '==', station),
        where('day', '==', false),
        where('night', '==', false),
        where('role', 'not-in', ['OIC', 'TrafficH'])
      );

      unsubscribe = onSnapshot(policeQuery, (snapshot) => {
        const data = [];
        snapshot.forEach((doc) => {
          const policeData = doc.data();
          
          // Add default fields if missing
          const updates = {};
          if (policeData.day === undefined) updates.day = false;
          if (policeData.night === undefined) updates.night = false;

          if (Object.keys(updates).length > 0) {
            const policeRef = doc.ref;
            updateDoc(policeRef, updates);
          }

          data.push({ id: doc.id, ...policeData });
        });
        setPoliceList(data);
      }, (error) => {
        console.error('Error fetching real-time data:', error);
      });
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [station]);

  // Assign night duty
  const handleAssign = async (id) => {
    try {
      const policeRef = doc(db, 'police', id);
      await updateDoc(policeRef, { night: true });
      Swal.fire('Assigned!', 'Assigned Night Duty Successfully.', '(6.00 AM - 6.00 PM)', 'success');
    } catch (error) {
      console.error('Error assigning night duty:', error);
    }
  };

  // Show details
  const handleDetails = (police) => {
    Swal.fire({
      title: 'Officer Details',
      html: `
        <div style="text-align: left;">
          <p><strong>Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;</strong> ${police.name}</p>
          <p><strong>Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;</strong> ${police.email}</p>
          <p><strong>Phone Number:&nbsp;&nbsp;&nbsp;</strong> ${police.phoneNumber}</p>
          <p><strong>Badge Number:&nbsp;&nbsp;&nbsp;</strong> ${police.badgeNumber}</p>
          <p><strong>NIC Number&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;</strong> ${police.nic}</p>
        </div>
      `,
    });
  };
  

  return (
    <div className='bg-white px-4 pb-4 py-4 rounded-sm border border-gray-200 text-black w-full'>
      <strong>
        <h1>
          <center>Night Shift</center>
        </h1>
      </strong>
      <div className='mt-3 p-3'>
        <table className='w-full table-auto'>
          <thead className='bg-gray-100 border-gray-400 font-semibold'>
            <tr>
              <th className='p-3 tracking-wide'>Name</th>
              <th className='p-3 tracking-wide'>E-mail</th>
              <th className='p-3 tracking-wide'>Phone Number</th>
              <th className='p-3 tracking-wide'>Badge Number</th>
              <th className='p-3 tracking-wide'>Duty</th>
              <th className='p-3 tracking-wide'>Option</th>
            </tr>
          </thead>
          <tbody>
            {policeList.map((police) => (
              <tr key={police.id}>
                <td className='p-3'>{police.name}</td>
                <td className='p-3'>{police.email}</td>
                <td className='p-3'>{police.phoneNumber}</td>
                <td className='p-3'>{police.badgeNumber}</td>
                <td className='p-3 text-center'>
                  <button
                    className='bg-green-500 hover:bg-green-600 text-black font-semibold py-1 px-2 rounded text-sm mr-2'
                    onClick={() => handleAssign(police.id)}
                  >
                    Assign
                  </button>
                </td>
                <td className='p-3 text-center'>
                  <button
                    className='bg-yellow-button hover:bg-yellow text-black font-semibold py-1 px-2 rounded text-sm'
                    onClick={() => handleDetails(police)}
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

export default DutyNight;
