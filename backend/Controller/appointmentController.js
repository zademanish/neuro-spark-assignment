import express from 'express';
import Appointment from '../models/appointment.js';
import jwt from 'jsonwebtoken';


export const BookAppointment = async(req,res)=>{
     try {
            const { name, date, time, doctor } = req.body;
            // Check if slot is available
            const existingAppointment = await Appointment.findOne({ date, time });
            if (existingAppointment) {
                return res.status(400).json({success:false, message: "Time slot already booked" });
            }
    
            const newAppointment = new Appointment({ name, date, time, doctor });
            await newAppointment.save();
           return res.status(201).json({success:true, message:"book Successfully",newAppointment});
        } catch (error) {
            res.status(500).json({ error: "Server error" });
        }
}

export const GetAllAppointment = async(req,res)=>{
     try {
            const appointments = await Appointment.find();
            res.json(appointments);
        } catch (error) {
            res.status(500).json({ error: "Server error" });
        }
}