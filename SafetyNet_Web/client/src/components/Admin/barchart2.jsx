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
  { name: 'Fetal', 2021: 1500, 2022: 1800, 2023: 1900 },
  { name: 'Serious', 2021: 5000, 2022: 5500, 2023: 6000 },
  { name: 'Minor', 2021: 6500, 2022: 7000, 2023: 8000 },
  { name: 'Damage Only', 2021: 3800, 2022: 4000, 2023: 6000 },
  { name: 'Deaths', 2021: 1500, 2022: 1700, 2023: 2000 },
];

const AnimatedBarChart1 = () => {
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

export default AnimatedBarChart1;
