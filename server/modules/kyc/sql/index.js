"use strict";
module.exports = {
    createCustomerKycSql: require("./create.js"),
    getCustomerInfoForKycSql: require("./get_kyc_pending_list.js"),
    validateCustomerKycSql: require("./update.js"),
    deleteCustomerKyc: require("./delete.js"),
};
