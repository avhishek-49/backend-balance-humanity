"use strict";
const {v4} = require("uuid");
module.exports = {
up: async (queryInterface, Sequelize) => {
    try {
        await queryInterface.sequelize.query(`start transaction;`);

        await queryInterface.bulkDelete("balance_humanity_kyc", null, {});
        await queryInterface.bulkInsert(
            "balance_humanity_kyc",
            [
                {
                    id: 1,
                    uuid: v4(),
                    address: "123 Main St",
                    citizenship_number: "1234567890",
                    relationship: "Spouse",
                    mobile_number: "9898989898",
                    description_of_victim: "Victim description 1",
                    account_number: "987654321",
                    account_name: "John Doe",
                    status: true,
                    created_at: Date.now(),
                    updated_at: Date.now(),
                },
                {
                    id: 2,
                    uuid: v4(),
                    address: "456 Oak St",
                    citizenship_number: "0987654321",
                    relationship: "Sibling",
                    mobile_number: "9898929898",
                    description_of_victim: "Victim description 2",
                    account_number: "123456789",
                    account_name: "Jane Smith",
                    status: false,
                    created_at: Date.now(),
                    updated_at: Date.now(),
                },
                {
                    id: 3,
                    uuid: v4(),
                    address: "789 Pine St",
                    citizenship_number: "5678901234",
                    relationship: "Parent",
                    mobile_number: "9898989895",
                    description_of_victim: "Victim description 3",
                    account_number: "654321987",
                    account_name: "Bob Johnson",
                    status: true,
                    created_at: Date.now(),
                    updated_at: Date.now(),
                },
                {
                    id: 4,
                    uuid: v4(),
                    address: "012 Elm St",
                    citizenship_number: "5432109876",
                    relationship: "Friend",
                    mobile_number: "9898949898",
                    description_of_victim: "Victim description 4",
                    account_number: "789012345",
                    account_name: "Emily Davis",
                    status: false,
                    created_at: Date.now(),
                    updated_at: Date.now(),
                },
                {
                    id: 5,
                    uuid: v4(),
                    address: "345 Cedar St",
                    citizenship_number: "6789012345",
                    relationship: "Colleague",
                    mobile_number: "555-8765",
                    description_of_victim: "Victim description 5",
                    account_number: "234567890",
                    account_name: "Alex White",
                    status: true,
                    created_at: Date.now(),
                    updated_at: Date.now(),
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
    return queryInterface.bulkDelete("balance_humanity_kyc", null, {});
},
};
