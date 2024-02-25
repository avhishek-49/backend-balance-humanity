"use strict";
const express = require("express");
const router = express.Router();
const protect = require("../middleware/protect.js");

//unboarding customers
const unboarding = require("./balance_humanity_unboard/route");
router.use("/customer", unboarding);

//image functionalities
const image = require("./minio_image/route.js");
router.use("/customer-post", image);

//Balance transfer and load routes
const balance = require("./balance_transfer/route.js");
router.use("/balance", balance);

const post = require("./customer_post/route.js");
router.use("/post", post);

module.exports = router;
