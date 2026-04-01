import express from 'express'
import session from 'express-session'
import authRouter from './routes/authroute.js'
import carRouter from './routes/carRoute.js'
import serviceRouter from './routes/serviceroute.js'
import paymentroute from './routes/paymentroute.js'
import recordroute from './routes/recordroute.js'

const app= express();
const PORT= 2000;

app.use(express.json())
app.use(session({
    secret:"my secret key",
    resave:false,
    saveUninitialized:false,
    cookie:{secure:false}
}))
app.use('/api/auth', authRouter);
app.use('/api/car', carRouter);
app.use('/api/service', serviceRouter);
app.use('/api/payment', paymentroute);
app.use('/api/record', recordroute);


app.listen(PORT,()=>{
    console.log(`Listen to port ${PORT}`)
})