"use strict";
const {mysqlHelper} = require("../../../helpers");
const httpStatus = require("http-status");

(() => {
module.exports = async (call, res) => {
    try {
        let response = {status: httpStatus.BAD_REQUEST, data: "Data Not found"};

        let insertObj = {
            description:call.description,
            uuid: call.uuid,

        };

        let query = await mysqlHelper.format(`update balance_humanity_blog_post set description = ? where uuid = ?`, [
            insertObj.description,insertObj.uuid
        ]);
        const [result] = await mysqlHelper.query(query);

        if (result && result.affectedRows>0) {
            return (response = {status: httpStatus.OK, data: result});
        }
    } catch (error) {
        return error;
    }
};
})();
