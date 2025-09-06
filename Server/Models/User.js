const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true , select : false },
    address: { type: String, required: true },
    otp: { type: String },
    otpExpiry: { type: Date },
    status: { type: String, enum: ['active', 'inactive'], default: 'inactive' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);