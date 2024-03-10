'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('latitude_longitude_district_info', {
      id: {
        type: Sequelize.BIGINT
      },
      name: {
        type: Sequelize.STRING,
       
      },
      latitude: {
        type: Sequelize.STRING,
      
      },
      longitude: {
        type: Sequelize.STRING,

      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('latitude_longitude_district_info');
  }
};
