import React from 'react'

const StatCards = () => {
  return (
    <div className='flex gap-4 w-full'>
        <div className='bg-white rounded-sm p-4 flex-1 border border-gray-200 flex flex-col items-center text-black font-bold justify-center'>
            <span className='text-center'>Total Accidents</span>
            <span>25</span>
        </div>
        <div className='bg-white rounded-sm p-4 flex-1 border border-gray-200 flex flex-col justify-center items-center text-red-600 font-bold'>
            <span>Fatal Accidents</span>
            <strong>3</strong></div>
        <div className='bg-white rounded-sm p-4 flex-1 border border-gray-200 flex flex-col justify-center items-center text-orange-500 font-bold'>
            <span>Serious Accidents</span>
            <strong>5</strong></div>
        <div className='bg-white rounded-sm p-4 flex-1 border border-gray-200 flex flex-col justify-center items-center text-blue-700 font-bold'>
            <span>Minor Accidents</span>
            <strong>8</strong></div>
        <div className='bg-white rounded-sm p-4 flex-1 border border-gray-200 flex-col justify-center flex items-center text-green-600 font-bold'>
            <span>Damages Only Accidents</span>
            <strong>9</strong></div>
    </div>
  )
}

export default StatCards