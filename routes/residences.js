const residencesRouter = require('express').Router();
const Residence = require('../models/residence');
const User = require('../models/user');
const authenticateToken = require('../utils/authenticateToken');

// Add a new residence for the logged in user
residencesRouter.post('/add', authenticateToken, async (req, res) => {
    try {
        const {address} = req.body;
        const user = await User.findOne({username: req.user.username});

        if(!(user && address)) throw new Error("Couldn't add a new residence");
        
        const newResidence = await new Residence({
            user: user,
            address: address
        });

        await newResidence.save();
        res.status(200).send("Residence successfully added");
    } catch(error) {
        res.status(400).json({error: error.message});
    }
});

module.exports = residencesRouter;