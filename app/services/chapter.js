const { create, findAll, findById, findByCourseId, countChapterByCourseId, updateChapterById, deleteChapterbyId } = require('../repositories/chapter')
const { findByPk: findCourseById, updateCourseRepo } = require('../repositories/course')
const { ApplicationError } = require('../../error')
const { findByUserAndCourseId } = require('../repositories/tracker')

const createChapterService = async (payload) => {
  try {
    const { course_id } = payload
    const { type: courseType, total_chapter: totalChapter } = await findCourseById(course_id)
    const { count: totalChapterByCourse } = await countChapterByCourseId(course_id)

    const total_chapter = totalChapter + 1
    const index = totalChapterByCourse + 1

    const isLockedContition = courseType === 'Premium' && totalChapterByCourse >= 1

    const chapter = await create({ ...payload, index, is_locked: isLockedContition })
    if (chapter) {
      await updateCourseRepo({ total_chapter }, course_id)
    }

    return chapter
  } catch (error) {
    throw new ApplicationError(error.message, 500)
  }
}

const getAllChaptersService = async (queryParams) => {
  try {
    const { course_id, ...filter } = queryParams

    const conditions = (i) => {
      const nameCondition = !filter.name || i.name?.includes(filter.name)

      return nameCondition
    }

    if (course_id) {
      const chapters = await findByCourseId(course_id)
      const chaptersFiltered = chapters.filter(conditions)

      return chaptersFiltered
    }

    const chapters = await findAll()
    const chaptersFiltered = chapters.filter(conditions)

    return chaptersFiltered
  } catch (error) {
    throw new ApplicationError(error.message, 500)
  }
}

const findChapterServices = async (id) => {
  try {
    const chapters = await findById(id)

    if (!chapters) {
      throw new ApplicationError('Chapter id not found', 404)
    }

    return chapters
  } catch (error) {
    throw new ApplicationError(error.message, error.statusCode || 500)
  }
}

const getDetailChapterServices = async (user, chapter) => {
  try {
    if (user) {
      const { is_locked: lockedCondtion, course: { id: course_id } } = chapter
      const { id: user_id } = user

      const tracker = await findByUserAndCourseId({ user_id, course_id })

      if (lockedCondtion && tracker) {
        chapter.is_locked = false
      }

      return chapter
    }

    chapter.is_locked = true

    return chapter
  } catch (error) {
    throw new ApplicationError(error.message, error.statusCode || 500)
  }
}

const updateChapterServices = async (payload, id) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const [_, chapter] = await updateChapterById(payload, id)

    return chapter
  } catch (error) {
    throw new ApplicationError(error.message, 500)
  }
}

const deleteChapterService = async (chapter) => {
  try {
    const { id, total_module_duration, course: { id: course_id } } = chapter

    const { total_duration: totalDuration } = await findCourseById(course_id)
    const total_duration = Number(totalDuration) - Number(total_module_duration)

    const deleted = await deleteChapterbyId(id)
    if (deleted) {
      await updateCourseRepo({ total_duration }, course_id)
    }
  } catch (error) {
    throw new ApplicationError(error.message, 500)
  }
}

module.exports = {
  createChapterService,
  getAllChaptersService,
  findChapterServices,
  getDetailChapterServices,
  updateChapterServices,
  deleteChapterService
}
