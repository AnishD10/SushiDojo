// User Logout Service
exports.logoutUserService = async (email) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return { success: false, message: 'User not found' };
        }
        user.status = 'inactive';
        await user.save();
        return { success: true, message: 'User logged out and status set to inactive' };
    } catch (error) {
        throw new Error('Error logging out user: ' + error.message);
    }
};
const User = require('../Models/User');
const Finder = require('../Utils/Finder');
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
        // Set status to active and save
        if(user.status === 'active'){
            return { success: false, message: 'User already logged in' };
        }
        user.status = 'active';
        await user.save();
        // Remove password from returned data
        const userObj = user.toObject();
        delete userObj.password;
        return { success: true, data: userObj };
    }catch (error) {
        throw new Error('Error logging in user: ' + error.message);
    }
}