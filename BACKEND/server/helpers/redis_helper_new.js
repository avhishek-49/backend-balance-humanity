const redis = require("redis");
const dotenv = require("dotenv");

dotenv.config();

let redisClient = null;

exports.redisInit = async () => {
redisClient = redis.createClient({
    url: "redis://127.0.0.1:6379",
});

redisClient.on("error", error => {
    console.log("Redis error   " + error);
});

await redisClient.connect();
console.log("Redis is connected");
redisClient.on("connected", () => {
    console.log("Redis is connected");
});
};

exports.setValues = async (key, value, time = 300) => {
const redisValue = JSON.stringify(value);
const result = await redisClient.sendCommand(["SET", key, redisValue, "EX", `${time}`]);

return result;
};

exports.getValues = async key => {
const result = await redisClient.sendCommand(["GET", key]);

if (result) {
    const redisResult = JSON.parse(result);
    return redisResult;
} else {
    return result;
}
};

exports.delValues = async key => {
const result = await redisClient.del(key);
return result;
};

global.Cache = redisClient;
