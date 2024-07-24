import React from 'react'
import Sidebar from "../../components/sidebar"
import"./home.css"

const Home = () => {
  return (
    <div className='home'>
        <Sidebar />
        <div className='homeContainer'></div>
    </div>
  )
}

export default Home