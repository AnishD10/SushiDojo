require('dotenv').config();
const UserService = require('../Services/userServices');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
    try {
        const userData = req.body;
        if(!userData.name || !userData.email || !userData.password || !userData.address){
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }
        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        userData.password = await bcrypt.hash(userData.password, salt);
        const result = await UserService.CreateUserService(userData);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }
        const result = await UserService.loginUserService(email, password );
        if(!result.success){
            return res.status(400).json(result);
        }
        const token = jwt.sign({ id: result.data._id , name : result.data.name }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        result.data = { ...result.data, token }; // Add token to user data
        res.status(200).json(result);
    } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
}
};

exports.updateUserEmail= async (req, res) => {
    try {
        const userId = req.params.id;
        const { email } = req.body;
        if(!email){
            return res.status(400).json({ success: false, message: 'Email is required' });
        }
        const result = await UserService.updateUserService(userId, { email });
        if(!result.success){
            return res.status(404).json(result);
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

exports.updateUserAddress= async (req, res) => {
    try {
        const userId = req.params.id;
        const { address } = req.body;
        if(!address){
            return res.status(400).json({ success: false, message: 'Address is required' });
        }
        const result = await UserService.updateUserService(userId, { address });
        if(!result.success){
            return res.status(404).json(result);
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }   
};

exports.updateUserPassword = async (req, res) => {
    try {
        const userId = req.params.id;
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            return res.status(400).json({ success: false, message: 'Old and new passwords are required' });
        }
        // Fetch user with password field
        const User = require('../Models/User');
        const user = await User.findById(userId).select('+password');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Old password is incorrect' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        await user.save();
        // Remove password from returned data
        const userObj = user.toObject();
        delete userObj.password;
        res.status(200).json({ success: true, data: userObj, message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

exports.updateUserName = async (req, res) => {
    try {
        const userId = req.params.id;
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ success: false, message: 'Name is required' });
        }
        const result = await UserService.updateUserService(userId, { name });
        if (!result.success) {
            return res.status(404).json(result);
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

// Forgot Password
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ success: false, message: 'Email is required' });
        }
        const result = await UserService.forgotPasswordService(email);
        if (!result.success) {
            return res.status(404).json(result);
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

// Verify OTP
exports.verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            return res.status(400).json({ success: false, message: 'Email and OTP are required' });
        }
        const result = await UserService.verifyOtpService(email, otp);
        if (!result.success) {
            return res.status(400).json(result);
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

// Reset Password
exports.resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        if (!email || !otp || !newPassword) {
            return res.status(400).json({ success: false, message: 'Email, OTP, and new password are required' });
        }
        const result = await UserService.resetPasswordService(email, otp, newPassword);
        if (!result.success) {
            return res.status(400).json(result);
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};
