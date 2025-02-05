const db = require("../../config/database/db");
const { throwError } = require("../middlewares/errorHandler");
const HttpStatus = require("../utils/httpStatus");

const orderService = {
  createOrder: async (id, data) => {
    const merchant = await db("merchants")
        .where("id", id)
        .first();

    if (!merchant) {
        throwError(HttpStatus.NOT_FOUND, "Merchant not found");
    }

    const newOrder = await db("orders")
        .insert({ ...data, merchant_id: id })
        .returning("*");

    const orderId = newOrder[0].id; 

    // Check if earnings already exist for this order
    const existingEarning = await db("earnings")
        .where("order_id", orderId)
        .first();

    if (existingEarning) {
        throwError(HttpStatus.CONFLICT, "Earnings already exist for this order");
    }

    const earnings = await db("earnings")
        .insert({
            merchant_id: id,
            order_id: orderId,
            amount: data.total_amount * 0.05, // 5% of total amount as earnings
            is_withdrawn: false,
            created_at: db.fn.now(),
            updated_at: db.fn.now()
        })
        .returning("*");

    return newOrder[0];

  },

  // Fetch Orders for a Merchant
  fetchOrdersForMerchant: async (id) => {
    const orders = await db("orders")
    .where("merchant_id", id);
    return orders;
  },

  // Fetch a Specific Order
  fetchOrderById: async (orderId) => {
    const order = await db("orders").where("id", orderId).first();
    if (!order) {
      throwError(HttpStatus.NOT_FOUND, "Order not found");
    }
    return order;
  },
};

module.exports = orderService;
