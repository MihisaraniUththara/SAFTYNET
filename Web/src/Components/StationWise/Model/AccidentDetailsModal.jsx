import React from 'react';

const AccidentDetailsModal = ({ report, getStatus, onClose, A8F, A9F, getUrban, A20F, A21F, A22F, A23F, A24F, A25F, A26F, A27F, A30F }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-5 rounded-lg w-1/3">
        <h2 className="text-xl font-bold mb-4"><center>Accident Report Details</center></h2>
        <div>
          <div className='text-right'>{getStatus(report.submit, report.oicApp, report.headApp)}</div>
          <p><strong>Accident ID        :</strong> {report.AccidentId}</p>
          <p><strong>Date               :</strong> {report.date}</p>
          <p><strong>Urban or Rural     :</strong> {getUrban(report.Urban_Rural)}</p>
          <p><strong>Workday or Holiday :</strong>{A8F(report.A8)}</p>
          <p><strong>Day of Week        :</strong>{A9F(report.A9)}</p>
          <p><strong>Road Number        :</strong> {report.A10}</p>
          <p><strong>Road Name          :</strong> {report.A11}</p>
          <p><strong>Any second collision occurence:</strong>{A20F(report.A20)}</p>
          <p><strong>Road Condition     :</strong>{A21F(report.A21)}</p>
          <p><strong>Weather            :</strong>{A22F(report.A22)}</p>
          <p><strong>Light Condition    :</strong>{A23F(report.A23)}</p>
          <p><strong>Type of Location   :</strong>{A24F(report.A24)}</p>
          <p><strong>Type of Location when pedestrians involved:</strong>{A25F(report.A25)}</p>
          <p><strong>Traffic Control    :</strong>{A26F(report.A26)}</p>
          <p><strong>Posted speed limit signs   :</strong>{A27F(report.A27)}</p>
          <p><strong>Speed limit light vehicles :</strong> {report.A28} kmph</p>
          <p><strong>Speed limit heavy vehicles :</strong> {report.A29} kmph</p>
          <p><strong>Action Taken by Police     :</strong>{A30F(report.A30)}</p>
          <p><strong>Case Number :</strong> {report.A31} kmph</p>
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
