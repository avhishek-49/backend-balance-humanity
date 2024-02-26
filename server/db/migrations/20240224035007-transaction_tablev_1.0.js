'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customer_id: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      from_account_number: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      to_account_number: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      mobile_number: {
        type: Sequelize.STRING(15),
        allowNull: true
      },
      amount: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: true
      },
      date: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      is_deleted: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: true
      },
      status: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      transaction_payload: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.BIGINT
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.BIGINT
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('transactions');
  }
};
