'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class OTP extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      OTP.belongsTo(models.User, {
        foreignKey: 'userId'
      })
    }
  }
  OTP.init({
    userId: DataTypes.UUID,
    code: DataTypes.STRING,
    expire_time: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'OTP'
  })
  return OTP
}
