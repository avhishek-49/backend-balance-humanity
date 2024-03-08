"use strict";

const deleteExpiredPost = require("./../modules/minio_image/delete_expired_customer_post");
(cron => {
  const schedule = require("node-schedule");
  let { CRON_CLEAN_RESERVED_TOKEN } = process.env;
  cron.init = async () => {
    try {
      schedule.scheduleJob(CRON_CLEAN_RESERVED_TOKEN, async function() {
        try {
            console.log("Hey balance humanity developers cron job is running!!")
            deleteExpiredPost();
        } catch (error) {
            console.error(">>>>>>>>>>>>>>>>>>>",error)
        }
      });
  
    } catch (error) {
        console.error(">>>>>>>>>>>>>>>>>>>",error)
    }
  };
})(module.exports);
