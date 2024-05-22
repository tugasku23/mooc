'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Module extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Module.belongsTo(models.Chapter, {
        foreignKey: 'chapter_id',
        as: 'chapter'
      })
    }
  }
  Module.init({
    chapter_id: DataTypes.UUID,
    index: DataTypes.INTEGER,
    name: DataTypes.STRING,
    video: DataTypes.STRING,
    duration: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Module'
  })
  return Module
}
