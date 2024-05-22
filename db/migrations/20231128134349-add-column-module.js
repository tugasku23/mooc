'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn('Modules', 'chapter_id', {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: 'Chapters',
        key: 'id'
      },
      onDelete: 'CASCADE'
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('Modules', 'chapter_id')
  }
}
