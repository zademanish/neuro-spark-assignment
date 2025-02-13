import express from 'express';
import {User} from '../models/user.js';
import jwt from 'jsonwebtoken';
import isAuthenticate from '../middleware/isAuthenticate.js';
import { GetSingleUser, GetUser, Login, Register } from '../Controller/authController.js';

const router = express.Router();

// User Registration
router.route('/register').post(Register)
// User Login
router.route('/login').post(Login)

router.route('/profile').get(isAuthenticate,GetUser);

router.route('/getsingleuser').post(isAuthenticate,GetSingleUser);

export default router;
