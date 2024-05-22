const {
  findAllNotifServices,
  updateNotifServices
} = require('../services/notification.js')

const getAllNotifByUser = async (req, res) => {
  try {
    const user = req.user
    const response = await findAllNotifServices(user)

    res.status(200).json({
      status: 'OK',
      message: 'Get all notifications success',
      data: response
    })
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'FAIL',
      message: error.message
    })
  }
}

const updateNotif = async (req, res) => {
  try {
    const { id } = req.notif
    await updateNotifServices(id)

    res.status(201).json({
      status: 'OK',
      message: 'Notification already readed'
    })
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'FAIL',
      message: error.message
    })
  }
}

module.exports = { getAllNotifByUser, updateNotif }
