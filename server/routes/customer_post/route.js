"use strict";
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// Multer configuration for storing files
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        // Define the destination folder for uploads
        callback(null, path.join(__dirname, "..", "..", "uploads")); // Adjust the path as needed
    },
    filename: function (req, file, callback) {
        // Define how the file should be named
        callback(null, Date.now() + "-" + file.originalname);
    },
});

// Initialize multer with the defined storage configuration
const upload = multer({ storage: storage });

// Import necessary methods from your modules
const { protect, authorization } = require("../balance_humanity_unboard/index.js");
const {
    createCustomerPost,
    getMeCustomerPost,
    readAllCustomerPost,
    updateCustomerPost,
    deleteCustomerPost,
    newsFeedData
} = require("../../modules/customer_post/methods/index.js");

// Define routes
router.post("/create", protect, createCustomerPost); // Ensure field name matches your form
router.get("/get-me", protect, getMeCustomerPost);
router.get("/get-all", protect, readAllCustomerPost);
router.put("/update", protect, updateCustomerPost);
router.delete("/delete", protect, deleteCustomerPost);
router.get("/news-feed-data", protect, newsFeedData);

module.exports = router;
