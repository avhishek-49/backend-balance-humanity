"use strict";
const {mysqlHelper} = require("../../../helpers");
const httpStatus = require("http-status");
const {v4} = require("uuid");

(() => {
    module.exports = async (call, res) => {
        try {
            let response = {status: httpStatus.BAD_REQUEST, data: "Data Not found"};
            // Combine the password and salt, then hash using bcrypt

            let insertObj = {
                customer_id: call.user.uuid,
            };

            let query = await mysqlHelper.format(`SELECT bucket_name FROM customer_bucket where customer_id = ?`, [
                insertObj.customer_id,
            ]);
            const [result] = await mysqlHelper.query(query);

            if (result && result[0].bucket_name) {
                return (response = {status: httpStatus.OK, data: result});
            }
        } catch (error) {
            return error;
        }
    };
})();
