import React, { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import { db } from '../../firebase';
import { collection, query, where, onSnapshot, updateDoc, doc, getDocs } from 'firebase/firestore';
import emailjs from '@emailjs/browser';
import { AuthContext } from '../../Context/AuthContext';

const ReportApproval = () => {
  const { currentUser } = useContext(AuthContext); // Access user context
  const [reports, setReports] = useState([]);
  const [officers, setOfficers] = useState({});
  const [selectedReport, setSelectedReport] = useState(null);
  const [station, setStation] = useState(null); // User's police station
  const [filters, setFilters] = useState({
    officerName: '',
    accidentId: '',
    severity: '',
    date: '',
  }); //filters

  // Fetch user's station based on currentUser email
  useEffect(() => {
    const fetchStation = async () => {
      if (currentUser?.email) {
        try {
          const stationQuery = query(
            collection(db, 'police'),
            where('email', '==', currentUser.email.toLowerCase())
          );
          const querySnapshot = await getDocs(stationQuery);
          if (!querySnapshot.empty) {
            const policeStation = querySnapshot.docs[0].data()?.station || 'Unknown';
            setStation(policeStation); // Normalize station name
          } else {
            setStation(null); // No station found
          }
        } catch (error) {
          console.error('Error fetching station:', error);
        }
      }
    };

    fetchStation();
  }, [currentUser]);

  // Fetch officers from the police collection and map badgeNumber to name
  const fetchOfficers = async () => {
    try {
      const officerSnapshot = await getDocs(collection(db, 'police'));
      const officerData = {};
      officerSnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        if (data.badgeNumber && data.email) { // Ensure both badgeNumber and email exist
          officerData[data.badgeNumber] = { name: data.name, email: data.email };
        }
      });
      setOfficers(officerData);
    } catch (error) {
      console.error('Error fetching officers:', error);
    }
  };
  


  useEffect(() => {
    fetchOfficers();
  }, []);

  // Fetch reports for the user's station
  useEffect(() => {
    if (station) {
      const q = query(
        collection(db, 'accident_report'),
        where('submit', '==', 1),
        where('oicApp', '==', 0),
        where('A.A2', '==', station) // Match station with A.A2 in accident_report
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const reportsData = [];
        querySnapshot.forEach((docSnap) => {
          reportsData.push({ id: docSnap.id, ...docSnap.data() });
        });
        setReports(reportsData);
      });

      // Cleanup subscription on unmount
      return () => unsubscribe();
    }
  }, [station]);

  const getSeverityText = (severityCode) => {
    const severities = {
      1: 'Fatal',
      2: 'Serious',
      3: 'Minor',
      4: 'Damages only',
    };
    return severities[severityCode] || 'Unknown';
  };

  const handleApprove = async (id) => {
    try {
      await updateDoc(doc(db, 'accident_report', id), { oicApp: 1 });
      Swal.fire('Approved!', 'Accident report approved successfully.', 'success');
      setReports(reports.filter((report) => report.id !== id));
    } catch (error) {
      Swal.fire('Error', 'Failed to approve report.', 'error');
    }
  };

//   const handleReject = async (id, toEmail, station, name) => {
//     // Log debug information
//     console.log('Officers:', officers); // Log the officers mapping
//     console.log('Report officerID:', report.officerID); // Log the officerID from the report
//     console.log('Resolved Email:', officers[report.officerID]?.email); // Log the resolved email address
  
//     if (!toEmail) {
//       console.error('Officer email address is missing. Cannot send rejection email.');
//       Swal.fire('Error', 'Officer email address is missing. Cannot send rejection email.', 'error');
//       return;
//     }
  
//     try {
//       await updateDoc(doc(db, 'accident_report', id), { reject: true, submit: 0 });
//       await sendEmail(toEmail, id, station, name);
//       Swal.fire('Rejected!', 'Accident report rejected and email sent.', 'success');
//       setReports(reports.filter((report) => report.id !== id));
//     } catch (error) {
//       Swal.fire('Error', 'Failed to update report after email.', 'error');
//     }
//   };
const handleReject = async (id, toEmail, station, name) => {
    console.log('Officers:', officers); // Log the officers mapping
    console.log('Resolved Email:', toEmail); // Log the resolved email address
  
    if (!toEmail) {
      console.error('Officer email address is missing. Cannot send rejection email.');
      Swal.fire('Error', 'Officer email address is missing. Cannot send rejection email.', 'error');
      return;
    }
  
    try {
      await updateDoc(doc(db, 'accident_report', id), { reject: true, submit: 0 });
      await sendEmail(toEmail, id, station, name);
      Swal.fire('Rejected!', 'Accident report rejected and email sent.', 'success');
      setReports(reports.filter((report) => report.id !== id));
    } catch (error) {
      Swal.fire('Error', 'Failed to update report after email.', 'error');
    }
  };
  
  
  
  
  

//   const sendEmail = async (toEmail, accidentId, station) => {
//     try {
//       console.log('Sending email with:', {
//         to_email: toEmail,
//         name: ,
//         date: new Date().toLocaleDateString(),
//         accident_id: accidentId,
//       });

//       const result = await emailjs.send(
//         'service_hwz175y', //  service ID
//         'template_khztu4f', //template ID
//         {
//           to_email: toEmail,
//           name: ,
//           date: new Date().toLocaleDateString(),
//           accident_id: accidentId,
//         },
//         'dC0v0cM6UrHCug-qq' //public key
//       );

//       console.log('Email sent successfully:', result.status, result.text);
//       Swal.fire('Email Sent!', 'Rejection email successfully sent.', 'success');
//     } catch (error) {
//       console.error('Email failed to send:', error);
//       Swal.fire('Error', 'Failed to send email. Please try again.', 'error');
//     }
//   };

const sendEmail = async (toEmail, accidentId, station, name) => {
    if (!toEmail) {
      console.error('Email address is missing. Cannot send email.');
      Swal.fire('Error', 'Officer email address is missing. Cannot send rejection email.', 'error');
      return;
    }
  
    try {
      const result = await emailjs.send(
        'service_hwz175y', // service ID
        'template_rvx2rl2', // template ID
        {
          to_email: toEmail,
          // name: name || 'Officer', // Default name fallback
          date: new Date().toLocaleDateString(),
          accident_id: accidentId,
        },
        'dC0v0cM6UrHCug-qq' // public key
      );
  
      console.log('Email sent successfully:', result.status, result.text);
      Swal.fire('Email Sent!', 'Rejection email successfully sent.', 'success');
    } catch (error) {
      console.error('Email failed to send:', error);
      Swal.fire('Error', 'Failed to send email. Please try again.', 'error');
    }
  };
  
  

  const handleDetails = (report) => {
    setSelectedReport(report); // Open details view
  };

  const closeDetails = () => {
    setSelectedReport(null); // Close details view
  };

   // Filter reports based on filter input
   const filteredReports = reports.filter((report) => {
    const officerName = officers[report.officerID]?.name || '';
    const Date = report.A?.A3 || '';
    const severityText = getSeverityText(report.A?.A6);

    return (
      officerName.toLowerCase().includes(filters.officerName.toLowerCase()) &&
      report.A?.A5?.toLowerCase().includes(filters.accidentId.toLowerCase()) &&
      Date.includes(filters.date) &&
      (!filters.severity || severityText === filters.severity)
    );
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white px-4 pb-4 py-4 rounded-sm border border-gray-200 text-black w-full">
      <strong>
      <h1 className="text-2xl font-bold text-center text-black">
          <center>Submitted Accident Reports</center>
        </h1>
      </strong>
      <div className="mt-3 p-3">

            {/* Filters */}
            <div className="mb-5 mt-1 flex gap-4">
            <input
          type="text"
          placeholder="Filter by date"
          name="date"
          value={filters.date}
          onChange={handleInputChange}
          className="border px-2 py-1 rounded w-1/3"
        />
        
        <input
          type="text"
          placeholder="Filter by Accident ID"
          name="accidentId"
          value={filters.accidentId}
          onChange={handleInputChange}
          className="border px-2 py-1 rounded w-1/3"
        />
        <input
          type="text"
          placeholder="Filter by Officer Incharge"
          name="officerName"
          value={filters.officerName}
          onChange={handleInputChange}
          className="border px-2 py-1 rounded w-1/3"
        />
        
        <select
          name="severity"
          value={filters.severity}
          onChange={handleInputChange}
          className="border px-2 py-1 rounded w-1/3"
        >
          <option value="">Filter by Severity</option>
          <option value="Fatal">Fatal</option>
          <option value="Serious">Serious</option>
          <option value="Minor">Minor</option>
          <option value="Damages only">Damages only</option>
        </select>
      </div>

        <table className="w-full table-auto">
          <thead className="bg-gray-100 border-gray-400 font-semibold">
            <tr>
              <th className="p-3 tracking-wide">Date</th>
              <th className="p-3 tracking-wide">Accident ID</th>
              <th className="p-3 tracking-wide">Officer Incharge</th>
              <th className="p-3 tracking-wide">Severity</th>
              <th className="p-3 tracking-wide">Action</th>
              <th className="p-3 tracking-wide">Options</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((report) => (
              <tr key={report.id} className="border-b">
                <td className="p-3 text-center">{report.A?.A3 || 'N/A'}</td>
                <td className="p-3 text-center">{report.A?.A5 || 'N/A'}</td>
                <td className="p-3 text-center">
                  {officers[report.officerID]?.name || 'Unknown'}
                </td>
                <td className="p-3 text-center">{getSeverityText(report.A?.A6)}</td>
                <td className="p-3 text-center">
                  <button
                    className="bg-green-500 hover:bg-green-600 text-black font-semibold py-1 px-2 rounded text-sm mr-2"
                    onClick={() => handleApprove(report.id)}
                  >
                    Approve
                  </button>
                  <button
  className="bg-red-500 hover:bg-red-600 text-black font-semibold py-1 px-2 rounded text-sm mr-2"
  onClick={() => {
    const officer = officers[report.officerID] || {};
    handleReject(
      report.id,
      officer.email || '', // Pass the email
      report.A?.A2,        // Pass the station
      officer.name || 'Unknown' // Pass the officer's name
    );
  }}
>
  Reject
</button>



                </td>
                <td className="p-3 text-center">
                  <button
                    className="bg-yellow-button hover:bg-yellow text-black font-semibold py-1 px-2 rounded text-sm"
                    onClick={() => handleDetails(report)}
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

export default ReportApproval;
