import express from 'express'
import {getRecordById,getRecord, insertRecord,deleteRecord} from '../controllers/recordController.js'
const recordroute= express.Router();

recordroute.post('/register', insertRecord)
recordroute.get('/getRecord', getRecord)
recordroute.get('/getRecord/:id', getRecordById)
recordroute.delete('/delete', deleteRecord)

export default recordroute;
