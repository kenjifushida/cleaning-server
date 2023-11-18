const express = require('express');
const bcrypt = require('bcrypt');
const usersRouter = express.Router();
const User = require('../models/user');

usersRouter.post('/', async(request, response) => {
    try {
        // Check if body is empty
        if(request.body === undefined) {
            console.log('INVALID: body is empty');
            return response.status(400).json({ error: 'Content missing' });
        }

        const { username, password, firstName, lastName, address, email, dob, customerId="testId" } = request.body;

        // Check if username and password are valid
        if(!username || !password) {
            console.log('INVALID: username or password empty');
            return response.status(400).json({ error: 'No username or password' });
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
        response.status(200).send('User saved');
    } catch(error) {
        console.log(error);
        response.status(400).json({ error: error.message })
    }
});

module.exports = usersRouter;