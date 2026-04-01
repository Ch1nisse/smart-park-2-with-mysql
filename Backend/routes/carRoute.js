import express from 'express'
import { createCar } from '../controllers/carController.js';
const carRouter= express.Router();

carRouter.post('/register', createCar);

export default carRouter;
