'use strict';

module.exports = {
up: (queryInterface, Sequelize) => {
  return queryInterface.createTable('district', {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    uuid: {
      type: Sequelize.STRING(36),
      allowNull: false,
      unique: true
    },
    district_code: {
      type: Sequelize.STRING(10),
    },
    district: {
      type: Sequelize.STRING(60),
    }
  });
},

down: (queryInterface, Sequelize) => {
  return queryInterface.dropTable('district');
}
};
