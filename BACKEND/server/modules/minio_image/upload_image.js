"use strict";
let minioHelper = require("../../helpers/minio_helper");

const {createCustomerBucket} = require("../customer_bucket/methods");
const {createBucketImageList} = require("../bucket_list_object/methods");
const httpStatus = require("http-status");

let uploadImage = async (req, res) => {
    // let bucketName = process.env.BUCKET_NAME;
    let bucketName = req.body.user.uuid.toLowerCase();

    let image = req.file;
    image.newName = req.body.image_category;
    let bucketExists = await minioHelper.bucketExists(bucketName);
    if (!bucketExists.status) {
        let bucketName = await minioHelper.makeBucket(bucketName);
    }

    try {
        let uploadImage = await minioHelper.uploadAndGetPublicLink(bucketName, image);
        if (uploadImage.status == 200) {
            let request = {
                body: {
                    customer_id: req.body.user.uuid,
                    bucket_name: req.body.user.uuid, //bucket name must be unique so use email as bucket name
                },
            };
            let customerBucket = await createCustomerBucket(request);
            if (customerBucket.status == 200 || customerBucket.errno == 1062) {
                let fileExtension = image.originalname.split(".")[1].toLowerCase();
                let fileName = `${bucketName}-post.${fileExtension}`;
                request.body.image_name = fileName;
                request.body.image_category = req.body.image_category;
                let bucketImageList = await createBucketImageList(request);
                if (bucketImageList.status == 200) {

                    console.log("i am here")
                    return res.status(httpStatus.OK).json(uploadImage.data);
                }
                return res.status(400).json({message: "Could not update the bucket image list"});
            }
            return res.status(httpStatus.BAD_REQUEST).json({message: "Could not update the bucket customer list"});
        }

    } catch (error) {
        return res.status(400).json(error);
    }
};

module.exports = uploadImage;
