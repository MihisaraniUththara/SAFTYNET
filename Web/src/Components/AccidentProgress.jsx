import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Ensure your Firebase config is correct
import { collection, getDocs, query, orderBy, updateDoc, doc } from 'firebase/firestore';

const AccidentProgress = () => {
  const [accidents, setAccidents] = useState([]);

  useEffect(() => {
    const fetchAccidents = async () => {
      try {
        const accidentQuery = query(
          collection(db, 'accident_report'),
          orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(accidentQuery);

        const accidentsData = [];

        for (const docSnap of querySnapshot.docs) {
          let accident = docSnap.data();

          // Ensure fields submit, oicApp, headApp exist
          if (!('submit' in accident)) {
            await updateDoc(doc(db, 'accident_report', docSnap.id), {
              submit: 1,
              oicApp: 0,
              headApp: 0,
            });
            accident.submit = 1;
            accident.oicApp = 0;
            accident.headApp = 0;
          }

          // Log each accident to verify fields
          console.log('Fetched accident:', accident);

          accidentsData.push({
            id: docSnap.id,
            ...accident,
          });
        }

        setAccidents(accidentsData);
      } catch (error) {
        console.error('Error fetching accidents:', error);
      }
    };

    fetchAccidents();
  }, []);

  const getStatus = (submit, oicApp, headApp) => {
    if (submit === 1 && oicApp === 0 && headApp === 0) {
      return (
        <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
          Pending
        </span>
      );
    }
    if (submit === 1 && oicApp === 1 && headApp === 0) {
      return (
        <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
          In Progress
        </span>
      );
    }
    if (submit === 1 && oicApp === 1 && headApp === 1) {
      return (
        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
          Completed
        </span>
      );
    }
    return (
      <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
        Pending
      </span>
    );
  };

  return (
    <div className="bg-white px-4 pb-4 py-4 rounded-sm border border-gray-200 text-black w-full">
      <strong><h1><center>Recent Accidents</center></h1></strong>
      <div className="mt-3 p-3">
        <table className="w-full table-auto">
          <thead className="bg-gray-100 border-gray-400 font-semibold">
            <tr>
              <th className="p-3 tracking-wide">Date</th>
              <th className="p-3 tracking-wide">Accident ID</th>
              <th className="p-3 tracking-wide">Station</th>
              <th className="p-3 tracking-wide">Status</th>
              <th className="p-3 tracking-wide">Option</th>
            </tr>
          </thead>
          <tbody>
  {accidents.map((accident) => (
    <tr key={accident.id} className='text-center'>
      <td className="p-3">{accident.A?.A3 || 'N/A'}</td>
      <td className="p-3">{accident.A?.A5 || 'N/A'}</td>
      <td className="p-3">{accident.A?.A2 || 'N/A'}</td>
      <td className="p-3">{getStatus(accident.submit, accident.oicApp, accident.headApp)}</td>
      <td className="text-center p-3">
        <button className="bg-yellow-button hover:bg-yellow text-black font-semibold py-1 px-1 rounded text-sm">
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
