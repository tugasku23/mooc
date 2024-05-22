const { detailUserServices } = require('../services/user.js')

const detailUserMid = async (req, res, next) => {
  try {
    const id = req.user.id
    const user = await detailUserServices(id)
    req.detailUser = user
    next()
  } catch (error) {
    res.status(error.statusCode || 500).json({ status: 'FAIL', message: error.message })
  }
}

module.exports = { detailUserMid }
