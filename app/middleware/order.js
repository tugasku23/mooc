const { detailOrderServices } = require('../services/order')

const isOrderExist = async (req, res, next) => {
  try {
    const { id } = req.params
    const order = await detailOrderServices(id)

    req.order = order
    next()
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'FAIL',
      message: error.message
    })
  }
}

module.exports = {
  isOrderExist
}
