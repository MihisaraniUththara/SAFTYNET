import React, { useState, useEffect, useContext } from 'react';
import { db } from '../../firebase';
import { AuthContext } from '../../Context/AuthContext';
import { collection, query, where, onSnapshot, getDocs, orderBy } from 'firebase/firestore';

const AccidentDetails = () => {
    const [accidents, setAccidents] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const [station, setStation] = useState(null);
    const [officers, setOfficers] = useState({}); // Store badgeNumber -> name mapping

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
                    setStation(policeStation.toLowerCase()); // Normalize station name
                  } else {
                    setStation(null);
                    console.log('null station') // No station found
                  }
                });
              } catch (error) {
                console.error('Error fetching station:', error);
              }
            }
          };
      
          fetchStation();
        }, [currentUser]);
      
        
        // Fetch officer details and map badgeNumber to names
        const fetchOfficers = async () => {
            try {
            const officerSnapshot = await getDocs(collection(db, 'police'));
            const officerData = {};
            officerSnapshot.forEach((docSnap) => {
                const data = docSnap.data();
                if (data.badgeNumber && data.email) { // Ensure both badgeNumber and email exist
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

        // Query to filter accident reports based on submit, oicApp, and headApp
        const q = query(
            collection(db, 'accident_report'),
            orderBy('createdAt', 'desc'),
            where('submit', '==', 1),
            where('oicApp', '==', 1),
            where('headApp', '==', 1)
        );

        // Real-time listener for changes in the accident reports
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const accidentData = [];
            querySnapshot.forEach((docSnap) => {
                const data = docSnap.data();
                if (data.A) {
                    accidentData.push({
                        date: data.A?.A3 || 'N/A', // A3 is Date
                        time: data.A?.A4 || 'N/A', // A4 is Time
                        accidentId: data.A?.A5 || 'N/A', // A5 is Accident ID
                        officerID: data.officerID || 'N/A', // officerID from accident_report
                        action: data.A?.A30 || null, // A30 is Action
                        severity: data.A?.A6 || null, // A6 is Severity
                    });
                }
            });
            setAccidents(accidentData);
        });

        // Cleanup subscription on component unmount
        return () => unsubscribe();
    }, [station]);

    const getActionText = (actionCode) => {
        const actions = {
            1: 'Prosecution initiated',
            2: 'No prosecution',
            3: 'Parties Settled',
            4: 'Offender unknown',
            5: 'Not known',
            null: 'NULL',
        };
        return actions[actionCode] || 'Unknown';
    };

    const getSeverityText = (severityCode) => {
        const severities = {
            1: 'Fatal',
            2: 'Serious',
            3: 'Minor',
            4: 'Damages only',
        };
        return severities[severityCode] || 'Unknown';
    };

    return (
        <div className='bg-white px-4 pb-4 py-4 rounded-sm border border-gray-200 text-black w-full'>
            <strong>
                <h1>
                    <center>Accident Details</center>
                </h1>
            </strong>
            <div className='mt-3 p-3'>
                <table className='w-full table-auto'>
                    <thead className='bg-gray-100 border-gray-400 font-semibold'>
                        <tr>
                            <th className='p-3 tracking-wide'>Date</th>
                            <th className='p-3 tracking-wide'>Time</th>
                            <th className='p-3 tracking-wide'>Accident Id</th>
                            <th className='p-3 tracking-wide'>Officer Incharge</th>
                            <th className='p-3 tracking-wide'>Action</th>
                            <th className='p-3 tracking-wide'>Severity</th>
                            <th className='p-3 tracking-wide'>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accidents.map((accident, index) => (
                            <tr key={index} className='border-b'>
                                <td className='text-center p-3'>{accident.date}</td>
                                <td className='text-center p-3'>{accident.time}</td>
                                <td className='text-center p-3'>{accident.accidentId}</td>
                                <td className='text-center p-3'>
    {officers[accident.officerID]?.name || 'N/A'}
</td>


                                <td className='text-center p-3'>{getActionText(accident.action)}</td>
                                <td className='text-center p-3'>{getSeverityText(accident.severity)}</td>
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

export default AccidentDetails;
