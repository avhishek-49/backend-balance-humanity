"use strict";
const httpStatus = require("http-status");
const {getMeCustomerPostSql} = require("../sql");

(() => {
module.exports = async (call,res) => {
    try {
        let response = {status: httpStatus.BAD_REQUEST, data: null,message: "Data Not found"};

        response = await getMeCustomerPostSql(call.body);
        if (response.status !== httpStatus.OK) {
            return res.status(400).json({ status: httpStatus.BAD_REQUEST,message: response.message });
            // return response;
        }
        return res.status(200).json({status: httpStatus.OK, data: response.data });
        // return response;
    } catch (error) {
        return res.status(200).json({status: httpStatus.BAD_REQUEST, message: error.message});

        // return {status: httpStatus.BAD_REQUEST, message: error.message};
    }
};
})();
