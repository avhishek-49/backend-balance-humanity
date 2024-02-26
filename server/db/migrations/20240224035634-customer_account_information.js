'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('customer_account_information', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      amount: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false
      },
      customer_id: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      account_number: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      mobile_number: {
        type: Sequelize.STRING(15),
        allowNull: false
      },
      citizenship_number: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true
      },
      created_at: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('customer_account_information');
  }
};
