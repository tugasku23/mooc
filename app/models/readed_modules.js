'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Readed_Modules extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Readed_Modules.belongsTo(models.User, {
        foreignKey: 'user_id'
      })
      Readed_Modules.belongsTo(models.Module, {
        foreignKey: 'module_id'
      })
    }
  }
  Readed_Modules.init({
    user_id: DataTypes.STRING,
    module_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Readed_Modules'
  })
  return Readed_Modules
}
