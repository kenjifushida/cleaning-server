const express = require('express');
const bookingsRouter = express.Router();
const User = require('../models/user');
const Booking = require('../models/booking');
const Residence = require('../models/residence');

bookingsRouter.post('/', async (req, res) => {

})

module.exports = bookingsRouter;