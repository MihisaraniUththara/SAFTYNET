




// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import { Table, Spin } from 'antd';
// import { db } from '../../../firebase'; // Adjust the import based on your file structure
// import { collection, query, where, getDocs } from 'firebase/firestore';

// const AccidentsReport = () => {
//   const location = useLocation();
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [startYear, setStartYear] = useState('');
//   const [endYear, setEndYear] = useState('');
//   const [reportType, setReportType] = useState('');

//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const start = params.get('startYear');
//     const end = params.get('endYear');
//     const type = params.get('type');

//     if (start && end && type) {
//       setStartYear(start);
//       setEndYear(end);
//       setReportType(type);

//       if (type === 'accidents') {
//         fetchAccidentsData(start, end);
//       } else if (type === 'casualties') {
//         fetchCasualtiesData(start, end);
//       }
//     }
//   }, [location]);

//   const fetchAccidentsData = async (start, end) => {
//     setLoading(true);
//     const accidentsRef = collection(db, 'accident_report');
//     const reportData = {};

//     for (let year = parseInt(start); year <= parseInt(end); year++) {
//       reportData[year] = { fatal: 0, serious: 0, minor: 0, damageOnly: 0, total: 0 };
//     }

//     const q = query(
//       accidentsRef,
//       where('createdAt', '>=', new Date(`${start}-01-01`)),
//       where('createdAt', '<=', new Date(`${end}-12-31`))
//     );

//     const querySnapshot = await getDocs(q);
//     querySnapshot.forEach((doc) => {
//       const data = doc.data();
//       const year = data.createdAt.toDate().getFullYear();
//       const type = data.A?.A6;

//       if (reportData[year]) {
//         switch (type) {
//           case '1':
//             reportData[year].fatal++;
//             break;
//           case '2':
//             reportData[year].serious++;
//             break;
//           case '3':
//             reportData[year].minor++;
//             break;
//           case '4':
//             reportData[year].damageOnly++;
//             break;
//           default:
//             break;
//         }
//         reportData[year].total++;
//       }
//     });

//     const formattedData = Object.keys(reportData).map((year) => ({
//       year,
//       ...reportData[year],
//     }));

//     setData(formattedData);
//     setLoading(false);
//   };

//   const fetchCasualtiesData = async (start, end) => {
//     setLoading(true);
//     const accidentsRef = collection(db, 'accident_report');
//     const reportData = {};

//     for (let year = parseInt(start); year <= parseInt(end); year++) {
//       reportData[year] = {
//         noOfAccidents: 0,
//         totalCasualties: 0,
//         fatal: 0,
//         serious: 0,
//         minor: 0,
//       };
//     }

//     const q = query(
//       accidentsRef,
//       where('createdAt', '>=', new Date(`${start}-01-01`)),
//       where('createdAt', '<=', new Date(`${end}-12-31`))
//     );

//     const querySnapshot = await getDocs(q);
//     querySnapshot.forEach((doc) => {
//       const data = doc.data();
//       const year = data.createdAt.toDate().getFullYear();
//       if (reportData[year]) {
//         reportData[year].noOfAccidents++;

//         const A33 = data?.A?.A33 || {};

//     const fatal = parseInt(A33['1'] || '0', 10);
//       const serious = parseInt(A33['2'] || '0', 10);
//       const minor = parseInt(A33['3'] || '0', 10);

//         reportData[year].fatal += fatal;
//         reportData[year].serious += serious;
//         reportData[year].minor += minor;
//         reportData[year].totalCasualties += fatal + serious + minor;
//       }
//     });

//     const formattedData = Object.keys(reportData).map((year) => ({
//       year,
//       ...reportData[year],
//     }));

//     setData(formattedData);
//     setLoading(false);
//   };

//   const accidentColumns = [
//     { title: 'Year', dataIndex: 'year', key: 'year' },
//     { title: 'Fatal Accidents', dataIndex: 'fatal', key: 'fatal' },
//     { title: 'Serious Accidents', dataIndex: 'serious', key: 'serious' },
//     { title: 'Minor Accidents', dataIndex: 'minor', key: 'minor' },
//     { title: 'Damages Only Accidents', dataIndex: 'damageOnly', key: 'damageOnly' },
//     { title: 'Total Accidents', dataIndex: 'total', key: 'total' },
//   ];

//   const casualtiesColumns = [
//     { title: 'Year', dataIndex: 'year', key: 'year' },
//     { title: 'No. of Accidents', dataIndex: 'noOfAccidents', key: 'noOfAccidents' },
//     { title: 'Total Casualties', dataIndex: 'totalCasualties', key: 'totalCasualties' },
//     { title: 'Fatal', dataIndex: 'fatal', key: 'fatal' },
//     { title: 'Serious', dataIndex: 'serious', key: 'serious' },
//     { title: 'Minor', dataIndex: 'minor', key: 'minor' },
//   ];

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">
//         {reportType === 'accidents' ? 'Accidents Report' : 'Casualties Report'} ({startYear} - {endYear})
//       </h1>
//       {loading ? (
//         <Spin size="large" />
//       ) : (
//         <Table
//           dataSource={data}
//           columns={reportType === 'accidents' ? accidentColumns : casualtiesColumns}
//           bordered
//           pagination={false}
//           rowKey="year"
//         />
//       )}
//     </div>
//   );
// };

// export default AccidentsReport;





import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Table, Spin } from 'antd';
import { db } from '../../../firebase'; // Adjust the import based on your file structure
import { collection, query, where, getDocs } from 'firebase/firestore';

const AccidentsReport = () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');
  const [reportType, setReportType] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const start = params.get('startYear');
    const end = params.get('endYear');
    const type = params.get('type');

    if (start && end && type) {
      setStartYear(start);
      setEndYear(end);
      setReportType(type);

      if (type === 'accidents') {
        fetchAccidentsData(start, end);
      } else if (type === 'casualties') {
        fetchCasualtiesData(start, end);
      } else if (type === 'reasons') {
        fetchReasonsData(start, end);
      }
    }
  }, [location]);

  const fetchAccidentsData = async (start, end) => {
    setLoading(true);
    const accidentsRef = collection(db, 'accident_report');
    const reportData = {};

    for (let year = parseInt(start); year <= parseInt(end); year++) {
      reportData[year] = { fatal: 0, serious: 0, minor: 0, damageOnly: 0, total: 0 };
    }

    const q = query(
      accidentsRef,
      where('createdAt', '>=', new Date(`${start}-01-01`)),
      where('createdAt', '<=', new Date(`${end}-12-31`))
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const year = data.createdAt.toDate().getFullYear();
      const type = data.A?.A6;

      if (reportData[year]) {
        switch (type) {
          case '1':
            reportData[year].fatal++;
            break;
          case '2':
            reportData[year].serious++;
            break;
          case '3':
            reportData[year].minor++;
            break;
          case '4':
            reportData[year].damageOnly++;
            break;
          default:
            break;
        }
        reportData[year].total++;
      }
    });

    const formattedData = Object.keys(reportData).map((year) => ({
      year,
      ...reportData[year],
    }));

    setData(formattedData);
    setLoading(false);
  };

  const fetchCasualtiesData = async (start, end) => {
    setLoading(true);
    const accidentsRef = collection(db, 'accident_report');
    const reportData = {};

    for (let year = parseInt(start); year <= parseInt(end); year++) {
      reportData[year] = {
        noOfAccidents: 0,
        totalCasualties: 0,
        fatal: 0,
        serious: 0,
        minor: 0,
      };
    }

    const q = query(
      accidentsRef,
      where('createdAt', '>=', new Date(`${start}-01-01`)),
      where('createdAt', '<=', new Date(`${end}-12-31`))
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const year = data.createdAt.toDate().getFullYear();
      if (reportData[year]) {
        reportData[year].noOfAccidents++;

        const fatal = parseInt(data['A.A33.1'] || '0', 10);
        const serious = parseInt(data['A.A33.2'] || '0', 10);
        const minor = parseInt(data['A.A33.3'] || '0', 10);

        reportData[year].fatal += fatal;
        reportData[year].serious += serious;
        reportData[year].minor += minor;
        reportData[year].totalCasualties += fatal + serious + minor;
      }
    });

    const formattedData = Object.keys(reportData).map((year) => ({
      year,
      ...reportData[year],
    }));

    setData(formattedData);
    setLoading(false);
  };

  const fetchReasonsData = async (start, end) => {
    setLoading(true);
    const accidentsRef = collection(db, 'accident_report');
    const reportData = {};

    for (let year = parseInt(start); year <= parseInt(end); year++) {
      reportData[year] = {
        speeding: 0,
        aggressiveDriving: 0,
        errorJudgement: 0,
        alcohol: 0,
        poorEyeSight: 0,
      };
    }

    const q = query(
      accidentsRef,
      where('createdAt', '>=', new Date(`${start}-01-01`)),
      where('createdAt', '<=', new Date(`${end}-12-31`))
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const year = data.createdAt.toDate().getFullYear();
      const reasons = [data.E?.E13A, data.E?.E13B, data.E?.E13C];

      if (reportData[year]) {
        if (reasons.includes('1')) reportData[year].aggressiveDriving++;
        if (reasons.includes('3')) reportData[year].errorJudgement++;
        if (reasons.includes('4')) reportData[year].alcohol++;
        if (reasons.includes('7')) reportData[year].poorEyeSight++;
      }
    });

    const formattedData = Object.keys(reportData).map((year) => ({
      year,
      ...reportData[year],
    }));

    setData(formattedData);
    setLoading(false);
  };

  const accidentColumns = [
    { title: 'Year', dataIndex: 'year', key: 'year', className : 'border-collapse border border-gray-300 items-center text-center' },
    { title: 'Fatal Accidents', dataIndex: 'fatal', key: 'fatal', className : 'border-collapse border border-gray-300 items-center text-center' },
    { title: 'Serious Accidents', dataIndex: 'serious', key: 'serious', className : 'border-collapse border border-gray-300 items-center text-center' },
    { title: 'Minor Accidents', dataIndex: 'minor', key: 'minor', className : 'border-collapse border border-gray-300 items-center text-center' },
    { title: 'Damages Only Accidents', dataIndex: 'damageOnly', key: 'damageOnly', className : 'border-collapse border border-gray-300 items-center text-center' },
    { title: 'Total Accidents', dataIndex: 'total', key: 'total', className : 'border-collapse border border-gray-300 items-center text-center' },
  ];

  const casualtiesColumns = [
    { title: 'Year', dataIndex: 'year', key: 'year', className : 'border-collapse border border-gray-300 items-center text-center' },
    { title: 'No. of Accidents', dataIndex: 'noOfAccidents', key: 'noOfAccidents', className : 'border-collapse border border-gray-300 items-center text-center' },
    { title: 'Total Casualties', dataIndex: 'totalCasualties', key: 'totalCasualties', className : 'border-collapse border border-gray-300 items-center text-center' },
    { title: 'Fatal', dataIndex: 'fatal', key: 'fatal', className : 'border-collapse border border-gray-300 items-center text-center' },
    { title: 'Serious', dataIndex: 'serious', key: 'serious', className : 'border-collapse border border-gray-300 items-center text-center' },
    { title: 'Minor', dataIndex: 'minor', key: 'minor', className : 'border-collapse border border-gray-300 items-center text-center' },
  ];

  const reasonsColumns = [
    { title: 'Year', dataIndex: 'year', key: 'year', className : 'border-collapse border border-gray-300 items-center text-center' },
    { title: 'Speeding', dataIndex: 'speeding', key: 'speeding', className : 'border-collapse border border-gray-300 items-center text-center' },
    { title: 'Aggressive Driving', dataIndex: 'aggressiveDriving', key: 'aggressiveDriving', className : 'border-collapse border border-gray-300 items-center text-center' },
    { title: 'Error in Judgement', dataIndex: 'errorJudgement', key: 'errorJudgement', className : 'border-collapse border border-gray-300 items-center text-center' },
    { title: 'Alcohol', dataIndex: 'alcohol', key: 'alcohol', className : 'border-collapse border border-gray-300 items-center text-center' },
    { title: 'Poor Eye Sight', dataIndex: 'poorEyeSight', key: 'poorEyeSight', className : 'border-collapse border border-gray-300 items-center text-center' },
  ];

  return (
    <div className="p-6 bg-white text-center w-screen h-screen flex items-center justify-center flex-col">
      <h1 className="text-2xl font-bold mb-4 text-black">
        {reportType === 'accidents'
          ? 'Number of Accidents Report'
          : reportType === 'casualties'
          ? 'Number of Casualties Report'
          : 'Reasons for Accidents Report'}{' '}
        ({startYear} - {endYear})
      </h1>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Table
          dataSource={data}
          columns={
            reportType === 'accidents'
              ? accidentColumns
              : reportType === 'casualties'
              ? casualtiesColumns
              : reasonsColumns
          }
          bordered
          pagination={false}
          rowKey="year"
          className="table-auto border-collapse border border-gray-300 items-center text-center"
        />
      )}
    </div>
  );
};

export default AccidentsReport;
