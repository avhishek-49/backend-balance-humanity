"use strict";
const {DataTypes} = require("sequelize");

module.exports = {
up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("balance_humanity_blog_post", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER(255),
        },
        customer_id:{
            type:DataTypes.STRING(50),
            allowNull:false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        image_minio_url:{
            type: DataTypes.TEXT,
            allowNull: true,
        },
        
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        is_deleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        district_name: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        remarks: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },


        created_date: {
            type: DataTypes.BIGINT,
        },
        updated_at: {
            type: DataTypes.BIGINT,
        },
    });
},

down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("balance_humanity_blog_post");
},
};

