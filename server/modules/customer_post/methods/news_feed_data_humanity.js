"use strict";
const httpStatus = require("http-status");
const { longitudeLatitudeHelper, mysqlHelper } = require("./../../../helpers");
(() => {
    module.exports = async (call, res) => {
        try {


            let userInfo = await mysqlHelper.format(`select * from db_balance_humanity.balance_humanity_users where uuid = "${call.body.user.uuid}"`)
            let [userResult] = await mysqlHelper.query(userInfo);

            if (userResult && userResult.length > 0) {
                let nearestDistrict = await longitudeLatitudeHelper.fetchNearestDistricts(userResult[0].district_id);
                console.log("dfsf", nearestDistrict);


                let customerPostData = await mysqlHelper.format(`  
                SELECT 
                p.id,
                di.name,
                p.description,
                p.image_minio_url AS image,
                CONCAT(bu.first_name, ' ', bu.last_name) AS fullName,
                bu.email,
                case  WHEN bu.profile_picture IS NOT NULL THEN bu.profile_picture
                ELSE "N/A"
                END as profilePicture,
                bu.mobile_number AS mobileNumber,
                FROM_UNIXTIME(p.created_date / 1000, '%M %e, %Y') AS postCreateDate,
                CASE
                    WHEN ac.account_number IS NOT NULL THEN ac.account_number
                    ELSE 'N/A'
                END AS accountNumber
            FROM
                db_balance_humanity.balance_humanity_blog_post p
                    LEFT JOIN
                db_balance_humanity.balance_humanity_users bu ON p.customer_id = bu.uuid
                    LEFT JOIN
                db_balance_humanity.latitude_longitude_district_info di ON di.id = p.district_name
                    LEFT JOIN
                db_balance_humanity.customer_account_information AS ac ON ac.customer_id = bu.uuid
            ORDER BY p.id DESC`)

                let [everyCustomerPost] = await mysqlHelper.query(customerPostData);

                if (everyCustomerPost && everyCustomerPost.length > 0) {

                    
                    return res.status(200).json({ status: httpStatus.OK, message: "successfully fetched", newFeedData:everyCustomerPost});
                    //todo customer post latitude and longitude
                }

            }



            return res.status(400).json({ status: httpStatus.BAD_REQUEST, message:"Empty news feed data", data: []});
   
     
            // return response;
        } catch (error) {
            return res.status(200).json({ status: httpStatus.BAD_GATEWAY, message:"data not found" });

        }
    };
})();
