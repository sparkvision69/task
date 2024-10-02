const mongoose = require('mongoose');

const MongoUrl = ''
const connectDB = async () => {
    try {
        await mongoose.connect(MongoUrl);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;