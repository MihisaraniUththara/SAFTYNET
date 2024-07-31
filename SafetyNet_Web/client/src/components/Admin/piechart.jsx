// src/components/AnimatedPieChart.js
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Updated data
const data = [
  { name: 'Bicycle', value: 1 },
  { name: 'Container', value: 1 },
  { name: 'Motor cycle', value: 33 },
  { name: 'Three-wheeler', value: 17 },
  { name: 'Lorry', value: 48 },
  { name: 'Van', value: 13 },
  { name: 'Car', value: 15 },
  { name: 'Private bus', value: 6 },
  { name: 'SLTB bus', value: 2 },
  { name: 'Other', value: 5 },
];

// Define colors for each slice of the pie chart
const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6347',
  '#4682B4', '#6A5ACD', '#32CD32', '#FFD700', '#FF69B4'
];

const AnimatedPieChart = () => (
  <ResponsiveContainer width="100%" height={400}>
    <PieChart>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        outerRadius={150}
        fill="#8884d8"
        dataKey="value"
        animationBegin={0}
        animationDuration={1500}
        animationEasing="ease-in-out"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  </ResponsiveContainer>
);

export default AnimatedPieChart;
