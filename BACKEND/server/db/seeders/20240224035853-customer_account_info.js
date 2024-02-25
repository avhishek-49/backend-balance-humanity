'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('customer_account_information', [
      {
        amount: 5000000.00,
        account_number: '1234567890',
        mobile_number: '9862383579',
        citizenship_number: 'ABC123',
        address: '123 Main St, Anytown, USA',
        email: 'Abishek@yopmail.com',
        created_at: new Date(),
        updated_at: new Date(),
        customer_id:""
      },
      {
        amount: 7500.00,
        account_number: '0987654321',
        mobile_number: '1234567890',
        citizenship_number: 'DEF456',
        address: '456 Elm St, Othertown, USA',
        email: 'customer2@example.com',
        created_at: new Date(),
        updated_at: new Date(),
        customer_id:""
      },
      // Add more seed data as needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('customer_account_information', null, {});
  }
};
