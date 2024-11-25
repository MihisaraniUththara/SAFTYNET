import React from 'react'

const AccidentData = [
    {
        date: "2024/07/07",
        AccidentId: "A2341",
        InchargeOfficer: "A B C Perera",
        Status: "Pending",
        progress: 20
    },
    {
      date: "2024/07/01",
      AccidentId: "A2341",
      InchargeOfficer: "A B C Perera",
      Status: "Pending",
      progress: 20
  },
  {
    date: "2024/06/22",
    AccidentId: "A2341",
    InchargeOfficer: "A B C Perera",
    Status: "Completed",
    progress: 100
},
{
  date: "2024/06/21",
  AccidentId: "A2341",
  InchargeOfficer: "A B C Perera",
  Status: "In Progress",
  progress: 40
},
{
  date: "2024/05/29",
  AccidentId: "A2341",
  InchargeOfficer: "A B C Perera",
  Status: "Pending",
  progress: 20
},
]

const AccidentProgress = () => {
  return (
    
    <div className='bg-white px-4 pb-4 rounded-sm border border-gray-200 text-black w-full'>
        <strong>
          Recent Accidents
        </strong>
        <div className='mt-3'>
          <table className='w-full table-auto'>
            <thead className='font-semibold'>
              <tr>
                <td>Date</td>
                <td>Accident Id</td>
                <td>Incharge Officer</td>
                <td>Status</td>
                <td>Option</td>
              </tr>
            </thead>
            <tbody>
              {AccidentData.map((Accident)=>(
              <tr key={Accident.AccidentId}>
                <td>{Accident.date}</td>
                <td>{Accident.AccidentId}</td>
                <td>{Accident.InchargeOfficer}</td>
                <td>{Accident.Status}</td>
                <td><button>Details</button></td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
        
    </div>

  )
}

export default AccidentProgress