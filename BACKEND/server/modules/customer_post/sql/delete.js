"use strict";
const {mysqlHelper} = require("../../../helpers");
const httpStatus = require("http-status");
const {v4} = require("uuid");

(() => {
module.exports = async (call, res) => {
    try {
        let response = {status: httpStatus.BAD_REQUEST, data: "Data Not found"};

        let insertObj = {
            uuid: call.uuid,
        };

        let query = await mysqlHelper.format(`DELETE from balance_humanity_blog_post where uuid = ?`, [
            insertObj.uuid,
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
