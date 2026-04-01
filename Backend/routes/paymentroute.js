import express from 'express'
import {insertPayment, getDailyReport} from '../controllers/paymentController.js'
const paymentroute= express.Router();
paymentroute.post('/register',insertPayment)
paymentroute.get('/getReport',getDailyReport)

export default paymentroute;
