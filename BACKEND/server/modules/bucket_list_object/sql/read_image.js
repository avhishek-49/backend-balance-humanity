"use strict";
const {mysqlHelper} = require("../../../helpers");
const httpStatus = require("http-status");

(() => {
module.exports = async (call, res) => {
    try {
        let response = {status: httpStatus.BAD_REQUEST, data: "Data Not found"};
        // Combine the password and salt, then hash using bcrypt

        let insertObj = {
            image_category: call.image_category,
        };

        let query = await mysqlHelper.format(
            `SELECT customer_id, bucket_name, image_name from bucket_list_object where image_category = ?`,
            [insertObj.image_category]
        );
        const [result] = await mysqlHelper.query(query);

        if (result && result.length > 0) {
            return (response = {status: httpStatus.OK, data: result});
        }
    } catch (error) {
        return error;
    }
};
})();
