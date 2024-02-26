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
    select
    p.id,
    p.district_name,
    p.description,
    p.image_minio_url as image,
    concat(bu.first_name," ", bu.last_name) as fullName,
    bu.email,
    bu.mobile_number as mobileNumber
from db_balance_humanity.balance_humanity_blog_post p

left join db_balance_humanity.balance_humanity_users bu
on p.customer_id = bu.uuid
order by p.id desc
`)

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
