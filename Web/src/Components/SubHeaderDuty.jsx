import React from 'react';
import classNames from 'classname';
import { SUBMENU_LINKS_DUTY } from './../lib/Const/index';
import { Link, useLocation } from 'react-router-dom';

const linkClasses = 'text-black flex items-center gap-5 font-medium px-1 py-0 hover:underline decoration-yellow underline-offset-8 active:bg-neutral-500 rounded-sm text-base';

const SubHeaderDuty = () => {
  return (
    <div className='bg-white border border-gray-200 flex justify-start h-10 px-4 items-center flex-row'>
      <div className='flex-1 py-8 flex flex-row gap-10'>
        {SUBMENU_LINKS_DUTY.map((item) => (
          <SubMenuLinks key={item.key} item={item} />
        ))}
      </div>
    </div>
  );
};

function SubMenuLinks({ item }) {
  const { pathname } = useLocation();

  const isActive = pathname === item.path; // Check if the current link is active

  return (
    <Link
      to={item.path}
      className={classNames(
        isActive ? 'text-gray-600 font-bold underline underline-offset-8' : '',
        linkClasses
      )}
    >
      {item.label}
    </Link>
  );
}

export default SubHeaderDuty



  

