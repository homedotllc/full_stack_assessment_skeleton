const express = require('express');
const { updateUsersForHome, getAllUsersByHome, getPaginatedHomesByUser } = require('../controllers/homeController');

const router = express.Router();


// Route to update users associated with a specific home
router.put('/update-users/:homeId', updateUsersForHome);

// Route to fetch all users and mark those associated with a specific home
router.get('/get-users-by-home/:homeId', getAllUsersByHome);

// Get paginated homes for a user
router.get('/find-by-user/:userId', getPaginatedHomesByUser);

module.exports = router;
