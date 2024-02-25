"use strict";
const httpStatus = require("http-status");
const {  mysqlHelper } = require("./../../helpers");
(() => {
    module.exports = async (call, res) => {
        try {
            let response = { status: httpStatus.BAD_REQUEST, data: null, message: "Data Not found" };


            let userInfo = await mysqlHelper.format(`select * from db_balance_humanity.balance_humanity_users where uuid = "${call.body.user.uuid}"`)
            let [userResult] = await mysqlHelper.query(userInfo);

            if(userResult && userResult.length < 0)
            {
                return res.status(400).json({ status: httpStatus.BAD_REQUEST, message:"user doesnt exist!"});
 
            }

            if (userResult && userResult.length > 0) {
  

                let existingAmount = await mysqlHelper.format(`select * from db_balance_humanity.customer_account_information where customer_id = ${userResult[0].id}   `)
                 let [existingAmountResult] = await mysqlHelper.query(existingAmount);
                if(existingAmountResult && existingAmountResult.length >0)
                {
                  
                    let updateAmount = parseInt(existingAmountResult[0].amount) + parseInt(call.body.amount);
                    let loadAmount = await mysqlHelper.format(`
                    update db_balance_humanity.customer_account_information set amount = "${updateAmount}" where customer_id = ${userResult[0].id}

                
                    `)

                    let [loadAmountResult] = await mysqlHelper.query(loadAmount);
                    if(loadAmountResult && loadAmountResult.affectedRows>0)
                    {
                        return res.status(200).json({ status: httpStatus.OK, data:"Load succesfully" });

                    }
                  
                }
            }


            return res.status(400).json({ status: httpStatus.BAD_REQUEST, data:"Load Failed" });

   
     
            // return response;
        } catch (error) {
            return res.status(200).json({ status: httpStatus.BAD_REQUEST, message:"data not found" });

        }
    };
})();
