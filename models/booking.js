const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    serviceType: {
        type: String,
        required: true,
    },
    bookingStatus: {
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
        required: false
    },
    residence: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Residence',
        required: true
    }
});

module.exports = mongoose.model('Booking', bookingSchema);