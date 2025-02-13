import { FaBoxOpen, FaClipboardList, FaSignOutAlt, FaStore, FaUser } from "react-icons/fa"
import { Link, NavLink, useNavigate } from "react-router-dom"

const AdminSidebar = () => {
    const navigate = useNavigate()
    const handleLogout = ()=>{
            localStorage.removeItem("token")
            navigate('/');
    }
  return (
    <div className="p-6">
        <div className="mb-6">
            <Link to="/admin" className=" text-2xl font-medium" >Appointment</Link>
        </div>
        <h2 className="text-xl font-medium mb-6 text-center">
            Admin Dashboard
        </h2>
        <nav className="flex flex-col space-y-2 ">
            <NavLink to="/admin/users"  className={({isActive})=> isActive ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2" :"text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}>
            <FaUser />
            <span>Users</span>
            </NavLink>
            <NavLink to="/admin/schedule"  className={({isActive})=> isActive ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2" :"text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}>
            <FaBoxOpen />
            <span>Schedule</span>
            </NavLink>
            <NavLink to="/home"  className={({isActive})=> isActive ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2" :"text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}>
            <FaStore />
            <span>Home</span>
            </NavLink>

        </nav>
        <div className="mt-6">
            <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded flex items-center justify-center space-x-2" onClick={handleLogout}>
            <FaSignOutAlt />
            <span>Logout</span>
            </button>
        </div>
    </div>
  )
}

export default AdminSidebar
