import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { HiOutlineUser,HiBars3BottomRight } from "react-icons/hi2"
import { IoMdClose } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../../redux/slices/authSlice'


const Navbar = () => {
  const {loading} = useSelector(state=>state.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate()
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
 const [localToken, setLocalToken] = useState(false);
  
  const toggleNavDrawer = ()=>{
    setNavDrawerOpen(!navDrawerOpen)
  }

  const handleLogout = ()=>{
    const token = localStorage.removeItem('token');
    setLocalToken(!localToken);
    navigate('/');
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token){
      setLocalToken(true); // Convert token presence to boolean (true/false)
    }
  }, [loading]); 

  

  return (
    <>
    <nav className="container mx-auto flex items-center justify-between py-4 px-6 ">
      <div>
        <Link to='/home' className="text-2xl font-medium">APPOINTMENT</Link>
      </div>
      <div className="hidden md:flex space-x-6">
        <Link to="/home" className="text-gray-700 hover:text-black text-sm font-medium uppercase ">
        Home
        </Link>
       
        <Link to="/appointment" className="text-gray-700 hover:text-black text-sm font-medium uppercase ">
        Appointments
        </Link>
        <Link to="/about" className="text-gray-700 hover:text-black text-sm font-medium uppercase ">
       About Us
        </Link>
        <Link to="#" className="text-gray-700 hover:text-black text-sm font-medium uppercase ">
           Contact
        </Link>
      
     

       
      </div>
      {/* right icons */}
      <div className='flex items-center space-x-4'>
       
      <Link to="/profile" className="hover:text-black">
      <HiOutlineUser className='h-6 w-6 inline-block text-gray-700 hover:text-black' />
     
      </Link>
      {
        localToken === true ? ( <button onClick={handleLogout} className='hidden md:block bg-red-700 px-4 py-2 rounded-md text-white font-light hover:bg-red-800'>
        Logout
      </button> ): 
      (
        <>    
      <Link to="/register" className='hidden md:block bg-emerald-800 px-4 py-2 rounded-md text-white font-light hover:bg-emerald-900'>
        Signup
      </Link>
      <Link to="/" className='hidden md:block bg-emerald-800 px-4 py-2 rounded-md text-white font-light hover:bg-emerald-900'>
        Login
      </Link>
        </>
      )
      }
     

      <button onClick={toggleNavDrawer} className='md:hidden'>
        <HiBars3BottomRight className='h-6 w-6 text-gray-700'/>
      </button>
      </div>
    </nav>
   
    <div className={`fixed top-0 left-0 w-3/4 sm:w-1/3 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${navDrawerOpen ? "translate-x-0":"-translate-x-full"}`}>
    <div className='flex justify-end p-4'>
      <button onClick={toggleNavDrawer}>
        <IoMdClose className='h-6 w-6 text-gray-600'/>
      </button>
    </div>
    <div className='p-4'>
    <h2 className='text-xl font-semibold mb-4'>Menu</h2>
    <nav className='space-y-4 mt-4'>
      <Link to="/home" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>
      Home
      </Link>
      <Link to="/appointment" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>
      Appoinment
      </Link>
      <Link to="/about" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>
      About Us
      </Link>
      <Link to="#" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>
      Contact
      </Link>
      <Link to="/profile" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>
      Profile
      </Link>
      { localToken === true ? (
        <button onClick={handleLogout} className='block bg-red-700 text-white text-sm rounded px-6 py-2 hover:bg-red-800'>Logout</button>
      ):(
        <>
      <Link to="/register" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>
        Signup
      </Link>
      <Link to="/" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>
        Login
      </Link>
        </>
      )}
    </nav>
    </div>
    </div>
    </>
  )
}

export default Navbar