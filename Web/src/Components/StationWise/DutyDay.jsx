// import React, { useState, useEffect, useContext } from 'react';
// import Swal from 'sweetalert2';
// import { AuthContext } from '../../Context/AuthContext';
// import { db } from '../../firebase';
// import { collection, query, where, updateDoc, doc, onSnapshot, getDocs } from 'firebase/firestore';

// const DutyDay = () => {
//   const { currentUser } = useContext(AuthContext);
//   const [station, setStation] = useState(null);
//   const [policeList, setPoliceList] = useState([]);

//   // Fetch user's station based on currentUser email
//   useEffect(() => {
//     const fetchStation = async () => {
//       if (currentUser?.email) {
//         try {
//           const stationQuery = query(
//             collection(db, 'police'),
//             where('email', '==', currentUser.email.toLowerCase())
//           );
//           const querySnapshot = await getDocs(stationQuery);
//           if (!querySnapshot.empty) {
//             const policeStation = querySnapshot.docs[0].data()?.station || 'Unknown';
//             setStation(policeStation.toLowerCase()); // Normalize station name
//           } else {
//             setStation(null); // No station found
//           }
//         } catch (error) {
//           console.error('Error fetching station:', error);
//         }
//       }
//     };

//     fetchStation();
//   }, [currentUser]);

//   // Listen for real-time updates
//   useEffect(() => {
//     let unsubscribe;

//     if (station) {
//       const policeQuery = query(
//         collection(db, 'police'),
//         where('station', '==', station),
//         where('day', '==', false),
//         where('night', '==', false),
//         where('role', 'not-in', ['OIC', 'TrafficH'])
//       );

//       unsubscribe = onSnapshot(policeQuery, (snapshot) => {
//         const data = [];
//         snapshot.forEach((doc) => {
//           const policeData = doc.data();
          
//           // Add default fields if missing
//           const updates = {};
//           if (policeData.day === undefined) updates.day = false;
//           if (policeData.night === undefined) updates.night = false;

//           if (Object.keys(updates).length > 0) {
//             const policeRef = doc.ref;
//             updateDoc(policeRef, updates);
//           }

//           data.push({ id: doc.id, ...policeData });
//         });
//         setPoliceList(data);
//       }, (error) => {
//         console.error('Error fetching real-time data:', error);
//       });
//     }

//     return () => {
//       if (unsubscribe) unsubscribe();
//     };
//   }, [station]);

//   // Assign day duty
//   const handleAssign = async (id) => {
//     try {
//       const policeRef = doc(db, 'police', id);
//       await updateDoc(policeRef, { day: true });
//       Swal.fire('Assigned!', 'Assigned Day Shift Successfully.', '(6.00 PM - 6.00 AM)', 'success');
//     } catch (error) {
//       console.error('Error assigning Day Shift:', error);
//     }
//   };

//   // Show details
//   const handleDetails = (police) => {
//     Swal.fire({
//       title: 'Officer Details',
//       html: `
//         <div style="text-align: left;">
//           <p><strong>Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;</strong> ${police.name}</p>
//           <p><strong>Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;</strong> ${police.email}</p>
//           <p><strong>Phone Number:&nbsp;&nbsp;&nbsp;</strong> ${police.phoneNumber}</p>
//           <p><strong>Badge Number:&nbsp;&nbsp;&nbsp;</strong> ${police.badgeNumber}</p>
//           <p><strong>NIC Number&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;</strong> ${police.nic}</p>
//         </div>
//       `,
//     });
//   };

//   return (
//     <div className='bg-white px-4 pb-4 py-4 rounded-sm border border-gray-200 text-black w-full'>
//       <strong>
//         <h1>
//           <center>Day Shift</center>
//         </h1>
//       </strong>
//       <div className='mt-3 p-3'>
//         <table className='w-full table-auto text-center'>
//           <thead className='bg-gray-100 border-gray-400 font-semibold'>
//             <tr>
//               <th className='p-3 tracking-wide'>Name</th>
//               <th className='p-3 tracking-wide'>E-mail</th>
//               <th className='p-3 tracking-wide'>Phone Number</th>
//               <th className='p-3 tracking-wide'>Badge Number</th>
//               <th className='p-3 tracking-wide'>Duty</th>
//               <th className='p-3 tracking-wide'>Option</th>
//             </tr>
//           </thead>
//           <tbody>
//             {policeList.map((police) => (
//               <tr key={police.id}>
//                 <td className='p-3'>{police.name}</td>
//                 <td className='p-3'>{police.email}</td>
//                 <td className='p-3'>{police.phoneNumber}</td>
//                 <td className='p-3'>{police.badgeNumber}</td>
//                 <td className='p-3 text-center'>
//                   <button
//                     className='bg-green-500 hover:bg-green-600 text-black font-semibold py-1 px-2 rounded text-sm mr-2'
//                     onClick={() => handleAssign(police.id)}
//                   >
//                     Assign
//                   </button>
//                 </td>
//                 <td className='p-3 text-center'>
//                   <button
//                     className='bg-yellow-button hover:bg-yellow text-black font-semibold py-1 px-2 rounded text-sm'
//                     onClick={() => handleDetails(police)}
//                   >
//                     Details
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default DutyDay;














































import React, { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Context/AuthContext';
import { db } from '../../firebase';
import { collection, query, where, updateDoc, doc, onSnapshot } from 'firebase/firestore';

const DutyDay = () => {
  const { currentUser } = useContext(AuthContext);
  const [station, setStation] = useState(null);
  const [policeList, setPoliceList] = useState([]);

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
            const policeStation = snapshot.docs[0].data()?.station || 'Unknown';
            setStation(policeStation.toLowerCase());
          } else {
            setStation(null);
          }
        });

        return () => unsubscribe(); // Cleanup listener
      }
    };

    fetchStation();
  }, [currentUser]);

  // Real-time updates for police list based on station
  useEffect(() => {
    if (!station) return;

    const policeQuery = query(
      collection(db, 'police'),
      where('station', '==', station),
      where('day', '==', false),
      where('night', '==', false),
      where('role', 'not-in', ['OIC', 'TrafficH'])
    );

    const unsubscribe = onSnapshot(policeQuery, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPoliceList(data);
    });

    return () => unsubscribe(); // Cleanup listener
  }, [station]);

  // Assign day duty
  const handleAssign = async (id) => {
    try {
      const policeRef = doc(db, 'police', id);
      await updateDoc(policeRef, { day: true });
      Swal.fire('Assigned!', 'Assigned Day Shift Successfully.', '(6.00 PM - 6.00 AM)', 'success');
    } catch (error) {
      console.error('Error assigning Day Shift:', error);
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
      <h1 className="text-2xl font-bold text-center text-black">
          <center>Day Shift</center>
        </h1>
      </strong>
      <div className='mt-3 p-3'>
        <table className='w-full table-auto text-center'>
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
                    className='bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-1 px-2 rounded text-sm'
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

export default DutyDay;










// import React, { useState, useEffect, useContext } from 'react';
// import Swal from 'sweetalert2';
// import { AuthContext } from '../../Context/AuthContext';
// import { db } from '../../firebase';
// import { collection, query, where, updateDoc, doc, onSnapshot, getDocs, getDoc } from 'firebase/firestore';
// import { httpsCallable } from 'firebase/functions';
// import { functions } from '../../firebase';

// const DutyDay = () => {
//   const { currentUser } = useContext(AuthContext);
//   const [station, setStation] = useState(null);
//   const [policeList, setPoliceList] = useState([]);

//   // Fetch user's station based on currentUser email
//   useEffect(() => {
//     const fetchStation = async () => {
//       if (currentUser?.email) {
//         try {
//           const stationQuery = query(
//             collection(db, 'police'),
//             where('email', '==', currentUser.email.toLowerCase())
//           );
//           const querySnapshot = await getDocs(stationQuery);
//           if (!querySnapshot.empty) {
//             const policeStation = querySnapshot.docs[0].data()?.station || 'Unknown';
//             setStation(policeStation.toLowerCase()); // Normalize station name
//           } else {
//             setStation(null); // No station found
//           }
//         } catch (error) {
//           console.error('Error fetching station:', error);
//         }
//       }
//     };

//     fetchStation();
//   }, [currentUser]);

//   // Listen for real-time updates
//   useEffect(() => {
//     let unsubscribe;

//     if (station) {
//       const policeQuery = query(
//         collection(db, 'police'),
//         where('station', '==', station),
//         where('day', '==', false),
//         where('night', '==', false),
//         where('role', 'not-in', ['OIC', 'TrafficH'])
//       );

//       unsubscribe = onSnapshot(policeQuery, (snapshot) => {
//         const data = [];
//         snapshot.forEach((doc) => {
//           const policeData = doc.data();
          
//           // Add default fields if missing
//           const updates = {};
//           if (policeData.day === undefined) updates.day = false;
//           if (policeData.night === undefined) updates.night = false;

//           if (Object.keys(updates).length > 0) {
//             const policeRef = doc.ref;
//             updateDoc(policeRef, updates);
//           }

//           data.push({ id: doc.id, ...policeData });
//         });
//         setPoliceList(data);
//       }, (error) => {
//         console.error('Error fetching real-time data:', error);
//       });
//     }

//     return () => {
//       if (unsubscribe) unsubscribe();
//     };
//   }, [station]);

//   // Assign day duty
//   const handleAssign = async (id) => {
//     try {
//       const policeRef = doc(db, 'police', id);
//       const policeDoc = await getDoc(policeRef);
//       const policeData = policeDoc.data();
  
//       if (policeData?.phoneNumber) {
//         const sendDutyNotification = httpsCallable(functions, 'sendDutyNotification');
//         await sendDutyNotification({
//           phoneNumber: policeData.phoneNumber,
//           message: `You have been assigned to the day shift (6.00 AM - 6.00 PM). Please report to your station on time.`,
//         });
//         await updateDoc(policeRef, { day: true });
  
//         Swal.fire('Assigned!', 'Assigned Day Shift Successfully.', 'success');
//       } else {
//         Swal.fire('Error!', 'Phone number not found.', 'error');
//       }
//     } catch (error) {
//       console.error('Error assigning Day Shift:', error);
//       Swal.fire('Error!', 'Failed to assign shift.', 'error');
//     }
//   };

//   // Show details
//   const handleDetails = (police) => {
//     Swal.fire({
//       title: 'Officer Details',
//       html: 
//         <div style="text-align: left;">
//           <p><strong>Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;</strong> ${police.name}</p>
//           <p><strong>Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;</strong> ${police.email}</p>
//           <p><strong>Phone Number:&nbsp;&nbsp;&nbsp;</strong> ${police.phoneNumber}</p>
//           <p><strong>Badge Number:&nbsp;&nbsp;&nbsp;</strong> ${police.badgeNumber}</p>
//           <p><strong>NIC Number&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;</strong> ${police.nic}</p>
//         </div>
//       ,
//     });
//   };

//   return (
//     <div className='bg-white px-4 pb-4 py-4 rounded-sm border border-gray-200 text-black w-full'>
//       <strong>
//         <h1>
//           <center>Day Shift</center>
//         </h1>
//       </strong>
//       <div className='mt-3 p-3'>
//         <table className='w-full table-auto text-center'>
//           <thead className='bg-gray-100 border-gray-400 font-semibold'>
//             <tr>
//               <th className='p-3 tracking-wide'>Name</th>
//               <th className='p-3 tracking-wide'>E-mail</th>
//               <th className='p-3 tracking-wide'>Phone Number</th>
//               <th className='p-3 tracking-wide'>Badge Number</th>
//               <th className='p-3 tracking-wide'>Duty</th>
//               <th className='p-3 tracking-wide'>Option</th>
//             </tr>
//           </thead>
//           <tbody>
//             {policeList.map((police) => (
//               <tr key={police.id}>
//                 <td className='p-3'>{police.name}</td>
//                 <td className='p-3'>{police.email}</td>
//                 <td className='p-3'>{police.phoneNumber}</td>
//                 <td className='p-3'>{police.badgeNumber}</td>
//                 <td className='p-3 text-center'>
//                   <button
//                     className='bg-green-500 hover:bg-green-600 text-black font-semibold py-1 px-2 rounded text-sm mr-2'
//                     onClick={() => handleAssign(police.id)}
//                   >
//                     Assign
//                   </button>
//                 </td>
//                 <td className='p-3 text-center'>
//                   <button
//                     className='bg-yellow-button hover:bg-yellow text-black font-semibold py-1 px-2 rounded text-sm'
//                     onClick={() => handleDetails(police)}
//                   >
//                     Details
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default DutyDay;