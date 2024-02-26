"use strict";

exports.auth_user = async (req, res, next) => {
let authheader = req.headers.authorization;

if (!authheader) {
    return res.status(400).send("Provide authorization to begin further");
}
const auth = new Buffer.from(authheader.split(" ")[1], "base64").toString().split(":");
const user = auth[0];
const pass = auth[1];

if (user == process.env.BASIC_AUTH_USERNAME && pass == process.env.BASIC_AUTH_PASSWORD) {
    return next();
}

return res.status(400).send("Not a valid username or password");
};
