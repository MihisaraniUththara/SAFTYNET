import React from 'react'
import StatCards from '../../Components/StationWise/StatCards'
import VehicleChart from '../../Components/StationWise/VehicleChart'

const Dashboad = () => {
  return (
    <div className='flex gap-4 flex-col'>
      <StatCards />
      <VehicleChart />
    </div>
  )
}

export default Dashboad