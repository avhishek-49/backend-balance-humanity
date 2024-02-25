"use strict";
const httpStatus = require("http-status");

module.exports = {
    createUpdateValidator: (call, callback) => {
        let response = {status: httpStatus.BAD_REQUEST, message: "Validation Failed"};
        try {
            if (!call.firstName) {
                response.message = "firstName is required";
            } else if (!call.lastName) {
                response.message = "lastName is required";
            } else if (!call.email || !isValidEmail(call.email)) {
                response.message = "Invalid email format";
            } else if (!call.mobileNumber || !isValidMobileNumber(call.mobileNumber)) {
                response.message = "Invalid mobileNumber format";
            } else if (!call.password) {
                response.message = "password is required";
            }
            else {
                response.status = httpStatus.OK;
                response.message = "Validation Success";
            }
            return response;
        } catch (err) {
            throw err;
        }
    },

    forgotPassword: (call, callback) => {
        let response = {status: httpStatus.BAD_REQUEST, message: "Validation Failed"};
        try {
            if (!call.mobileNumber || !isValidMobileNumber(call.mobileNumber)) {
                response.message = "Invalid mobileNumber format";
            } else if (!call.password) {
                response.message = "password is required";
            } else {
                response.status = httpStatus.OK;
                response.message = "Validation Success";
            }
            return response;
        } catch (err) {
            throw err;
        }
    },

    loginCustomer: (call, callback) => {
        let response = {status: httpStatus.BAD_REQUEST, message: "Validation Failed"};
        try {
            if (!call.mobileNumber || !isValidMobileNumber(call.mobileNumber)) {
                response.message = "Invalid mobileNumber format";
            } else if (!call.password) {
                response.message = "password is required";
            } else {
                response.status = httpStatus.OK;
                response.message = "Validation Success";
            }
            return response;
        } catch (err) {
            throw err;
        }
    },
};

function isValidEmail(email) {
    // Use a regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidMobileNumber(mobileNumber) {
    // Use a regular expression to validate 10-digit mobile number
    const mobileNumberRegex = /^\d{10}$/;
    return mobileNumberRegex.test(mobileNumber);
}
