const { findAllCategory, findByIdCategory } = require('../repositories/category.js')
const { ApplicationError } = require('../../error')

const getAllCategoryServices = async () => {
  try {
    const categories = await findAllCategory()
    return categories
  } catch (error) {
    throw new ApplicationError(error.message, 500)
  }
}

const getDetailCategoryServices = async (id) => {
  try {
    const category = await findByIdCategory(id)

    if (!category) {
      throw new ApplicationError('Category id not found', 404)
    }

    return category
  } catch (error) {
    throw new ApplicationError(error.message, error.statusCode || 500)
  }
}

module.exports = { getAllCategoryServices, getDetailCategoryServices }
