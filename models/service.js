const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  serviceId: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  maxBookingsPerDay: {
    type: Number
  },
});

module.exports = mongoose.model('Service', serviceSchema);