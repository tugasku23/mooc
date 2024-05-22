'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn('Courses', 'telegram_group', {
      type: Sequelize.STRING,
      allowNull: false
    })
    queryInterface.addColumn('Courses', 'on_boarding', {
      type: Sequelize.TEXT,
      allowNull: false
    })
    queryInterface.addColumn('Courses', 'introduction_video', {
      type: Sequelize.STRING,
      allowNull: false
    })
    queryInterface.addColumn('Courses', 'total_chapter', {
      type: Sequelize.INTEGER,
      defaultValue: 0
    })
    queryInterface.addColumn('Courses', 'total_duration', {
      type: Sequelize.INTEGER,
      defaultValue: 0
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('Courses', 'telegram_group')
    queryInterface.removeColumn('Courses', 'on_boarding')
    queryInterface.removeColumn('Courses', 'introduction_video')
    queryInterface.removeColumn('Courses', 'total_chapter')
    queryInterface.removeColumn('Courses', 'total_duration')
  }
}
