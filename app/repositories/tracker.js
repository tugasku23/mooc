const { Tracker, Course, Category } = require('../models')

const create = (payload) => {
  return Tracker.create(payload)
}

const findByUserId = (user_id, order) => {
  return Tracker.findAll({
    where: { user_id },
    include: [
      {
        model: Course,
        as: 'course',
        attributes: {
          exclude: [
            'code',
            'category_id',
            'description',
            'telegram_group',
            'on_boarding',
            'introduction_video',
            'createdAt',
            'updatedAt'
          ]
        },
        include: [
          {
            model: Category,
            as: 'category',
            attributes: ['category', 'image']
          }
        ]
      }
    ],
    attributes: {
      exclude: ['user_id', 'course_id', 'last_opened_chapter', 'last_opened_module', 'total_modules_viewed', 'modules_viewed', 'createdAt', 'updatedAt']
    },
    order: [
      ['createdAt', order || 'DESC']
    ]
  })
}

const findByUserAndCourseId = (ids) => {
  return Tracker.findOne({
    where: { ...ids },
    attributes: {
      exclude: ['user_id', 'course_id', 'createdAt', 'updatedAt']
    }
  })
}

const update = (payload, id) => {
  return Tracker.update(payload, {
    where: { id },
    returning: true
  })
}

module.exports = {
  create,
  findByUserId,
  findByUserAndCourseId,
  update
}
