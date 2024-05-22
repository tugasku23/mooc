const { getDetailCategoryServices } = require('../services/category')

const isCategoryExist = async (req, res, next) => {
  try {
    const { category_id: id } = req.body
    await getDetailCategoryServices(id)

    next()
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'FAIL',
      message: error.message
    })
  }
}

module.exports = {
  isCategoryExist
}
