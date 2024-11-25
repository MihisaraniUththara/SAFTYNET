import React from 'react'
import SubHeaderTraffic from '../../Components/SubHeaderTraffic'
import { Outlet } from 'react-router-dom'

const AccidentProgress = () => {
  return (
    <div>
      <div className='flex w-full flex-row'>
        <SubHeaderTraffic/>
      </div>
      <div className='p-4 min-h-0 overflow-auto w-full'>
        <Outlet />
      </div>
    </div>
  )
}

export default AccidentProgress