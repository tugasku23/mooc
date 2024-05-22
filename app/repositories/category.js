const { Category } = require('../models')

const findAllCategory = () => {
  return Category.findAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    }
  })
}

const findByIdCategory = (id) => {
  return Category.findByPk(id)
}

module.exports = {
  findAllCategory,
  findByIdCategory
}
