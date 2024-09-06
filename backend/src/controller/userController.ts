import express from 'express';
import { AppDataSource } from '../data-source'; 
import { User } from '../entities/User';
import { Home } from '../entities/Home';


const findAll = async (req: express.Request, res: express.Response): Promise<express.Response> => {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const users = await userRepository.find();
        return res.status(200).json({data : users});
    } catch (error) {
        console.error('Error fetching users:', error);
        return res.status(500).json({ message: 'Error fetching users' });
    }
};

const findByHome = async (req: express.Request, res: express.Response): Promise<express.Response> => {
    try {
        const homeId = parseInt(req.query.homeId as string, 10);
        if (isNaN(homeId)) {
            return res.status(400).json({ message: 'Invalid homeId' });
        }

        const homeRepository = AppDataSource.getRepository(Home);
        const home = await homeRepository.findOne({
            where: { id: homeId },
            relations: ['users'], // including users related to the home
        });

        if (!home) {
            return res.status(200).json({ message: 'Home not found' });
        }
        return res.json({data : home}); 
    } catch (error) {
        console.error('Error fetching users by home:', error);
        return res.status(500).json({ message: 'Error fetching users by home' });
    }
};

export default {
    findAll,
    findByHome,
};
