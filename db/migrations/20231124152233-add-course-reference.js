'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.changeColumn('Courses', 'category_id', {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: 'Categories',
        key: 'id'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('Courses', 'category_id', {})
  }
}
