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

exports.logoutUser = async (req, res) => {
    try {
        const { email } = req.body;
        if(!email){
            return res.status(400).json({ success: false, message: 'Email is required' });
        }
        const result = await UserService.logoutUserService(email);
        if(!result.success){
            return res.status(400).json(result);
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};