const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cleaner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cleaner',
        required: true
    }
});

module.exports = mongoose.model('Booking', bookingSchema);