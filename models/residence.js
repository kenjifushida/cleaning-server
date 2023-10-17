const mongoose = require('mongoose');

const residenceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    address: {
        type: String,
        required: true
    },
    rooms: {
        type: Number,
        required:true
    },
    bathrooms: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Residence', residenceSchema);