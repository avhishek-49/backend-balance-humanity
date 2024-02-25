"use strict";
const httpStatus = require("http-status");
const {mysqlHelper, jwtHelper, sendingMail} = require("./../../../helpers");
const {balanceHumanityValidator} = require("./../helpers");
const {setValues, getValues, delValues} = require("../../../helpers/redis_helper_new");
const bcrypt = require("bcrypt");

(() => {
module.exports = async (call, res) => {
    let refreshSecretKey = "a";
    let customerData;

    try {
        let response = await balanceHumanityValidator.loginCustomer(call.body);
        if (response.status !== httpStatus.OK) {
            return res.status(400).json({message: response.message});
        }

        let userExistCheck = await mysqlHelper.format(`SELECT uuid, customer_pin, password,email,mobile_number,
    case when customer_type= 1 then "NormalCustomer"
    when customer_type = 2 then "VictimCustomer"
    when customer_type = 3 then "superCustomer" 
    end as customerType 
FROM db_balance_humanity.balance_humanity_users WHERE mobile_number = "${call.body.mobileNumber}"`);
        let [userExistCheckResult] = await mysqlHelper.query(userExistCheck);

        if (!userExistCheckResult || userExistCheckResult.length === 0) {
            return res.status(400).json({message: "User doesnt exist!"});
        }
        if (userExistCheckResult && userExistCheckResult.length > 0) {
            const match = await bcrypt.compare(call.body.password, userExistCheckResult[0].password);

            if (match) {


                // OTP is verified now and proceed for further request
                let redisValue = await getValues(`${userExistCheckResult[0].email}`);
                if (redisValue && redisValue.accessToken) {
                    let accessToken = redisValue.accessToken.token;

                    if (accessToken) {
                        const decodedAccess = await jwtHelper.verifyJWTToken(
                            accessToken,
                            process.env.ACCESS_TOKEN_SECRET_KEY
                        );
                        //check validity of access token and sends the same response from redis  if the token is valid
                        if (decodedAccess.data && decodedAccess.success == true) {
                            return res.status(200).send(redisValue);
                        }
                        //uncomment mathiko while commit
                    }

                    let refreshTokenFromRedis = redisValue.refreshToken.token;
                    const decodedRefresh = await jwtHelper.verifyJWTToken(
                        refreshTokenFromRedis,
                        process.env.REFRESH_TOKEN_SECRET_KEY
                    );
                    if (decodedRefresh && decodedRefresh.success == true) {
                        let accessTokenFromRefreshToken = jwtHelper.generateJWTAccessToken(
                            decodedRefresh.data.user
                        );
                        redisValue.accessToken.token = accessTokenFromRefreshToken.token;

                        await setValues(userExistCheckResult[0].email, redisValue);

                        return res.status(200).send(redisValue);
                    }
                }

                const jwtAccessToken = await jwtHelper.generateJWTAccessToken(userExistCheckResult[0].uuid);
                const jwtRefreshToken = await jwtHelper.generateJWTAccessToken(userExistCheckResult[0].uuid);
                customerData = {
                    mobileNumber: userExistCheckResult[0].mobile_number,
                    email: userExistCheckResult[0].email,
                    customerType: userExistCheckResult[0].customerType,
                };

                if (jwtAccessToken.success && jwtRefreshToken.success) {
                    // Acces token is kept with key email and refreshtoken is kept with key mobile number
                    await setValues(customerData.email, {
                        accessToken: jwtAccessToken,
                        refreshToken: jwtRefreshToken,
                        message: "login successfully!",
                        customerData: JSON.stringify(customerData),
                    });
                    // await setValues(customerData.email,jwtRefreshToken);

                    return res.status(200).json({
                        accessToken: jwtAccessToken,
                        refreshToken: jwtRefreshToken,
                        message: "login successfully!",
                        customerData: JSON.stringify(customerData),
                    });
                }
            } else {
                return res.status(401).json({message: "Invalid password."});
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Internal Server Error"});
    }
};
})();
