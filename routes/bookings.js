const express = require('express');
const bookingsRouter = express.Router();

// Models
const User = require('../models/user');
const Booking = require('../models/booking');
const Residence = require('../models/residence');

// Utils
const authenticateToken = require('../utils/authenticateToken');

// Get all bookings made by the user
bookingsRouter.get("/all", authenticateToken, async(req, res) => {
    try {
        const user = await User.findOne({username: req.user.username})
        const allBookingsByUser = await Booking.find({user});
        res.status(200).json({bookings: allBookingsByUser});
    } catch(error) {
        res.status(403).json({error: error.message});
    }
});

// Create a new booking
bookingsRouter.post('/add', authenticateToken, async (req, res) => {
    try {
        const {
            date, serviceType,
            residenceId,
            bookingStatus="pre-booked",
        } = req.body;

        const user = User.findOne({username: req.user.username});
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
        res.status(200).send("Booking successfully added");
    } catch (error) {
        res.status(403).json({error: error.message});
    }
});

module.exports = bookingsRouter;