'use strict';
const { v4: uuidv4 } = require('uuid'); // Importing v4 function from uuid module

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('bank_list_nepal', [
      {
        id: 1,
        uuid: uuidv4(),
        bank_code: '001',
        bank_name: 'Nepal Investment Bank'
      },
      {
        id: 2,
        uuid: uuidv4(),
        bank_code: '002',
        bank_name: 'Nabil Bank'
      },
      {
        id: 3,
        uuid: uuidv4(),
        bank_code: '003',
        bank_name: 'Himalayan Bank'
      },
      {
        id: 4,
        uuid: uuidv4(),
        bank_code: '004',
        bank_name: 'Global IME Bank'
      },
      {
        id: 5,
        uuid: uuidv4(),
        bank_code: '005',
        bank_name: 'NIC Asia Bank'
      },
      {
        id: 6,
        uuid: uuidv4(),
        bank_code: '006',
        bank_name: 'NMB Bank'
      },
      {
        id: 7,
        uuid: uuidv4(),
        bank_code: '007',
        bank_name: 'Prabhu Bank'
      },
      {
        id: 8,
        uuid: uuidv4(),
        bank_code: '008',
        bank_name: 'Sidhartha Bank'
      },
      // Add more banks as needed
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('bank_list_nepal', null, {});
  }
};
