const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();
router.post('/update_profile', userController.updateProfile);

module.exports = router;
/* // Route for user registration
router.post('/register', userController.registerUser);

// Route for user login
router.post('/login', userController.loginUser); */

/* // Route for getting user profile
router.get('/profile', userController.getUserProfile);

// Route for updating user profile
router.put('/profile', userController.updateUserProfile);

// Route for getting user's acquired books
router.get('/my-books', userController.getUserBooks); */
