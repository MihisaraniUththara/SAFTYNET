import React from 'react'

const sidebar = () => {
  return (
    <div className='sidebar'>
        <div className='top'>
            <span className='logo'>SafetyNet</span>
        </div>
        <div className='center'>
            <ul>
                <li>
                    <span>Dashboard</span>
                </li>
                <li>
                    <span>Officer</span>
                </li>
                <li>
                    <span>Dashboard</span>
                </li>
            </ul>
        </div>
        <div className='bottom'></div>
    </div>
  )
}

export default sidebar