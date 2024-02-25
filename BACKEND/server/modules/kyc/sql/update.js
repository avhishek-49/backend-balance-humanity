"use strict";
const {mysqlHelper} = require("../../../helpers");
const httpStatus = require("http-status");

(() => {
    module.exports = async (call, res) => {
        try {
            let response = {status: httpStatus.BAD_REQUEST, message: "Data Not found"};
            // Combine the account_number and salt, then hash using bcrypt

            let query = await mysqlHelper.format(
                `update db_balance_humanity.balance_humanity_kyc
      set status = 1 where mobile_number = ?`,
                [call.mobile_number]
            );
            const [result] = await mysqlHelper.query(query);

            if (result && result.affectedRows > 0) {
                return (response = {status: httpStatus.OK, message: "kyc verified!"});
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({error: "Internal Server Error"});
        }
    };
})();
