// validationError.js
const { validationResult } = require('express-validator');

const validationError = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 400,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next(); // Proceed if no validation errors
};

module.exports = validationError;
