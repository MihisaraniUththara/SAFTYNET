import React from 'react';

const AccidentDetailsModal = ({ report, getStatus, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-5 rounded-lg w-1/3">
        <h2 className="text-xl font-bold mb-4"><center>Accident Report Details</center></h2>
        <div>
          <p><strong>Accident ID:</strong> {report.AccidentId}</p>
          <p><strong>Date:</strong> {report.date}</p>
          <p><strong>Status:</strong> {getStatus(report.submit, report.oicApp, report.headApp)}</p>
        </div>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AccidentDetailsModal;
