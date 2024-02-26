const axios = require("axios");

const dotenv = require("dotenv");

dotenv.config();

module.exports = async (req, res) => {
let request_payload = JSON.stringify(req.body);
let base64encode = new Buffer.from(request_payload).toString("base64");

const options = {
    method: "POST",
    url: "http://localhost:8090/api/v1/balance/load",
    header: {
        "Content-Type": "application/json",
        // 'authorization':req.headers.authorization
    },
    data: {
        token: base64encode,
    },
};

try {
    let response = await axios.request(options);

    if (response && response.status == 200) {
        return res.status(200).send(response.data);
    }
} catch (error) {
    return res.status(400).send(error);
}
};
