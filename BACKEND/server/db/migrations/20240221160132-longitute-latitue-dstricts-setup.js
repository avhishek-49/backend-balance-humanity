'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('latitude_longitude_district_info', {
      id: {
    
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      name: {
        type: Sequelize.STRING,
        allowNull:true
      },
      latitude: {
        type: Sequelize.STRING,
        allowNull:true
      },
      longitude: {
        type: Sequelize.STRING,
        allowNull:true
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('latitude_longitude_district_info');
  }
};
