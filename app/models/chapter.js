'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Chapter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Chapter.hasMany(models.Module, {
        foreignKey: 'chapter_id',
        as: 'modules'
      })
      Chapter.belongsTo(models.Course, {
        foreignKey: 'course_id',
        as: 'course'
      })
    }
  }
  Chapter.init({
    course_id: DataTypes.UUID,
    index: DataTypes.INTEGER,
    name: DataTypes.STRING,
    total_module_duration: DataTypes.INTEGER,
    is_locked: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Chapter'
  })
  return Chapter
}
