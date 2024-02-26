"use strict";

(() => {
    const { mysqlHelper } = require("./../../../helpers");
    const httpStatus = require("http-status");

    module.exports = async (call, res) => {
        try {
            let response;


            let basequery = ` select * from db_balance_humanity.latitude_longitude_district_info where true`;

            let formatResponse = mysqlHelper.format(basequery);
            let [result] = await mysqlHelper.query(formatResponse);

            if (result && result.length > 0) {
                return (response = { status: httpStatus.OK, message:"success", data:result  });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: error });
        }
    };
})();
