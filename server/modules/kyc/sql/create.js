"use strict";
const {mysqlHelper} = require("../../../helpers");
const httpStatus = require("http-status");
const {v4} = require("uuid");

(() => {
    module.exports = async (call, res) => {
        try {
            let response = {status: httpStatus.BAD_REQUEST, message: "Data Not found"};

            let insertObj = {
                uuid: v4(),
                address: call.address,
                citizenship_number: call.citizenship_number,
                relationship: call.relationship,
                mobile_number: call.user.mobile_number,
                description_of_victim: call.description_of_victim,
                account_number: call.account_number,
                account_name: call.account_name,
                status: 0,
                created_at: new Date().getTime(),
            };

            let query = await mysqlHelper.format(`INSERT IGNORE INTO db_balance_humanity.balance_humanity_kyc SET ?`, [
                insertObj,
            ]);
            const [result] = await mysqlHelper.query(query);

            if (result && result.warningStatus > 0) {
                return (response = {status: httpStatus.BAD_REQUEST, message: "Duplicate Data entry!"});
            }

            if (result && result.affectedRows > 0) {
                return (response = {
                    status: httpStatus.OK,
                    message: "KYC successfully submitted wait until verification!",
                });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({error: "Internal Server Error"});
        }
    };
})();
