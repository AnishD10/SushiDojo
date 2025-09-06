// ================== Imports ==================
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// ================== App Config ==================
const app = express();
const port = process.env.PORT || 3000;

// ================== Middleware ==================
app.use(cors());
app.use(express.json());

// ================== Database Connection ==================
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

// ================== Routes ==================
const userRoutes = require('./Routes/userRoutes');
app.use('/api/users', userRoutes);

// ================== Error Handling ==================
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Something went wrong!', error: err.message });
});

// ================== Server Start ==================
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});