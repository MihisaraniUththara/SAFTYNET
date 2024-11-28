import React from 'react'
//IMPORTS ADD


const AccidentDetails = () => {
    const [accidents, setAccidents] = useState([]);

  const fetchAccidentData = async () => {
    try {
      // Query to filter accident reports based on submit, oicApp, and headApp
      const q = query(
        collection(db, 'accident_report'),
        where('submit', '==', 1),
        where('oicApp', '==', 1),
        where('headApp', '==', 1)
      );

      const querySnapshot = await getDocs(q);
      const accidentData = [];

      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();

        if (data.A) {
          accidentData.push({
            date: data.A?.A3 || 'N/A', // A3 is Date
            time: data.A?.A4 || 'N/A', // A4 is Time
            accidentId: data.A?.A5 || 'N/A', // A5 is Accident ID
            // officerID: data.officerID || 'N/A', 
            action: data.A?.A30 || null, // A30 is Action
            severity: data.A?.A6 || null, // A6 is Severity
          });
        }
      });

      setAccidents(accidentData);
    } catch (error) {
      console.error('Error fetching accident data:', error);
    }
  };

  useEffect(() => {
    fetchAccidentData();
  }, []);
    const getActionText = (actionCode) => {
        const actions = {
          1: 'Prosecution initiated',
          2: 'No prosecution',
          3: 'Parties Settled',
          4: 'Offender unknown',
          5: 'Not known',
          null: 'NULL',
        };
        return actions[actionCode] || 'Unknown';
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
    <div className='bg-white px-4 pb-4 py-4 rounded-sm border border-gray-200 text-black w-full'>
      <strong>
        <h1>
          <center>Accident Details</center>
        </h1>
      </strong>
        <div className='mt-3 p-3'>
            <table className='w-full table-auto'>
                <thead className='bg-gray-100 border-gray-400 font-semibold'>
                    <tr>
                    <th className='p-3 tracking-wide'>Date</th>
                    <th className='p-3 tracking-wide'>Time</th>
                    <th className='p-3 tracking-wide'>Accident Id</th>
                    <th className='p-3 tracking-wide'>Officer Incharge</th>
                    <th className='p-3 tracking-wide'>Action</th>
                    <th className='p-3 tracking-wide'>Severity</th>
                    <th className='p-3 tracking-wide'>Option</th>
                    </tr>
                </thead>
                <tbody>
                    {accidents.map((accident, index) => (
                    <tr key={index} className='border-b'>
                        <td className='text-center p-3'>{accident.date}</td>
                        <td className='text-center p-3'>{accident.time}</td>
                        <td className='text-center p-3'>{accident.accidentId}</td>
                        <td className='text-center p-3'>{accident.officerID || 'N/A'}</td>
                        <td className='text-center p-3'>{getActionText(accident.action)}</td>
                        <td className='text-center p-3'>{getSeverityText(accident.severity)}</td>
                        <td className='text-center p-3'>
                        <button className='bg-yellow-button hover:bg-yellow text-black font-semibold py-1 px-1 rounded text-sm'>
                            Details
                        </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default AccidentDetails