const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authRouter = require('express').Router();
const User = require('../models/user');
const Cleaner = require('../models/cleaner');

// Login Endpoint for User
authRouter.post('/user', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        
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
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
        // Add refresh token to valid tokens in 
        res.json({ accessToken: accessToken, refreshToken: refreshToken});
    } catch(error) {
        res.status(400).json({error: error.message})
    }
});

// Login Endpoint for Cleaner
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