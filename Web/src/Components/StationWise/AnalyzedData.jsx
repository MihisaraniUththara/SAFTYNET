// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import { collection, query, where, getDocs } from 'firebase/firestore';
// import { db } from '../../firebase';
// import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const AnalyzedData = () => {
//   const location = useLocation();
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [type, setType] = useState('');
//   const [station, setStation] = useState('');
//   const [startYear, setStartYear] = useState('');
//   const [endYear, setEndYear] = useState('');

//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     setStartYear(params.get('startYear'));
//     setEndYear(params.get('endYear'));
//     setType(params.get('type'));
//     setStation(params.get('station'));
//   }, [location]);

//   useEffect(() => {
//     if (startYear && endYear && type && station) {
//       fetchData();
//     }
//   }, [startYear, endYear, type, station]);

//   const fetchData = async () => {
//     setLoading(true);
//     const accidentsRef = collection(db, 'accident_report');
//     const q = query(
//       accidentsRef,
//       where('createdAt', '>=', new Date(`${startYear}-01-01`)),
//       where('createdAt', '<=', new Date(`${endYear}-12-31`)),
//       where('A.A2', '==', station)
//     );

//     const querySnapshot = await getDocs(q);
//     const rawData = {};

//     querySnapshot.forEach((doc) => {
//       const data = doc.data();
//       const year = data.createdAt.toDate().getFullYear();
//       if (!rawData[year]) rawData[year] = {};

//       switch (type) {
//         case 'day':
//           const day = data.A?.A9 || ''; // Sunday=1, Monday=2, etc.
//           rawData[year][day] = (rawData[year][day] || 0) + 1;
//           break;
//         case 'urban':
//           const areaType = data.A?.A7 || '';
//           rawData[year][areaType] = (rawData[year][areaType] || 0) + 1;
//           break;
//         case 'vehicle':
//           const vehicleTypes = [data.E?.E1A, data.E?.E1B, data.E?.E1C];
//           vehicleTypes.forEach((vehicle) => {
//             if (vehicle) {
//               rawData[year][vehicle] = (rawData[year][vehicle] || 0) + 1;
//             }
//           });
//           break;
//         case 'gender':
//           const genders = [data.E?.E7A, data.E?.E7B, data.E?.E8B];
//           genders.forEach((gender) => {
//             if (gender) {
//               rawData[year][gender] = (rawData[year][gender] || 0) + 1;
//             }
//           });
//           break;
//         default:
//           break;
//       }
//     });

//     // Format Data
//     const formattedData = Object.keys(rawData).map((year) => ({
//       year,
//       ...rawData[year],
//     }));

//     setData(formattedData);
//     setLoading(false);
//   };

//   const getBarData = () => {
//     if (type === 'day') {
//       return [
//         { label: 'Sunday', key: '1' },
//         { label: 'Monday', key: '2' },
//         { label: 'Tuesday', key: '3' },
//         { label: 'Wednesday', key: '4' },
//         { label: 'Thursday', key: '5' },
//         { label: 'Friday', key: '6' },
//         { label: 'Saturday', key: '7' },
//       ];
//     } else if (type === 'urban') {
//       return [
//         { label: 'Urban', key: '1' },
//         { label: 'Rural', key: '2' },
//       ];
//     } else if (type === 'vehicle') {
//       return [
//         { label: 'Car', key: '1' },
//         { label: 'Dual Purpose', key: '2' },
//         { label: 'Lorry', key: '3' },
//         { label: 'Cycle', key: '4' },
//         { label: 'Motorcycle', key: '5' },
//         { label: 'Three-Wheeler', key: '6' },
//         { label: 'SLTB Bus', key: '8' },
//         { label: 'Private Bus', key: '9' },
//         { label: 'Tractor', key: '11' },
//       ];
//     } else if (type === 'gender') {
//       return [
//         { label: 'Male', key: '1' },
//         { label: 'Female', key: '2' },
//       ];
//     }
//     return [];
//   };

//   return (
//     <div className="p-6 bg-white text-center w-screen h-screen flex items-center justify-center flex-col">
//       <h1 className="text-2xl font-bold mb-4 text-black text-center">Analysis Report <br />Accidents By {type}<br/> {startYear}.01.01 - {endYear}.12.31</h1>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <ResponsiveContainer width="100%" height={400}>
//           {type === 'urban' || type === 'vehicle' ? (
//             <BarChart data={data}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="year" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               {getBarData().map((item) => (
//                 <Bar key={item.key} dataKey={item.key} name={item.label} fill="#8884d8" />
//               ))}
//             </BarChart>
//           ) : (
//             <LineChart data={data}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="year" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               {getBarData().map((item) => (
//                 <Line key={item.key} dataKey={item.key} name={item.label} stroke="#82ca9d" />
//               ))}
//             </LineChart>
//           )}
//         </ResponsiveContainer>
//       )}
//     </div>
//   );
// };

// export default AnalyzedData


import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const AnalyzedData = () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState('');
  const [station, setStation] = useState('');
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setStartYear(params.get('startYear'));
    setEndYear(params.get('endYear'));
    setType(params.get('type'));
    setStation(params.get('station'));
  }, [location]);

  useEffect(() => {
    if (startYear && endYear && type && station) {
      fetchData();
    }
  }, [startYear, endYear, type, station]);

  const fetchData = async () => {
    setLoading(true);
    const accidentsRef = collection(db, 'accident_report');
    const q = query(
      accidentsRef,
      where('createdAt', '>=', new Date(`${startYear}-01-01`)),
      where('createdAt', '<=', new Date(`${endYear}-12-31`)),
      where('A.A2', '==', station)
    );

    const querySnapshot = await getDocs(q);
    const rawData = {};

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const year = data.createdAt.toDate().getFullYear();
      if (!rawData[year]) rawData[year] = {};

      switch (type) {
        case 'day':
          const day = data.A?.A9 || ''; // Sunday=1, Monday=2, etc.
          rawData[year][day] = (rawData[year][day] || 0) + 1;
          break;
        case 'urban':
          const areaType = data.A?.A7 || '';
          rawData[year][areaType] = (rawData[year][areaType] || 0) + 1;
          break;
        case 'vehicle':
          const vehicleTypes = [data.E?.E1A, data.E?.E1B, data.E?.E1C];
          vehicleTypes.forEach((vehicle) => {
            if (vehicle) {
              rawData[year][vehicle] = (rawData[year][vehicle] || 0) + 1;
            }
          });
          break;
        case 'gender':
          const genders = [data.E?.E7A, data.E?.E7B, data.E?.E8B];
          genders.forEach((gender) => {
            if (gender) {
              rawData[year][gender] = (rawData[year][gender] || 0) + 1;
            }
          });
          break;
        default:
          break;
      }
    });

    // Format Data
    const formattedData = Object.keys(rawData).map((year) => ({
      year,
      ...rawData[year],
    }));

    setData(formattedData);
    setLoading(false);
  };

  const getBarData = () => {
    if (type === 'day') {
      return [
        { label: 'Sunday', key: '1', color: '#8884d8' },
        { label: 'Monday', key: '2', color: '#82ca9d' },
        { label: 'Tuesday', key: '3', color: '#ffc658' },
        { label: 'Wednesday', key: '4', color: '#ff7300' },
        { label: 'Thursday', key: '5', color: '#0088fe' },
        { label: 'Friday', key: '6', color: '#00c49f' },
        { label: 'Saturday', key: '7', color: '#ffbb28' },
      ];
    } else if (type === 'urban') {
      return [
        { label: 'Urban', key: '1', color: '#8884d8' },
        { label: 'Rural', key: '2', color: '#82ca9d' },
      ];
    } else if (type === 'vehicle') {
      return [
        { label: 'Car', key: '1', color: '#8884d8' },
        { label: 'Dual Purpose', key: '2', color: '#82ca9d' },
        { label: 'Lorry', key: '3', color: '#ffc658' },
        { label: 'Cycle', key: '4', color: '#ff7300' },
        { label: 'Motorcycle', key: '5', color: '#0088fe' },
        { label: 'Three-Wheeler', key: '6', color: '#00c49f' },
        { label: 'SLTB Bus', key: '8', color: '#ffbb28' },
        { label: 'Private Bus', key: '9', color: '#d0ed57' },
        { label: 'Tractor', key: '11', color: '#a4de6c' },
      ];
    } else if (type === 'gender') {
      return [
        { label: 'Male', key: '1', color: '#8884d8' },
        { label: 'Female', key: '2', color: '#82ca9d' },
      ];
    }
    return [];
  };

  function capitalizeFirstLetter(station) {
    if (!station) return ''; // Handle empty or undefined strings
    return station.charAt(0).toUpperCase() + station.slice(1).toLowerCase();
}

  return (
    <div className="p-6 bg-white text-center w-screen h-screen flex items-center justify-center flex-col">
      <h1 className="text-2xl font-bold mb-4 text-black">
        Accidents By {type} Analyze <br/> {capitalizeFirstLetter(station)} <br /> {startYear}.01.01 - {endYear}.12.31
      </h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ResponsiveContainer width="80%" height={400}>
          {type === 'urban' || type === 'vehicle' ? (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              {getBarData().map((item) => (
                <Bar key={item.key} dataKey={item.key} name={item.label} fill={item.color} />
              ))}
            </BarChart>
          ) : (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              {getBarData().map((item) => (
                <Line key={item.key} dataKey={item.key} name={item.label} stroke={item.color} />
              ))}
            </LineChart>
          )}
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default AnalyzedData;
