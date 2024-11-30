import React, { useContext, useEffect, useState } from 'react';
import { HiOutlineBell } from 'react-icons/hi';
import { AuthContext } from '../Context/AuthContext';
import { db } from '../firebase'; // Adjust import based on your Firebase setup
import { getDocs, collection, query, where } from 'firebase/firestore';

const HeaderOic = () => {
  const { currentUser } = useContext(AuthContext);
  const [station, setStation] = useState('Loading...');

  useEffect(() => {
    const fetchStation = async () => {
      if (!currentUser?.email) return;

      try {
        // Query the 'police' collection to find the station associated with the user's email
        const q = query(
          collection(db, 'police'),
          where('email', '==', currentUser.email)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const stationData = querySnapshot.docs[0]?.data()?.station || 'No Station';
          setStation(stationData);
        } else {
          setStation('No Station Found');
        }
      } catch (error) {
        console.error('Error fetching station:', error);
        setStation('Error Loading Station');
      }
    };

    fetchStation();
  }, [currentUser?.email]);

  return (
    <div className='bg-white h-16 px-4 text-black flex justify-between items-center'>
      <div className='flex items-center gap-9 mr-2 font-semibold px-3'>OFFICER IN CHARGE</div>
      <div className='flex items-center gap-9 mr-2 font-semibold'>
        <div>{station.toUpperCase()}</div>
        <HiOutlineBell fontSize={24} />
      </div>
    </div>
  );
};

export default HeaderOic;
