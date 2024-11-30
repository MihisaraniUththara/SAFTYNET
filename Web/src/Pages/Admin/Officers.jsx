import React, { useState, useEffect } from 'react';
import { db } from '../../firebase'; // Ensure the correct Firebase setup
import { collection, onSnapshot, updateDoc, doc } from 'firebase/firestore';

const Officers = () => {
  const [officers, setOfficers] = useState([]);

  useEffect(() => {
    const officersCollection = collection(db, 'police');

    const unsubscribe = onSnapshot(officersCollection, (snapshot) => {
      const officersData = [];
      const updatePromises = [];

      snapshot.forEach((docSnap) => {
        const docData = docSnap.data();

        // Default values for missing fields
        const defaults = {
          badgeNumber: 59050,
          r_status: 0,
          status: 0,
          status_e: 0,
          status_m: 0,
          status_n: 0,
          day: false,
          night: false,
          duty: false,
        };

        const updatedData = { ...defaults, ...docData };

        if (Object.keys(defaults).some((key) => !(key in docData))) {
          const updatePromise = updateDoc(doc(db, 'police', docSnap.id), updatedData);
          updatePromises.push(updatePromise);
        }

        officersData.push({
          id: docSnap.id,
          ...updatedData,
        });
      });

      // Apply updates and set state
      Promise.all(updatePromises)
        .then(() => setOfficers(officersData))
        .catch((error) => console.error('Error updating documents:', error));
    });

    // Cleanup on unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-white px-4 pb-4 py-4 rounded-sm border border-gray-200 text-black w-full">
      <strong>
        <h1>
          <center>Police Officers</center>
        </h1>
      </strong>
      <div className="mt-3 p-3">
        <table className="w-full table-auto">
          <thead className="bg-gray-100 border-gray-400 font-semibold">
            <tr>
              <th className="p-3 tracking-wide">Name</th>
              <th className="p-3 tracking-wide">Email</th>
              <th className="p-3 tracking-wide">Phone Number</th>
              <th className="p-3 tracking-wide">Station</th>
              <th className="p-3 tracking-wide">Badge Number</th>
            </tr>
          </thead>
          <tbody>
            {officers.map((officer) => (
              <tr key={officer.id} className="border-t text-center">
                <td className="p-3">{officer.name || 'N/A'}</td>
                <td className="p-3">{officer.email || 'N/A'}</td>
                <td className="p-3">{officer.phoneNumber || 'N/A'}</td>
                <td className="p-3">{officer.station || 'N/A'}</td>
                <td className="p-3">{officer.badgeNumber || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Officers;
