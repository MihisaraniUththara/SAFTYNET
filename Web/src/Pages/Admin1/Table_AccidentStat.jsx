import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { DirectionsWalk, PedalBike, DirectionsBus, People, TwoWheeler, EmojiTransportation, DirectionsCar } from '@mui/icons-material';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { db } from '../../firebase';

const AccidentReport = () => {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [data, setData] = useState([
    { name: 'Speeding', value: 0, icon: <DirectionsWalk sx={{ color: 'black' }} /> },
    { name: 'Aggressive Driving', value: 0, icon: <PedalBike sx={{ color: 'black' }} /> },
    { name: 'Error of Judgement', value: 0, icon: <DirectionsBus sx={{ color: 'black' }} /> },
    { name: 'Influenced by Alcohol', value: 0, icon: <People sx={{ color: 'black' }} /> },
    { name: 'Fatigue', value: 0, icon: <TwoWheeler sx={{ color: 'black' }} /> },
    { name: 'Others', value: 0, icon: <EmojiTransportation sx={{ color: 'black' }} /> },
    { name: 'Not Known', value: 0, icon: <DirectionsCar sx={{ color: 'black' }} /> },
  ]);
  const [years, setYears] = useState(['2024']); // Default years

  const fetchAccidentData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'accident_report'));
      const counts = { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "10": 0, "0": 0 };
      const yearSet = new Set();

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const E = data.E || {}; // Retrieve the `E` map or default to an empty object
        const A3 = data.A?.A3; // Extract the A3 field (assumed to be a date in yyyymmdd format)

        if (A3) {
          const year = A3.substring(0, 4); // Extract the year (YYYY)
          yearSet.add(year); // Add to yearSet to collect all available years

          if (year === selectedYear) {
            Object.values(E).forEach((value) => {
              if (counts.hasOwnProperty(value)) {
                counts[value] += 1; // Increment the count for the corresponding value
              }
            });
          }
        }
      });

      setYears([...yearSet].sort().reverse()); // Update years dropdown
      // Update data based on the selected year
      setData((prevData) =>
        prevData.map((item) => {
          switch (item.name) {
            case 'Speeding':
              return { ...item, value: counts[1] };
            case 'Aggressive Driving':
              return { ...item, value: counts[2] };
            case 'Error of Judgement':
              return { ...item, value: counts[3] };
            case 'Influenced by Alcohol':
              return { ...item, value: counts[4] };
            case 'Fatigue':
              return { ...item, value: counts[5] };
            case 'Others':
              return { ...item, value: counts[10] };
            case 'Not Known':
              return { ...item, value: counts[0] };
            default:
              return item;
          }
        })
      );
    } catch (error) {
      console.error('Error fetching accident data:', error);
    }
  };

  const handleSelectYear = (option) => {
    setSelectedYear(option.value);
  };

  useEffect(() => {
    fetchAccidentData(); // Fetch data when component mounts or year changes
  }, [selectedYear]);

  const calculatePercentage = (value, total) => {
    if (total === 0) return 0;
    return Math.round((value / total) * 100);
  };

  const getBackgroundColor = (percentage) => {
    if (percentage === 0) return '#ffffff'; // No color for 0%
    const opacity = percentage / 100; // Scale opacity between 0 and 1
    return `rgba(251, 190, 0, ${opacity})`; // Blue color with varying opacity
  };

  const totalValue = data.reduce((sum, item) => sum + item.value, 0); // Calculate total count

  return (
    <div className="border border-gray-300 rounded-lg shadow-lg p-4 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-black text-xl font-semibold">Human Errors</h3>
        <Dropdown
          options={years}
          value={selectedYear}
          onChange={handleSelectYear}
          placeholder="Select Year"
          className="dropdown"
          menuClassName="dropdown-menu border border-gray-300 rounded-md"
          controlClassName="dropdown-control border border-gray-300 rounded-md"
        />
      </div>
      <table className="w-full border-collapse mt-4">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2 bg-gray-100 text-black text-left">Error Type</th>
            <th className="border border-gray-300 p-2 bg-gray-100 text-black text-left">Count</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            const percentage = calculatePercentage(item.value, totalValue);
            return (
              <tr
                key={index}
                className="hover:bg-gray-100 transition-colors"
                style={{ backgroundColor: getBackgroundColor(percentage) }}
              >
                <td className="border border-gray-300 p-2 flex items-center text-black">
                  {item.icon}
                  <span className="ml-2">{item.name}</span>
                </td>
                <td className="border border-gray-300 p-2 text-black text-right">{item.value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AccidentReport;
