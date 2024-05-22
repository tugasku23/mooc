const { Notification } = require('../models')

const createNotifRepo = (payload) => {
  return Notification.create(payload)
}

const findAllNotifByUser = (user_id) => {
  return Notification.findAll({
    where: { user_id },
    attributes: {
      exclude: ['user_id', 'updatedAt']
    }
  })
}

const findById = (id) => {
  return Notification.findByPk(id)
}

const updateNotifRepo = (id) => {
  return Notification.update(
    { is_readed: true },
    {
      where: { id }, returning: true
    }
  )
}

module.exports = {
  createNotifRepo,
  findAllNotifByUser,
  findById,
  updateNotifRepo
}
