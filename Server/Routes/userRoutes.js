const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const UserController = require('../Controllers/userController');

// Authorization Routes
router.post('/register', UserController.createUser);
router.post('/login', UserController.loginUser);
router.post('/logout', UserController.logoutUser);

// Get Routes










module.exports = router;