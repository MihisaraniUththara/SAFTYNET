// import React, { useEffect, useState } from 'react';
// import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
// import { db } from '../firebase';
// import { collection, query, where, onSnapshot, Timestamp } from 'firebase/firestore';

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#86efac'];

// const RADIAN = Math.PI / 180;

// const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, data }) => {
//   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//   const x = cx + radius * Math.cos(-midAngle * RADIAN);
//   const y = cy + radius * Math.sin(-midAngle * RADIAN);

//   return (
//     <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
//       <tspan x={x} dy="-0.5em">{data[index].vehicle}</tspan>
//       <tspan x={x} dy="1em">{`${(percent * 100).toFixed(0)}%`}</tspan>
//     </text>
//   );
// };

// export default function VehicleChartHead() {
//   const [chartData, setChartData] = useState([]);

//   useEffect(() => {
//     const fetchData = () => {
//       const today = new Date();
//       const startOfDay = Timestamp.fromDate(new Date(today.setHours(0, 0, 0, 0)));
//       const endOfDay = Timestamp.fromDate(new Date(today.setHours(23, 59, 59, 999)));
  
//       const q = query(
//         collection(db, 'accident_report'),
//         where('createdAt', '>=', startOfDay),
//         where('createdAt', '<=', endOfDay)
//       );
  
//       const unsubscribe = onSnapshot(q, (querySnapshot) => {
//         console.log("Fetched documents:", querySnapshot.docs.map((doc) => doc.data()));
  
//         const counts = {
//           car: 0,
//           dualPurpose: 0,
//           lorry: 0,
//           cycle: 0,
//           motorCycle: 0,
//           threeWheel: 0,
//           sLTBBus: 0,
//           privateBus: 0,
//           intercityBus: 0,
//           tractor: 0,
//         };
  
//         querySnapshot.forEach((doc) => {
//           const { E } = doc.data();
//           if (!E) return; // Skip if `E` is missing
  
//           const vehicleTypes = [E.E1A, E.E1B, E.E1C].filter(Boolean); // Handle missing/null values
//           console.log("Vehicle Types:", vehicleTypes);
  
//           vehicleTypes.forEach((vehicleType) => {
//             switch (Number(vehicleType)) { // Convert to number for comparison
//               case 1:
//                 counts.car++;
//                 break;
//               case 2:
//                 counts.dualPurpose++;
//                 break;
//               case 3:
//                 counts.lorry++;
//                 break;
//               case 4:
//                 counts.cycle++;
//                 break;
//               case 5:
//                 counts.motorCycle++;
//                 break;
//               case 6:
//                 counts.threeWheel++;
//                 break;
//               case 8:
//                 counts.sLTBBus++;
//                 break;
//               case 9:
//                 counts.privateBus++;
//                 break;
//               case 10:
//                 counts.intercityBus++;
//                 break;
//               case 13:
//                 counts.tractor++;
//                 break;
//               default:
//                 break;
//             }
//           });
//         });
  
//         const formattedData = Object.keys(counts).map((key) => ({
//           vehicle: key.replace(/([A-Z])/g, ' $1').trim(),
//           accidents: counts[key],
//         }));
  
//         console.log("Formatted Chart Data:", formattedData);
//         setChartData(formattedData);
//       });
  
//       return () => unsubscribe();
//     };
  
//     fetchData();
//   }, []);



//   //second pie
//   const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#86efac'];

// const formatHourLabel = (hour) => {
//   const start = hour.toString().padStart(2, '0') + ':00';
//   const end = (hour + 1).toString().padStart(2, '0') + ':00';
//   return `${start} - ${end}`;
// };

// const renderHourLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, data }) => {
//   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//   const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
//   const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

//   return (
//     <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
//       <tspan x={x} dy="-0.5em">{data[index].hour}</tspan>
//       <tspan x={x} dy="1em">{`${(percent * 100).toFixed(0)}%`}</tspan>
//     </text>
//   );
// };

// const HourlyAccidentsPieChart = () => {
//   const [hourlyData, setHourlyData] = useState([]);

//   useEffect(() => {
//     const fetchHourlyData = () => {
//       const today = new Date();
//       const startOfDay = Timestamp.fromDate(new Date(today.setHours(0, 0, 0, 0)));
//       const endOfDay = Timestamp.fromDate(new Date(today.setHours(23, 59, 59, 999)));

//       const q = query(
//         collection(db, 'accident_report'),
//         where('createdAt', '>=', startOfDay),
//         where('createdAt', '<=', endOfDay)
//       );

//       const unsubscribe = onSnapshot(q, (querySnapshot) => {
//         const hourCounts = new Array(24).fill(0);

//         querySnapshot.forEach((doc) => {
//           const { createdAt } = doc.data();
//           if (createdAt) {
//             const date = createdAt.toDate();
//             const hour = date.getHours();
//             hourCounts[hour]++;
//           }
//         });

//         const formattedData = hourCounts
//           .map((count, hour) => ({
//             hour: formatHourLabel(hour),
//             accidents: count,
//           }))
//           .filter((entry) => entry.accidents > 0);

//         setHourlyData(formattedData);
//       });

//       return () => unsubscribe();
//     };

//     fetchHourlyData();
//   }, []);
// }

  

//   return (
//     <div className="flex flex-row gap-8 justify-between">

//         <div className='flex flex-col items-center gap-8'>
            
//       <div className="h-[550] w-[550] bg-white p-4 rounded-sm border border-gray-200 flex flex-col items-center">
//       <h2 className="text-2xl font-bold text-gray-800 mb-4">Today Accidents (Vehicles)</h2>
//         <PieChart width={550} height={550}>
//           <Pie
//             data={chartData}
//             cx="50%"
//             cy="50%"
//             labelLine={false}
//             label={(props) => renderCustomizedLabel({ ...props, data: chartData })}
//             outerRadius={265}
//             fill="#8884d8"
//             dataKey="accidents"
//           >
//             {chartData.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//             ))}
//           </Pie>
//         </PieChart>
//       </div>
//       </div>

//       <div className="h-[550] w-[550] bg-white p-4 rounded-sm border border-gray-200 flex flex-col items-center">
//       <h2 className="text-2xl font-bold text-gray-800 mb-4">Today Accidents (By Hour)</h2>
//       <PieChart width={550} height={550}>
//         <Pie
//           data={hourlyData}
//           cx="50%"
//           cy="50%"
//           labelLine={false}
//           label={(props) => renderHourLabel({ ...props, data: hourlyData })}
//           outerRadius={265}
//           fill="#8884d8"
//           dataKey="accidents"
//         >
//           {hourlyData.map((entry, index) => (
//             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//           ))}
//         </Pie>
//       </PieChart>
//     </div>
//     </div>
//   );
// }



import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { db } from '../firebase';
import { collection, query, where, onSnapshot, Timestamp } from 'firebase/firestore';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#86efac'];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, data }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      <tspan x={x} dy="-0.5em">{data[index].vehicle}</tspan>
      <tspan x={x} dy="1em">{`${(percent * 100).toFixed(0)}%`}</tspan>
    </text>
  );
};

const renderHourLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, data }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      <tspan x={x} dy="-0.5em">{data[index].hour}</tspan>
      <tspan x={x} dy="1em">{`${(percent * 100).toFixed(0)}%`}</tspan>
    </text>
  );
};

const formatHourLabel = (hour) => {
  const start = hour.toString().padStart(2, '0') + ':00';
  const end = (hour + 1).toString().padStart(2, '0') + ':00';
  return `${start} - ${end}`;
};

export default function VehicleChartHead() {
  const [chartData, setChartData] = useState([]);
  const [hourlyData, setHourlyData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      const today = new Date();
      const startOfDay = Timestamp.fromDate(new Date(today.setHours(0, 0, 0, 0)));
      const endOfDay = Timestamp.fromDate(new Date(today.setHours(23, 59, 59, 999)));

      const q = query(
        collection(db, 'accident_report'),
        where('createdAt', '>=', startOfDay),
        where('createdAt', '<=', endOfDay)
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const vehicleCounts = {};
        const hourCounts = new Array(24).fill(0);

        querySnapshot.forEach((doc) => {
          const data = doc.data();

          // Hourly Data
          if (data.createdAt) {
            const hour = data.createdAt.toDate().getHours();
            hourCounts[hour]++;
          }

          // Vehicle Data
          const { E } = data;
          if (E) {
            const vehicleTypes = [E.E1A, E.E1B, E.E1C].filter(Boolean);
            vehicleTypes.forEach((type) => {
              vehicleCounts[type] = (vehicleCounts[type] || 0) + 1;
            });
          }
        });

        const formattedChartData = Object.keys(vehicleCounts).map((key) => ({
          vehicle: `Vehicle ${key}`, // Customize label
          accidents: vehicleCounts[key],
        }));

        const formattedHourlyData = hourCounts
          .map((count, hour) => ({
            hour: formatHourLabel(hour),
            accidents: count,
          }))
          .filter((entry) => entry.accidents > 0);

        setChartData(formattedChartData);
        setHourlyData(formattedHourlyData);
      });

      return () => unsubscribe();
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-wrap gap-8 justify-center">
      <div className="bg-white p-4 rounded-sm border border-gray-200 flex flex-col items-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Today Accidents (Vehicles)</h2>
        <PieChart width={550} height={550}>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={(props) => renderCustomizedLabel({ ...props, data: chartData })}
            outerRadius={265}
            fill="#8884d8"
            dataKey="accidents"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </div>

      <div className="bg-white p-4 rounded-sm border border-gray-200 flex flex-col items-center">
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
    </div>
  );
}
