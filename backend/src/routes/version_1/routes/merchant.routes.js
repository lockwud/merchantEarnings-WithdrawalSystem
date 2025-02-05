// merchant.routes.js
const express = require("express");
const merchantRoutes = express.Router();
const merchant = require("../../../controllers/merchant.controller");
const withdrawalController = require("../../../controllers/withdrawal.controller");

const { validatePayload } = require("../../../middlewares/validate-payload");
const validationError = require("../../../utils/validationError");
const sanitizeFields = require("../../../middlewares/sanitizeInput");

merchantRoutes.post("/create", 
  sanitizeFields(["name"], ["name"]), 
  validatePayload.merchant,  
  validationError,           
  merchant.signUpMerchant    
);

merchantRoutes.get("/:merchantId/earnings", 
  merchant.listMerchantEarnings 
);

merchantRoutes.get("/:merchantId", 
  merchant.fetchMerchantWithId 
);


merchantRoutes.post("/:merchantId/withdrawals", 
  withdrawalController.requestWithdrawal
);

merchantRoutes.get("/:merchantId/withdrawals", 
  withdrawalController.listWithdrawalRequests
);



module.exports = merchantRoutes;
