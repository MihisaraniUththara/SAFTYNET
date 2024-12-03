import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { collection, query, where, getDocs, Timestamp } from "firebase/firestore";
import { db } from "../../../firebase"; // Your Firebase config

const ReportDisplay = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const month = queryParams.get("month"); // Extract selected month
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (month) {
      generateMonthlyReport();
    } else {
      setError("Invalid or missing month parameter.");
    }
  }, [month]);

  const generateMonthlyReport = async () => {
    try {
      setLoading(true);
      setError(null);

      const currentYear = new Date().getFullYear();
      const selectedMonth = parseInt(month) - 1; // Months are 0-indexed

      if (isNaN(selectedMonth) || selectedMonth < 0 || selectedMonth > 11) {
        throw new Error("Invalid month value. Please select a valid month.");
      }

      const firstDayCurrentYear = new Date(currentYear, selectedMonth, 1);
      const lastDayCurrentYear = new Date(currentYear, selectedMonth + 1, 0);

      const firstDayLastYear = new Date(currentYear - 1, selectedMonth, 1);
      const lastDayLastYear = new Date(currentYear - 1, selectedMonth + 1, 0);

      // Fetch data for current year and last year
      const currentYearData = await fetchAccidentsData(firstDayCurrentYear, lastDayCurrentYear);
      const lastYearData = await fetchAccidentsData(firstDayLastYear, lastDayLastYear);

      // Map data to table rows
      const tableData = generateTableRows(currentYearData, lastYearData);
      setReportData(tableData);
    } catch (error) {
      setError(error.message);
      console.error("Error generating report:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAccidentsData = async (startDate, endDate) => {
    const startTimestamp = Timestamp.fromDate(startDate);
    const endTimestamp = Timestamp.fromDate(endDate);

    const accidentQuery = query(
      collection(db, "accident_report"),
      where("createdAt", ">=", startTimestamp),
      where("createdAt", "<=", endTimestamp)
    );

    const querySnapshot = await getDocs(accidentQuery);

    // Process the data and count based on conditions
    const data = querySnapshot.docs.map((doc) => doc.data());

    const counts = {
      fatalAccidents: data.filter((d) => d.A?.A6 === 1).length,
      seriousAccidents: data.filter((d) => d.A?.A6 === 2).length,
      minorAccidents: data.filter((d) => d.A?.A6 === 3).length,
      damagesOnlyAccidents: data.filter((d) => d.A?.A6 === 4).length,
      courtCases: data.filter((d) => d.A?.A30 === 1).length,
      settledCases: data.filter((d) => d.A?.A30 === 3).length,
      sltbBus: data.filter((d) => d.E?.E1A === 8 || d.E?.E2B === 8 || d.E?.E2C === 8).length,
      privateBus: data.filter((d) => d.E?.E1A === 9 || d.E?.E2B === 9 || d.E?.E2C === 9).length,
      govVehicles: data.filter((d) => d.E?.E5A === 3 || d.E?.E5B === 3 || d.E?.E5C === 3).length,
    };

    return counts;
  };

  const generateTableRows = (currentYearData, lastYearData) => {
    return [
      { label: "No of Fatal Accidents", current: currentYearData.fatalAccidents, last: lastYearData.fatalAccidents },
      { label: "No of Serious Accidents", current: currentYearData.seriousAccidents, last: lastYearData.seriousAccidents },
      { label: "No of Minor Accidents", current: currentYearData.minorAccidents, last: lastYearData.minorAccidents },
      { label: "No of Damages Only Accidents", current: currentYearData.damagesOnlyAccidents, last: lastYearData.damagesOnlyAccidents },
      { label: "No of Court Cases", current: currentYearData.courtCases, last: lastYearData.courtCases },
      { label: "No of Settled Cases", current: currentYearData.settledCases, last: lastYearData.settledCases },
      { label: "No of SLTB Bus", current: currentYearData.sltbBus, last: lastYearData.sltbBus },
      { label: "No of Private Bus", current: currentYearData.privateBus, last: lastYearData.privateBus },
      { label: "No of Government Vehicles", current: currentYearData.govVehicles, last: lastYearData.govVehicles },
    ];
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Monthly Report</h1>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : loading ? (
        <p>Loading report...</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Accident Detail</th>
              <th className="border border-gray-300 px-4 py-2">Current Year</th>
              <th className="border border-gray-300 px-4 py-2">Last Year</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((row, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">{row.label}</td>
                <td className="border border-gray-300 px-4 py-2">{row.current}</td>
                <td className="border border-gray-300 px-4 py-2">{row.last}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReportDisplay;