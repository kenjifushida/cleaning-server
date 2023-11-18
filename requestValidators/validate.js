const { validationResult } = require('express-validator');
const { ERROR_CODES } = require('../constants');

function validate (request, response, next) {
  const errors = validationResult(request);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = []
  errors.array().map(error => extractedErrors.push({ [error.param]: error.msg }))

  return response.status(ERROR_CODES.UNAUTHORIZED).json({ errors: extractedErrors})
}

module.exports = {
  validate
}
