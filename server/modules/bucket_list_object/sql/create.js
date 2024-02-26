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
            image_name: call.image_name,
            bucket_name: call.bucket_name,
            image_category: call.image_category,
        };

        let query = await mysqlHelper.format(`INSERT IGNORE INTO bucket_list_object SET ?`, [insertObj]);
        const [result] = await mysqlHelper.query(query);

        if (result && result.warningStatus > 0) {
            return (response = {status: httpStatus.OK, message: "Duplicate Data entry!"});
        }

        if (result && result.affectedRows > 0) {
            return (response = {status: httpStatus.OK, message: "bucket image relation successfully matched"});
        }
    } catch (error) {
        return error;
    }
};
})();
