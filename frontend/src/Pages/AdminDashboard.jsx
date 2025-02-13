import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getAllUser } from "../api"

const AdminDashboard = () => {
const [users,setUsers] = useState([]);


const fetchData = ()=>{
    try {
         setTimeout(async()=>{
           const AllUsers= await getAllUser();
           console.log(AllUsers);
          setUsers(AllUsers);
         })
       } catch (error) {
         toast.error(error.response?.data?.error);
       }
}
useEffect(()=>{
    fetchData();
},[])

  return (
    <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 shadow-md rounded-lg">
                <h2 className="text-xl font-semibold">Total Users</h2>
                <p className="text-2xl">{users?.users?.length}</p>
                <Link to="/admin/users" className="text-blue-500 hover:underline">Manage Users</Link>
            </div>
            <div className="p-4 shadow-md rounded-lg">
                <h2 className="text-xl font-semibold">Total Appointments</h2>
                <p className="text-2xl">{users?.appointment?.length}</p>
                <Link to="/admin/schedule" className="text-blue-500 hover:underline">Manage Schedules</Link>
            </div>
        </div>
        <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Recent Appointments</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full text-left text-gray-500">
                    <thead className="bg-gray-100 text-xs uppercase text-gray-700 ">
                        <tr>
                            <th className="py-3 px-4">User Name</th>
                            <th className="py-3 px-4">Time</th>
                            <th className="py-3 px-4">Date</th>
                            <th className="py-3 px-4">Doctor</th>
                            <th className="py-3 px-4">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.appointment?.length > 0 ? (
                            users?.appointment?.reverse().map((appoint)=>(
                                <tr key={appoint?._id} className="border-b hover:bg-gray-50 cursor-pointer">
                                    <td className="p-4">{appoint?.name}</td>
                                    <td className="p-4">
                                        {appoint?.time}
                                    </td>
                                    <td className="p-4">{appoint?.date}</td>
                                    <td className="p-4">{appoint?.doctor}</td>
                                    <td className="p-4">{appoint?.status}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="p-4 text-center text-gray-500">No recent schedule found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default AdminDashboard