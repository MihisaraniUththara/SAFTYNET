import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Table } from 'antd'; // Using Ant Design for table display

const ReportDisplay = () => {
  const location = useLocation();
  const [filteredReports, setFilteredReports] = useState([]);
  const [reportType, setReportType] = useState('');

  useEffect(() => {
    if (location.state?.filteredReports && location.search) {
      setFilteredReports(location.state.filteredReports);

      const params = new URLSearchParams(location.search);
      setReportType(params.get('type'));
    }
  }, [location]);

  const columns = [
    { title: 'Accident ID', dataIndex: 'A_id', key: 'A_id' },
    { title: 'Location', dataIndex: 'location', key: 'location' },
    { title: 'Date', dataIndex: 'createdAt', key: 'createdAt', render: (date) => date.toDate().toLocaleDateString() },
    { title: 'Casualties', dataIndex: 'casualties', key: 'casualties' },
    { title: 'Reason', dataIndex: 'reason', key: 'reason' },
    { title: 'Vehicle Type', dataIndex: 'vehicleType', key: 'vehicleType' },
    { title: 'Court Case', dataIndex: 'courtCase', key: 'courtCase' },
    { title: 'Day', dataIndex: 'day', key: 'day' },
  ];

  const filteredColumns = {
    accidents: ['A_id', 'location', 'createdAt'],
    casualties: ['A_id', 'location', 'casualties'],
    reasons: ['A_id', 'location', 'reason'],
    vehicles: ['A_id', 'vehicleType', 'location'],
    court: ['A_id', 'courtCase', 'location'],
    day: ['A_id', 'day', 'location'],
  };

  const getReportColumns = () => {
    const selectedColumns = filteredColumns[reportType] || [];
    return columns.filter((col) => selectedColumns.includes(col.dataIndex));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Report: {reportType.toUpperCase()}</h1>

      <Table
        dataSource={filteredReports.map((report, index) => ({ key: index, ...report }))}
        columns={getReportColumns()}
        bordered
        pagination={{ pageSize: 5 }}
        className="bg-white shadow-md"
      />
    </div>
  );
};

export default ReportDisplay;
