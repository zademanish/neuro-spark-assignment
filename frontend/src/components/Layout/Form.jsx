import { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/slices/authSlice";


const Form = ({loading,error}) => {
    const {user} = useSelector(state=>state.auth);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: "",
        date: null,
        time: "",
        doctor: "",
    });
    
    const availableTimes = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM"];
   
    // Prevent past dates
    const isValidDate = (date) => {
        const today = new Date();
        return date >= today;
    };


    // Submit Appointment
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isValidDate(formData.date)) {
            alert("Cannot select a past date.");
            return;
        }
        try {

            dispatch(setLoading(true))
                const response = await axios.post("http://localhost:5000/api/appointments/book", formData);
                // const book =await bookAppointment(formData)    
                if(response.data.success){
                dispatch(setLoading(false));
                setFormData({ name: "", date: null, time: "", doctor: "" }); // Reset form
                toast.success(response.data.message);   
            }else{
                message.error(response.data.message);
            }

        } catch (error) {
            dispatch(setLoading(false));
            toast.error(error.response?.data?.message || "Failed to book appointment");
        } 
    };

  return (
    <div className="w-full md:w-1/3 flex flex-col justify-center items-center p-8 md:p-12">
            <h2 className="text-xl font-bold mb-4">Schedule an Appointment</h2>
            <form onSubmit={handleSubmit} className="'w-full min-w-[30vw] p-8 rounded-lg border shadow-sm">
            <div className='mb-4 w-full'>
                <label className='block text-sm font-semibold mb-2'>Name</label>
                <input type='text' name="name"  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              value={formData.name} className='w-full p-2 border rounded' placeholder='Enter your Name' required/>
            </div>
            <div className="mb-4">
            <label className='block text-sm font-semibold mb-2'>Select Date</label>
               <DatePicker
                    selected={formData.date}
                    onChange={(date) => setFormData({ ...formData, date })}
                    minDate={new Date()}
                    className="w-full p-2 mb-3 border rounded"
                    placeholderText="Select Date"
                    required
                /> 
            </div>
                
               <div className="mb-4">
               <label className='block text-sm font-semibold mb-2'>Select Time</label>
                 <select
                    className="w-full p-2 mb-3 border rounded"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    required
                >
                    <option value="">Select Time</option>
                    {availableTimes.map(time => (
                        <option key={time} value={time}>{time}</option>
                    ))}
                </select>
               </div>
                
            <div className="mb-4">
            <label className='block text-sm font-semibold mb-2'>Select Doctor</label>
            <select
                    className="w-full p-2 mb-3 border rounded"
                    value={formData.doctor}
                    onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                    required
                >
                    <option value="">Select Doctor</option>
                    <option value="Dr. Ahuja">Dr. Ahuja</option>
                    <option value="Dr. Tiwari">Dr. Tiwari</option>
                </select>
            </div>
                
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    disabled={loading}
                >
                    {loading ? "Booking..." : "Book Appointment"}
                </button>
                
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>
        </div>
  )
}

export default Form