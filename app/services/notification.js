const { findAllNotifByUser, findById, updateNotifRepo } = require('../repositories/notification.js')
const { ApplicationError } = require('../../error')

const findAllNotifServices = async (user) => {
  try {
    const { id: user_id } = user
    const notif = await findAllNotifByUser(user_id)

    return notif
  } catch (error) {
    throw new ApplicationError(error.message, error.statusCode || 500)
  }
}

const findNotifByIdServices = async (id) => {
  try {
    const notif = await findById(id)
    if (!notif) {
      throw new ApplicationError('Notification id not found', 404)
    }

    return notif
  } catch (error) {
    throw new ApplicationError(error.message, error.statusCode || 500)
  }
}

const updateNotifServices = async (id) => {
  try {
    const notif = await updateNotifRepo(id)

    return notif
  } catch (error) {
    throw new ApplicationError(error.message, 500)
  }
}

module.exports = { findAllNotifServices, findNotifByIdServices, updateNotifServices }
