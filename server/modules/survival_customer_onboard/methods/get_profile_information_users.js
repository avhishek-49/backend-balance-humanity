"use strict";
const httpStatus = require("http-status");
const { longitudeLatitudeHelper, mysqlHelper } = require("./../../../helpers");
(() => {
    module.exports = async (call, res) => {
        try {
            let response = { status: httpStatus.BAD_REQUEST, data: null, message: "Data Not found" };


            let userInfo = await mysqlHelper.format(`select * from db_balance_humanity.balance_humanity_users where uuid = "${call.body.user.uuid}"`)
            let [userResult] = await mysqlHelper.query(userInfo);

            if(userResult && userResult.length <=0)
            {
                return res.status(400).json({ status: httpStatus.BAD_REQUEST, message:"user doesnt exist" });
  
            }

            if (userResult && userResult.length > 0) {
      


                let customerProfiledata = await mysqlHelper.format(`
                SELECT
                bu.uuid,
                concat(bu.first_name, " ",bu.last_name),
                bu.email,
                bu.mobile_number,
                bu.profile_picture,
                d.name as district_name,
                CASE
                    WHEN bu.customer_type = 1 THEN 'NormalCustomer'
                    WHEN bu.customer_type = 2 THEN 'VictimCustomer'
                    WHEN bu.customer_type = 3 THEN 'SuperCustomer'
                    ELSE NULL
                END AS customer_type,
                CASE
                    WHEN ai.amount IS NULL THEN '0.00'
                    ELSE ai.amount
                END AS amount
            FROM
                db_balance_humanity.balance_humanity_users bu
            LEFT JOIN
                db_balance_humanity.customer_account_information ai ON ai.customer_id = bu.id
            
            left join db_balance_humanity.latitude_longitude_district_info d on bu.district_id = d.id
            WHERE
                 bu.uuid = "${call.body.user.uuid}"
            `)

                let [profileResult] = await mysqlHelper.query(customerProfiledata);

                if (profileResult && profileResult.length > 0) {

                    
                    return res.status(200).json({ status: httpStatus.Ok, message: "Data fetched successfully" , profileData:profileResult});
                    //todo customer post latitude and longitude
                }

            }



            return res.status(400).json({ status: httpStatus.BAD_GATEWAY, data: [] });
   
     
            // return response;
        } catch (error) {
            return res.status(200).json({ status: httpStatus.BAD_REQUEST, message:"data not found" });

        }
    };
})();
