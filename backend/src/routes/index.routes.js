const express = require("express")
const v1Router = require("./version_1/v1.routes")
const indexRouter = express.Router()

indexRouter.use("/v1", v1Router)

module.exports = indexRouter;