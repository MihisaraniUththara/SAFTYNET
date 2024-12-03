import React, { useState } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { Warning, SentimentVeryDissatisfied, Healing, Build } from '@mui/icons-material';

// Sample data for 2023 with icons
const data2023 = [
  { name: 'Fetal', value: 1900, icon: <SentimentVeryDissatisfied sx={{ color: 'black' }} /> },
  { name: 'Serious', value: 6000, icon: <Warning sx={{ color: 'black' }} /> },
  { name: 'Minor', value: 8000, icon: <Healing sx={{ color: 'black' }} /> },
  { name: 'Damage Only', value: 6000, icon: <Build sx={{ color: 'black' }} /> },
  { name: 'Deaths', value: 2000, icon: <SentimentVeryDissatisfied sx={{ color: 'black' }} /> },
];

// Year options
const years = ['2023', '2022', '2021'];

const SeverityTable = () => {
  const [selectedYear, setSelectedYear] = useState('2023');
  const [data, setData] = useState(data2023);

  const handleSelect = (option) => {
    setSelectedYear(option.value);
    // Update data based on selected year if needed
    // For now, we are using the same data for 2023
  };

  // Calculate the total value for percentage calculation
  const totalValue = data.reduce((sum, item) => sum + item.value, 0);

  // Function to determine background color based on percentage
  const getBackgroundColor = (percentage) => {
    // Use a color gradient based on percentage
    // For example, use a linear gradient from light red to dark red
    const color = `rgba(255, 0, 0, ${percentage / 100})`;
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

export default SeverityTable;
