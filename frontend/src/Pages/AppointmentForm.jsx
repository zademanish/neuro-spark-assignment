import { useEffect, useState } from "react";
import cover2 from "../assets/cover2.jpg";
import Form from "../components/Layout/Form";
import { toast } from "sonner";
import axios from "axios";
import { data } from "react-router-dom";
import { Loading } from "../components/Common/Loading";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/slices/authSlice";

const AppointmentForm = () => {
  const [appointments, setAppointments] = useState([]);
  const {loading} = useSelector(state=>state.auth)
  
  const [error, setError] = useState(null);

  const fetchAppointments = async () => {
    try {
        const response = await axios.get(
          "http://localhost:5000/api/appointments/getall"
        );
      
        setAppointments(response.data);

    } catch (error) {
     
      setError(error.response?.data?.error || "Failed to fetch appointments");
    } 
  };

  useEffect(() => {
    fetchAppointments();
  }, [loading]);

  return (
    <div>
      <div className="my-10 flex ">
        <Form appointment={appointments} loading={loading} error={error} />
        <div className="hidden md:block w-full bg-gray-800">
          <div className="h-full flex flex-col justify-center items-center">
            <img
              src={cover2}
              alt="login to account"
              className="h-[750px] w-full object-cover"
            />
          </div>
        </div>
      </div>
      <div className="mb-4">
        <h2 className="text-3xl text-gray-700 hover:text-gray-800 ml-20">
          Booked Appointment
        </h2>
        <hr className="border shadow-lg my-4" />
        <div className="max-w-7xl overflow-x-auto mx-auto">
          <table className="min-w-full text-left text-gray-500">
            <thead className="bg-gray-100 text-xs uppercase text-gray-700 ">
              <tr>
                <th className="text-md py-2 px-4 sm:py-3">Patient Name</th>
                <th className=" py-2 px-4 sm:py-3">Patient ID</th>
                <th className=" py-2 px-4 sm:py-3">Date</th>
                <th className=" py-2 px-4 sm:py-3">Time</th>
                <th className=" py-2 px-4 sm:py-3">Doctor</th>
                <th className=" py-2 px-4 sm:py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {
              appointments.length > 0 ? (
                appointments.reverse().map((appointment) => (
          
                  <tr key={appointment._id}>
                    <td className="py-2 px-2 text-md sm:py-4 sm:px-4 font-medium text-gray-900 whitespace-nowrap">
                      {appointment.name}
                    </td>
                    <td className="py-2 px-2 text-md sm:py-4 sm:px-4 font-medium text-gray-900 whitespace-nowrap">
                      {appointment._id.length > 10
                        ? appointment._id.toString().slice(0, 10) + "..."
                        : appointment._id}
                    </td>
                    <td className="py-2 px-2 text-md sm:py-4 sm:px-4 font-medium text-gray-900 whitespace-nowrap">
                      {appointment.date.length > 10
                        ? appointment.date.toString().slice(0, 10)
                        : appointment.data}
                    </td>
                    <td className="py-2 px-2 text-md sm:py-4 sm:px-4 font-medium text-gray-900 whitespace-nowrap">
                      {appointment.time}
                    </td>
                    <td className="py-2 px-2 text-md sm:py-4 sm:px-4 font-medium text-gray-900 whitespace-nowrap">
                      {appointment.doctor}
                    </td>
                    <td className="py-2 px-2 text-md sm:py-4 sm:px-4 font-medium text-gray-900 whitespace-nowrap">
                      {appointment.status}
                    </td>
                  </tr>
              
              
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="py-4 px-4 text-center text-gray-500"
                  >
                    No Shedules
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AppointmentForm;
