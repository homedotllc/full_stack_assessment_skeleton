import express from 'express'
const router = express.Router();

// controllers
import homeController from '../controller/homeController';

// find all homes by userId
router.get('/find-by-user', homeController.findByUser);

// get all users by homeId
router.get('/get-users-by-home/:homeId', homeController.getUsersByHome);

// take a bunch of new userId's and homeId and set them
router.patch('/update-users', homeController.updateUsers);

export default router;
