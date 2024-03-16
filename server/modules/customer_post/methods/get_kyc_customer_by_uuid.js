"use strict";
const httpStatus = require("http-status");
const { mysqlHelper } = require("./../../../helpers");

(() => {
    module.exports = async (call, res) => {
        try {            


                let customerPostData = await mysqlHelper.format(`  
                select * from db_balance_humanity.balance_humanity_kyc  where uuid = "${call.params.uuid}" order by id desc
`)

                let [everyCustomerPost] = await mysqlHelper.query(customerPostData);

                if (everyCustomerPost && everyCustomerPost.length > 0) {

                    
                    return res.status(200).json({ status: httpStatus.OK, message: "successfully fetched", customerkycData:everyCustomerPost[0]});
                    //todo customer post latitude and longitude
                }

            



            return res.status(400).json({ status: httpStatus.BAD_REQUEST, message:"Empty news feed data", data: []});
   
     
            // return response;
        } catch (error) {
            return res.status(200).json({ status: httpStatus.BAD_GATEWAY, message:"data not found" });

        }
    };
})();
