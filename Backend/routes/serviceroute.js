import express from 'express'
import { serviceRegister, getService} from '../controllers/serviceController.js';
const serviceRouter= express.Router();

serviceRouter.post('/register', serviceRegister);
serviceRouter.get('/getAll', getService);

export default serviceRouter;
