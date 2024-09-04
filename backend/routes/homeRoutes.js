const express = require('express');
const { getHomesByUser, updateUsersForHome, getAllUsersByHome } = require('../controllers/homeController');

const router = express.Router();

// Route to get all homes associated with a specific user
router.get('/find-by-user/:userId', getHomesByUser);

// Route to update users associated with a specific home
router.put('/update-users/:homeId', updateUsersForHome);

// Route to fetch all users and mark those associated with a specific home
router.get('/get-users-by-home/:homeId', getAllUsersByHome);

module.exports = router;
