"use strict";
let minioHelper = require("../../helpers/minio_helper");
const httpStatus = require("http-status");
const mysqlHelper=require("./../../helpers/database_helper");
const dotenv = require("dotenv");
dotenv.config()
let uploadImage = async (req, res) => {
    // let bucketName = process.env.BUCKET_NAME;
    let bucketName = "imageshumanity"
        let image = req.file;
    let bucketExists = await minioHelper.bucketExists(bucketName);
    if (!bucketExists.status) {
        let bucketName = await minioHelper.makeBucket(bucketName);
    }

    try {
        let uploadImage = await minioHelper.uploadToSpecificBucket(bucketName, image);
        if (uploadImage.status == 200) {


            let updateImage = await mysqlHelper.format(` update db_balance_humanity.balance_humanity_users set profile_picture = "http://127.0.0.1:9000/${bucketName}/${uploadImage.data.info.fileName}" where uuid ="${req.body.user.uuid}"`);
            let [userResult] = await mysqlHelper.query(updateImage);

            if(userResult && userResult.affectedRows> 0)
            {
                return res.status(200).json({message:"customer profile picture updated successfully"});
            }
            
        }

    } catch (error) {
        return res.status(400).json(error);
    }
};

module.exports = uploadImage;
