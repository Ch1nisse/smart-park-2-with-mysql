import express from 'express'
import { RegisterUser, LoginUser, Logout } from '../controllers/authController.js';
const authRouter= express.Router();

authRouter.post('/register', RegisterUser);
authRouter.post('/login', LoginUser);
authRouter.post('/logout', Logout);

export default authRouter;
