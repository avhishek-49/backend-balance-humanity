"use strict";
let minioHelper = require("../../helpers/minio_helper");
const httpStatus = require("http-status");
const mysqlHelper=require("./../../helpers/database_helper");
const dotenv = require("dotenv");
const {v4} = require("uuid");

dotenv.config()
let uploadImage = async (call, res) => {

    if (!call || !call.body ) {
        return res.status(400).json({ message: "Request body is missing" });
    }

    const {
        address,
        citizenship_number,
        description_of_victim,
        account_number,
        account_name
    } = call.body

    if (!address) {
        return res.status(400).json({ message: "Address cannot be empty" });
    }

    if (!citizenship_number) {
        return res.status(400).json({ message: "Citizenship number cannot be empty" });
    }

    // if (!relationship) {
    //     return res.status(400).json({ message: "Relationship cannot be empty" });
    // }

    // if (!user || !user.mobile_number) {
    //     return res.status(400).json({ message: "User mobile number cannot be empty" });
    // }

    if (!description_of_victim) {
        return res.status(400).json({ message: "Description of victim cannot be empty" });
    }

    if (!account_number) {
        return res.status(400).json({ message: "Account number cannot be empty" });
    }

    if (!account_name) {
        return res.status(400).json({ message: "Account name cannot be empty" });
    }


    let userInfo = await mysqlHelper.format(`select mobile_number from db_balance_humanity.balance_humanity_kyc where mobile_number = "${call.body.user.mobile_number}" and is_verified =0`)
    let [userResult] = await mysqlHelper.query(userInfo);

    if(userResult && userResult.length >0)
    {
        return res.status(400).json({  message:"Kyc is already on pending!!!"});

    }



    let bucketName = "imageshumanity"
        let image = call.file;
    let bucketExists = await minioHelper.bucketExists(bucketName);
    if (!bucketExists.status) {
        let bucketName = await minioHelper.makeBucket(bucketName);
    }

    try {
        let uploadImage = await minioHelper.uploadToSpecificBucket(bucketName, image);
        if (uploadImage.status == 200) {
           
            let insertObj = {
                uuid: v4(),
                address: call.body.address,
                citizenship_number: call.body.citizenship_number,
                relationship: "null",
                mobile_number: call.body.user.mobile_number,
                description_of_victim: call.body.description_of_victim,
                account_number: call.body.account_number,
                account_name: call.body.account_name,
                is_verified: 0,
                created_at: new Date().getTime(),
                proof_image:`http://127.0.0.1:9000/${bucketName}/${uploadImage.data.info.fileName}`
            };


            let kycInsert = await mysqlHelper.format(`Insert into db_balance_humanity.balance_humanity_kyc set ?`,[insertObj]);
            let [userResult] = await mysqlHelper.query(kycInsert);

            if(userResult && userResult.affectedRows> 0)
            {
                return res.status(200).json({message:"Kyc setup success!wait until you get your response from balance humanity!"});
            }
            
        }
        return res.status(400).json({message:"Failed to setup kyc contact us"});

    } catch (error) {
        return res.status(400).json("Minio connection error!");
    }
};

module.exports = uploadImage;
