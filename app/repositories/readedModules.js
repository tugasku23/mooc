const { Readed_Modules } = require('../models')

const create = (payload) => {
  return Readed_Modules.create(payload)
}

const findByUserId = (user_id) => {
  return Readed_Modules.findAll({
    where: { user_id },
    attributes: {
      exclude: ['id', 'user_id', 'createdAt', 'updatedAt']
    }
  })
}

module.exports = { create, findByUserId }
