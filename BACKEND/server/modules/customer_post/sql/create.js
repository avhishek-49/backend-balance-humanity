"use strict";

const { mysqlHelper } = require("../../../helpers");
const httpStatus = require("http-status");
const { v4 } = require("uuid");

const createBlogPost = async (body) => {
try {
    const insertObj = {
        uuid: v4(),
        customer_id: body.user.uuid,
        description: body.description,
        image_name: body.image_name,
        created_at: new Date().getTime(),
        updated_at: new Date().getTime(),
    };

    const query = await mysqlHelper.format(`INSERT INTO balance_humanity_blog_post SET ?`, [insertObj]);
    const [result] = await mysqlHelper.query(query);

    if (result && result.affectedRows > 0) {
        return { status: httpStatus.OK, message: "balance_humanity_blog_post successfully created" };
    } else {
        return { status: httpStatus.BAD_REQUEST, message: "Failed to create balance_humanity_blog_post" };
    }
} catch (error) {
    console.error("Error in createBlogPost:", error);
    throw error;
}
};

module.exports = createBlogPost;
