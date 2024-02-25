"use strict";
const {mysqlHelper} = require("../../../helpers");
const httpStatus = require("http-status");

(() => {
module.exports = async (call, res) => {
    try {
        let response = {status: httpStatus.BAD_REQUEST, data: "Data Not found"};


        let query = await mysqlHelper.format(`SELECT 
        pb.id,
        pb.uuid,
        pb.customer_id,
        pb.description,
        pb.image_name,
        cu.id,
        CONCAT(cu.first_name, ' ', cu.last_name) AS fullName,
        cu.email,
        cu.mobile_number
    FROM
        db_balance_humanity.balance_humanity_blog_post AS pb
            INNER JOIN
        db_balance_humanity.balance_humanity_users AS cu ON cu.uuid = pb.customer_id
    WHERE
        TRUE;`);
        const [result] = await mysqlHelper.query(query);

        if (result && result.length>0) {
            return (response = {status: httpStatus.OK, data: result});
        }
    } catch (error) {
        return error;
    }
};
})();
