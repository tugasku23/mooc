const { getDetailModuleService } = require('../services/module')

const isModuleExist = async (req, res, next) => {
  try {
    const { id } = req.params
    const module = await getDetailModuleService(id)

    req.module = module
    next()
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'FAIL',
      message: error.message
    })
  }
}

module.exports = {
  isModuleExist
}
