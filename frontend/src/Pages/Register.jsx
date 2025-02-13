import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import register from '../assets/registerDr.jpg';
import { useDispatch } from 'react-redux';
import { registerUser } from '../api';
import { toast } from 'sonner';
import { setLoading } from '../redux/slices/authSlice';
const Register = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password,setPassword] = useState("");

    const handleSubmit =async(e)=>{
        e.preventDefault()
          try {
            dispatch(setLoading(true));
                    const data = await registerUser(name,email, password);
                    dispatch(setLoading(false))
                    console.log(data);
                    if(data.success){
                        toast.success(data.message);
                        navigate("/")
                    }
                } catch(error){
                    dispatch(setLoading(false));
                    toast.error(error)
                    console.log(error)
                }
    }
  return (
    <div className='flex'>
        <div className='w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12'>
        <form onSubmit={handleSubmit} className='w-full max-w-md bg-white p-8 rounded-lg border shadow-sm'>
            <div className='flex justify-center mb-6'>
                <h2 className='text-xl font-medium'>Register Now!</h2>
            </div>
            <h2 className='text-2xl font-bold mb-6 text-center'>Hey there! 👋🏻 </h2>
            <p className='text-center mb-6'>
                Enter your Details  to Register
            </p>
            <div className='mb-4'>
                <label className='block text-sm font-semibold mb-2'>Name</label>
                <input type='text' value={name} onChange={(e)=>setName(e.target.value)} className='w-full p-2 border rounded' placeholder='Enter your Name' />
            </div>
            <div className='mb-4'>
                <label className='block text-sm font-semibold mb-2'>Email</label>
                <input type='email' value={email} onChange={(e)=>setEmail(e.target.value)} className='w-full p-2 border rounded' placeholder='Enter your email address' />
            </div>
            <div className='mb-4'>
                <label className='block text-sm font-semibold mb-2'>Password</label>
                <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} className='w-full p-2 border rounded' placeholder='Enter your password' />
            </div>
            <button type='submit' className='w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition '>Sign Up</button>
            <p className='mt-6 text-center text-sm'>
                Don't have an account?{" "}
                <Link to='/' className='text-blue-500'>Login</Link>
            </p>
        </form>
        </div>
        <div className='hidden md:block w-1/2 bg-gray-800'>
        <div className='h-full flex flex-col justify-center items-center'>
            <img src={register} alt='register to account' className='h-[750px] w-full object-cover'/>
        </div>
        </div>
    </div>
  )
}

export default Register
