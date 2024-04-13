import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import AdminDashboard from './pages/dashboard/AdminDashboard'
const App = () => {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Login/>} />
    <Route path="/register" element={<Register/>} />
    <Route path='/adminDashboard' element ={<AdminDashboard/>}/>
   </Routes>
   </BrowserRouter>
  )
}

export default App
