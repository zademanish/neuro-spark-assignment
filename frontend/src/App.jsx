import React from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserLayout from './components/Layout/UserLayout'
import {Toaster} from "sonner"
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Profile from './Pages/Profile'
import AppointmentForm from './Pages/AppointmentForm'
import PrivateRoute from './middleware/PrivateRoute'
import AdminLayout from './components/Admin/AdminLayout'
import AdminDashboard from './Pages/AdminDashboard'
import UserManagement from './components/Admin/UserManagement'
import ScheduleManagement from './components/Admin/ScheduleManagement'
import { useSelector } from 'react-redux'
import { Loading } from './components/Common/Loading'
import AboutPage from './Pages/AboutPage'

const App = () => {
  const {loading} = useSelector(state=>state.auth)
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      {loading ? <Loading/>:
    <Routes>
      <Route path='/' element={<UserLayout/>}>
      <Route index element={<Login/>}/>
        <Route path='register' element={<Register/>}/>
        <Route element={<PrivateRoute/>}>
      <Route path='/home' element={<Home/>}/>
      <Route path='/about' element={<AboutPage/>}/>
      <Route path='profile' element={<Profile/>}/>
      <Route path='appointment' element={<AppointmentForm/>}/>
        </Route>
      </Route>
      {/* Admin Routes */}
      <Route element={<PrivateRoute role="Admin"/>}>
    <Route path='/admin' element={<AdminLayout/>}>
      <Route index element={<AdminDashboard/>}/>
      <Route path='users' element={<UserManagement/>}/>
      <Route path='schedule' element={<ScheduleManagement/>}/>
    </Route>
  </Route>
    </Routes>
      
      }
    </BrowserRouter>
  )
}

export default App