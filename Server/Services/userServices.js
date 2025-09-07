
const User = require('../Models/User');
const bcrypt = require('bcryptjs');

// User Registration Service / Creation Service
exports.CreateUserService = async (userData) => {
    try {
        const newUser = new User(userData);
        const savedUser = await newUser.save();
        console.log('Saved user:', savedUser); // Debug log
        return { success: true, data: savedUser };
    } catch (error) {
        throw new Error('Error creating user: ' + error.message);
    }   
};

exports.loginUserService = async (email , password) => {
    try{
        const user = await User.findOne({email}).select('+password');
        if(!user){
            return { success: false, message: 'User not found' };
        }
        const isMatch = await bcrypt.compare(password , user.password);
        if(!isMatch){
            return { success: false, message: 'Invalid password' };
        }
        await user.save();
        // Remove password from returned data
        const userObj = user.toObject();
        delete userObj.password;
        return { success: true, data: userObj };
    }catch (error) {
        throw new Error('Error logging in user: ' + error.message);
    }
}