import React, { useState, useEffect } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import {
  TwoWheeler, DirectionsCar, DirectionsBus, LocalShipping, DirectionsBike, DirectionsTransit, EmojiTransportation
} from '@mui/icons-material';

const VehicleTypesTable = () => {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [data, setData] = useState([
    { name: 'Motor cycles', value: 0, icon: <TwoWheeler sx={{ color: 'black' }} /> },
    { name: 'Three wheelers', value: 0, icon: <DirectionsTransit sx={{ color: 'black' }} /> },
    { name: 'Lorries', value: 0, icon: <LocalShipping sx={{ color: 'black' }} /> },
    { name: 'Cycles', value: 0, icon: <DirectionsBike sx={{ color: 'black' }} /> },
    { name: 'Cars', value: 0, icon: <DirectionsCar sx={{ color: 'black' }} /> },
    { name: 'Buses', value: 0, icon: <DirectionsBus sx={{ color: 'black' }} /> },
    { name: 'Other', value: 0, icon: <EmojiTransportation sx={{ color: 'black' }} /> },
  ]);
  const [years, setYears] = useState(['2024']); // Default years for the dropdown

  // Fetch data from Firebase for the selected year
  const fetchVehicleData = async (year) => {
    const counts = { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0 };
    const yearSet = new Set();

    try {
      const querySnapshot = await getDocs(collection(db, 'accident_report'));
      querySnapshot.forEach((doc) => {
        const accidentData = doc.data();
        const E = accidentData.E || {}; // Fields for vehicle types
        const A3 = accidentData.A?.A3; // Date field in YYYYMMDD format

        if (A3) {
          const recordYear = A3.substring(0, 4); // Extract year (first 4 characters)
          yearSet.add(recordYear);

          if (recordYear === year) {
            // Count vehicle types based on E field values
            Object.values(E).forEach((fieldValue) => {
              switch (fieldValue) {
                case "5": counts[1]++; break; // Motor cycles
                case "6": counts[2]++; break; // Three wheelers
                case "3": counts[3]++; break; // Lorries
                case "4": counts[4]++; break; // Cycles
                case "1": counts[5]++; break; // Cars
                case "8": case "9": case "10": counts[6]++; break; // Buses
                case "2": case "7": case "12": case "13": case "19": counts[7]++; break; // Other
                default: break;
              }
            });
          }
        }
      });

      // Update available years for dropdown
      setYears([...yearSet].sort().reverse());

      // Update the data state with counts for the selected year
      setData((prevData) =>
        prevData.map((item) => {
          switch (item.name) {
            case 'Motor cycles':
              return { ...item, value: counts[1] };
            case 'Three wheelers':
              return { ...item, value: counts[2] };
            case 'Lorries':
              return { ...item, value: counts[3] };
            case 'Cycles':
              return { ...item, value: counts[4] };
            case 'Cars':
              return { ...item, value: counts[5] };
            case 'Buses':
              return { ...item, value: counts[6] };
            case 'Other':
              return { ...item, value: counts[7] };
            default:
              return item;
          }
        })
      );
    } catch (error) {
      console.error('Error fetching vehicle data:', error);
    }
  };

  // Handle year selection
  const handleSelect = (option) => {
    setSelectedYear(option.value);
    fetchVehicleData(option.value); // Fetch data for the newly selected year
  };

  // Fetch initial data on mount
  useEffect(() => {
    fetchVehicleData(selectedYear);
  }, [selectedYear]);

  // Calculate the total value for percentage calculation
  const totalValue = data.reduce((sum, item) => sum + item.value, 0);

  // Function to determine background color based on percentage
  const getBackgroundColor = (percentage) => {
    const color = `rgba(251, 190, 0, ${percentage / 100})`; // Blue color with varying opacity
    return color;
  };

  return (
    <div className="border border-gray-300 rounded-lg shadow-lg p-4 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-black text-xl font-semibold">Vehicle Types</h3>
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
            <th className="border border-gray-300 p-2 bg-gray-100 text-black text-left">Vehicle Type</th>
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

export default VehicleTypesTable;
