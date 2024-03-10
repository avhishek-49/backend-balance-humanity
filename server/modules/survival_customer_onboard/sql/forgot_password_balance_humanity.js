"use strict";
const {mysqlHelper} = require("../../../helpers");
const httpStatus = require("http-status");
const bcrypt = require("bcrypt");

(() => {
module.exports = async (call, res) => {
    try {
        let response = {status: httpStatus.BAD_REQUEST, message: "Data Not found"};

        let userExistCheck = await mysqlHelper.format(
            `SELECT uuid, customer_pin, password FROM db_balance_humanity.balance_humanity_users WHERE mobile_number = "${call.mobileNumber}"`
        );
        let [userExistCheckResult] = await mysqlHelper.query(userExistCheck);

        if (!userExistCheckResult || userExistCheckResult.length === 0) {
            return (response = {status: httpStatus.BAD_REQUEST, message: "User Doesn't Exist!"});
        }

        if (userExistCheckResult && userExistCheckResult.length > 0) {
            const match = await bcrypt.compare(call.customerPin, userExistCheckResult[0].customer_pin);

            if (match) {
                const oldPasswordCheck = await bcrypt.compare(call.password, userExistCheckResult[0].password);

                if (oldPasswordCheck == true) {
                    return (response = {
                        status: httpStatus.BAD_REQUEST,
                        message: "old password matched! use new password...",
                    });
                }

                let newPassword = await bcrypt.hash(call.password, 10);
                let updateQuery = await mysqlHelper.format(
                    `Update db_balance_humanity.balance_humanity_users set password = "${newPassword}"  WHERE mobile_number = "${call.mobileNumber}" `
                );
                let [executeUpdateQuery] = await mysqlHelper.query(updateQuery);

                if (executeUpdateQuery && executeUpdateQuery.affectedRows > 0) {
                    return (response = {status: httpStatus.OK, message: "Password Reset Success!"});
                }
            } else {
                return (response = {status: httpStatus.BAD_REQUEST, message: "Invalid customer pin!"});
            }
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: error});
    }
};
})();
