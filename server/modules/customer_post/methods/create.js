"use strict";

const httpStatus = require("http-status");
const { createCustomerPostSql } = require("../sql");
let minioHelper = require("./../../../helpers/minio_helper");

module.exports = async (call, res) => {
try {

    let bucketName = `humanityPost-${call.body.user.uuid.toLowerCase()}`

    let image = call.file;

    if(!image)
    {
        return res.status(httpStatus.BAD_REQUEST).json({ status: httpStatus.BAD_REQUEST, message:"File must be uploaded" });

    }
    let bucketExists = await minioHelper.bucketExists(bucketName);
    if (!bucketExists.status) {
        let bucketName = await minioHelper.makeBucket(bucketName);
    }

    let uploadImage = await minioHelper.uploadAndGetPublicLink(bucketName, image);
    if (uploadImage.status == 200) {
        console.log(uploadImage)
    }
    const response = await createCustomerPostSql(call.body);

    if (response.status !== httpStatus.OK) {
        return res.status(httpStatus.BAD_REQUEST).json({ status: httpStatus.BAD_REQUEST, message: response.message });
    }

    return res.status(httpStatus.OK).json({ status: httpStatus.OK, message: response.message });
} catch (error) {
    console.error("Error in handling request:", error);
    return res.status(httpStatus.BAD_REQUEST).json({ status: httpStatus.BAD_REQUEST, message: error.message });
}
};
