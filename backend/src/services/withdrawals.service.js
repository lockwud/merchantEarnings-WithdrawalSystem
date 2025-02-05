const { throwError } = require("../middlewares/errorHandler");
const HttpStatus  = require("../utils/httpStatus");
const db = require("../../config/database/db");
exports.requestWithdrawal = async (merchantId, { amount }) => {
    const totalEarnings = await db("earnings")
        .where("merchant_id", merchantId)
        .where("is_withdrawn", false)
        .sum("amount as total_earnings")
        .first();

    const availableEarnings = totalEarnings.total_earnings || 0.00;

    if (amount > availableEarnings) {
        throwError(HttpStatus.BAD_REQUEST, "Requested amount exceeds available earnings");
    }else if (amount <= 0) {
        throwError(HttpStatus.BAD_REQUEST, "Requested amount should be greater than zero");
    }

    const withdrawal = await db("withdrawals")
        .insert({
            merchant_id: merchantId,
            amount,
            status: "pending",
            created_at: db.fn.now(),
            updated_at: db.fn.now()
        })
        .returning("*");

    await db("earnings")
        .where("merchant_id", merchantId)
        .where("is_withdrawn", false)
        .limit(amount) // Update up to the requested amount
        .update({ is_withdrawn: true, updated_at: db.fn.now() });

    return withdrawal[0]; 
};


exports.listWithdrawalRequests = async (merchantId) => {
    const withdrawals = await db("withdrawals")
        .where("merchant_id", merchantId)
        .select("id", "amount", "status", "created_at", "updated_at");

    return { withdrawals };
};
