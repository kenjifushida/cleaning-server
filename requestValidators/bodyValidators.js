const { body } = require('express-validator');

function userValidation() {
  return [
    body('username')
      .notEmpty()
      .withMessage('You must enter a username'),
    body('password')
      .notEmpty()
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
  ];
}

function registerValidation() {
  return [
    body('firstName').notEmpty(),
    body('lastName').notEmpty(),
    body('email')
      .notEmpty()
      .isEmail()
      .withMessage('Not a valid email address'),
    body('dob').notEmpty(),
    body('address').notEmpty(),
  ];
}

module.exports = {
  userValidation,
  registerValidation,
}
