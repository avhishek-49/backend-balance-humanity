// Authorizations
module.exports = (...roles) => {
return (req, res, next) => {
    if (!roles[0].includes(req?.body?.user?.customer_type)) {
        return next(res.status(400).send("Unauthorized role"));
    }
    next();
};
};
