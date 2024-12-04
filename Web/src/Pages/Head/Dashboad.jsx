import React from 'react'
import StatCards from '../../Components/StatCard'
import VehicleChartHead from '../../Components/VehicleChartHead'


const Dashboad = () => {
  return (
    <div className='flex gap-4 flex-col'>
      <StatCards />
      <VehicleChartHead />
    </div>
  )
}

export default Dashboad