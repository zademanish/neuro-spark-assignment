import { useEffect, useState } from "react"
import { DeleteUser, getAllSchedule,  UpdateRole, updateStatus } from "../../api";


const ScheduleManagement = () => {

const [appointments,setAppointments] = useState([]);
const [update,setUpdate] = useState([])
  
  const handleRoleChange =async (userId, newStatus)=>{
    try{
        const UpdateStatus= await updateStatus(userId,newStatus)
       setUpdate(UpdateStatus);

    }catch(error){
        console.log(error)
    }
  }

  const fetchAppointment =async ()=>{
      const allAppointment=await getAllSchedule();
      console.log(allAppointment);
      setAppointments(allAppointment.appointment);
  }

  useEffect(()=>{
     fetchAppointment()
  },[update])



  return (
    <div className="max-w-7xl mx-auto p-6">
    
      {/* User List Management */}
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500 ">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
          <tr>
            <th className="py-3 px-4">Patient Name</th>
            <th className="py-3 px-4">Date</th>
            <th className="py-3 px-4">Time</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4">Doctor</th>
          </tr>
          </thead>
          <tbody>
            {appointments?.length > 0 ?
            appointments?.reverse().map((appointment)=>(
              <tr key={appointment._id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-medium text-gray-900 whitespace-nowrap">{appointment.name}</td>
                <td className="p-4">{appointment.date.slice(0,10)}</td>
                <td className="p-4">{appointment.time}</td>
                <td className="p-4">{appointment.doctor}</td>
                <td className="p-4">
                  <select value={appointment.status} onChange={(e)=>handleRoleChange(appointment._id, e.target.value)} className="p-2 border rounded">
                    <option value="Pending">Pending</option>
                    <option value="Approve">Approve</option>
                  </select>
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

export default ScheduleManagement