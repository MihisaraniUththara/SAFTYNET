import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where, setDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase'; // Ensure your Firebase config is correctly imported

const AccidentProgress = () => {
  const [accidentData, setAccidentData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "accident_report"), where("A.A1", "==", "kurunegala")); // Adjust path to access subcollection field
      const querySnapshot = await getDocs(q);

      const data = querySnapshot.docs.map(doc => {
        const docData = doc.data();
        
        // Extract nested fields
        const accidentInfo = docData.A || {}; // Assume 'A' contains nested fields
        const officerId = docData.officerID || "N/A"; // officerId in the main doc
        

        // Add default fields if missing
        if (!docData.submit || !docData.oicApp || !docData.HeadApp) {
          setDoc(doc.ref, { submit: 1, oicApp: 0, HeadApp: 0 }, { merge: true });
        }

        return {
          date: accidentInfo.A3 || "N/A",
          AccidentId: accidentInfo.A5 || "N/A",
          InchargeOfficer: officerId || "N/A",
          Status: docData.status || "Pending"
        };
      });

      setAccidentData(data);
    };

    fetchData();
  }, []);

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
