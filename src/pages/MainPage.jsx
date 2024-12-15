import React from 'react'
import { Outlet } from 'react-router-dom'

const MainPage = () => {
  return (
    <div className='layout'>
        <main>
           <Outlet/>
        </main>
    </div>
  )
}

export default MainPage

