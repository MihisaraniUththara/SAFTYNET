// import React, { useEffect, useState } from 'react';
// import { Bar } from 'react-chartjs-2';
// import { collection, query, where, getDocs } from 'firebase/firestore';
// import { db } from '../firebase'; // Adjust the import as per your project structure
// import { Spin } from 'antd';
// import {
//   Chart as ChartJS,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

// const VehicleAnalysis = () => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [startYear, setStartYear] = useState(2020);
//   const [endYear, setEndYear] = useState(2024); // Change to the required range

//   useEffect(() => {
//     fetchVehicleData();
//   }, [startYear, endYear]);

//   const fetchVehicleData = async () => {
//     setLoading(true);
//     const accidentsRef = collection(db, 'accident_report');
//     const reportData = {};

//     for (let year = startYear; year <= endYear; year++) {
//       reportData[year] = {
//         car: 0,
//         dualPurpose: 0,
//         lorry: 0,
//         cycle: 0,
//         motorcycle: 0,
//         threeWheeler: 0,
//         sltbBus: 0,
//         privateBus: 0,
//       };
//     }

//     const q = query(
//       accidentsRef,
//       where('createdAt', '>=', new Date(`${startYear}-01-01`)),
//       where('createdAt', '<=', new Date(`${endYear}-12-31`))
//     );

//     const querySnapshot = await getDocs(q);
//     querySnapshot.forEach((doc) => {
//       const data = doc.data();
//       const year = data.createdAt.toDate().getFullYear();
//       const vehicleTypes = [data.E?.E1A, data.E?.E1B, data.E?.E1C];

//       if (reportData[year]) {
//         if (vehicleTypes.includes('1')) reportData[year].car++;
//         if (vehicleTypes.includes('2')) reportData[year].dualPurpose++;
//         if (vehicleTypes.includes('3')) reportData[year].lorry++;
//         if (vehicleTypes.includes('4')) reportData[year].cycle++;
//         if (vehicleTypes.includes('5')) reportData[year].motorcycle++;
//         if (vehicleTypes.includes('6')) reportData[year].threeWheeler++;
//         if (vehicleTypes.includes('8')) reportData[year].sltbBus++;
//         if (vehicleTypes.includes('9')) reportData[year].privateBus++;
//       }
//     });

//     formatChartData(reportData);
//     setLoading(false);
//   };

//   const formatChartData = (reportData) => {
//     const labels = Object.keys(reportData);
//     const carData = labels.map((year) => reportData[year].car);
//     const dualPurposeData = labels.map((year) => reportData[year].dualPurpose);
//     const lorryData = labels.map((year) => reportData[year].lorry);
//     const cycleData = labels.map((year) => reportData[year].cycle);
//     const motorcycleData = labels.map((year) => reportData[year].motorcycle);
//     const threeWheelerData = labels.map((year) => reportData[year].threeWheeler);
//     const sltbBusData = labels.map((year) => reportData[year].sltbBus);
//     const privateBusData = labels.map((year) => reportData[year].privateBus);

//     setData({
//       labels,
//       datasets: [
//         { label: 'Car', data: carData, backgroundColor: '#FF6384' },
//         { label: 'Dual Purpose', data: dualPurposeData, backgroundColor: '#36A2EB' },
//         { label: 'Lorry', data: lorryData, backgroundColor: '#FFCE56' },
//         { label: 'Cycle', data: cycleData, backgroundColor: '#4BC0C0' },
//         { label: 'Motorcycle', data: motorcycleData, backgroundColor: '#9966FF' },
//         { label: 'Three Wheeler', data: threeWheelerData, backgroundColor: '#FF9F40' },
//         { label: 'SLTB Bus', data: sltbBusData, backgroundColor: '#FFCD56' },
//         { label: 'Private Bus', data: privateBusData, backgroundColor: '#C9CBCF' },
//       ],
//     });
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Vehicle Analysis ({startYear} - {endYear})</h1>
//       {loading ? (
//         <Spin size="large" />
//       ) : (
//         <Bar
//           data={data}
//           options={{
//             responsive: true,
//             plugins: {
//               legend: { position: 'top' },
//               title: {
//                 display: true,
//                 text: 'Vehicle Type Analysis by Year',
//               },
//             },
//             scales: {
//               x: { title: { display: true, text: 'Year' } },
//               y: { title: { display: true, text: 'Number of Accidents' } },
//             },
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default VehicleAnalysis;



import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Adjust the import as per your project structure
import { Spin } from 'antd';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const VehicleAnalysis = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startYear, setStartYear] = useState(2020);
  const [endYear, setEndYear] = useState(2024); // Adjust the range as needed

  useEffect(() => {
    fetchVehicleData();
  }, [startYear, endYear]);

  const fetchVehicleData = async () => {
    setLoading(true);
    const accidentsRef = collection(db, 'accident_report');
    const reportData = {};

    for (let year = startYear; year <= endYear; year++) {
      reportData[year] = {
        car: 0,
        dualPurpose: 0,
        lorry: 0,
        cycle: 0,
        motorcycle: 0,
        threeWheeler: 0,
        sltbBus: 0,
        privateBus: 0,
      };
    }

    const q = query(
      accidentsRef,
      where('createdAt', '>=', new Date(`${startYear}-01-01`)),
      where('createdAt', '<=', new Date(`${endYear}-12-31`))
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const year = data.createdAt.toDate().getFullYear();
      const vehicleTypes = [data.E?.E1A, data.E?.E1B, data.E?.E1C];

      if (reportData[year]) {
        if (vehicleTypes.includes('1')) reportData[year].car++;
        if (vehicleTypes.includes('2')) reportData[year].dualPurpose++;
        if (vehicleTypes.includes('3')) reportData[year].lorry++;
        if (vehicleTypes.includes('4')) reportData[year].cycle++;
        if (vehicleTypes.includes('5')) reportData[year].motorcycle++;
        if (vehicleTypes.includes('6')) reportData[year].threeWheeler++;
        if (vehicleTypes.includes('8')) reportData[year].sltbBus++;
        if (vehicleTypes.includes('9')) reportData[year].privateBus++;
      }
    });

    formatChartData(reportData);
    setLoading(false);
  };

  const formatChartData = (reportData) => {
    const labels = Object.keys(reportData);
    const carData = labels.map((year) => reportData[year].car);
    const dualPurposeData = labels.map((year) => reportData[year].dualPurpose);
    const lorryData = labels.map((year) => reportData[year].lorry);
    const cycleData = labels.map((year) => reportData[year].cycle);
    const motorcycleData = labels.map((year) => reportData[year].motorcycle);
    const threeWheelerData = labels.map((year) => reportData[year].threeWheeler);
    const sltbBusData = labels.map((year) => reportData[year].sltbBus);
    const privateBusData = labels.map((year) => reportData[year].privateBus);

    setData({
      labels,
      datasets: [
        { label: 'Car', data: carData, backgroundColor: '#FF6384' },
        { label: 'Dual Purpose', data: dualPurposeData, backgroundColor: '#36A2EB' },
        { label: 'Lorry', data: lorryData, backgroundColor: '#FFCE56' },
        { label: 'Cycle', data: cycleData, backgroundColor: '#4BC0C0' },
        { label: 'Motorcycle', data: motorcycleData, backgroundColor: '#9966FF' },
        { label: 'Three Wheeler', data: threeWheelerData, backgroundColor: '#FF9F40' },
        { label: 'SLTB Bus', data: sltbBusData, backgroundColor: '#FFCD56' },
        { label: 'Private Bus', data: privateBusData, backgroundColor: '#C9CBCF' },
      ],
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Vehicle Analysis ({startYear} - {endYear})</h1>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Bar
          data={data}
          options={{
            responsive: true,
            plugins: {
              legend: { position: 'top' },
              title: {
                display: true,
                text: 'Vehicle Type Analysis by Year (Stacked)',
              },
            },
            scales: {
              x: {
                stacked: true,
                title: { display: true, text: 'Year' },
              },
              y: {
                stacked: true,
                title: { display: true, text: 'Number of Accidents' },
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default VehicleAnalysis;
