import MyAppointments from './MyAppointments'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const Profile = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const { user } = useSelector(state => state.auth);

  const handleLogout = () => {
    localStorage.removeItem('token');  // Fixed
    navigate('/');
  };

  useEffect(() => {
    if (user?.role === "Admin") {
      setIsAdmin(true);
    }
  }, [user]);  // Added user as a dependency

  return (
    <div className='min-h-screen flex flex-col'>
      <div className='flex-grow container mx-auto p-4 md:p-4'>
        <div className='flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0'>
          {/* Left section */}
          <div className='w-full md:w-1/3 lg:w-1/4 shadow-md rounded-lg p-6'>
            <h1 className='text-2xl md:text-3xl font-bold mb-4'>{user?.name}</h1>
            <p className='text-lg text-gray-600 mb-4'>{user?.email}</p>
            <button onClick={handleLogout} className='w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600'>
              Logout
            </button>
            {isAdmin && (
              <div className='mt-4'>
                <Link to="/admin" className='text-blue-500 text-2xl underline cursor-pointer hover:text-blue-600'>
                  Dashboard
                </Link>
              </div>
            )}
          </div>
          {/* Right section */}
          <div className='w-full md:w-2/3 lg:w-3/4'>
            <MyAppointments user={user} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
