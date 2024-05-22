const { Chapter, Module } = require('../models')

const create = (payload) => {
  return Module.create(payload)
}

const findAll = () => {
  return Module.findAll({
    include: {
      model: Chapter,
      as: 'chapter',
      attributes: ['id', 'name']
    },
    attributes: {
      exclude: ['chapter_id', 'createdAt', 'updatedAt']
    },
    order: [
      ['index', 'ASC']
    ]
  })
}

const findById = (id) => {
  return Module.findByPk(id, {
    include: {
      model: Chapter,
      as: 'chapter',
      attributes: ['id', 'name']
    },
    attributes: {
      exclude: ['chapter_id', 'createdAt', 'updatedAt']
    },
    order: [
      ['index', 'ASC']
    ]
  })
}

const findByChapterId = (chapter_id) => {
  return Module.findAll({
    where: { chapter_id },
    attributes: {
      exclude: ['chapter_id', 'createdAt', 'updatedAt']
    }
  })
}

const countModuleByChapterId = (chapter_id) => {
  return Module.findAndCountAll({
    where: { chapter_id }
  })
}

const updateModuleById = (payload, id) => {
  return Module.update(payload, {
    where: { id },
    returning: true
  })
}

const deleteModulebyId = (id) => {
  return Module.destroy({
    where: { id }
  })
}

module.exports = {
  create,
  findAll,
  findById,
  findByChapterId,
  countModuleByChapterId,
  updateModuleById,
  deleteModulebyId
}
