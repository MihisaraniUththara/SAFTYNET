import React, { useState } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { DirectionsCar, PedalBike, DirectionsBus, People, TwoWheeler, EmojiTransportation, DirectionsWalk } from '@mui/icons-material';

// Sample data for 2023 with corresponding icons
const data2023 = [
  { name: 'Pedestrians', value: 750, icon: <DirectionsWalk sx={{ color: 'black' }} /> },
  { name: 'Cycle', value: 200, icon: <PedalBike sx={{ color: 'black' }} /> },
  { name: 'Back Riders', value: 190, icon: <DirectionsBus sx={{ color: 'black' }} /> },
  { name: 'Passengers', value: 325, icon: <People sx={{ color: 'black' }} /> },
  { name: 'Motorcycle', value: 750, icon: <TwoWheeler sx={{ color: 'black' }} /> },
  { name: 'Drivers', value: 180, icon: <EmojiTransportation sx={{ color: 'black' }} /> },
  { name: 'Others', value: 70, icon: <DirectionsCar sx={{ color: 'black' }} /> },
];

// Year options
const years = ['2023', '2022', '2021'];

const AccidentStatTable = () => {
  const [selectedYear, setSelectedYear] = useState('2023');
  const [data, setData] = useState(data2023);

  const handleSelect = (option) => {
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
  const getBackgroundColor = (percentage) => {
    // Use a color gradient based on percentage
    const color = `rgba(0, 255, 0, ${percentage / 100})`; // Green color with varying opacity
    return color;
  };

  return (
    <div className="border border-gray-300 rounded-lg shadow-lg p-4 bg-white">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <h3 className="text-black text-xl font-semibold">Accident Stats</h3>
        </div>
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
            <th className="border border-gray-300 p-2 bg-gray-100 text-black text-left flex items-center">
              <DirectionsCar className="mr-2" /> Type
            </th>
            <th className="border border-gray-300 p-2 bg-gray-100 text-black text-left">Count</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            const percentage = (item.value / totalValue) * 100;
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

export default AccidentStatTable;
