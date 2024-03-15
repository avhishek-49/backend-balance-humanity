"use strict";
const {DataTypes} = require("sequelize");

module.exports = {
up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("balance_humanity_kyc", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER(100),
        },
        uuid: {
            type: DataTypes.STRING(36),
            allowNull: false,
            unique: true,
        },
        address: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        citizenship_number: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        relationship: {
            type: DataTypes.STRING(50),
            allowNull: true,
           
        },
        mobile_number: {
            type: DataTypes.STRING(20),
            allowNull: true,
        
        },

        description_of_victim: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        account_number: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        account_name: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        
        proof_image: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },

        is_verified: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false,
        },

        created_at: {
            type: DataTypes.BIGINT,
        },
        updated_at: {
            type: DataTypes.BIGINT,
        },
    });
},

down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("balance_humanity_kyc");
},
};
