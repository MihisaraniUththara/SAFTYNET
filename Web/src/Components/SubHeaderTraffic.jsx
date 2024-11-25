import React from 'react'
import classNames from 'classname'
import {SUBMENU_LINKS_TRAFFIC} from './../lib/Const/index'
import { Link, useLocation } from 'react-router-dom';

const linkClasses = 'text-black flex item-center gap-5 font-medium px-1 py-0 hover:underline decoration-yellow underline-offset-8 active:underline rounded-sm text-base'

const SubHeaderTraffic = () => {
  return (
    <div className='bg-white border border-gray-200 flex justify-end h-8 px-4 items-center flex-row'>
      <div className='flex-1 py-8 flex flex-row gap-10'>
            {SUBMENU_LINKS_TRAFFIC.map((item) => (
                <SubMenuLinks key={item.key} item={item} />
            ))}
        </div>
    </div>
  )
}

function SubMenuLinks({item}) {
  const {pathname} = useLocation()

  return (
     <Link to={item.path} className={classNames(pathname == item.path ? 'text-black active:underline-offset-8 font-bold' : '', linkClasses)}>
      {item.label}
     </Link> 
  )
}

export default SubHeaderTraffic