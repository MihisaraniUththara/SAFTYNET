import React from 'react';

const Suspend = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-gray-100 text-center">
        <center>
      <div className="text-center p-6 bg-white shadow-lg rounded-lg">
        <div className="text-red-600 text-8xl mb-4">⚠️</div>
        <h1 className="text-2xl font-semibold text-red-600">You are currently suspended</h1>
        <p className="text-gray-600 mt-2">
         Please contact support for more information.
         
        </p>
      </div>
      </center>
    </div>
  );
};

export default Suspend;
