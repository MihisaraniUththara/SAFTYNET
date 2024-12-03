// import React, { useContext, useEffect, useState } from 'react';
// import { HiOutlineBell } from 'react-icons/hi'
// import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
// import { AuthContext } from '../Context/AuthContext';
// import { db } from '../firebase';
// import { getDocs, collection, query, where } from 'firebase/firestore';

// const HeaderTraffic = () => {
//     const { currentUser } = useContext(AuthContext);
//     const [station, setStation] = useState('Loading...');
  
//     useEffect(() => {
//       const fetchStation = async () => {
//         if (!currentUser?.email) return;
  
//         try {
//           // Query the 'police' collection to find the station associated with the user's email
//           const q = query(
//             collection(db, 'police'),
//             where('email', '==', currentUser.email)
//           );
//           const querySnapshot = await getDocs(q);
  
//           if (!querySnapshot.empty) {
//             const stationData = querySnapshot.docs[0]?.data()?.station || 'No Station';
//             setStation(stationData);
//           } else {
//             setStation('No Station Found');
//           }
//         } catch (error) {
//           console.error('Error fetching station:', error);
//           setStation('Error Loading Station');
//         }
//       };
  
//       fetchStation();
//     }, [currentUser?.email]);

//   return (
//     <div className='bg-white h-16 px-4 text-black flex justify-between items-center'>
//       <div className='flex items-center gap-9 mr-2 font-semibold px-3'>TRAFFIC POLICE OFFICER</div>
//         <div className='flex items-center gap-9 mr-2 font-semibold'>
//         {station.toUpperCase()}

//             <Popover>
//                 <PopoverButton className="block text-sm/6 font-semibold text-black/50 focus:outline-none">
//                     <HiOutlineBell fontSize={24}/>
//                 </PopoverButton>
//                 <PopoverPanel
//                     transition
//                     anchor="bottom"
//                     className="divide-y divide-white/5 rounded-xl bg-black/5 text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0">
//                     <div className="p-3">
//                         <a className="block rounded-lg py-2 px-3 transition hover:bg-white/5" href="#">
//                             <p className="font-semibold text-black">This is notification</p>
//                         </a>
//                     </div>
//                 </PopoverPanel>
//             </Popover>
//         </div>
//     </div>
//   )
// }

// export default HeaderTraffic


// import React, { useContext, useEffect, useState } from 'react';
// import { HiOutlineBell } from 'react-icons/hi';
// import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
// import { AuthContext } from '../Context/AuthContext';
// import { db } from '../firebase';
// import { collection, query, where, onSnapshot } from 'firebase/firestore';

// const HeaderTraffic = () => {
//     const { currentUser } = useContext(AuthContext);
//     const [station, setStation] = useState('Loading...');

//     useEffect(() => {
//         let unsubscribe;

//         const fetchStation = async () => {
//             if (!currentUser?.email) return;

//             try {
//                 // Query the 'police' collection for the station associated with the user's email
//                 const q = query(
//                     collection(db, 'police'),
//                     where('email', '==', currentUser.email)
//                 );

//                 // Use onSnapshot to listen for real-time updates
//                 unsubscribe = onSnapshot(q, (querySnapshot) => {
//                     if (!querySnapshot.empty) {
//                         const stationData = querySnapshot.docs[0]?.data()?.station || 'No Station';
//                         setStation(stationData);
//                     } else {
//                         setStation('No Station Found');
//                     }
//                 });
//             } catch (error) {
//                 console.error('Error fetching station:', error);
//                 setStation('Error Loading Station');
//             }
//         };

//         fetchStation();

//         // Cleanup the subscription on unmount
//         return () => {
//             if (unsubscribe) unsubscribe();
//         };
//     }, [currentUser?.email]);

//     return (
//         <div className="bg-white h-16 px-4 text-black flex justify-between items-center">
//             <div className="flex items-center gap-9 mr-2 font-semibold px-3">
//                 TRAFFIC POLICE OFFICER
//             </div>
//             <div className="flex items-center gap-9 mr-2 font-semibold">
//                 {station.toUpperCase()}

//                 <Popover>
//                     <PopoverButton className="block text-sm/6 font-semibold text-black/50 focus:outline-none">
//                         <HiOutlineBell fontSize={24} />
//                     </PopoverButton>
//                     <PopoverPanel
//                         transition
//                         anchor="bottom"
//                         className="divide-y divide-white/5 rounded-xl bg-black/5 text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
//                     >
//                         <div className="p-3">
//                             <a
//                                 className="block rounded-lg py-2 px-3 transition hover:bg-white/5"
//                                 href="#"
//                             >
//                                 <p className="font-semibold text-black">This is notification</p>
//                             </a>
//                         </div>
//                     </PopoverPanel>
//                 </Popover>
//             </div>
//         </div>
//     );
// };

// export default HeaderTraffic;


import React, { useContext, useEffect, useState } from 'react';
import { HiOutlineBell } from 'react-icons/hi';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { AuthContext } from '../Context/AuthContext';
import { db } from '../firebase';
import { collection, query, where, onSnapshot, doc, getDocs } from 'firebase/firestore';

const HeaderTraffic = () => {
    const { currentUser } = useContext(AuthContext);
    const [station, setStation] = useState('Loading...');
    const [notifications, setNotifications] = useState([]);
    const [isViewed, setIsViewed] = useState(true);

    useEffect(() => {
        let unsubscribePolice, unsubscribeAccident;
        let officerID = null;

        const fetchStationAndOfficerID = async () => {
            if (!currentUser?.email) return;

            try {
                const q = query(
                    collection(db, 'police'),
                    where('email', '==', currentUser.email)
                );

                unsubscribePolice = onSnapshot(q, (querySnapshot) => {
                    if (!querySnapshot.empty) {
                        const docData = querySnapshot.docs[0]?.data();
                        const stationData = docData?.station || 'No Station';
                        setStation(stationData);
                        officerID = docData?.badgeNumber;

                        // Check for duty changes
                        const dayUpdated = docData?.day === true;
                        const nightUpdated = docData?.night === true;

                        if (dayUpdated) {
                            addNotification(
                                'Duty list is updated',
                                ''
                            );
                        }

                        if (!docData?.day) {
                            addNotification('You are deallocated from day duty shift');
                        }

                        if (!docData?.night) {
                            addNotification('You are deallocated from night duty shift');
                        }
                    }
                });

                if (officerID) {
                    const accidentQuery = query(
                        collection(db, 'accident_report'),
                        where('officerId', '==', officerID),
                        where('submit', '==', 0)
                    );

                    unsubscribeAccident = onSnapshot(accidentQuery, (querySnapshot) => {
                        querySnapshot.forEach(() => {
                            addNotification('Your report has been rejected');
                        });
                    });
                }
            } catch (error) {
                console.error('Error fetching station:', error);
                setStation('Error Loading Station');
            }
        };

        const addNotification = (message, link) => {
            setNotifications((prev) => [
                ...prev,
                { message, link: link || null, id: Date.now() },
            ]);
            setIsViewed(false);
        };

        fetchStationAndOfficerID();

        return () => {
            if (unsubscribePolice) unsubscribePolice();
            if (unsubscribeAccident) unsubscribeAccident();
        };
    }, [currentUser?.email]);

    const handleNotificationClick = () => {
        setIsViewed(true);
    };

    return (
        <div className="bg-white h-16 px-4 text-black flex justify-between items-center">
            <div className="flex items-center gap-9 mr-2 font-semibold px-3">
                TRAFFIC POLICE OFFICER
            </div>
            <div className="flex items-center gap-9 mr-2 font-semibold">
                {station.toUpperCase()}

                <Popover>
                    <PopoverButton
                        className={`block text-sm/6 font-semibold ${
                            isViewed ? 'text-black/50' : 'text-red-500'
                        } focus:outline-none`}
                        onClick={handleNotificationClick}
                    >
                        <HiOutlineBell fontSize={24} />
                    </PopoverButton>
                    <PopoverPanel
                        transition
                        anchor="bottom"
                        className="divide-y divide-white/5 rounded-xl bg-black/5 text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
                    >
                        <div className="p-3">
                            {notifications.length === 0 ? (
                                <p className="font-semibold text-black">
                                    No new notifications
                                </p>
                            ) : (
                                notifications.map((notification) => (
                                    <a
                                        key={notification.id}
                                        className="block rounded-lg py-2 px-3 transition hover:bg-white/5"
                                        href={notification.link || '#'}
                                    >
                                        <p className="font-semibold text-black">
                                            {notification.message}
                                        </p>
                                    </a>
                                ))
                            )}
                        </div>
                    </PopoverPanel>
                </Popover>
            </div>
        </div>
    );
};

export default HeaderTraffic;
