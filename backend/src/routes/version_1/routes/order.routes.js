// merchant.routes.js
const express = require("express");
const orderRoutes = express.Router();
const orders = require("../../../controllers/order.controller");
const { validatePayload } = require("../../../middlewares/validate-payload");
const validationError = require("../../../utils/validationError");
const sanitizeFields = require("../../../middlewares/sanitizeInput");

orderRoutes.post("/:merchantId/createOrders", 
  sanitizeFields(["total_amount", "status"], ["total_amount", "status"]), // Sanitize input fields
  validatePayload.order,  // Apply merchant validation rules
  validationError,           // Handle validation errors
  orders.createOrder   // Call the sign-up logic
);


module.exports = orderRoutes;
