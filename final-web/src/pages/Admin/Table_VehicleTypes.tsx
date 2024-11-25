import React, { useState } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import {
  TwoWheeler, DirectionsCar, DirectionsBus, LocalShipping, DirectionsBike, DirectionsTransit, EmojiTransportation
} from '@mui/icons-material';

// Define the type for the data used in the table
interface Data {
  name: string;
  value: number;
  icon: JSX.Element; // Added icon field for each vehicle type
}

// Sample data for 2023 with icons
const data2023: Data[] = [
  { name: 'Motor cycles', value: 33, icon: <TwoWheeler /> },
  { name: 'Three wheelers', value: 17, icon: <DirectionsTransit /> },
  { name: 'Lorries', value: 48, icon: <LocalShipping /> },
  { name: 'Cycles', value: 13, icon: <DirectionsBike /> },
  { name: 'Cars', value: 15, icon: <DirectionsCar /> },
  { name: 'Buses', value: 6, icon: <DirectionsBus /> },
  { name: 'Other', value: 5, icon: <EmojiTransportation /> },
];

// Year options
const years = ['2023', '2022', '2021'];

const VehicleTypesTable: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState('2023');
  const [data, setData] = useState(data2023);

  const handleSelect = (option: { value: string }) => {
    setSelectedYear(option.value);
    // Update data based on selected year if needed
    if (option.value === '2023') {
      setData(data2023);
    }
    // Add logic to handle other years' data if available
  };

  // Calculate the total value for percentage calculation
  const totalValue = data.reduce((sum, item) => sum + item.value, 0);

  // Function to determine background color based on percentage
  const getBackgroundColor = (percentage: number) => {
    // Use a color gradient based on percentage
    const color = `rgba(0, 123, 255, ${percentage / 100})`; // Blue color with varying opacity
    return color;
  };

  return (
    <div className="border border-gray-300 rounded-lg shadow-lg p-4 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Vehicle Types</h3>
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
            <th className="border border-gray-300 p-2 bg-gray-100 text-left">Vehicle Type</th>
            <th className="border border-gray-300 p-2 bg-gray-100 text-left">Count</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            const percentage = (item.value / totalValue) * 100;
            return (
              <tr key={item.name} style={{ backgroundColor: getBackgroundColor(percentage) }}>
                <td className="border border-gray-300 p-2 flex items-center">
                  {item.icon}
                  <span className="ml-2">{item.name}</span>
                </td>
                <td className="border border-gray-300 p-2">{item.value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default VehicleTypesTable;
