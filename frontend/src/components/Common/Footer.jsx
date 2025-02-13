import React from 'react'
import { IoLogoInstagram } from 'react-icons/io'
import { RiTwitterXLine } from 'react-icons/ri'
import { TbBrandMeta } from 'react-icons/tb'
import { FiPhoneCall } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const Footer = () => {
    const hours = [
        {
          id: 1,
          day: "Monday",
          time: "9:00 AM - 11:00 PM",
        },
        {
          id: 2,
          day: "Tuesday",
          time: "12:00 PM - 12:00 AM",
        },
        {
          id: 3,
          day: "Wednesday",
          time: "10:00 AM - 10:00 PM",
        },
        {
          id: 4,
          day: "Thursday",
          time: "9:00 AM - 9:00 PM",
        },
        {
          id: 5,
          day: "Monday",
          time: "3:00 PM - 9:00 PM",
        },
        {
          id: 6,
          day: "Saturday",
          time: "9:00 AM - 3:00 PM",
        },
      ];
  return (
    <footer className='border-t py-12'>
            <div className='container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0'>
                <div>
                    <h3 className='text-lg text-gray-800 mb-4'>Newsletter</h3>
                    <p className='text-gray-500 mb-4'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, mollitia.
                    </p>
                    <p className='font-medium text-sm text-gray-600 mb-6'>
                        Sign up and get 10% off your first appointment.
                    </p>

                    {/* newsletter form */}
                    <form className='flex'>
                        <input type='email' placeholder='Enter your email' className='p-3 w-full text-sm border-t border-l border-b border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all ' required />
                        <button type='submit' className='bg-black text-white px-6 py-3 rounded-r-md hover:bg-gray-800 transition-all'>Subscribe</button>
                    </form>
                </div>
                {/* shop links */}
                <div>
                    <h3 className='text-lg text-gray-800 mb-4'>Hours</h3>
                    <ul className='space-y-2 text-gray-600'>
                        {
                            hours.map((elem)=>(
                                <li key={elem.id}>
                                    <Link to="#" className='hover:text-gray-500 transition-colors'>{elem.day}-{"  "}{elem.time}</Link>
                                </li>     
                            ))
                        }
                    </ul>
                </div>
                {/* supports links */}
                <div>
                    <h3 className='text-lg text-gray-800 mb-4'>Support</h3>
                    <ul className='space-y-2 text-gray-600'>
                        <li>
                            <Link to="#" className='hover:text-gray-500 transition-colors'>Contact Us</Link>
                        </li>
                        <li>
                            <Link to="#" className='hover:text-gray-500 transition-colors'>About Us</Link>
                        </li>
                        <li>
                            <Link to="#" className='hover:text-gray-500 transition-colors'>FAQs</Link>
                        </li>
                        <li>
                            <Link to="#" className='hover:text-gray-500 transition-colors'>Features</Link>
                        </li>
                    </ul>
                </div>

                    {/* Follow us */}
                    <div>
                        <h3 className='text-lg text-gray-800 mb-4'>Follow Us</h3>
                        <div className='flex items-center space-x-4 mb-6'>
                            <a href='https://www.facebook.com' target='_blank' rel='noopener noreferrer'
                            className='hover:text-gray-500'>
                                <TbBrandMeta className='h-5 w-5'/>
                            </a>
                            <a href='https://www.facebook.com' target='_blank' rel='noopener noreferrer'
                            className='hover:text-gray-500'>
                                <IoLogoInstagram className='h-5 w-5'/>
                            </a>
                            <a href='https://www.facebook.com' target='_blank' rel='noopener noreferrer'
                            className='hover:text-gray-500'>
                                <RiTwitterXLine className='h-4 w-4'/>
                            </a>
            
                        </div>
                        <p className='text-gray-500'>Call Us</p>
                        <p>
                            <FiPhoneCall className='inline-block mr-2 '/>
                       0123-456-789
                        </p>
                    </div>
            </div>
            {/* Footer bottom */}
            <div className='container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-200 pt-6 '>
                <p className='text-gray-500 text-sm tracking-tighter text-center'>
                    2025, ManishZade, All rights Reserved.
                </p>
            </div>
    </footer>
  )
}

export default Footer