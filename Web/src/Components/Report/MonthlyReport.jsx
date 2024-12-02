import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MonthlyReport = () => {
  const [month, setMonth] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleGenerateReport = () => {
    if (!month) {
      alert('Please select a month.');
      return;
    }

    // Map month name to its corresponding number
    const monthMapping = {
      January: 1,
      February: 2,
      March: 3,
      April: 4,
      May: 5,
      June: 6,
      July: 7,
      August: 8,
      September: 9,
      October: 10,
      November: 11,
      December: 12,
    };

    const numericMonth = monthMapping[month];

    if (!numericMonth) {
      alert('Invalid month selected.');
      return;
    }

    // Navigate to the report display page with the numeric month
    console.log('Generating Monthly Report:', { month, numericMonth });
    navigate(`/Report/Monthly?month=${numericMonth}`);
  };

  return (
    <div className="space-y-4">
      {/* Month Dropdown */}
      <div>
        <label className="block font-medium mb-2 text-black">Select Month:</label>
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="w-full p-2 border rounded-md text-black"
        >
          <option value="">-- Select Month --</option>
          {[
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ].map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerateReport}
        className="w-full bg-yellow-button py-2 rounded-md hover:bg-yellow text-black font-semibold"
      >
        Generate Report
      </button>
    </div>
  );
};

export default MonthlyReport;
