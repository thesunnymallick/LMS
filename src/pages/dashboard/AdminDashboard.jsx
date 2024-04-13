import React from 'react'
import Sidebar from '../../layouts/Sidebar'

const AdminDashboard = () => {
  return (
    <div className='flex'>
     <div className=''>
        <Sidebar/>
     </div>
     <div className='bg-gray-100 py-2 px-6 w-full'>
      <h1 className='text-2xl font-bold'>Admin Dashbaord</h1>
     </div>
    </div>
  )
}

export default AdminDashboard
