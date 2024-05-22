/* eslint-disable quote-props */
const {
  create,
  findByPk,
  findAll,
  findAllforAdmin,
  updateCourseRepo,
  deleteCourseRepo
} = require('../repositories/course.js')
const { findByCourseId, updateChapterById } = require('../repositories/chapter.js')
const { findByUserAndCourseId } = require('../repositories/tracker.js')

const { ApplicationError } = require('../../error')

const createCourseServices = async (argRequest) => {
  try {
    const course = await create(argRequest)
    return course
  } catch (error) {
    throw new ApplicationError(error.message, 500)
  }
}

const getAllCourseServices = async (filter) => {
  try {
    const orderConditions = {
      'Paling Baru': 'DESC',
      'Promo': 'ASC'
    }

    const { filter: orderFilter, ...restFilter } = filter
    const order = orderConditions[orderFilter]

    const courses = await findAll(order)

    const conditions = (i) => {
      const nameCondition = !restFilter.name || i.name?.includes(restFilter.name)
      const categoryCondition = !restFilter.category || restFilter.category?.includes(i.category.category)
      const typeCondition = !restFilter.type || restFilter.type?.includes(i.type)
      const levelCondition = !restFilter.level || restFilter.level?.includes(i.level)

      return nameCondition && categoryCondition && typeCondition && levelCondition
    }

    const courseFiltered = courses.filter(conditions)

    return courseFiltered
  } catch (error) {
    throw new ApplicationError(error.message, 500)
  }
}

const getAllCourseforAdminServices = async (filter) => {
  try {
    const orderConditions = {
      'Paling Baru': 'DESC',
      'Promo': 'ASC'
    }

    const { filter: orderFilter, ...restFilter } = filter
    const order = orderConditions[orderFilter]

    const courses = await findAllforAdmin(order)

    const conditions = (i) => {
      const nameCondition = !restFilter.name || i.name.includes(restFilter.name)
      const categoryCondition = !restFilter.category || restFilter.category.includes(i.category.category)
      const typeCondition = !restFilter.type || restFilter.type.includes(i.type)
      const levelCondition = !restFilter.level || restFilter.level.includes(i.level)

      return nameCondition && categoryCondition && typeCondition && levelCondition
    }

    const courseFiltered = courses.filter(conditions)

    return courseFiltered
  } catch (error) {
    throw new ApplicationError(error.message, 500)
  }
}

const findCourseServices = async (id) => {
  try {
    const course = await findByPk(id)

    if (!course) {
      throw new ApplicationError('Course id not found', 404)
    }

    return course
  } catch (error) {
    throw new ApplicationError(error.message, error.statusCode || 500)
  }
}

const getDetailCourse = async (user, course) => {
  try {
    if (user) {
      const { id: course_id } = course
      const { id: user_id } = user

      const tracker = await findByUserAndCourseId({ user_id, course_id })
      const chapters = await findByCourseId(course_id)

      chapters.map((chapter) => {
        const { is_locked: lockedCondtion } = chapter.dataValues

        if (lockedCondtion && tracker) {
          chapter.dataValues.is_locked = false
        }

        return chapter
      })

      course.dataValues.chapters = chapters

      return course
    }

    const { id: course_id } = course

    const chapters = await findByCourseId(course_id)

    chapters.map((chapter) => {
      chapter.dataValues.is_locked = true

      return chapter
    })

    course.dataValues.chapters = chapters

    return course
  } catch (error) {
    throw new ApplicationError(error.message, error.statusCode || 500)
  }
}

const updateCourseServices = async (argRequest, course) => {
  try {
    const { id, type: typeCurrentCourse } = course
    const { type: typePayloadCourse } = argRequest

    const isSameType = typeCurrentCourse === typePayloadCourse
    const isCurrentPrem = typeCurrentCourse === 'Premium'

    if (!isSameType && isCurrentPrem) {
      const chapters = await findByCourseId(id)

      const rawUpdatedChapters = chapters.map(async (chapter) => {
        const { id } = chapter
        const payload = { is_locked: false }

        await updateChapterById(payload, id)
      })

      await Promise.all(rawUpdatedChapters)
    } else if (!isSameType && !isCurrentPrem) {
      const chapters = await findByCourseId(id)

      const rawUpdatedChapters = chapters.map(async (chapter) => {
        const { id, index } = chapter
        const payload = { is_locked: index >= 2 }

        await updateChapterById(payload, id)
      })

      await Promise.all(rawUpdatedChapters)
    }

    // eslint-disable-next-line no-unused-vars
    const [_, updatedCourse] = await updateCourseRepo(argRequest, id)

    return updatedCourse
  } catch (error) {
    throw new ApplicationError(error.message, 500)
  }
}

const deteleCourseServices = async (id) => {
  try {
    await deleteCourseRepo(id)
  } catch (error) {
    throw new ApplicationError(error.message, 500)
  }
}

module.exports = {
  createCourseServices,
  findCourseServices,
  getDetailCourse,
  getAllCourseServices,
  getAllCourseforAdminServices,
  updateCourseServices,
  deteleCourseServices
}
