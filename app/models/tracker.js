'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Tracker extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Tracker.belongsTo(models.Course, {
        foreignKey: 'course_id',
        as: 'course'
      })
      Tracker.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      })
    }
  }
  Tracker.init({
    user_id: DataTypes.STRING,
    course_id: DataTypes.STRING,
    last_opened_chapter: DataTypes.INTEGER,
    last_opened_module: DataTypes.INTEGER,
    total_modules_viewed: DataTypes.INTEGER,
    progress_course: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tracker'
  })
  return Tracker
}
