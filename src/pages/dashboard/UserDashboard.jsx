import React from 'react'
import Sidebar from '../../layouts/Sidebar'

const UserDashboard = () => {
  return (
    <div className='flex'>
     <div className=''>
        <Sidebar/>
     </div>
     <div className='bg-gray-100 py-2 px-6 w-full'>
      <h1 className='text-2xl font-bold'>User Dashbaord</h1>
     </div>
    </div>
  )
}

export default UserDashboard