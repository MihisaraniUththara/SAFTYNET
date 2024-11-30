import React, { useEffect, useState, useContext } from 'react';
import { collection, query, where, Timestamp, onSnapshot, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { AuthContext } from '../../Context/AuthContext';

const AccidentProgressMyCases = () => {
  const { currentUser } = useContext(AuthContext); // Access user context
  const [badgeNumber, setBadgeNumber] = useState(null); // Badge number of current user
  const [accidentData, setAccidentData] = useState([]); // Accident reports

  useEffect(() => {
    const fetchBadgeNumber = async () => {
      if (currentUser?.email) {
        try {
          const policeQuery = query(
            collection(db, 'police'),
            where('email', '==', currentUser.email.toLowerCase())
          );

          const querySnapshot = await getDocs(policeQuery);
          if (!querySnapshot.empty) {
            const policeData = querySnapshot.docs[0].data();
            const fetchedBadgeNumber = policeData.badgeNumber || null;
            setBadgeNumber(fetchedBadgeNumber); // Set badge number
            console.log('Fetched Badge Number:', fetchedBadgeNumber); // Log badge number
          } else {
            setBadgeNumber(null); // No matching badge number
            console.log('No badge number found for the current user.');
          }
        } catch (error) {
          console.error('Error fetching badge number:', error);
        }
      }
    };

    fetchBadgeNumber();
  }, [currentUser]);

  useEffect(() => {
    if (!badgeNumber) return;

    // Calculate timestamp for 30 days ago
    const thirtyDaysAgo = Timestamp.fromDate(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));

    // Real-time Firestore listener for accident reports
    const accidentQuery = query(
      collection(db, 'accident_report'),
      where('officerID', '==', badgeNumber),
      where('createdAt', '>=', thirtyDaysAgo),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(accidentQuery, (querySnapshot) => {
      console.log('Query result size:', querySnapshot.size); // Debugging aid

      const data = querySnapshot.docs.map((doc) => {
        const docData = doc.data();
        const accidentInfo = docData.A || {};

        return {
          date: accidentInfo.A3 || 'N/A',
          AccidentId: accidentInfo.A5 || 'N/A',
          InchargeOfficer: docData.officerID || 'N/A',
          submit: docData.submit || 0, 
          oicApp: docData.oicApp || 0, 
          headApp: docData.headApp || 0,
        };
      });

      setAccidentData(data);
    });

    return () => unsubscribe();
  }, [badgeNumber]);

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
    if (submit === 0 && oicApp === 0 && headApp === 0) {
      return (
        <span className="inline-flex items-center rounded-md bg-red-200 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
          Rejected
        </span>
      );
    }
    return (
      <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
        hell
      </span>
    );
  };

  return (
    <div className='bg-white px-4 pb-4 py-4 rounded-sm border border-gray-200 text-black w-full'>
      <strong><h1><center>My Recent Cases</center></h1></strong>
      <div className='mt-3 p-3'>
        {accidentData.length === 0 ? (
          <p className='text-center text-gray-500'>No cases assigned to you in the last 30 days.</p>
        ) : (
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
                  {getStatus(accident.submit, accident.oicApp, accident.headApp)}
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
        )}
      </div>
    </div>
  );
};

export default AccidentProgressMyCases;
