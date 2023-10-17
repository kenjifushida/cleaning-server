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
        
        const newResidence = new Residence({
            user: user,
            address: address
        });

        await newResidence.save();
        res.status(200).send("Residence successfully added");
    } catch(error) {
        res.status(400).json({error: error.message});
    }
});

residencesRouter.delete('/remove', authenticateToken, async (req, res) => {
    try {
        const { residenceId } = req.body;
        const user = User.findOne({username: req.user.username});
        const residence = Residence.findOne({ _id: residenceId});

        const [foundUser, foundResidence] = await Promise.all([user, residence]);
        if(!(foundUser && foundResidence) || !foundUser._id.equals(foundResidence.user)) {
            throw new Error("Couldn't find residence");
        }
        
        const deletedResidence = await Residence.deleteOne({_id: residenceId});
        if(deletedResidence.deletedCount != 1) throw new Error("Couldn't delete residence");
        res.status(200).send("Residence successfully deleted");
    } catch (error) {
        res.status(404).json({error: error.message});
    }
});

residencesRouter.put('/edit', authenticateToken, async (req, res) => {
    try {
        const { residenceId, newAddress } = req.body;
        const user = User.findOne({username : req.user.username});
        const residence = Residence.findById(residenceId);

        const [foundUser, foundResidence] = await Promise.all([user, residence]);
        if(!(foundUser, foundResidence) || !foundUser._id.equals(foundResidence.user)) {
            throw new Error("Couldn't find residence");
        }

        foundResidence.address = newAddress;
        const editedResidence = await foundResidence.save();
        if(editedResidence !== foundResidence) {
            throw new Error("Couldn't update residence");
        }
        res.status(200).send("Residence updated successfully");
    } catch (error) {
        res.status(403).json({error: error.message});
    }
})

module.exports = residencesRouter;