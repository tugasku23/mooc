const { Course, Chapter, Module } = require('../models')

const create = (payload) => {
  return Chapter.create(payload)
}

const findAll = () => {
  return Chapter.findAll({
    include: {
      model: Course,
      as: 'course',
      attributes: ['id', 'name']
    },
    attributes: {
      exclude: ['course_id', 'createdAt', 'updatedAt']
    },
    order: [
      ['index', 'ASC']
    ]
  })
}

const findById = (id) => {
  return Chapter.findByPk(id, {
    include: [
      {
        model: Course,
        as: 'course',
        attributes: ['id', 'name']
      },
      {
        model: Module,
        as: 'modules',
        attributes: ['id', 'index', 'name', 'video', 'duration']
      }
    ],
    attributes: {
      exclude: ['course_id', 'createdAt', 'updatedAt']
    },
    order: [
      [
        { model: Module, as: 'modules' }, 'index', 'ASC'
      ]
    ]
  })
}

const findByCourseId = (course_id) => {
  return Chapter.findAll({
    where: { course_id },
    attributes: {
      exclude: ['course_id', 'createdAt', 'updatedAt']
    },
    order: [
      ['index', 'ASC']
    ]
  })
}

const countChapterByCourseId = (course_id) => {
  return Chapter.findAndCountAll({
    where: { course_id }
  })
}

const updateChapterById = (payload, id) => {
  return Chapter.update(payload, {
    where: { id },
    returning: true
  })
}

const deleteChapterbyId = (id) => {
  return Chapter.destroy({
    where: { id }
  })
}

module.exports = {
  create,
  findAll,
  findById,
  findByCourseId,
  countChapterByCourseId,
  updateChapterById,
  deleteChapterbyId
}
