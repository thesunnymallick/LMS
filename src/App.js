import React, { useEffect } from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import AdminDashboard from './pages/dashboard/AdminDashboard'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { API_BASE_URL } from './config/apiConfig'
import UserDashboard from './pages/dashboard/UserDashboard'
import AllUsers from './pages/admin/AllUsers'
import UserDetails from './pages/admin/UserDetails'
import AdminPermission from './pages/admin/AdminPermison'
import PrivateRoute from './PrivateRoute'
import { useSelector } from 'react-redux'
import RewardPlanCreate from './pages/admin/reward/RewardPlanCreate'
import RewardList from './pages/admin/reward/RewardList'
import RewardAccess from './pages/admin/reward/RewardAccess'

// import PrivateRoute from "./feature/PrivateRoute"

const App = () => {

  const { isAdmin } = useSelector(state => state.loginInfo.admin);
  const { isUser } = useSelector(state => state.loginInfo.user);
   
  

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

  

  // Your existing login component JSX

 

  return (
    <BrowserRouter>
  
  <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoute/>}>
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AllUsers />} />
        <Route path="/admin/users/:id" element={<UserDetails />}  />
        <Route path="/admin/permission" element={<AdminPermission />} />
        <Route path="/admin/reward/planCreate" element={<RewardPlanCreate/>} />
        <Route path="/admin/reward/reward-list" element={<RewardList/>} />
        <Route path="/admin/reward/reward-access" element={<RewardAccess/>} />

          {
            isUser && (
              <Route path="/userDashboard" element={<UserDashboard />}  />
            )
          }
          </Route>
      </Routes>

    <ToastContainer />
  </BrowserRouter>
  )
}

export default App
