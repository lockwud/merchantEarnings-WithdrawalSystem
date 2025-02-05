const catchAsync = require("../utils/catchAsync");
const merchantService = require("../services/merchant.service");
const HttpStatus = require("../utils/httpStatus");

const merchant = {
  signUpMerchant: catchAsync(async (req, res, next) => {
    const data = req.body;
    const newMerchant = await merchantService.createMerchant(data);
    res.status(HttpStatus.CREATED).json(newMerchant);
  }),

  fetchMerchantWithId: catchAsync(async (req, res, next) => {
    const id = req.params.merchantId;  // Retrieve merchantId from params
    const merchant = await merchantService.fetchMerchantWithId(id);
    res.status(HttpStatus.OK).json(merchant);
  }),

  listMerchantEarnings: catchAsync(async (req, res, next) => {
    const {merchantId} = req.params// Retrieve merchantId from params
    const earnings = await merchantService.fetchMerchantEarnings(merchantId);
    res.status(HttpStatus.OK).json(earnings);
  }),
};

module.exports = merchant;