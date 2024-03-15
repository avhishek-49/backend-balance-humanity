"use strict";
const express = require("express");
const router = express.Router();
const uploadImage = require("../../modules/minio_image/upload_image.js");
const getImage = require("../../modules/minio_image/get_image.js");
const getImageUrl = require("../../modules/minio_image/get_image_url.js");
const fetchImageUrl = require("../../modules/minio_image/get_presigned_image.js");
const removeBucket = require("../../modules/minio_image/remove_bucket.js");
const customerPost = require("../../modules/minio_image/create_customer_post");
let multer = require("multer");
const {protect, authorization} = require("../balance_humanity_unboard/index.js");
const getAllImage = require("../../modules/minio_image/get_all_image.js");
const getCustomerPost = require("../../modules/minio_image/get_my_post_customer.js");
const setProfilePicture = require("../../modules/minio_image/update_profile_picture.js");
const setVictimKyc = require("../../modules/minio_image/set_up_kyc.js");


const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, `${__dirname}../../../../uploads`);
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname);
    },
});

const upload = multer({storage: storage});



//customer post and enhancements

router.post("/create", upload.single("file"), protect, customerPost);
router.get("/get-my-post",  protect, getCustomerPost);
router.post("/upload-profile-picture", upload.single("file"), protect, setProfilePicture);


//kyc setup
router.post("/setup-victim-kyc", upload.single("file"), protect, setVictimKyc);


// usable functions
router.post("/upload", upload.single("file"), protect, uploadImage);
router.get("/get", protect, getImage);
router.get("/get-all", protect, getAllImage);
router.delete("/bucket-remove", protect, authorization(["superCustomer"]), removeBucket);

router.get("/geturl", getImageUrl); //not use
router.get("/fetch-image", fetchImageUrl); //not use

module.exports = router;
