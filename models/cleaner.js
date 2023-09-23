const mongoose = require('mongoose');

const cleanerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required:true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    //dob == date of birth
    dob: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Cleaner', cleanerSchema);