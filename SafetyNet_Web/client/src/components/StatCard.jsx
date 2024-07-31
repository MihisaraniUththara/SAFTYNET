import React from 'react';

const StatCard = ({ title, children }) => {
  return (
    <div className="stat-card">
      <h3>{title}</h3>
      <div className="stat-card-content">
        {children}
      </div>
      <button className="get-report-button">Get Report</button>
    </div>
  );
};

export default StatCard;