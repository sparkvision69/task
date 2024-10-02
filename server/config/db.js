const mongoose = require('mongoose');

const MongoUrl = 'mongodb+srv://sparkvision73:LqxqGG0yBfk7ZRyc@cluster0.leylh.mongodb.net/E-commerce?retryWrites=true&w=majority&appName=Cluster0'
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