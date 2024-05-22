'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn('OTPs', 'expire_time', {
      type: Sequelize.DATE
    })
    queryInterface.addColumn('OTPs', 'is_verified', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('OTPs', 'expire_time')
    queryInterface.removeColumn('OTPs', 'is_verified')
  }
}
