import React, { useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, doc, onSnapshot, addDoc } from 'firebase/firestore';
import { db } from '../../firebase'; // Make sure to import your Firebase config

const Officers = () => {
  const [officers, setOfficers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedOfficer, setSelectedOfficer] = useState(null);
  const [suspendNote, setSuspendNote] = useState('');

  useEffect(() => {
    // Function to fetch and update data from both collections
    const fetchData = async () => {
      const collections = ['traffic', 'head_office'];
      const officerData = [];

      for (const col of collections) {
        const querySnapshot = await getDocs(collection(db, col));
        querySnapshot.forEach(async (doc) => {
          const data = doc.data();

          // Add fields if they don't exist
          if (!data.hasOwnProperty('retire')) {
            await updateDoc(doc.ref, { retire: false });
          }
          if (!data.hasOwnProperty('day')) {
            await updateDoc(doc.ref, { day: false });
          }
          if (!data.hasOwnProperty('night')) {
            await updateDoc(doc.ref, { night: false });
          }

          // Push the updated data
          // Push the updated data only if `suspend` is false or the field doesn't exist
if ((!data.suspend || data.suspend === false ) && (!data.retire || data.retire == false)) {
    officerData.push({ id: doc.id, collection: col, ...data });
  }
        });
      }
      setOfficers(officerData);
    };

    fetchData();

    // Real-time updates for both collections
    const unsubscribeTraffic = onSnapshot(collection(db, 'traffic'), (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added' || change.type === 'modified') {
          fetchData();
        }
      });
    });

    const unsubscribeHeadOffice = onSnapshot(collection(db, 'head_office'), (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added' || change.type === 'modified') {
          fetchData();
        }
      });
    });

    return () => {
      unsubscribeTraffic();
      unsubscribeHeadOffice();
    };
  }, []);

  const handleSuspend = (officer) => {
    setSelectedOfficer(officer);
    setShowModal(true);
  };

  const handleProceed = async () => {
    if (!selectedOfficer) return;

    try {
        const { id, collection: officerCollection, ...officerData } = selectedOfficer;

      // Update `suspend` field in the relevant collection
      const officerRef = doc(db, officerCollection, id);
      await updateDoc(officerRef, { suspend: true, suspendedAt: new Date().toISOString() });

      // Add document to `suspend` collection
      const suspendRef = collection(db, 'suspend');
      await addDoc(suspendRef, {
        officerId: id, // Officer ID
        name: officerData.name, // Officer Name
        station: officerData.station, // Officer Station
        email: officerData.email, // Officer Email
        phoneNumber: officerData.phoneNumber || officerData.phone, // Officer Phone Number
        suspendNote, // Note entered in the popup
        suspendedAt: new Date().toISOString(), // Current date and time
      });
      
      // Update `suspend` and `suspendedAt` in `police` collection
    const policeRef = doc(db, 'police', id); // Assuming the officer ID is the same
    await updateDoc(policeRef, {
      suspend: true,
      suspendedAt: new Date().toISOString(),
    });
    

      alert('Officer suspended successfully');
    } catch (error) {
      console.error('Error suspending officer:', error);
      alert('Failed to suspend officer');
    }

    // Reset modal and state
    setSuspendNote('');
    setSelectedOfficer(null);
    setShowModal(false);
  };


  return (
    <div className="bg-white px-4 pb-4 pt-4 py-4 rounded-sm border border-gray-200 text-black w-full">
      <strong>
        <h1 className="text-2xl font-bold text-center text-black">
          <center>Officer Details</center>
        </h1>
      </strong>
      <div className="mt-3 p-3">
        <table className="w-full table-auto">
          <thead className="bg-gray-100 border-gray-400 font-semibold">
            <tr>
              <th className="p-3 tracking-wide">Officer ID</th>
              <th className="p-3 tracking-wide">Officer Name</th>
              <th className="p-3 tracking-wide">Station</th>
              <th className="p-3 tracking-wide">Email</th>
              <th className="p-3 tracking-wide">Phone Number</th>
              <th className="p-3 tracking-wide">Option</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {officers.map((officer) => (
              <tr key={officer.id} className="border-b border-gray-300">
                <td className="p-3">{officer.badgeNumber}</td>
                <td className="p-3">{officer.name}</td>
                <td className="p-3">{officer.station}</td>
                <td className="p-3">{officer.email}</td>
                <td className="p-3">{officer.phoneNumber || officer.phone}</td>
                <td className="p-3 flex gap-2">
                  <button
                    className="bg-yellow-button text-white px-3 py-1 rounded-md"
                    onClick={() => alert(`Viewing details for ${officer.name}`)}
                  >
                    Details
                  </button>
                  
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-md"
                    onClick={() => handleSuspend(officer)}
                  >
                    Suspend
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

            {/* Suspend Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-md p-5 w-1/3">
            <h2 className="text-xl font-bold mb-4">Suspend Officer</h2>
            <textarea
              className="w-full p-2 border rounded-md"
              placeholder="Enter suspend note"
              value={suspendNote}
              onChange={(e) => setSuspendNote(e.target.value)}
            ></textarea>
            <div className="mt-4 flex justify-end gap-3">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
                onClick={() => {
                  setShowModal(false);
                  setSuspendNote('');
                  setSelectedOfficer(null);
                }}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={handleProceed}
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}



    </div>
  );
};

export default Officers;
