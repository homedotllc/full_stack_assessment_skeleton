const express = require('express');
const { findAllUsers, findUsersByHome } = require('../controllers/userController');

const router = express.Router();

// Get all users
router.get('/find-all', findAllUsers);

// Get users by home ID
router.get('/find-by-home/:homeId', findUsersByHome);

module.exports = router;
