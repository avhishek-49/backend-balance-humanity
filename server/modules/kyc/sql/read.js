"use strict";

(() => {
    const {mysqlHelper} = require("./../../../helpers");
    const httpStatus = require("http-status");

    module.exports = async (call, res) => {
        try {
            let response;

            // let response = { status: httpStatus.BAD_REQUEST, message: "Data Not found" }

            let basequery = `SELECT uuid, address, citizenship_number, relationship, mobile_number, description_of_victim, account_number,account_name,status
    
    FROM db_balance_humanity.balance_humanity_kyc WHERE true `;

            let paramsQuery = "";

            if (call.mobile_number) {
                let mobile = parseInt(call.mobile_number);
                paramsQuery = mysqlHelper.format(`AND mobile_number like '%${mobile}%' `);
            }

            //  let limitQuery = `order by id desc limit ${params.limit} offset `

            let mainQuery = basequery + paramsQuery;

            let formatResponse = mysqlHelper.format(mainQuery);
            let result = await mysqlHelper.query(formatResponse);

            if (result && result.length > 0) {
                return (response = {status: httpStatus.OK, message: result[0]});
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({error: error});
        }
    };
})();
