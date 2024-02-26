"use strict";
const {DataTypes} = require("sequelize");

module.exports = {
up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("balance_humanity_login_sessions", {
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

        jwtToken: {
            type: DataTypes.STRING(104),
            allowNull: false,
            unique: true,
        },

        user_id: {
            type: DataTypes.INTEGER(100),
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        mobile_number: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        customer_pin: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        customer_type: {
            type: DataTypes.INTEGER(20),
            allowNull: false,
        },
        login_date: {
            type: DataTypes.BIGINT,
        },
        created_date: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        created_by: {
            type: DataTypes.STRING(20),
        },
    });
},

down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("balance_humanity_login_sessions");
},
};
