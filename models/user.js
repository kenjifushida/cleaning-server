const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
    customerId: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    }
});

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject._id;
		delete returnedObject.__v;
		delete returnedObject.passwordHash;
    }
});

module.exports = mongoose.model('User', userSchema);