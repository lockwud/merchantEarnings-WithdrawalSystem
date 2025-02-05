const catchAsync = require("../utils/catchAsync");
const withdrawalService = require("../services/withdrawals.service");
const HttpStatus = require("../utils/httpStatus");

const withdrawalController = {
  requestWithdrawal: catchAsync(async (req, res, next) => {
    const merchantId = req.params.merchantId; 
    const { amount } = req.body; 

    const withdrawal = await withdrawalService.requestWithdrawal(merchantId, { amount });

    res.status(HttpStatus.CREATED).json(withdrawal);
  }),

  listWithdrawalRequests: catchAsync(async (req, res, next) => {
    const merchantId = req.params.merchantId;

    const withdrawals = await withdrawalService.listWithdrawalRequests(merchantId);

    res.status(HttpStatus.OK).json(withdrawals);
  }),
};

module.exports = withdrawalController;
