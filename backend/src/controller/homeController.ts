import express, { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entities/User';
import { Home } from '../entities/Home';
import { In } from 'typeorm';

const findByUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const userId = parseInt(req.query.userId as string, 10);

        if (isNaN(userId)) {
            console.log('Invalid userId');
            return res.status(400).json({ message: 'Invalid userId' });
        }

        const page = parseInt(req.query.page as string, 10) || 1;
        const limit = parseInt(req.query.limit as string, 10) || 50;
        const skip = (page - 1) * limit;

        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({
            where: { id: userId },
            relations: ['homes'] // Ensuring that related homes are fetched
        });

        if (!user) {
            console.log('User not found');
            return res.status(404).json({ message: 'User not found' });
        }

        const homes = user.homes.slice(skip, skip + limit);
        const totalHomes = user.homes.length;

        if (homes.length === 0) {
            console.log('No homes found');
            return res.status(404).json({ message: 'No homes' });
        }

        const totalPages = Math.ceil(totalHomes / limit);

        return res.json({
            data: {
                homes,
                pagination: {
                    page,
                    limit,
                    totalHomes,
                    totalPages
                }
            }
        });
    } catch (error) {
        console.error('Error in findByUser:', error);
        return res.status(500).json({ message: 'Error finding homes by user' });
    }
};


const updateUsers = async (req: express.Request, res: express.Response): Promise<express.Response> => {
    const homeId = parseInt(req.query.homeId as string, 10)
    try {
        const usernames: string[] = req.body.users; 
        if (!homeId || !Array.isArray(usernames) || usernames.length === 0) {
            return res.status(400).json({ message: 'Invalid input' });
        }

        const homeRepository = AppDataSource.getRepository(Home);
        const userRepository = AppDataSource.getRepository(User);

        // Find the home by ID
        const home = await homeRepository.findOne({
            where: { id: homeId },
            relations: ['users'],
        });

        if (!home) {
            return res.status(404).json({ message: 'Home not found' });
        }

        // Find users by usernames
        const users = await userRepository.find({
            where: { username: In(usernames) } 
        });

        // Ensuring that all usernames correspond to users found
        if (users.length !== usernames.length) {
            return res.status(404).json({ message: 'Some users not found' });
        }

        // Updating home with new users
        home.users = users;
        await homeRepository.save(home);

        return res.json({ message: 'Users updated successfully' });
    } catch (error) {
        console.error('Error updating users:', error);
        return res.status(500).json({ message: 'Error updating users' });
    }
};



export default {
    findByUser,
    updateUsers,
};
