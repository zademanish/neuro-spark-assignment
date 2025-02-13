import { useEffect, useState } from "react"
import { DeleteUser, getAllUser, UpdateRole } from "../../api";


const UserManagement = () => {

const [users,setUsers] = useState([]);
const [deleteUser,setDeleteUser] = useState([]);
const [updateUser,setUpdateUser] = useState([]);

  
  const handleRoleChange =async (userId, newRole)=>{
    try{
        const updateRole = await UpdateRole(userId,newRole);
        setUpdateUser(updateRole);
    }catch(error){
        console.log(error)
    }
  }

  const handleDeleteUser =async(userId)=>{
    try{
      const deleteUser =await DeleteUser(userId);
     setDeleteUser(deleteUser);

    }catch(error){
      console.log(error)
    }
  }
  const fetchUser =async ()=>{
      const AllUsers=await getAllUser();
      setUsers(AllUsers.users);
  }

  useEffect(()=>{
     fetchUser()
  },[updateUser,deleteUser])



  return (
    <div className="max-w-7xl mx-auto p-6">
    
      {/* User List Management */}
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500 ">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
          <tr>
            <th className="py-3 px-4">Name</th>
            <th className="py-3 px-4">Email</th>
            <th className="py-3 px-4">Role</th>
            <th className="py-3 px-4">Actions</th>
          </tr>
          </thead>
          <tbody>
            {users.length > 0 ?
            users?.map((user)=>(
              <tr key={user._id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-medium text-gray-900 whitespace-nowrap">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">
                  <select value={user.role} onChange={(e)=>handleRoleChange(user._id, e.target.value)} className="p-2 border rounded">
                    <option value="user">User</option>
                    <option value="Admin">Admin</option>
                  </select>
                </td>
                <td className="p-4">
                  <button onClick={()=>handleDeleteUser(user._id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete</button>
                </td>
              </tr>
            ))
          : <tr className="border-b hover:bg-gray-50">
            <td className="p-4 font-medium text-gray-900 whitespace-nowrap">No Users</td>
          </tr>
          }
          </tbody>
        </table>
      </div>
            
    </div>
  )
}

export default UserManagement