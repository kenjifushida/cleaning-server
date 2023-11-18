const express = require('express');
const bookingsRouter = express.Router();

// Models
const User = require('../models/user');
const Booking = require('../models/booking');
const Residence = require('../models/residence');

// Utils
const authenticateToken = require('../jwt/authenticateToken');

// Get all bookings made by the user
bookingsRouter.get("/all", authenticateToken, async(request, response) => {
    try {
        const user = await User.findOne({username: request.user.username})
        const allBookingsByUser = await Booking.find({user});
        response.status(200).json({bookings: allBookingsByUser});
    } catch(error) {
        response.status(403).json({error: error.message});
    }
});

// Create a new booking
bookingsRouter.post('/add', authenticateToken, async (request, response) => {
    try {
        const {
            date, serviceType,
            residenceId,
            bookingStatus="pre-booked",
        } = request.body;

        const user = User.findOne({username: request.user.username});
        const residence = Residence.findById(residenceId);

        const [foundUser, foundResidence] = await Promise.all([user, residence]);
        if(!(foundUser && foundResidence) || !foundUser._id.equals(foundResidence.user)) {
            throw new Error("Couldn't make a new booking");
        }

        const newBooking = new Booking({
            date, serviceType,
            bookingStatus,
            user: foundUser,
            residence: foundResidence
        });

        await newBooking.save();
        // Stripe Processing and checkout session must be opened here
        response.status(200).send("Booking successfully added");
    } catch (error) {
        response.status(403).json({error: error.message});
    }
});

module.exports = bookingsRouter;