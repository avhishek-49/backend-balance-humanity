const {mysqlHelper, jwtHelper} = require("../helpers");

module.exports = async (req, res, next) => {
let token;
if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    // Token from bearer authorization header
    token = req.headers.authorization.split(" ")[1];
} else if (req.cookies) {
    // Token from cookie
    token = req.cookies.token;
} else {
    return next(res.send("Access denied, Please provide an access Token"));
}

console.log(token);
// Make sure token exist
if (!token) {
    return next(res.send("Access Denied no token"));
}
try {
    // Verify token
    const decoded = await jwtHelper.verifyJWTToken(token, "your_access_token_secret_key");

    let basequery = `SELECT uuid,email,mobile_number,
case when customer_type= 1 then "NormalCustomer"
when customer_type = 2 then "VictimCustomer"
when customer_type = 3 then "superCustomer" 
end as customer_type 


    FROM db_balance_humanity.balance_humanity_users WHERE uuid = ? `;

    let formatResponse = mysqlHelper.format(basequery, [decoded.data.user]);
    let result = await mysqlHelper.query(formatResponse);

    if (result[0] && result[0].length > 0) {
        req.body.user = result[0][0];
        return next();
    }
} catch (err) {
    return next(res.send("Access Denied. eroor verify`"));
}
};

// authorization : (...roles) => {
//     return (req, res, next) => {
//         if(!roles.includes(req?.user?.customer_type)){
//             return next(
//                 ApiError.unauthorized(`Unauthorized.`)
//             )
//         }
//         next();
//     }
// }

// // Protect routes
// exports.protect =async (req, res, next) => {
//     let token;
//     if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
//         // Token from bearer authorization header
//         token = req.headers.authorization.split(' ')[1];
//     }else if (req.cookies){
//         // Token from cookie
//         token = req.cookies.token;
//     }
//     else {
//         return next(
//             res.send('Access Denied')
//             )
//         }

//         console.log(token)
//     // Make sure token exist
//     if(!token){
//         return next(
//             res.send('Access Denied no token')
//         )
//     }
//     try {
//         // Verify token
//         const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);

//         req.user = decoded.id;
//         next()
//     } catch (err) {
//         return next(
//             res.send('Access Denied. eroor verify`')
//         )
//     }
// };

// // Authorizations
// exports.authorization = (...roles) => {
//     return (req, res, next) => {
//         if(!roles.includes(req?.user?.customer_type)){
//             return next(
//                 ApiError.unauthorized(`Unauthorized.`)
//             )
//         }
//         next();
//     }
// }
