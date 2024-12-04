import React, { useState, useEffect } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { collection, getDocs } from 'firebase/firestore';
import { Warning, SentimentVeryDissatisfied, Healing, Build } from '@mui/icons-material';
import { db } from '../../firebase';

const SeverityTable = () => {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [data, setData] = useState([
    { name: 'Fatal', value: 0, icon: <SentimentVeryDissatisfied sx={{ color: 'black' }} /> },
    { name: 'Serious', value: 0, icon: <Warning sx={{ color: 'black' }} /> },
    { name: 'Minor', value: 0, icon: <Healing sx={{ color: 'black' }} /> },
    { name: 'Damage Only', value: 0, icon: <Build sx={{ color: 'black' }} /> },
  ]);
  const [years, setYears] = useState(['2024']); // Default years for the dropdown

  // Fetch data from Firebase for the selected year
  const fetchSeverityData = async (year) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'accident_report'));
      const counts = { "1": 0, "2": 0, "3": 0, "4": 0 };
      const yearSet = new Set();

      querySnapshot.forEach((doc) => {
        const accidentData = doc.data();
        const A = accidentData.A || {};
        const A6 = A.A6; // Retrieve the severity level
        const A3 = A.A3; // Retrieve the date field in YYYYMMDD format

        if (A3) {
          const recordYear = A3.substring(0, 4); // Extract the year (first 4 characters)
          yearSet.add(recordYear); // Collect all available years

          if (recordYear === year && counts.hasOwnProperty(A6)) {
            counts[A6] += 1; // Increment count for the severity level
          }
        }
      });

      setYears([...yearSet].sort().reverse()); // Update dropdown options dynamically

      // Update the data state
      setData((prevData) =>
        prevData.map((item) => {
          switch (item.name) {
            case 'Fatal':
              return { ...item, value: counts[1] };
            case 'Serious':
              return { ...item, value: counts[2] };
            case 'Minor':
              return { ...item, value: counts[3] };
            case 'Damage Only':
              return { ...item, value: counts[4] };
            default:
              return item;
          }
        })
      );
    } catch (error) {
      console.error('Error fetching severity data:', error);
    }
  };

  // Handle year selection
  const handleSelect = (option) => {
    setSelectedYear(option.value);
    fetchSeverityData(option.value); // Fetch data for the newly selected year
  };

  // Fetch initial data on mount
  useEffect(() => {
    fetchSeverityData(selectedYear);
  }, [selectedYear]);

  // Calculate the total value for percentage calculation
  const totalValue = data.reduce((sum, item) => sum + item.value, 0);

  // Function to determine background color based on percentage
  const getBackgroundColor = (percentage) => {
    const color = `rgba(251, 190, 0, ${percentage / 100})`;
    return color;
  };

  return (
    <div className="border border-gray-300 rounded-lg shadow-lg p-4 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-black text-xl font-semibold">Severity Stat</h3>
        <Dropdown
          options={years}
          value={selectedYear}
          onChange={handleSelect}
          placeholder="Select Year"
          className="dropdown"
          menuClassName="dropdown-menu border border-gray-300 rounded-md"
          controlClassName="dropdown-control border border-gray-300 rounded-md"
        />
      </div>
      <table className="w-full border-collapse mt-4">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2 bg-gray-100 text-black text-left">Severity</th>
            <th className="border border-gray-300 p-2 bg-gray-100 text-black text-left">Count</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            const percentage = totalValue ? (item.value / totalValue) * 100 : 0;
            return (
              <tr key={item.name} style={{ backgroundColor: getBackgroundColor(percentage) }}>
                <td className="border border-gray-300 p-2 flex items-center">
                  {item.icon}
                  <span className="ml-2 text-black">{item.name}</span>
                </td>
                <td className="border border-gray-300 p-2 text-black">{item.value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SeverityTable;
