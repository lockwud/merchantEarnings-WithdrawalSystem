const { check } = require("express-validator");

exports.withdrawalValidationRules = [
    check("merchant_id")
        .notEmpty()
        .withMessage("Merchant ID is required.")
        .isUUID()
        .withMessage("Merchant ID must be a valid UUID."),

  
    check("amount")
        .notEmpty()
        .withMessage("Amount is required.")
        .isDecimal({ decimal_digits: "2,2" }) // Ensures 2 decimal places
        .withMessage("Amount must be a decimal number with up to 2 decimal places.")
        .isFloat({ min: 1 }) // Ensures amount is greater than 0
        .withMessage("Amount must be a positive number."),

];
