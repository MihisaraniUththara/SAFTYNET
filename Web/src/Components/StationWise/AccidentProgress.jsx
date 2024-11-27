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
    
    <div className='bg-white px-4 pb-4 py-4rounded-sm border border-gray-200 text-black w-full'>
        <strong><h1><center>
          Recent Accidents
          </center></h1></strong>
        <div className='mt-3 p-3'>
          <table className='w-full table-auto'>
            <thead className='bg-gray-100 border-gray-400 font-semibold'>
              <tr>
                <th className='p-3 tracking-wide'>Date</th>
                <th className='p-3 tracking-wide'>Accident Id</th>
                <th className='p-3 tracking-wide'>Incharge Officer</th>
                <th className='p-3 tracking-wide'>Status</th>
                <th className='p-3 tracking-wide'>Option</th>
              </tr>
            </thead>
            <tbody>
              {AccidentData.map((Accident)=>(
              <tr key={Accident.AccidentId}>
                <td className='text-center p-3'>{Accident.date}</td>
                <td className='text-center p-3'>{Accident.AccidentId}</td>
                <td className='text-center p-3'>{Accident.InchargeOfficer}</td>
                <td className='text-center p-3'>{Accident.Status}</td>
                <td className='text-center p-3'><button className='bg-yellow-button hover:bg-yellow text-black font-bold py-2 px-4 rounded'>Details</button></td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
        
    </div>

  )
}

export default AccidentProgress