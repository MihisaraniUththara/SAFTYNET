import React from 'react'
import { Outlet } from 'react-router-dom'
import SubHeaderDuty from '../../Components/SubHeaderDuty'

const DutyLayout = () => {
  return (
    <div>
      <div className='flex w-full flex-row'>
        <SubHeaderDuty/>
      </div>
      <div className='p-4 min-h-0 overflow-auto w-full'>
        <Outlet />
      </div>
    </div>
  )
}

export default DutyLayout