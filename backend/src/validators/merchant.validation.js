const { check } = require("express-validator");

exports.merchantValidationRules = [
  check("name")
    .notEmpty()
    .withMessage("Name is required.")
    .isString()
    .withMessage("Name must be a valid string.")
    .isLength({ min: 2, max: 255 })
    .withMessage("Name must be between 2 and 255 characters."),

  check("earnings")
    .optional() // Make this optional if it's not always required in requests
    .isDecimal({ decimal_digits: "2,2" }) // Allow only decimals with 2 decimal places
    .withMessage("Earnings must be a decimal number with exactly 2 decimal places.")
    .isFloat({ min: 0 }) // Ensure it's a non-negative float
    .withMessage("Earnings must be a non-negative number.")
    .toFloat() // Convert string inputs (like "10.50") to actual numbers
   
];

