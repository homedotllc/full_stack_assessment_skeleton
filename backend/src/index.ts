import express from 'express';
import { AppDataSource } from './data-source';
import { seedData } from './data-seeder';

const app = express();
const EXPRESS_PORT = process.env.EXPRESS_PORT || 3000;

const startServer = async () => {
    try {
        await AppDataSource.initialize();
        console.log('Database connection established');

        // seed the data
        await seedData(); 

        app.listen(EXPRESS_PORT, () => {
            console.log(`Server is running on PORT : ` , EXPRESS_PORT);
        });
    } catch (error) {
        console.error('Error in start server :', error);
    }
};

startServer();
