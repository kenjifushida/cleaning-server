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
    }
});

module.exports = mongoose.model('Residence', residenceSchema);