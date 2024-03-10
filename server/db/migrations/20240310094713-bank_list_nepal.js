'use strict';

module.exports = {
up: (queryInterface, Sequelize) => {
  return queryInterface.createTable('bank_list_nepal', {
    id: {
      type: Sequelize.INTEGER(11)
    },
    uuid: {
      type: Sequelize.STRING(36),

  
    },
    bank_code: {
      type: Sequelize.STRING(10),
    },
    bank_name: {
      type: Sequelize.STRING(60),
    }
  });
},

down: (queryInterface, Sequelize) => {
  return queryInterface.dropTable('bank_list_nepal');
}
};
