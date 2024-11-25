import React from 'react'
import SideBar from './../../Components/SideBarOic'
import Header from './../../Components/HeaderOic'

const Dashboad = () => {
  return (
    <div className='flex flex-row bg-neutral-100 h-screen w-screen overflow-y-hidden'>
        <SideBar />
        <div className='flex-1'>
           <Header /> 
        </div>
    </div>
  )
}

export default Dashboad