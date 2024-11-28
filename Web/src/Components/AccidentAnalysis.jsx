import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { db } from '../firebase'; // Ensure correct Firebase import
import { collection, getDocs } from 'firebase/firestore';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AccidentAnalysis = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, 'accident_report'));
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      // Process data for the chart
      const groupedData = processAccidentData(data);
      setChartData(groupedData);
    };

    fetchData();
  }, []);

  const processAccidentData = (data) => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ];
  
    const severityLabels = {
      '1': 'Fatal',
      '2': 'Serious',
      '3': 'Minor',
      '4': 'Damages Only',
      '5': 'Null',
      'Unknown': 'Unknown',
    };
  
    const grouped = {};
  
    // Group accidents by month and severity
    data.forEach((doc) => {
      const { createdAt, A } = doc;
      const severity = severityLabels[A?.A6] || severityLabels['Unknown']; // Map severity code to label
  
      if (createdAt) {
        const date = createdAt.toDate(); // Firestore Timestamp to JS Date
        const month = monthNames[date.getMonth()]; // Get month name
  
        if (!grouped[month]) grouped[month] = {};
        if (!grouped[month][severity]) grouped[month][severity] = 0;
  
        grouped[month][severity] += 1; // Increment count
      }
    });
  
    // Prepare data for Chart.js
    const months = monthNames;
    const severities = Object.values(severityLabels); // Use descriptive labels for the chart
  
    const datasets = severities.map((severity) => ({
      label: severity, // Use descriptive label
      data: months.map((month) => grouped[month]?.[severity] || 0), // Get counts for each month
      borderColor: getColor(severity), // Unique color for each severity
      backgroundColor: getColor(severity, 0.5),
      tension: 0.4,
    }));
  
    return {
      labels: months,
      datasets,
    };
  };
  
  const getColor = (severity, alpha = 1) => {
    const colors = {
      'Fatal': `rgba(255, 99, 132, ${alpha})`,
      'Serious': `rgba(54, 162, 235, ${alpha})`,
      'Minor': `rgba(255, 206, 86, ${alpha})`,
      'Damages Only': `rgba(75, 192, 192, ${alpha})`,
      'Null': `rgba(153, 102, 255, ${alpha})`,
      'Unknown': `rgba(201, 203, 207, ${alpha})`,
    };
    return colors[severity] || `rgba(0, 0, 0, ${alpha})`;
  };
  
  if (!chartData) return <div>Loading...</div>;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full">
      <h2 className="text-xl font-semibold mb-4">Monthly Accident Analysis</h2>
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Monthly Accident Count by Severity',
            },
          },
        }}
      />
    </div>
  );
};

export default AccidentAnalysis;
