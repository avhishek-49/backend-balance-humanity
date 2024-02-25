"use strict";
const {mysqlHelper} = require("../../../helpers");
const httpStatus = require("http-status");
const {v4} = require("uuid");

(() => {
    module.exports = async (call, res) => {
        try {
            let response = {status: httpStatus.BAD_REQUEST, message: "Data Not found"};
            // Combine the password and salt, then hash using bcrypt

            let insertObj = {
                uuid: v4(),
                customer_id: call.customer_id,
                bucket_name: call.bucket_name,
            };

            let query = await mysqlHelper.format(`INSERT INTO customer_bucket SET ?`, [insertObj]);
            const [result] = await mysqlHelper.query(query);

            if (result && result.affectedRows > 0) {
                return (response = {status: httpStatus.OK, message: "customer_bucket successfully made a bucket"});
            }
        } catch (error) {
            return error;
        }
    };
})();
