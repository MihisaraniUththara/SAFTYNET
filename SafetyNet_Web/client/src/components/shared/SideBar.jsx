import React from 'react'
import { Outlet } from 'react-router-dom'

const SideBar = () => {
  return (
    <div>
        <div>side bar</div>
        <div>Nav bar</div>
        <div>{<Outlet />}</div>
    </div>
  )
}

export default SideBar