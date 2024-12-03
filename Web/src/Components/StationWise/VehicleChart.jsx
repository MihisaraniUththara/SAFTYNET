// import React from 'react';
// import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

// const data = [
//     {
//         vehicle: 'Car',
//         accidents: 20
//     },
//     {
//         vehicle: 'Three-Wheel',
//         accidents: 50
//     },
//     {
//         vehicle: 'Lorry',
//         accidents: 15
//     },
//     {
//         vehicle: 'Bus',
//         accidents: 16
//     },
//     {
//         vehicle: 'Motor-Bike',
//         accidents: 90
//     }
// ]

// const data01 = [
//     {
//         name: 'Day',
//         value: 50
//     },
//     {
//         name: 'Night',
//         value: 50
//     }
// ]

// const data02 = [
//     {
//         name: '00',
//         value: 1
//     },
//     {
//         name: '01',
//         value: 1
//     },
//     {
//         name: '02',
//         value: 1
//     },
//     {
//         name: '03',
//         value: 1
//     },
//     {
//         name: '04',
//         value: 1
//     },
//     {
//         name: '05',
//         value: 1
//     },
//     {
//         name: '06',
//         value: 1
//     },
//     {
//         name: '07',
//         value: 1
//     },
//     {
//         name: '08',
//         value: 1
//     },
//     {
//         name: '09',
//         value: 1
//     },
//     {
//         name: '10',
//         value: 1
//     },
//     {
//         name: '11',
//         value: 1
//     },
//     {
//         name: '12',
//         value: 1
//     },
//     {
//         name: '13',
//         value: 1
//     },
//     {
//         name: '14',
//         value: 1
//     },
//     {
//         name: '15',
//         value: 1
//     },
//     {
//         name: '16',
//         value: 1
//     },
//     {
//         name: '17',
//         value: 1
//     },
//     {
//         name: '18',
//         value: 1
//     },
//     {
//         name: '19',
//         value: 1
//     },
//     {
//         name: '20',
//         value: 1
//     },
//     {
//         name: '21',
//         value: 1
//     },
//     {
//         name: '22',
//         value: 1
//     },
//     {
//         name: '23',
//         value: 1
//     }
// ]

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#86efac'];

// const RADIAN = Math.PI / 180;
// const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
//   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//   const x = cx + radius * Math.cos(-midAngle * RADIAN);
//   const y = cy + radius * Math.sin(-midAngle * RADIAN);

//   return (
//     <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
//       <tspan x={x} dy="-0.5em">{data[index].vehicle}</tspan> {/* Vehicle name on the first row */}
//       <tspan x={x} dy="1em">{`${(percent * 100).toFixed(0)}%`}</tspan> {/* Percentage centered below */}
//     </text>
//   );
// };



// export default function VehicleChart()  {

//     return (
//         <div className='flex flex-row gap-8 justify-between'>
//             <div className='h-[550] w-[550] bg-white p-4 rounded-sm border border-gray-200 flex'>
//                 <PieChart width={550} height={550}>
//                 <Pie
//                     data={data}
//                     cx="50%"
//                     cy="50%"
//                     labelLine={false}
//                     label={renderCustomizedLabel}
//                     outerRadius={265}
//                     fill="#8884d8"
//                     dataKey="accidents">
//                     {data.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                 </Pie>
//                 </PieChart>
//             </div>

//             <div className='h-[550] w-[550] bg-white p-4 rounded-sm border border-gray-200 flex'>
//                 <PieChart width={550} height={550}>
//                     <Pie
//                     data={data01}
//                     dataKey="value"
//                     cx="50%"
//                     cy="50%"
//                     outerRadius={20}
//                     fill="#8884d8"/>

//                     <Pie
//                     data={data02}
//                     dataKey="value"
//                     cx="50%"
//                     cy="50%"
//                     innerRadius={50}
//                     outerRadius={55}
//                     fill="#82ca9d"/>

//                     <Pie
//                     data={data02}
//                     dataKey="value"
//                     cx="50%"
//                     cy="50%"
//                     innerRadius={85}
//                     outerRadius={90}
//                     fill="#82ca9d"/>

//                     <Pie
//                     data={data02}
//                     dataKey="value"
//                     cx="50%"
//                     cy="50%"
//                     innerRadius={120}
//                     outerRadius={125}
//                     fill="#82ca9d"/>

//                     <Pie
//                     data={data02}
//                     dataKey="value"
//                     cx="50%"
//                     cy="50%"
//                     innerRadius={155}
//                     outerRadius={160}
//                     fill="#82ca9d"/>

//                     <Pie
//                     data={data02}
//                     dataKey="value"
//                     cx="50%"
//                     cy="50%"
//                     innerRadius={190}
//                     outerRadius={195}
//                     fill="#82ca9d"/>

//                     <Pie
//                     data={data02}
//                     dataKey="value"
//                     cx="50%"
//                     cy="50%"
//                     innerRadius={225}
//                     outerRadius={230}
//                     fill="#82ca9d"/>

//                     <Pie
//                     data={data02}
//                     dataKey="value"
//                     cx="50%"
//                     cy="50%"
//                     innerRadius={260}
//                     outerRadius={265}
//                     fill="#82ca9d"/>
//                 </PieChart>


//             </div>
//         </div>

//   )
// }




import React, { useEffect, useState, useContext } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { db } from '../../firebase';
import { collection, query, where, onSnapshot, Timestamp, getDocs } from 'firebase/firestore';
import { AuthContext } from '../../Context/AuthContext';

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

export default function VehicleChart() {
  const { currentUser } = useContext(AuthContext);
  const [station, setStation] = useState('Loading...');
  const [chartData, setChartData] = useState([]);
  const [hourlyData, setHourlyData] = useState([]);

  useEffect(() => {
    const fetchStation = async () => {
      if (!currentUser?.email) return;

      try {
        const q = query(
          collection(db, 'police'),
          where('email', '==', currentUser.email)
        );
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          const stationData = snapshot.docs[0]?.data()?.station || 'No Station';
          setStation(stationData.toLowerCase());
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

  useEffect(() => {
    if (station === 'Loading...' || station === 'No Station Found' || !station) return;

    const today = new Date();
    const startOfDay = Timestamp.fromDate(new Date(today.setHours(0, 0, 0, 0)));
    const endOfDay = Timestamp.fromDate(new Date(today.setHours(23, 59, 59, 999)));

    const q = query(
      collection(db, 'accident_report'),
      where('A.A2', '==', station),
      where('createdAt', '>=', startOfDay),
      where('createdAt', '<=', endOfDay)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const vehicleCounts = {};
      const hourCounts = new Array(24).fill(0);

      querySnapshot.forEach((doc) => {
        const data = doc.data();

        if (data.createdAt) {
          const hour = data.createdAt.toDate().getHours();
          hourCounts[hour]++;
        }

        const { E } = data;
        if (E) {
          const vehicleTypes = [E.E1A, E.E1B, E.E1C].filter(Boolean);
          vehicleTypes.forEach((type) => {
            vehicleCounts[type] = (vehicleCounts[type] || 0) + 1;
          });
        }
      });

      const formattedChartData = Object.keys(vehicleCounts).map((key) => ({
        vehicle: `Vehicle ${key}`,
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
  }, [station]);

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
