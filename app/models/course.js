'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Course.hasMany(models.Chapter, {
        foreignKey: 'course_id',
        as: 'chapters'
      })
      Course.belongsTo(models.Category, {
        foreignKey: 'category_id',
        as: 'category'
      })
      Course.belongsToMany(models.User, {
        through: 'Order',
        foreignKey: 'course_id'
      })
    }
  }
  Course.init({
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    level: DataTypes.ENUM('Beginner', 'Intermediate', 'Advanced'),
    category_id: DataTypes.UUID,
    facilitator: DataTypes.STRING,
    price: DataTypes.INTEGER,
    type: DataTypes.ENUM('Premium', 'Free'),
    description: DataTypes.TEXT,
    telegram_group: DataTypes.STRING,
    on_boarding: DataTypes.TEXT,
    introduction_video: DataTypes.STRING,
    total_chapter: DataTypes.INTEGER,
    total_duration: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Course'
  })
  return Course
}
