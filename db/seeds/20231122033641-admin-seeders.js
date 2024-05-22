'use strict'
const bcrypt = require('bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      id: '42dc24e3-d5cb-4bcb-afc6-97c1099ab3a0',
      name: 'admin',
      email: 'admin@gmail.com',
      phone_number: +62833989738,
      password: await bcrypt.hash('admin3214', 10),
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
  }
}
