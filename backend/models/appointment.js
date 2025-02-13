import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
    name: String,
    date: Date,
    time: String,
    doctor: String,
    status: {
    type: String,
    enum: ["Pending","Approve"],
    default: "Pending" }
});

export default mongoose.model('Appointment', appointmentSchema);

