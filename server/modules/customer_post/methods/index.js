"use strict";
module.exports = {
createCustomerPost: require("./create.js"),
getMeCustomerPost: require("./get_me.js"),
updateCustomerPost: require("./update.js"),
deleteCustomerPost: require("./delete.js"),
readAllCustomerPost: require("./readAll.js"),
newsFeedData:require("./news_feed_data_humanity.js"),
// createLikeForEachPost:require("./create_like.js"),
getKycCustomerByuuid:require("./get_kyc_customer_by_uuid.js"),
approveRejectKyc:require("./approve_reject_kyc.js")
};
