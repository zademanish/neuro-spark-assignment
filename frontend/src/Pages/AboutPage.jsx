import React from 'react'
import { Link } from 'react-router-dom'
import featured from '../assets/about3.jpg'

const AboutPage = () => {
  return (
    <section className='py-6 px-4 lg:px-0'>
        <div className='container mx-auto flex flex-col-reverse lg:flex-row items-center bg-green-50 rounded-3xl'>
            {/* left content */}
            <div className='lg:w-1/2 p-8 text-center lg:text-left'>
            <h2 className='text-lg font-semibold text-gray-700 mb-2'>Remove</h2>
            <h2 className='text-4xl lg:text-5xl font-bold mb-6'>the guesswork when it comes to your Health</h2>
            <p className='text-lg text-gray-600 mb-6'>
               Increase your mental and physical performance with data-driven health assesment using your blood biomarkers.
            </p>
            <Link to="/appointment" className='bg-black text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-800'>
            Book Now</Link>
            </div>
            {/* right content */}
            <div className='lg:w-1/2'>
            <img src={featured} alt='featured collection' className='w-full h-full object-cover lg:rounded-tr-3xl lg:rounded-br-3xl'/>
            </div>
        </div>
    </section>
  )
}

export default AboutPage