import React, { useState, useEffect, useContext } from 'react';

import { db } from '../firebase';
import { collection, query, where, Timestamp, onSnapshot } from 'firebase/firestore';

const StatCards = () => {
  const [totalAccidents, setTotalAccidents] = useState(0);
  const [fatalAccidents, setFatalAccidents] = useState(0);
  const [seriousAccidents, setSeriousAccidents] = useState(0);
  const [minorAccidents, setMinorAccidents] = useState(0);
  const [damagesAccidents, setDamagesAccidents] = useState(0);

  useEffect(() => {
    const today = new Date();
    const startOfDay = Timestamp.fromDate(new Date(today.setHours(0, 0, 0, 0)));
    const endOfDay = Timestamp.fromDate(new Date(today.setHours(23, 59, 59, 999)));

    // Real-time listener
    const q = query(
      collection(db, 'accident_report'),
      where('createdAt', '>=', startOfDay),
      where('createdAt', '<=', endOfDay)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log('Snapshot received:', snapshot.docs.map((doc) => doc.data())); // Log the data
      let total = 0,
        fatal = 0,
        serious = 0,
        minor = 0,
        damages = 0;

      snapshot.forEach((doc) => {
        total += 1;
        const data = doc.data();
        if (data.A?.A6 === '1') fatal += 1;
        if (data.A?.A6 === '2') serious += 1;
        if (data.A?.A6 === '3') minor += 1;
        if (data.A?.A6 === '4') damages += 1;
      });

      setTotalAccidents(total);
      setFatalAccidents(fatal);
      setSeriousAccidents(serious);
      setMinorAccidents(minor);
      setDamagesAccidents(damages);
    });

    return () => unsubscribe(); // Cleanup the listener on component unmount
  }, []); // No dependencies needed

  return (
    <div className='flex gap-4 w-full'>
      <div className='bg-white rounded-sm p-4 flex-1 border border-gray-200 flex flex-col items-center text-black font-bold justify-center'>
        <span className='text-center'>Total Accidents</span>
        <span>{totalAccidents}</span>
      </div>
      <div className='bg-white rounded-sm p-4 flex-1 border border-gray-200 flex flex-col justify-center items-center text-red-600 font-bold'>
        <span>Fatal Accidents</span>
        <strong>{fatalAccidents}</strong>
      </div>
      <div className='bg-white rounded-sm p-4 flex-1 border border-gray-200 flex flex-col justify-center items-center text-orange-500 font-bold'>
        <span>Serious Accidents</span>
        <strong>{seriousAccidents}</strong>
      </div>
      <div className='bg-white rounded-sm p-4 flex-1 border border-gray-200 flex flex-col justify-center items-center text-blue-700 font-bold'>
        <span>Minor Accidents</span>
        <strong>{minorAccidents}</strong>
      </div>
      <div className='bg-white rounded-sm p-4 flex-1 border border-gray-200 flex-col justify-center flex items-center text-green-600 font-bold'>
        <span>Damages Only Accidents</span>
        <strong>{damagesAccidents}</strong>
      </div>
    </div>
  );
};

export default StatCards;
