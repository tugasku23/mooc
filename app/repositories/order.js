const { Order, Course, User, Category } = require('../models')

const createOrderRepo = (payload) => {
  return Order.create(payload)
}

const findAllOrder = () => {
  return Order.findAll({
    include: [
      {
        model: Course,
        as: 'course',
        attributes: ['id', 'name'],
        include: [
          {
            model: Category,
            as: 'category',
            attributes: ['category']
          }
        ]
      },
      {
        model: User,
        as: 'user',
        attributes: ['id', 'email']
      }
    ],
    attributes: {
      exclude: ['user_id', 'course_id', 'createdAt', 'updatedAt']
    }
  })
}

const findAllOrderByUserId = (user_id) => {
  return Order.findAll({
    where: { user_id },
    include: [
      {
        model: Course,
        as: 'course',
        attributes: ['id', 'name', 'level', 'facilitator', 'total_chapter', 'total_duration'],
        include: [
          {
            model: Category,
            as: 'category',
            attributes: ['category', 'image']
          }
        ]
      },
      {
        model: User,
        as: 'user',
        attributes: ['id', 'email']
      }
    ],
    attributes: {
      exclude: ['user_id', 'course_id', 'createdAt', 'updatedAt']
    }
  })
}

const findByIdOrder = async (id) => {
  return Order.findByPk(id, {
    include: [
      {
        model: Course,
        as: 'course',
        attributes: ['id', 'name', 'price'],
        include: [
          {
            model: Category,
            as: 'category',
            attributes: ['category']
          }
        ]
      },
      {
        model: User,
        as: 'user',
        attributes: ['id', 'email']
      }
    ],
    attributes: {
      exclude: ['user_id', 'course_id']
    }
  })
}

const findByUserAndCourseId = (ids) => {
  return Order.findOne({
    where: { ...ids }
  })
}

const updateOrderRepo = (payload, id) => {
  return Order.update(payload, {
    where: { id },
    returning: true
  })
}

module.exports = {
  createOrderRepo,
  findAllOrder,
  findAllOrderByUserId,
  findByIdOrder,
  findByUserAndCourseId,
  updateOrderRepo
}
