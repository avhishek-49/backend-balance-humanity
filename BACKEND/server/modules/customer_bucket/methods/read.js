"use strict";
const httpStatus = require("http-status");
const {readCustomerBucket} = require("../sql");

(() => {
module.exports = async call => {
    try {
        let response = {status: httpStatus.BAD_REQUEST, message: "Data Not found"};

        response = await readCustomerBucket(call.body);
        if (response.status !== httpStatus.OK) {
            // return res.status(400).json({ message: response.message });
            return response;
        }
        return response;
    } catch (error) {
        return error;
    }
};
})();
