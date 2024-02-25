"use strict";
const httpStatus = require("http-status");
let minioHelper = require("../../helpers/minio_helper");
const {readCustomerBucket} = require("../customer_bucket/methods/index.js");
const {readBucketImage} = require("../bucket_list_object/methods/index.js");

module.exports = async (req, res) => {
    // let bucketName = process.env.BUCKET_NAME;
    // let customer_id = req.body.customer_id;
    let response = {
        status: httpStatus.BAD_REQUEST,
        data: "Bucket does not exist",
    };

    let bucket_name = await readCustomerBucket(req); //read bucketname from db
    if (bucket_name.status != 200) {
        return res.status(httpStatus.BAD_REQUEST).json(response);
    }
    let bucketExists = await minioHelper.bucketExists(bucket_name.data[0].bucket_name);
    if (bucketExists.status != 200) {
        return res.status(httpStatus.BAD_REQUEST).json(response);
    }

    let image_request = {
        body: {
            image_category: req.body.image_category,
        },
    };

    let image_name = await readBucketImage(image_request);
    if (image_name.status != 200) {
        response.data = "Image does not exist";
        return res.status(image_name.status).json(response);
    }

    try {
        let getImageUrl = await minioHelper.getPresignedUrl(image_name.data.bucket_name, image_name.data.image_name);

        if (getImageUrl) {
            return res.status(httpStatus.OK).send(getImageUrl);
        }

        return res.status(httpStatus.BAD_REQUEST).send("Url not found");
    } catch (error) {
        return res.status(400).json(error);
    }
};
