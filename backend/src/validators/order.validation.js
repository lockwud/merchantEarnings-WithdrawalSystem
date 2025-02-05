const { check } = require("express-validator");

exports.orderValidationRules = [
  check("total_amount")
    .notEmpty()
    .withMessage("Total amount is required.")
    .isDecimal({ decimal_digits: '2,2' })
    .withMessage("Total amount must be a decimal number with up to 2 decimal places.")
    .isFloat({ min: 0 })
    .withMessage("Total amount must be a non-negative number."),

  check("status")
    .optional()  // Order status is optional, default is 'pending'
    .isIn(['pending', 'completed', 'canceled'])
    .withMessage("Status must be one of: pending, completed, canceled"),
];
