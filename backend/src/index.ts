import express from 'express';
import { AppDataSource } from './data-source';
import userRoute from './routes/userRoute'
import homeRoute from './routes/homeRoute'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

const app = express();
const EXPRESS_PORT = process.env.EXPRESS_PORT || 3000;

// middlewares 
app.use(express.json())
app.use(cors({
    origin : 'http://localhost:5173'
}))

// routes
app.use('/api/user' , userRoute)    
app.use('/api/home' , homeRoute)


AppDataSource.initialize().then(() => {
    console.log('Database connection established');
    app.listen(EXPRESS_PORT, () => {
      console.log('Server running on PORT : ' , EXPRESS_PORT)
    })
  }).catch(err => {
    console.log('Error : ' , err)
    process.exit(1)
})
