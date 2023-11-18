const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authRouter = require('express').Router();
// Models
const User = require('../models/user');
const RefreshToken = require('../models/refreshToken');
const Cleaner = require('../models/cleaner');
// Validators
const { userValidation } = require('../requestValidators/bodyValidators');
const { validate } = require('../requestValidators/validate');
const { body, validationResult } = require('express-validator');
// Error Handler
const { CustomHttpError } = require('../errors/customError');
const { ERROR_CODES } = require('../constants');

// Login Endpoint for User
authRouter.post('/user/login',
  userValidation(),
  validate,
  async (request, response) => {
    try {
      const { username, password } = request.body;

      const user = await User.findOne({ username });
      console.log(`Found ${user}`);
      
      const isCorrectPassword = user === null ? false : await bcrypt.compare(password, user.passwordHash);
      if (!isCorrectPassword) {
        throw new CustomHttpError(ERROR_CODES.UNAUTHORIZED, 'Invalid username or password');
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
      response.status(200).json({ accessToken, refreshToken});
    } catch(error) {
      response
        .status(error.httpStatusCode)
        .json({ error: error.message });
    }
  });

  authRouter.delete('/user/logout',
    async (request, response) => {
      try {
        const { token } = request.body;
        const deletedToken = await RefreshToken.deleteOne({ token:token });
        if(deletedToken.deletedCount != 1) 
          throw new CustomHttpError(ERROR_CODES.INTERNAL_SERVER_ERROR,"Couldn't successfully log out");
        response.status(200).send("User successfully logged out");
      } catch (error) {
        response.status(ERROR_CODES.BAD_REQUEST).json({error: error.message});
      }
  });

  // Login Endpoint for Cleaner (NOT COMPLETED YET)
  authRouter.post('/cleaner', async (request, response) => {
    try {
      const { username, password } = request.body;

      const cleaner = await Cleaner.findOne({ username });

      const isCorrectPassword = cleaner === null ? false : await bcrypt.compare(password, user.passwordHash);
        
    } catch(error) {
      response.status(400).json({error: error.message})
    }
  }
);

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 15 * 60 })
}

module.exports = authRouter;