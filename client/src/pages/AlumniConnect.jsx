import React from 'react'
import SideBar from '../components/Sidebar'
import QuerySection from '../components/QuerySection'

const AlumniConnect = () => {
  return (
    <div className='flex w-full h-[calc(100vh-70px)]'>
      <SideBar/>
      <QuerySection/>
    </div>
  )
}

export default AlumniConnect