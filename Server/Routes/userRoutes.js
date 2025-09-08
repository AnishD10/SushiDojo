const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const UserController = require('../Controllers/userController');

// Authorization Routes
router.post('/register', UserController.createUser);
router.post('/login', UserController.loginUser);
router.put('/update-name/:id', UserController.updateUserName);
router.put('/update-email/:id', UserController.updateUserEmail);
router.put('/update-address/:id', UserController.updateUserAddress);
router.put('/update-password/:id', UserController.updateUserPassword);
// Forgot Password, OTP, and Reset Password
router.post('/forgot-password', UserController.forgotPassword);
router.post('/verify-otp', UserController.verifyOtp);
router.post('/reset-password', UserController.resetPassword);

// Get Routes










module.exports = router;