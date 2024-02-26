'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('balance_humanity_users', 'profile_picture', {
        type: Sequelize.TEXT,
        allowNull: false
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('balance_humanity_users', 'profile_picture')
    ]);
  }
};
