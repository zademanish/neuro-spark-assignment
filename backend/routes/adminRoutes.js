import express from 'express';
import isAuthenticate from '../middleware/isAuthenticate.js';
import { DeleteUser, GetAllSchedule, GetAllUsers, UpdateRole, UpdateStatus } from '../Controller/adminController.js';

const router = express.Router();

// get all user
router.route('/getallusers').get(isAuthenticate,GetAllUsers);

// update role
router.route("/user/role").patch(isAuthenticate,UpdateRole);
  
  // Delete User by ID
router.route('/user/deleteuser').delete(isAuthenticate,DeleteUser);

// get all schedules
router.route('/user/getallschedule').get(isAuthenticate,GetAllSchedule);

// update status
router.route("/user/updatestatus").patch(isAuthenticate,UpdateStatus);

export default router;