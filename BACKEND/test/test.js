// "use strict";
// import mysqlHelper from "../../../../../common/helper/mysqlHelper.js";
// import bcrypt from 'bcrypt'
// import httpStatus from 'http-status'
// import jwt from "jsonwebtoken";
// import { getAccessToken } from "./index.js";
// import { getValues, setValues } from "../../../../../common/helper/redis.js";

// const login = async (call, callback) => {
//     const accessSecretKey = process.env.ACCESS_TOKEN_SECRET_KEY;
//     const refreshSecretKey = process.env.REFRESH_TOKEN_SECRET_KEY;
//     const accessTokenExpiry = process.env.ACCESS_TOKEN_EXPIRY
//     const refreshTokenExpiry = process.env.REFRESH_TOKEN_EXPIRY

//     const accessTokenExpiryRedis = parseInt(accessTokenExpiry)*60;
//     const refreshTokenExpiryRedis = parseInt(refreshTokenExpiry)*24*60*60
//     let response = {
//         id: '',
//         status: httpStatus.BAD_REQUEST,
//         message: `Login Unsuccessfull`,
//         accessToken: 'null',
//         refreshToken: 'null'

//     };
//     try {

//         let refreshToken = await getValues(`${call.request.email}`)
//         if (refreshToken) {
//             response.id = jwt.verify(refreshToken, refreshSecretKey).id;
//             response.status = httpStatus.OK;
//             response.refreshToken = refreshToken;
//             let accessToken = await getValues(`${refreshToken}`);

//             if (accessToken) {
//                 response.accessToken = accessToken;
//                 return callback(null, response)
//             }
//             let req= {
//                 body:{
//                     refreshToken : refreshToken
//                 }
//             }

//             let accessTokenFromRefresh = await new Promise(async(resolve,reject)=>{
//                 await getAccessToken(req.body,(err,data)=>{
//                     if(err){
//                         return reject(err);
//                     }
//                     return resolve(data);
//                 })
//             })
//             response.accessToken = accessToken?accessToken:accessTokenFromRefresh.accessToken;

//             return callback(null, response)

//         }
//         const [dbResponse] = await mysqlHelper.query(`select id ,password from accounts where email = ?`, [call.request.email])
//         const password = dbResponse[0].password

//         if (dbResponse && dbResponse[0].id != "") {

//             const match = await bcrypt.compare(call.request.password, password);
//             const userId = dbResponse[0].id
//             if (match) {
//                 const accessToken = jwt.sign({ id: userId }, accessSecretKey, { expiresIn: accessTokenExpiry });
//                 const refreshToken = jwt.sign({ id: userId }, refreshSecretKey, { expiresIn: refreshTokenExpiry });
//                 response.id = dbResponse[0].id
//                 response.status = httpStatus.OK;
//                 response.message = `Login Successful`;
//                 response.accessToken = accessToken
//                 response.refreshToken = refreshToken
//             }
//             await setValues(call.request.email, response.refreshToken,  accessTokenExpiryRedis)
//             await setValues(response.refreshToken, response.accessToken, refreshTokenExpiryRedis)

//             return callback(null, response)
//         }

//     } catch (error) {
//         return callback(error);

//     }
// }
// export { login }




