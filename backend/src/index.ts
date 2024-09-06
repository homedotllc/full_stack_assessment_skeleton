import express from 'express';
import { AppDataSource } from './data-source';
import userRoute from './routes/userRoute'
import homeRoute from './routes/homeRoute'
import cors from 'cors'

const app = express();
const EXPRESS_PORT = process.env.EXPRESS_PORT || 3000;

const startServer = async () => {
    try {
        await AppDataSource.initialize();
        console.log('Database connection established');

        // middlewares 
        app.use(express.json())
        app.use(cors({
            origin : 'http://localhost:5173'
        }))

        // routes
        app.use('/user' , userRoute)    
        app.use('/home' , homeRoute)

        app.listen(EXPRESS_PORT, () => {
            console.log(`Server is running on PORT : ` , EXPRESS_PORT);
        });
    } catch (error) {
        console.error('Error in start server :', error);
    }
};

startServer();
