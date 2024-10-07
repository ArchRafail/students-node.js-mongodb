require('./student.model');

const mongoose = require('mongoose');
const mongoDB = 'mongodb://127.0.0.1:27017/StudentsDB';

const connectDB = async () => {
    try {
        await mongoose.connect(mongoDB).then(() => {
            console.log('MongoDB connection succeeded.');
        });
    } catch (err) {
        console.log('Error in DB connection : ' + err);
    }
}

module.exports.connectDB = connectDB;