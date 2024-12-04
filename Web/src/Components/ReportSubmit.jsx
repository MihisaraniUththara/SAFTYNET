import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';
import { db } from '../firebase'; // Ensure correct Firebase import
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';

const ReportSubmit = () => {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null); // State to store selected report details

  useEffect(() => {
    const fetchReports = async () => {
      const q = query(
        collection(db, 'accident_report'),
        where('submit', '==', 1),
        where('oicApp', '==', 1),
        where('headApp', '==', 0)
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => {
        const docData = doc.data();
        return {
          id: doc.id,
          ...docData,
          ...docData.A, // Flatten nested 'A' fields
        };
      });
      setReports(data);
    };
    fetchReports();
  }, []);

  const sendEmail = async (toEmail, accidentId, station) => {
    try {
      console.log('Sending email with:', {
        to_email: toEmail,
        station: station,
        date: new Date().toLocaleDateString(),
        accident_id: accidentId,
      });

      const result = await emailjs.send(
        'service_hwz175y', // Replace with your actual service ID
        'template_rvx2rl2', // Replace with your actual template ID
        {
          to_email: toEmail,
          station: station,
          date: new Date().toLocaleDateString(),
          accident_id: accidentId,
        },
        'dC0v0cM6UrHCug-qq' //public key
      );

      console.log('Email sent successfully:', result.status, result.text);
      Swal.fire('Email Sent!', 'Rejection email successfully sent.', 'success');
    } catch (error) {
      console.error('Email failed to send:', error);
      Swal.fire('Error', 'Failed to send email. Please try again.', 'error');
    }
  };

  const handleApprove = async (id) => {
    try {
      await updateDoc(doc(db, 'accident_report', id), { headApp: 1 });
      Swal.fire('Approved!', 'Accident report approved successfully.', 'success');
      setReports(reports.filter((report) => report.id !== id));
    } catch (error) {
      Swal.fire('Error', 'Failed to approve report.', 'error');
    }
  };

  const handleReject = async (id, toEmail, station) => {
    try {
      await sendEmail(toEmail, id, station);
      const reportRef = doc(db, 'accident_report', id); 
      await updateDoc(reportRef, {
        submit: 0,
        oicApp: 0,
        rejecth: true, // Add or update the rejecth field
      });
      setReports(reports.filter((report) => report.id !== id));
    } catch (error) {
      Swal.fire('Error', 'Failed to update report after email.', 'error');
    }
  };

  const handleDetails = (report) => {
    setSelectedReport(report); // Set the selected report when "Details" is clicked
  };

  const closeDetails = () => {
    setSelectedReport(null); // Close the details view
  };

  const getSeverityText = (severityCode) => {
    const severities = {
      1: 'Fatal',
      2: 'Serious',
      3: 'Minor',
      4: 'Damages only',
    };
    return severities[severityCode] || 'Unknown';
  };

  return (
    <div className="bg-white px-4 pb-4 py-4 rounded-sm border border-gray-200 text-black w-full">
      <strong>
      <h1 className="text-2xl font-bold text-center text-black">
          <center>Approved Accident Reports</center>
        </h1>
      </strong>
      <div className="mt-3 p-3">
        <table className="w-full table-auto">
          <thead className="bg-gray-100 border-gray-400 font-semibold">
            <tr>
              <th className="p-3 tracking-wide">Date</th>
              <th className="p-3 tracking-wide">Accident Id</th>
              <th className="p-3 tracking-wide">Station</th>
              <th className="p-3 tracking-wide">Severity</th>
              <th className="p-3 tracking-wide">Action</th>
              <th className="p-3 tracking-wide">Options</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id} className="border-t text-center">
                <td className="p-3">{report.A?.A3 || 'N/A'}</td>
                <td className="p-3">{report.A?.A5 || 'N/A'}</td>
                <td className="p-3">
                {report.A?.A2
    ? report.A?.A2.charAt(0).toUpperCase() + report.A?.A2.slice(1)
    : 'N/A'}</td>
                <td className="p-3">{getSeverityText(report.A?.A6) || 'Hell'}</td>
                <td className="p-3">
                  <button
                    className="bg-green-500 hover:bg-green-600 text-black font-semibold py-1 px-2 rounded text-sm mr-2"
                    onClick={() => handleApprove(report.id)}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-black font-semibold py-1 px-2 rounded text-sm mr-2"
                    onClick={() => handleReject(report.id, `${report.A?.A2}.com`, report.A?.A2)}
                  >
                    Reject
                  </button>
                  </td>
                  <td>
                  <button
                    className="bg-yellow-button hover:bg-yellow text-black font-semibold py-1 px-2 rounded text-sm"
                    onClick={() => handleDetails(report)} // Open the details modal
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        
      </div>

      {/* Modal for displaying report details */}
      {selectedReport && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Accident Report Details</h2>
            <div>
              <p><strong>Accident ID:</strong> {selectedReport.A5}</p>
              <p><strong>Station:</strong> {selectedReport.A2}</p>
              <p><strong>Date:</strong> {selectedReport.A3}</p>
              <p><strong>Severity:</strong> {getSeverityText(selectedReport.A6)}</p>
              <p><strong>Description:</strong> {selectedReport.A4 || 'No Description Available'}</p> {/* Assuming A4 is description */}
            </div>
            <button
              onClick={closeDetails}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportSubmit;
