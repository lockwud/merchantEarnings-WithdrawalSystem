// validate-payload.js
const merchantValidation = require("../validators/merchant.validation");
const orderValidationRule = require("../validators/order.validation");
const withdrawalValidationRule = require("../validators/withdrawal.validation");

const validatePayload = {
  merchant: merchantValidation.merchantValidationRules,
  order: orderValidationRule.orderValidationRules,
  withdrawal: withdrawalValidationRule.withdrawalValidationRules,
};

module.exports = { validatePayload };
