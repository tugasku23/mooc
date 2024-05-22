'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      User.hasOne(models.OTP, {
        foreignKey: 'userId'
      })
      User.belongsToMany(models.Course, {
        through: 'Order',
        foreignKey: 'user_id'
      })
      User.hasMany(models.Notification, {
        foreignKey: 'user_id'
      })
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    password: DataTypes.STRING,
    country: DataTypes.STRING,
    city: DataTypes.STRING,
    photo: DataTypes.STRING,
    role: DataTypes.ENUM('admin', 'member'),
    tokenResetPassword: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User'
  })
  return User
}
