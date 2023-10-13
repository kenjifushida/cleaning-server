const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authRouter = require('express').Router();
const User = require('../models/user');
const RefreshToken = require('../models/refreshToken');
const Cleaner = require('../models/cleaner');

// Login Endpoint for User
authRouter.post('/user/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        console.log(`Found ${user}`);
        
        const isCorrectPassword = user === null ? false : await bcrypt.compare(password, user.passwordHash);

        if(!(user && isCorrectPassword)) {
            return res.status(401).json({
                error: 'Invalid username or password.'
            });
        }

        const userForToken = {
            username: user.username,
            email: user.email,
            customerId: user.customerId
        };

        const accessToken = generateAccessToken(userForToken);
        const refreshToken = jwt.sign(userForToken, process.env.REFRESH_TOKEN_SECRET);
        // Add refresh token to valid tokens in MongoDb
        newRefreshToken = new RefreshToken({
            token: refreshToken,
            dateIssued: new Date()
        });
        await newRefreshToken.save();
        res.status(200).json({ accessToken, refreshToken});
    } catch(error) {
        res.status(400).json({error: error.message})
    }
});

authRouter.delete('/user/logout', async (req, res) => {
    try {
        const {token} = req.body;
        const deletedToken = await RefreshToken.deleteOne({ token:token });
        if(deletedToken.deletedCount != 1) throw new Error("Couldn't successfully log out");
        res.status(200).send("User successfully logged out");
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

// Login Endpoint for Cleaner (NOT COMPLETED YET)
authRouter.post('/cleaner', async (req, res) => {
    try {
        const { username, password } = req.body;

        const cleaner = await Cleaner.findOne({ username });

        const isCorrectPassword = cleaner === null ? false : await bcrypt.compare(password, user.passwordHash);
        
    } catch(error) {
        res.status(400).json({error: error.message})
    }
});

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 15 * 60 })
}

module.exports = authRouter;