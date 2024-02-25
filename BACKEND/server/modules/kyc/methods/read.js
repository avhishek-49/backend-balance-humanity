"use strict";
const httpStatus = require("http-status");
const {getCustomerInfoForKycSql} = require("../sql");

(() => {
    module.exports = async (req, res) => {
        try {
            let response = {status: httpStatus.BAD_REQUEST, message: "Data Not found"};

            let result = await getCustomerInfoForKycSql(req.query);

            if (result && result.status == httpStatus.OK) {
                return res.status(200).json({message: result.message});
            }

            if (result && result.status == httpStatus.BAD_REQUEST) {
                return res.status(400).json({message: result.message});
            }

            return res.status(400).json({error: response.message});
        } catch (error) {
            console.error(error);
            res.status(500).json({error: "Internal Server Error"});
        }
    };
})();
