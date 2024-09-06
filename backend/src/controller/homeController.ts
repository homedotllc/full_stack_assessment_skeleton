import express, { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entities/User';
import { Home } from '../entities/Home';
import { In } from 'typeorm';

const findByUser = async (req: Request, res: Response): Promise<Response> => {
    console.log('Inside findByUser function');
    try {
        console.log('Request query:', req.query);

        const userId = parseInt(req.query.userId as string, 10);
        console.log('User ID:', userId);

        if (isNaN(userId)) {
            console.log('Invalid userId');
            return res.status(400).json({ message: 'Invalid userId' });
        }

        const page = parseInt(req.query.page as string, 10) || 1;
        const limit = parseInt(req.query.limit as string, 10) || 50;
        const skip = (page - 1) * limit;

        console.log('Page:', page);
        console.log('Limit:', limit);
        console.log('Skip:', skip);

        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({
            where: { id: userId },
            relations: ['homes'] // Ensure that related homes are fetched
        });

        if (!user) {
            console.log('User not found');
            return res.status(404).json({ message: 'User not found' });
        }

        const homes = user.homes.slice(skip, skip + limit);
        const totalHomes = user.homes.length;

        console.log('Homes:', JSON.stringify(homes, null, 2));
        console.log('Total Homes:', totalHomes);

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


const getUsersByHome = async (req: express.Request, res: express.Response): Promise<express.Response> => {
    try {
        const {homeId : homeIdString} = req.params
        const homeId = parseInt(homeIdString , 10)
        console.log('homeId : ' , homeId)
        if (isNaN(homeId)) {
            return res.status(400).json({ message: 'Invalid homeId' });
        }

        const homeRepository = AppDataSource.getRepository(Home);
        const home = await homeRepository.findOne({
            where: { id: homeId },
            relations: ['users'],
        });

        if (!home) {
            return res.status(404).json({ message: 'Home not found' });
        }

        return res.json(home); 
    } catch (error) {
        console.error('Error finding users by home:', error);
        return res.status(500).json({ message: 'Error finding users by home' });
    }
};

const updateUsers = async (req: express.Request, res: express.Response): Promise<express.Response> => {
    const homeId = parseInt(req.query.homeId as string, 10)
    console.log('homeId : ' , homeId);
    console.log('users : ' , req.body);
    console.log('users : ' , req.body?.users);

    try {
        const usernames: string[] = req.body.users; // Use usernames from request body
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
            where: { username: In(usernames) } // Use the In operator to find multiple users
        });

        // Ensure that all usernames correspond to users found
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
    getUsersByHome,
    updateUsers,
};
