import React, { useState, useEffect } from 'react'
import { db } from '../firebase'; // Import your firebase config here
import { collection, getDocs, query, orderBy, addDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';

const AccidentProgress = () => {
  const [accidents, setAccidents] = useState([]);

  useEffect(() => {
    const fetchAccidents = async () => {
      const accidentQuery = query(collection(db, 'accident_report'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(accidentQuery);
      
      const accidentsData = [];
      
      querySnapshot.forEach(async (docSnap) => {
        let accident = docSnap.data();
        
        // Check if submit, oicApp, and headApp fields exist, if not create them with default values
        if (!accident.submit) {
          await updateDoc(doc(db, 'accident_report', docSnap.id), {
            submit: 1,
            oicApp: 0,
            headApp: 0,
          });
          accident.submit = 1;
          accident.oicApp = 0;
          accident.headApp = 0;
        }

        accidentsData.push({
          id: docSnap.id,
          ...accident,
        });
      });
      
      setAccidents(accidentsData);
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
    return(
    <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
    Pending
  </span>);
  };

  return (
    <div className='bg-white px-4 pb-4 py-4 rounded-sm border border-gray-200 text-black w-full'>
      <strong><h1><center>Recent Accidents</center></h1></strong>
      <div className='mt-3 p-3'>
        <table className='w-full table-auto'>
          <thead className='bg-gray-100 border-gray-400 font-semibold'>
            <tr>
              <th className='p-3 tracking-wide'>Date</th>
              <th className='p-3 tracking-wide'>Accident Id</th>
              <th className='p-3 tracking-wide'>Station</th>
              <th className='p-3 tracking-wide'>Status</th>
              <th className='p-3 tracking-wide'>Option</th>
            </tr>
          </thead>
          <tbody>
            {accidents.map((accident) => (
              <tr key={accident.id}>
                <td className='p-3'>{accident.A3}</td> {/* A3: Date */}
                <td className='p-3'>{accident.A5}</td> {/* A5: AccidentId */}
                <td className='p-3'>{accident.A2}</td> {/* A2: Station */}
                <td className='p-3'>{getStatus(accident.submit, accident.oicApp, accident.headApp)}</td>
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
