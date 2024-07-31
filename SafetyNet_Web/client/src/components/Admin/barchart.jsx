import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

const CustomBar = (props) => {
  const { x, y, width, height, fill } = props;
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={fill}
    />
  );
};

const data = [
  { name: 'Motorcycle', 2021: 1000, 2022: 900, 2023: 750 },
  { name: 'Pedestrians', 2021: 600, 2022: 700, 2023: 750 },
  { name: 'Passengers', 2021: 300, 2022: 350, 2023: 325 },
  { name: 'Cycle', 2021: 150, 2022: 250, 2023: 200 },
  { name: 'Back Riders', 2021: 180, 2022: 200, 2023: 190 },
  { name: 'Drivers', 2021: 300, 2022: 220, 2023: 180 },
  { name: 'Others', 2021: 50, 2022: 60, 2023: 70 },
];

const AnimatedBarChart = () => {
  return (
    <BarChart width={1000} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="2021" fill="#8884d8" animationDuration={500} shape={<CustomBar />} />
      <Bar dataKey="2022" fill="#82ca9d" animationDuration={500} shape={<CustomBar />} />
      <Bar dataKey="2023" fill="#ffc658" animationDuration={500} shape={<CustomBar />} />
    </BarChart>
  );
};

export default AnimatedBarChart;
