import express from 'express'
const router = express.Router();

// controllers
import userController from '../controller/userController';

// get all users
router.get('/find-all', userController.findAll);

// get all users by homeId
router.get('/find-by-home', userController.findByHome);

export default router;
