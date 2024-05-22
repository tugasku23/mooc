'use strict'
const {
  Model, UUIDV4
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Order.belongsTo(models.Course, {
        foreignKey: 'course_id',
        as: 'course'
      })
      Order.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      })
    }
  }
  Order.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUIDV4
    },
    user_id: DataTypes.UUID,
    course_id: DataTypes.UUID,
    status: DataTypes.ENUM('SUDAH BAYAR', 'BELUM BAYAR'),
    order_method: DataTypes.STRING,
    payment_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Order'
  })
  return Order
}
