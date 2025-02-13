import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import appointmentRoutes from './routes/appointmentRoute.js';
import adminRoutes from "./routes/adminRoutes.js"
import { connectDb } from './Db/db.js';
dotenv.config();
const app = express();

const corsOption= {
    origin:'http://localhost:5173',
    credentials:true
}
// Middleware
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use('/api/appointments', appointmentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/users/admin', adminRoutes);

// Database Connection
connectDb();

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
