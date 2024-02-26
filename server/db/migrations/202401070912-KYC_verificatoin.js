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
            allowNull: false,
        },
        citizenship_number: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        relationship: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        mobile_number: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
        },

        description_of_victim: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        account_number: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        account_name: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },

        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
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
