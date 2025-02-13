import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import login from '../assets/loginDr.jpg'
import { useDispatch, useSelector } from "react-redux"

import { toast } from "sonner"
import { loginUser, setAuthToken } from "../api";
import { setLoading, setUser } from '../redux/slices/authSlice';


const Login = () => {
    const {loading} = useSelector(store=>store.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password,setPassword] = useState("");
   
    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
            dispatch(setLoading(true));
            const data = await loginUser(email, password); 
           if(data.success){
            dispatch(setUser(data.user));
               toast.success(data.message);
               localStorage.setItem("token", data.token);
               setAuthToken(data.token);
               navigate("/home")
           }
        } catch(error){
            dispatch(setLoading(false));
            toast.error(error)
        }  finally{
            dispatch(setLoading(false));
          }
    }

  return (
    <div className='flex'>
        <div className='w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12'>
        <form onSubmit={handleSubmit} className='w-full max-w-md bg-white p-8 rounded-lg border shadow-sm'>
            <div className='flex justify-center mb-6'>
                <h2 className='text-xl font-medium'>Book Appointment</h2>
            </div>
            <h2 className='text-2xl font-bold mb-6 text-center'>Hey there! 👋🏻 </h2>
            <p className='text-center mb-6'>
                Enter your username and password to Login
            </p>
            <div className='mb-4'>
                <label className='block text-sm font-semibold mb-2'>Email</label>
                <input type='email' value={email} onChange={(e)=>setEmail(e.target.value)} className='w-full p-2 border rounded' placeholder='Enter your email address' />
            </div>
            <div className='mb-4'>
                <label className='block text-sm font-semibold mb-2'>Password</label>
                <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} className='w-full p-2 border rounded' placeholder='Enter your password' />
            </div>
            <button type='submit' className='w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition '>Sign In</button>
            <p className='mt-6 text-center text-sm'>
                Don't have an account?{" "}
                <Link to='/register' className='text-blue-500'>Register</Link>
            </p>
        </form>
        </div>
        <div className='hidden md:block w-1/2 bg-gray-800'>
        <div className='h-full flex flex-col justify-center items-center'>
            <img src={login} alt='login to account' className='h-[750px] w-full object-cover'/>
        </div>
        </div>
    </div>
  )
}

export default Login
