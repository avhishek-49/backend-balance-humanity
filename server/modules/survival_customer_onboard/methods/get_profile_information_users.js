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
                p.id,
                di.name as districtName,
                p.description,
                p.image_minio_url AS image,
                CONCAT(bu.first_name, ' ', bu.last_name) AS fullName,
                bu.email,
                case  WHEN bu.profile_picture IS NOT NULL THEN bu.profile_picture
                ELSE "N/A"
                END as profilePicture,
                bu.mobile_number AS mobileNumber,
                FROM_UNIXTIME(p.created_date / 1000, '%M %e, %Y') AS postDate,
                CASE
                    WHEN ac.account_number IS NOT NULL THEN ac.account_number
                    ELSE 'N/A'
                END AS accountNumber,
                CASE
                WHEN ai.amount IS NULL THEN '0.00'
                ELSE ai.amount
            END AS amount
            FROM
                db_balance_humanity.balance_humanity_blog_post p
                    LEFT JOIN
                db_balance_humanity.balance_humanity_users bu ON p.customer_id = bu.uuid
                    LEFT JOIN
                db_balance_humanity.latitude_longitude_district_info di ON di.id = p.district_name
                    LEFT JOIN
                db_balance_humanity.customer_account_information AS ac ON ac.customer_id = bu.uuid
                LEFT JOIN
                db_balance_humanity.customer_account_information ai ON ai.customer_id = bu.id

                where bu.uuid = "${call.body.user.uuid}"
            ORDER BY p.id DESC`)

         

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
