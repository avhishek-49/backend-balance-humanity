"use strict";
const httpStatus = require("http-status");
let minioHelper = require("../../helpers/minio_helper");

let removeBucket = async (req, res) => {
    // let bucketName = process.env.BUCKET_NAME;
    // let customer_id = req.body.customer_id;
    let response = {
        status: httpStatus.BAD_REQUEST,
        data: "Bucket does not exist",
    };

    let bucket_name = req.body.bucket_name;
    let bucketExists = await minioHelper.bucketExists(bucket_name);
    if (bucketExists.status != 200) {
        return res.status(httpStatus.BAD_REQUEST).json(response);
    }

    try {
        response = await minioHelper.removeBucket(bucket_name);
        if (response.status == 200) {
            return res.status(response.status).json(response);
        }

        return res.status(httpStatus.BAD_REQUEST).json(response);
    } catch (error) {
        return res.status(400).json(error);
    }
};

module.exports = removeBucket;
