import React, { useEffect } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import AdminDashboard from './pages/dashboard/AdminDashboard'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { API_BASE_URL } from './config/apiConfig'
import UserDashboard from './pages/dashboard/UserDashboard'
import AllUsers from './pages/admin/AllUsers'

// import PrivateRoute from "./feature/PrivateRoute"

const App = () => {

   
  

  const serverLoad=async()=>{
  try {
    const res=await axios.get(`${API_BASE_URL}/api/hello`)
    console.log(res)
  } catch (error) {
    
  }
  }
  useEffect(()=>{
    serverLoad()
  },[])
 

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/adminDashboard" element={<AdminDashboard />}
        />
      <Route path="/userDashboard" element={<UserDashboard />} />
      <Route path="/admin/users" element={<AllUsers />}  />
    </Routes>
    <ToastContainer />
  </BrowserRouter>
  )
}

export default App
