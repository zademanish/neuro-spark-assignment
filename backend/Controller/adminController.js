import {User} from "../models/user.js"
import Appointment from '../models/appointment.js';


export const GetAllUsers = async(req,res)=>{
    try {
        const users = await User.find();
        if(!users) return res.status(404).json({success:false,message:"User not found"})
        const appointment = await Appointment.find();
        res.json({users,appointment});
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
}

export const UpdateRole = async(req,res)=>{
    try {
        const { newRole,userId } = req.body; 
        // Find and update user role
        const updatedUser = await User.findByIdAndUpdate(
          userId,
          { role:newRole },
          { new: true } 
        );
        await updatedUser.save();
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
          }
  
        res.json({ message: "User role updated successfully", user: updatedUser });
      } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
      }
}

export const DeleteUser = async(req,res)=>{
    try {
        const { userid } = req.query;
        console.log(userid);
          const users = await User.findByIdAndDelete(userid);
          if(!users) return res.status(404).json({success:false,message:"User not found"});
         return res.json(users);
      } catch (error) {
          res.status(500).json({ error: "Server error" });
      }
}

export const GetAllSchedule = async(req,res)=>{
    try {
        const appointment = await Appointment.find();
        if(!appointment) return res.status(404).json({success:false,message:"Appointment not found"});
       return res.json({success:true, message:"fetch appointment successfully", appointment});
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
}

export const UpdateStatus = async(req,res)=>{
    try {
        const { newStatus,userId } = req.body; 
        // Find and update Appointment status
        const updateStatus = await Appointment.findByIdAndUpdate(
          userId,
          { status:newStatus }, 
          { new: true } 
        );
        await updateStatus.save();
    
        if (!updateStatus) {
            return res.status(400).json({ message: "Status not update" });
          }
       return res.status(200).json({ message: "User status updated successfully", user: updateStatus });
      } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
      }
}