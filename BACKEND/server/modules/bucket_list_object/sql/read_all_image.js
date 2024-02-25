"use strict";
const {mysqlHelper} = require("../../../helpers");
const httpStatus = require("http-status");

(() => {
module.exports = async (call, res) => {
    try {
        let response = {status: httpStatus.BAD_REQUEST, data: "Data Not found"};
        // Combine the password and salt, then hash using bcrypt

        let insertObj = {
            bucket_name: call.bucket_name,
        };

        let query = await mysqlHelper.format(`SELECT image_name from bucket_list_object where bucket_name = ?`, [
            insertObj.bucket_name,
        ]);
        const [result] = await mysqlHelper.query(query);

        if (result && result.length > 0) {
            return (response = {status: httpStatus.OK, data: result});
        }
    } catch (error) {
        return error;
    }
};
})();
