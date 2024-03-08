'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('balance_humanity_blog_post', 'from_date', {
        type: Sequelize.BIGINT,
        allowNull: true
      }),
      queryInterface.addColumn('balance_humanity_blog_post', 'to_date', {
        type: Sequelize.BIGINT,
        allowNull: true
      }),

    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('balance_humanity_blog_post', 'from_date'),
      queryInterface.removeColumn('balance_humanity_blog_post', 'to_date')
    ]);
  }
};
