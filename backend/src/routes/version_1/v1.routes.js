const express = require("express")
const v1router = express.Router()
const merchantRoutes = require("./routes/merchant.routes")
const orderRoutes = require("./routes/order.routes")
""
v1router.use("/merchants", merchantRoutes) 
v1router.use("/orders", orderRoutes)

module.exports = v1router;