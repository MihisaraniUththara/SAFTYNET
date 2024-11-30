import React, { useEffect, useState, useContext } from 'react';
import { collection, query, where, Timestamp, onSnapshot, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { AuthContext } from '../../Context/AuthContext';
import AccidentDetailsModal from './Model/AccidentDetailsModal'; // Import the shared component

const AccidentProgress = () => {
  const { currentUser } = useContext(AuthContext);
  const [station, setStation] = useState(null);
  const [accidentData, setAccidentData] = useState([]);
  const [officers, setOfficers] = useState({});
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    const fetchStation = async () => {
      if (currentUser?.email) {
        try {
          const stationQuery = query(
            collection(db, 'police'),
            where('email', '==', currentUser.email.toLowerCase())
          );
          onSnapshot(stationQuery, (querySnapshot) => {
            if (!querySnapshot.empty) {
              const policeStation = querySnapshot.docs[0].data()?.station || 'Unknown';
              setStation(policeStation.toLowerCase());
            } else {
              setStation(null);
            }
          });
        } catch (error) {
          console.error('Error fetching station:', error);
        }
      }
    };

    fetchStation();
  }, [currentUser]);

  const fetchOfficers = async () => {
    try {
      const officerSnapshot = await getDocs(collection(db, 'police'));
      const officerData = {};
      officerSnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        if (data.badgeNumber && data.email) {
          officerData[data.badgeNumber] = { name: data.name, email: data.email };
        }
      });
      setOfficers(officerData);
    } catch (error) {
      console.error('Error fetching officers:', error);
    }
  };

  useEffect(() => {
    fetchOfficers();
  }, []);

  useEffect(() => {
    if (!station) return;

    const thirtyDaysAgo = Timestamp.fromDate(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));

    const accidentQuery = query(
      collection(db, 'accident_report'),
      orderBy('createdAt', 'desc'),
      where('A.A2', '==', station.toLowerCase()),
      where('createdAt', '>=', thirtyDaysAgo)
    );

    const unsubscribe = onSnapshot(accidentQuery, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => {
        const docData = doc.data();
        const accidentInfo = docData.A || {};
        const officerId = docData.officerID || 'N/A';

        return {
          date: accidentInfo.A3 || 'N/A',
          AccidentId: accidentInfo.A5 || 'N/A',
          InchargeOfficer: officerId || 'N/A',
          time: accidentInfo.A4 || 'N/A',
          Urban_Rural: accidentInfo.A7 || '0',
          A8: accidentInfo.A8 || '0',
          A9: accidentInfo.A9 || '0',
          A10: accidentInfo.A10 || 'NO Road Number',
          A11: accidentInfo.A11 || 'No Road Name',
          A20: accidentInfo.A20 || '0',
          A21: accidentInfo.A21 || '0',
          A22: accidentInfo.A22 || '0',
          A23: accidentInfo.A23 || '0',
          A24: accidentInfo.A24 || '0',
          A25: accidentInfo.A25 || '0',
          A26: accidentInfo.A26 || '0',
          A27: accidentInfo.A27 || '0',
          A30: accidentInfo.A30 || '0',
          A28: accidentInfo.A28 || '60',
          A29: accidentInfo.A29 || '40',
          A31: accidentInfo.A31 || 'No prosecution',
          // A33: accidentInfo.A28 || '60', //casualties how save in db
          
          submit: docData.submit || 0,
          oicApp: docData.oicApp || 0,
          headApp: docData.headApp || 0,
        };
      });

      setAccidentData(data);
    });

    return () => unsubscribe();
  }, [station]);

  const getUrban = (Urban_Rural) => {
    if (Urban_Rural == '1') {
      return (
        <span>Urban</span>
      );
    }
    if (Urban_Rural == '2') {
      return (
        <span>Rural</span>
      );
    }
    return (
      <span>Unknown</span>
    );
  };

  const A8Column = (A8) => {

  }


  const getStatus = (submit, oicApp, headApp) => {
    if (submit === 1 && oicApp === 0 && headApp === 0) {
      return <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
      Pending
    </span>;
    }
    if (submit === 1 && oicApp === 1 && headApp === 0) {
      return <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
      In Progress
    </span>;
    }
    if (submit === 1 && oicApp === 1 && headApp === 1) {
      return <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
      Completed
    </span>;
    }
    if (submit === 0 && oicApp === 0 && headApp === 0) {
      return <span className="inline-flex items-center rounded-md bg-red-200 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
      Rejected
    </span>;
    }
    return <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
    Unknown
  </span>
;
  };

  const handleDetails = (report) => {
    setSelectedReport(report);
  };

  const closeDetails = () => {
    setSelectedReport(null);
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
                <td className='text-center p-3'>{officers[accident.InchargeOfficer]?.name || 'Unknown'}</td>
                <td className='text-center p-3 font-semibold'>
                  {getStatus(accident.submit, accident.oicApp, accident.headApp)}
                </td>
                <td className='text-center p-3'>
                  <button className='bg-yellow-button hover:bg-yellow text-black font-semibold py-1 px-1 rounded text-sm'
                    onClick={() => handleDetails(accident)}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedReport && (
        <AccidentDetailsModal
          report={selectedReport}
          getStatus={getStatus}
          getUrban={getUrban}
          onClose={closeDetails}
        />
      )}
    </div>
  );
};

export default AccidentProgress;
