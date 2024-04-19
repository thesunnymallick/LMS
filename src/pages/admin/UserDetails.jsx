import React, { useEffect } from 'react'
import Sidebar from '../../layouts/Sidebar'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { API_BASE_URL } from '../../config/apiConfig'

const UserDetails = () => {

    const {id}=useParams()

   
    
   useEffect(()=>{
    const getUserDetailsBy=async()=>{
        try {
           const {data, status}=await axios.get(`${API_BASE_URL}/api/auth/dashboard/customer?customerId=${id}`)
            if(status===200){
                console.log(data)
            }
        } catch (error) {
           
        }
       }
       getUserDetailsBy()
   },[id])

  return (
    <div className="flex">
      <div className="">
        <Sidebar />
      </div>
      <div className="bg-zinc-50 py-2 px-6 w-full">    

        <div className="py-4">
        <h1 className="text-2xl font-semibold">Users leads Overview</h1>
        <span className="text-base text-zinc-600">
        Explore and Manage All Users
        </span>
        </div>



       
      </div>
    </div>
  )
}

export default UserDetails
