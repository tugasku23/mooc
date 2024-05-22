const { findNotifByIdServices } = require('../services/notification')

const isNotifExist = async (req, res, next) => {
  try {
    const { id } = req.params
    const notif = await findNotifByIdServices(id)

    req.notif = notif
    next()
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'FAIL',
      message: error.message
    })
  }
}

module.exports = {
  isNotifExist
}
