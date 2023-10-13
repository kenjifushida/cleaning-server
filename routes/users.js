const express = require('express');
const bcrypt = require('bcrypt');
const usersRouter = express.Router();
const User = require('../models/user');

usersRouter.post('/', async(req, res) => {
    try {
        // Check if body is empty
        if(req.body === undefined) {
            console.log('INVALID: body is empty');
            return res.status(400).json({ error: 'Content missing' });
        }

        const { username, password, firstName, lastName, address, email, dob, customerId="testId" } = req.body;

        // Check if username and password are valid
        if(!username || !password) {
            console.log('INVALID: username or password empty');
            return res.status(400).json({ error: 'No username or password' });
        }

        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            username,
            passwordHash,
            email,
            firstName,
            lastName,
            dob,
            customerId,
            address
        });

        await newUser.save();

        console.log('SUCCESS: saved user to database');
        res.status(200).send('User saved');
    } catch(error) {
        console.log(error);
        res.status(400).json({ error: error.message })
    }
});

module.exports = usersRouter;