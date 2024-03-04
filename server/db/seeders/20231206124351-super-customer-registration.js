"use strict";
const {v4} = require("uuid");
module.exports = {
up: async (queryInterface, Sequelize) => {
    try {
        await queryInterface.sequelize.query(`start transaction;`);

        await queryInterface.bulkDelete("balance_humanity_users", null, {});
        await queryInterface.bulkInsert(
            "balance_humanity_users",
            [
                {
                    id: 1,
                    uuid: v4(),
                    first_name: "Abishek",
                    last_name: "Paudel",
                    email: "avhishekpoudel49@gmail.com",
                    mobile_number: "9862383579",
                    password: "$2b$10$K/F6Qt3.MBFuD/aPejWzbOmPN.9umSEJ3UKBgVhGea.i92xJkr3VS", //Nepal@12345
                    customer_pin: "$2b$10$oLtdqxEj6KEyQKsVfSfAD.X6ZG5IfKB/2jtr2b1X1tYdCbjoqrFAu", // 1127
                    salt: "SUPER_CUSTOMER",
                    is_active: 1,
                    is_delete: 0,
                    customer_type: 3,
                    is_blocked: 0,
                    created_date: new Date().getTime(),
                    created_by: "ABISHEK PAUDEL",
                    created_by: 1,
                    login_date: new Date().getTime(),
                    created_date: new Date().getTime(),
                    district_id:"3",
                    profile_picture:"http://127.0.0.1:9000/imageshumanity/36736717-317d-4fd6-8f6c-474dae3e45ca.jpg"
                },

                {
                    id: 2,
                    uuid: v4(),
                    first_name: "Himal",
                    last_name: "Subedi",
                    email: "Himal@gmail.com",
                    mobile_number: "9898989898",
                    password: "$2b$10$K/F6Qt3.MBFuD/aPejWzbOmPN.9umSEJ3UKBgVhGea.i92xJkr3VS", //Nepal@12345
                    customer_pin: "$2b$10$oLtdqxEj6KEyQKsVfSfAD.X6ZG5IfKB/2jtr2b1X1tYdCbjoqrFAu", // 1127
                    salt: "SUPER_CUSTOMER",
                    is_active: 1,
                    is_delete: 0,
                    customer_type: 2,
                    is_blocked: 0,
                    created_date: new Date().getTime(),
                    created_by: "ABISHEK PAUDEL",
                    created_by: 1,
                    login_date: new Date().getTime(),
                    created_date: new Date().getTime(),
                    district_id:"71",
                    profile_picture:""
                },

                {
                    id: 3,
                    uuid: v4(),
                    first_name: "Gaurav",
                    last_name: "Bhatta",
                    email: "gaurab@gmail.com",
                    mobile_number: "9898989897",
                    password: "$2b$10$K/F6Qt3.MBFuD/aPejWzbOmPN.9umSEJ3UKBgVhGea.i92xJkr3VS", //Nepal@12345
                    customer_pin: "$2b$10$oLtdqxEj6KEyQKsVfSfAD.X6ZG5IfKB/2jtr2b1X1tYdCbjoqrFAu", // 1127
                    salt: "SUPER_CUSTOMER",
                    is_active: 1,
                    is_delete: 0,
                    customer_type: 1,
                    is_blocked: 0,
                    created_date: new Date().getTime(),
                    created_by: "ABISHEK PAUDEL",
                    created_by: 1,
                    login_date: new Date().getTime(),
                    created_date: new Date().getTime(),
                    district_id:"3",
                    profile_picture:""
                },
            ],
            {}
        );
        await queryInterface.sequelize.query(`commit;`);
    } catch (error) {
        console.log(error);
        await queryInterface.sequelize.query(`rollback;`);
    }
    return Promise.resolve();
},

down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("balance_humanity_users", null, {});
},
};
