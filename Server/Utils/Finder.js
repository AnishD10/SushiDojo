const User = require('../Models/User');

const findUserByEmail = async (email) => {
    try{
    return await User.findOne({ email })
    } catch (error) {
        throw new Error('Error finding user by email: ' + error.message);
    }
}

const findUserById = async (id) => {
    try{
    return await User.findById(id);
    } catch (error) {
        throw new Error('Error finding user by ID: ' + error.message);
    }
}

const findUserByOTP = async (otp) => {
    try{
    return await User.findOne({ otp });
    } catch (error) {
        throw new Error('Error finding user by OTP: ' + error.message);
    }   
}

const findUserByAdress = async (address) => {
    try{
    return await User.find({ address });
    } catch (error) {
        throw new Error('Error finding users by address: ' + error.message);
    }
}

module.exports = {
    findUserByEmail,
    findUserById,
    findUserByOTP,
    findUserByAdress
};
