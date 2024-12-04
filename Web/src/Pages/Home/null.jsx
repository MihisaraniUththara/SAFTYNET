// import React, { useEffect, useState } from 'react';
// import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
// import { db } from '../firebase'; // Ensure you configure Firebase correctly

// const AccidentDetails = () => {
//   const [accidents, setAccidents] = useState([]);
//   const [filters, setFilters] = useState({
//     station: '',
//     action: '',
//     severity: '',
//     accidentId: '',
//   });

//   const fetchAccidentData = async () => {
//     try {
//       const q = query(
//         collection(db, 'accident_report'),
//         orderBy('createdAt', 'desc'),
//         where('submit', '==', 1),
//         where('oicApp', '==', 1),
//         where('headApp', '==', 1)
//       );

//       const querySnapshot = await getDocs(q);
//       const accidentData = [];

//       querySnapshot.forEach((docSnap) => {
//         const data = docSnap.data();

//         if (data.A) {
//           accidentData.push({
//             date: data.A?.A3 || 'N/A', // A3 is Date
//             time: data.A?.A4 || 'N/A', // A4 is Time
//             accidentId: data.A?.A5 || 'N/A', // A5 is Accident ID
//             station: data.A?.A2 || 'N/A', // A2 is Station
//             action: data.A?.A30 || null, // A30 is Action
//             severity: data.A?.A6 || null, // A6 is Severity
//           });
//         }
//       });

//       setAccidents(accidentData);
//     } catch (error) {
//       console.error('Error fetching accident data:', error);
//     }
//   };

//   useEffect(() => {
//     fetchAccidentData();
//   }, []);

//   const getActionText = (actionCode) => {
//     const actions = {
//       1: 'Prosecution initiated',
//       2: 'No prosecution',
//       3: 'Parties Settled',
//       4: 'Offender unknown',
//       5: 'Not known',
//       null: 'NULL',
//     };
//     return actions[actionCode] || 'Unknown';
//   };

//   const getSeverityText = (severityCode) => {
//     const severities = {
//       1: 'Fatal',
//       2: 'Serious',
//       3: 'Minor',
//       4: 'Damages only',
//     };
//     return severities[severityCode] || 'Unknown';
//   };

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prevFilters) => ({
//       ...prevFilters,
//       [name]: value,
//     }));
//   };

//   const filteredAccidents = accidents.filter((accident) => {
//     return (
//       (!filters.station || accident.station.toLowerCase().includes(filters.station.toLowerCase())) &&
//       (!filters.action || getActionText(accident.action) === filters.action) &&
//       (!filters.severity || getSeverityText(accident.severity) === filters.severity) &&
//       (!filters.accidentId || accident.accidentId.toLowerCase().includes(filters.accidentId.toLowerCase()))
//     );
//   });

//   return (
//     <div className='bg-white px-4 pb-4 py-4 rounded-sm border border-gray-200 text-black w-full'>
//       <strong>
//         <h1>
//           <center>Accident Details</center>
//         </h1>
//       </strong>
//       <div className='flex space-x-4 my-4'>
//         <input
//           type='text'
//           name='station'
//           placeholder='Filter by Station'
//           value={filters.station}
//           onChange={handleFilterChange}
//           className='border p-2 rounded'
//         />
//         <select
//           name='action'
//           value={filters.action}
//           onChange={handleFilterChange}
//           className='border p-2 rounded'
//         >
//           <option value=''>All Actions</option>
//           <option value='Prosecution initiated'>Prosecution initiated</option>
//           <option value='No prosecution'>No prosecution</option>
//           <option value='Parties Settled'>Parties Settled</option>
//           <option value='Offender unknown'>Offender unknown</option>
//           <option value='Not known'>Not known</option>
//           <option value='NULL'>NULL</option>
//         </select>
//         <select
//           name='severity'
//           value={filters.severity}
//           onChange={handleFilterChange}
//           className='border p-2 rounded'
//         >
//           <option value=''>All Severities</option>
//           <option value='Fatal'>Fatal</option>
//           <option value='Serious'>Serious</option>
//           <option value='Minor'>Minor</option>
//           <option value='Damages only'>Damages only</option>
//         </select>
//         <input
//           type='text'
//           name='accidentId'
//           placeholder='Filter by Accident ID'
//           value={filters.accidentId}
//           onChange={handleFilterChange}
//           className='border p-2 rounded'
//         />
//       </div>
//       <div className='mt-3 p-3'>
//         <table className='w-full table-auto'>
//           <thead className='bg-gray-100 border-gray-400 font-semibold'>
//             <tr>
//               <th className='p-3 tracking-wide'>Date</th>
//               <th className='p-3 tracking-wide'>Time</th>
//               <th className='p-3 tracking-wide'>Accident Id</th>
//               <th className='p-3 tracking-wide'>Station</th>
//               <th className='p-3 tracking-wide'>Action</th>
//               <th className='p-3 tracking-wide'>Severity</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredAccidents.map((accident, index) => (
//               <tr key={index} className='border-b'>
//                 <td className='text-center p-3'>{accident.date}</td>
//                 <td className='text-center p-3'>{accident.time}</td>
//                 <td className='text-center p-3'>{accident.accidentId}</td>
//                 <td className='text-center p-3'>{accident.station}</td>
//                 <td className='text-center p-3'>{getActionText(accident.action)}</td>
//                 <td className='text-center p-3'>{getSeverityText(accident.severity)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AccidentDetails;











import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { db } from '../firebase';
import { collection, query, where, onSnapshot, Timestamp } from 'firebase/firestore';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#86efac'];

const formatHourLabel = (hour) => {
  const start = hour.toString().padStart(2, '0') + ':00';
  const end = (hour + 1).toString().padStart(2, '0') + ':00';
  return `${start} - ${end}`;
};

const renderHourLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, data }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
  const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      <tspan x={x} dy="-0.5em">{data[index].hour}</tspan>
      <tspan x={x} dy="1em">{`${(percent * 100).toFixed(0)}%`}</tspan>
    </text>
  );
};

const HourlyAccidentsPieChart = () => {
  const [hourlyData, setHourlyData] = useState([]);

  useEffect(() => {
    const fetchHourlyData = () => {
      const today = new Date();
      const startOfDay = Timestamp.fromDate(new Date(today.setHours(0, 0, 0, 0)));
      const endOfDay = Timestamp.fromDate(new Date(today.setHours(23, 59, 59, 999)));

      const q = query(
        collection(db, 'accident_report'),
        where('createdAt', '>=', startOfDay),
        where('createdAt', '<=', endOfDay)
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const hourCounts = new Array(24).fill(0);

        querySnapshot.forEach((doc) => {
          const { createdAt } = doc.data();
          if (createdAt) {
            const date = createdAt.toDate();
            const hour = date.getHours();
            hourCounts[hour]++;
          }
        });

        const formattedData = hourCounts
          .map((count, hour) => ({
            hour: formatHourLabel(hour),
            accidents: count,
          }))
          .filter((entry) => entry.accidents > 0);

        setHourlyData(formattedData);
      });

      return () => unsubscribe();
    };

    fetchHourlyData();
  }, []);

  return (
    <div className="h-[550] w-[550] bg-white p-4 rounded-sm border border-gray-200 flex flex-col items-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Today Accidents (By Hour)</h2>
      <PieChart width={550} height={550}>
        <Pie
          data={hourlyData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={(props) => renderHourLabel({ ...props, data: hourlyData })}
          outerRadius={265}
          fill="#8884d8"
          dataKey="accidents"
        >
          {hourlyData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};

export default HourlyAccidentsPieChart;
