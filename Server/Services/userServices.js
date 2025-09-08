const crypto = require('crypto');
const { sendMail } = require('../Utils/Mailer');
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

exports.updateUserService = async (userId, updateData) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
        if (!updatedUser) {
            return { success: false, message: 'User not found' };
        }
        return { success: true, data: updatedUser };
    } catch (error) {
        throw new Error('Error updating user: ' + error.message);
    }
};

// Forgot Password Service
exports.forgotPasswordService = async (email) => {
    const user = await User.findOne({ email });
    if (!user) {
        return { success: false, message: 'User not found' };
    }
    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 min expiry
    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();
    // Send OTP email
    await sendMail(user.email, 'Your Sushi Dojo OTP', `Your OTP is: ${otp}`);
    return { success: true, message: 'OTP sent to email' };
};

// Verify OTP Service
exports.verifyOtpService = async (email, otp) => {
    const user = await User.findOne({ email, otp });
    if (!user) {
        return { success: false, message: 'Invalid OTP' };
    }
    if (user.otpExpiry < new Date()) {
        return { success: false, message: 'OTP expired' };
    }
    return { success: true, message: 'OTP verified' };
};

// Reset Password Service
exports.resetPasswordService = async (email, otp, newPassword) => {
    const user = await User.findOne({ email, otp });
    if (!user) {
        return { success: false, message: 'Invalid OTP' };
    }
    if (user.otpExpiry < new Date()) {
        return { success: false, message: 'OTP expired' };
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();
    return { success: true, message: 'Password reset successful' };
};
