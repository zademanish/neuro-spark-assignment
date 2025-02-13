import express from 'express';
import { BookAppointment, GetAllAppointment } from '../Controller/appointmentController.js';

const router = express.Router();

// Create an appointment
router.route('/book').post(BookAppointment);

// Get all appointments
router.route('/getall').get(GetAllAppointment);

export default router;
