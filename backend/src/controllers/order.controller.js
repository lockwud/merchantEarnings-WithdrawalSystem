const catchAsync = require("../utils/catchAsync");
const orderService = require("../services/order.service");
const HttpStatus = require("../utils/httpStatus");

const orderController = {
  // Create an Order
  createOrder: catchAsync(async (req, res, next) => {
    const data = req.body; // Get order data from the request body
    const id = req.params.merchantId; // Get merchantId from params (assuming the merchantId is in the URL)
    const newOrder = await orderService.createOrder(id, data);
    res.status(HttpStatus.CREATED).json(newOrder);
  }),

  // Fetch Orders for a Merchant
  fetchOrdersForMerchant: catchAsync(async (req, res, next) => {
    const merchantId = req.params.merchantId; // Get merchantId from params
    const orders = await orderService.fetchOrdersForMerchant(merchantId);
    res.status(HttpStatus.OK).json({ orders });
  }),

  // Fetch a Specific Order by Order ID
  fetchOrderById: catchAsync(async (req, res, next) => {
    const orderId = req.params.orderId; // Get orderId from params
    const order = await orderService.fetchOrderById(orderId);
    res.status(HttpStatus.OK).json(order);
  }),
};

module.exports = orderController;
