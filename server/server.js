const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({path: "./.env"});
let {mysqlHelper} = require("./helpers/index");
let minioHelper = require("./helpers/minio_helper.js");
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.use(express.urlencoded({extended: true}));

// Welcome message
app.get("/", (req, res) => {
    res.json({message: "Hello, Balance Humanity"});
});

const mainRoutes = require("./routes/index.js");
const {redisInit} = require("./helpers/redis_helper_new.js");
//change end points name..... //todo
app.use("/api/v1", mainRoutes);

let port = process.env.SERVER_PORT || 4900;
app.listen(port, async () => {
console.log(`Server is running on http://localhost:${port}`);
await mysqlHelper.init();
await minioHelper.init();
await redisInit();
});
