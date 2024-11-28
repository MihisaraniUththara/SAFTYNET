import React, { useContext, useEffect, useState } from 'react';
import { HiOutlineBell } from 'react-icons/hi'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { AuthContext } from '../Context/AuthContext';
import { db } from '../firebase';
import { getDocs, collection, query, where } from 'firebase/firestore';

const HeaderTraffic = () => {
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
    <div className='bg-white h-16 px-4 text-black flex justify-end items-center'>
        <div className='flex items-center gap-9 mr-2 font-semibold'>
            {station}
            <Popover>
                <PopoverButton className="block text-sm/6 font-semibold text-black/50 focus:outline-none">
                    <HiOutlineBell fontSize={24}/>
                </PopoverButton>
                <PopoverPanel
                    transition
                    anchor="bottom"
                    className="divide-y divide-white/5 rounded-xl bg-black/5 text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0">
                    <div className="p-3">
                        <a className="block rounded-lg py-2 px-3 transition hover:bg-white/5" href="#">
                            <p className="font-semibold text-black">This is notification</p>
                        </a>
                    </div>
                </PopoverPanel>
            </Popover>
            <HiOutlineBell fontSize={24}/>
        </div>
    </div>
  )
}

export default HeaderTraffic