import React from 'react'
import logo from './../assets/Images/logo1.png';
import { HiHome } from "react-icons/hi";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaHistory } from "react-icons/fa";
import { RiContactsFill } from "react-icons/ri";
import HeaderItem from './HeaderItem';


function Header() {
    const menu=[
        {
            name: 'HOME',
            icon: HiHome
        },
        {
            name: 'ABOUT US',
            icon: BsFillPeopleFill
        },
        {
            name: 'HISTORY',
            icon: FaHistory
        },
        {
            name: 'CONTACT US',
            icon: RiContactsFill
        }
    ]
  return (
//     <div className='flex items-center gap-8'>
//         <div>
//         <img src={logo} className='w-[80px] md:w-[115px] object-cover'/>
//     </div>

//     <div>

//   <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
//     <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
//       <li>
//         <a href="#" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</a>
//       </li>
//       <li>
//         <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
//       </li>
//       <li>
//         <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</a>
//       </li>
//       <li>
//         <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
//       </li>
//     </ul>
//   </div>
//     </div>
    
//     </div>
<div>
    

<nav class="bg-white dark dark:bg-gray-900  w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <div class="flex items-center space-x-3 rtl:space-x-reverse">
      <img src={logo} class="h-10" alt="Logo"/>
  </div>
  <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
      <button type="button" class="text-black bg-yellow-button hover:bg-yellow focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><a href=''>Get started</a></button>
      <button data-collapse-toggle="navbar-sticky" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
  </div>
  <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
    <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-yellow md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
      <li>
      <a href="#" class="block py-2 space-x-10 px-3 text-gray-900 rounded hover:bg-yellow md:hover:bg-transparent md:hover:text-yellow md:p-0 md:dark:hover:text-yellow dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">HOME</a>
        {/* <a href="#" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-black md:p-0 md:dark:text-blue-500" aria-current="page">Home</a>
      */}
      </li> 
      <li>
      <a href="#" class=" gap-10 block py-2 px-3 text-gray-900 rounded hover:underline underline-offset-8 md:hover:bg-transparent md:hover:text-yellow md:p-0 md:dark:hover:text-yellow dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">ABOUT</a>      </li>
      <li>
      <a href="#" class="gap-10 block py-2 px-3 text-gray-900 rounded hover:underline underline-offset-8 md:hover:bg-transparent md:hover:text-yellow md:p-0 md:dark:hover:text-yellow dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">SERVICES</a>      </li>
      <li>
      <a href="#" class="gap-x-10 block py-2 px-3 text-gray-900 rounded hover:underline underline-offset-8 md:hover:bg-transparent md:hover:text-yellow md:p-0 md:dark:hover:text-yellow dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">CONTACT</a>      </li>
    </ul>
  </div>
  </div>
</nav>

</div>
  )
}

export default Header