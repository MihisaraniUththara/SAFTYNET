import React from 'react'
import classNames from 'classname'
import logo from './../assets/Images/logo1.png';
import {DASHBOARD_SIDEBAR_LINKS_TRAFFIC} from './../lib/Const/index'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LogOut from './../Pages/SignOut'

const linkClasses = 'text-black flex item-center gap-3 font-medium px-3 py-5 hover:bg-yellow-button hover:no-underline active:bg-neutral-600 rounded-sm text-base'
const SideBarTraffic = () => {
  return (
    <div className='bg-yellow w-60 p-3 flex flex-col'>
        <div className='flex items-center gap-1 px-2 py-2'>
            <img src={logo} className="h-10" alt="Logo"/>
        </div>
        <div className='flex-1 py-8 flex flex-col gap-0.5'>
            {DASHBOARD_SIDEBAR_LINKS_TRAFFIC.map((item) => (
                <SidebarLinks key={item.key} item={item} />
            ))}
        </div>
        <div className='flex flex-col gap-0.5 pt-2 border-t border-neutral-700'>
            <LogOut/>
        </div>
    </div>
  )
}

function SidebarLinks({item}) {
    const {pathname} = useLocation()

    return (
       <Link to={item.path} className={classNames(pathname == item.path ? 'text-black bg-yellow-button font-bold' : '', linkClasses)}>
        <span className='text-x5 py-1'>{item.icon}</span>
        {item.label}
       </Link> 
    )
}

export default SideBarTraffic