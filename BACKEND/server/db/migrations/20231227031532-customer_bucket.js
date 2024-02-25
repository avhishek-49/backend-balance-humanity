"use strict";
const {DataTypes} = require("sequelize");

module.exports = {
up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("customer_bucket", {
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
        customer_id: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        bucket_name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
    });

},

down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("customer_bucket");
},
};
