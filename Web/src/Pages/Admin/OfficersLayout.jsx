import React from 'react'
import { Outlet } from 'react-router-dom'
import SubHeaderAdmin from '../../Components/SubHeaderAdmin'

const DutyLayout = () => {
  return (
    <div>
      <div className='flex w-full flex-row'>
        <SubHeaderAdmin/>
      </div>
      <div className='p-4 min-h-0 overflow-auto w-full'>
        <Outlet />
      </div>
    </div>
  )
}

export default DutyLayout