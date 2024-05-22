'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn('Chapters', 'total_module_duration', {
      type: Sequelize.INTEGER,
      defaultValue: 0
    })
  },
  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('Chapters', 'total_module_duration')
  }

}
