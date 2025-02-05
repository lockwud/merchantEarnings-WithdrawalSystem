const { throwError } = require("../middlewares/errorHandler");
const HttpStatus  = require("../utils/httpStatus");
const db = require("../../config/database/db");

exports.createMerchant = async (data) => {
    const checkMerchantAvailability = await db("merchants")
        .where("name", data.name)
    if (checkMerchantAvailability.length > 0) {
        throwError(HttpStatus.CONFLICT, "Name already registered");
    }
    const merchant = await db("merchants")
        .insert(data)
        .returning("*");
        console.log("Inserted merchant:", merchant);
    return merchant;
};


exports.fetchMerchantWithId = async (id) => {
    const merchant = await db("merchants")
        .where("id", id)
        .first();
    if (!merchant) {
        throwError(HttpStatus.NOT_FOUND, "Merchant not found");
    }
    return merchant;
};


exports.fetchMerchantEarnings = async (id) => {
    const merchant = await db("merchants").where({id: id}).first();
    if (!merchant) {
        throwError(HttpStatus.NOT_FOUND, "Merchant not found");
    }else{
        const earnings = await db("earnings")
        .where({"merchant_id": merchant.id})
        .where("is_withdrawn", false)
        .select("id", "amount", "order_id", "is_withdrawn", "created_at");

    // Calculate total earnings dynamically
    const totalEarnings = await db("earnings")
        .where({"merchant_id": merchant.id})
        .where("is_withdrawn", false)
        .sum("amount as total_earnings")
        .first();

    return {
        earnings,
        total_earnings: totalEarnings.total_earnings || 0.00
    };
    }
  
};