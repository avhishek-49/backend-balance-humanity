"use strict";
const httpStatus = require("http-status");
const {validateCustomerKycSql} = require("../sql");

(() => {
    module.exports = async (call, res) => {
        try {
            let result = await validateCustomerKycSql(call.query);

            if (result && result.status == httpStatus.OK) {
                return res.status(200).json({status: httpStatus.OK, message: result.message});
            }

            if (result && result.status == httpStatus.BAD_REQUEST) {
                return res.status(400).json({status: httpStatus.BAD_REQUEST, message: result.message});
            }

            return res.status(400).json({status: httpStatus.BAD_REQUEST, error: response.message});
        } catch (error) {
            console.error(error);
            res.status(500).json({status: httpStatus.INTERNAL_SERVER_ERROR, error: "Internal Server Error"});
        }
    };
})();
