"use strict";
const httpStatus = require("http-status");
let minioHelper = require("../../helpers/minio_helper.js");
const {readCustomerBucket} = require("../customer_bucket/methods/index.js");
const {readAllBucketImage} = require("../bucket_list_object/methods/index.js");
const {Buffer} = require("node:buffer");

let getAllImage = async (req, res) => {
    let response = {
        status: httpStatus.BAD_REQUEST,
        data: "Bucket does not exist",
    };
    // req.body = req.body.user

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
            bucket_name: req.body.user.uuid,
        },
    };

    let image_name = await readAllBucketImage(image_request);
    if (image_name.status != 200) {
        response.data = "Image does not exist";
        return res.status(image_name.status).json(response);
    }

    try {
        let getObjectFromBucketName = await minioHelper.listObjects(bucket_name.data[0].bucket_name);
        if (getObjectFromBucketName.status == 200) {
            let bucket_image = [];
            for (let item of getObjectFromBucketName.data) {
                let url = `${process.env.MINIO_BASE_URL}/${bucket_name.data[0].bucket_name}/${item.name}`;

                let image = await minioHelper.fetchImage(url);
                if (image) {
                    const b64 = new Buffer(image).toString("base64");
                    const mimeType = "image/png";

                    bucket_image.push({image_name: item.name, photo: `${b64}`, mimeType: `${mimeType}`});
                }
            }
            return res.status(200).json(bucket_image);
        }
        return res.status(400).json({message: "No image found"});
    } catch (error) {
        return res.status(400).json(error);
    }
};

module.exports = getAllImage;
