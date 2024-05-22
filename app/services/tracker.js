/* eslint-disable quote-props */
const { create: createReadedModule, findByUserId: findReadedModuleByUserId } = require('../repositories/readedModules')
const { create, findByUserId, findByUserAndCourseId, update } = require('../repositories/tracker')

const { countModuleByChapterId, findById: findModuleById } = require('../repositories/module')
const { findByCourseId } = require('../repositories/chapter')
const { countCourse } = require('../repositories/course')
const { countUser } = require('../repositories/user')

const { ApplicationError } = require('../../error')

const getTotalModulePerChapter = async (chapter_id) => {
  const { count } = await countModuleByChapterId(chapter_id)
  return count
}

const getProgress = async (course_id, total_modules_viewed) => {
  try {
    const chapters = await findByCourseId(course_id)

    const totalModuleRaw = await Promise.all(chapters.map(chapter => getTotalModulePerChapter(chapter.id)))
    const totalModule = totalModuleRaw.reduce((sum, count) => sum + count)

    const progress = Math.floor((total_modules_viewed / totalModule) * 100)

    return progress
  } catch (error) {
    throw new ApplicationError(error.message, 500)
  }
}

const createUserTrackerService = async (user_id, payload) => {
  try {
    const { course_id } = payload

    const isCourseInTrackers = await findByUserAndCourseId({ user_id, course_id })

    if (isCourseInTrackers) {
      throw new ApplicationError('Course is in progress', 400)
    }

    const userTracker = await create({ user_id, ...payload })

    return userTracker
  } catch (error) {
    throw new ApplicationError(error.message, error.statusCode || 500)
  }
}

const getTrackerByUserServices = async (user_id, filter) => {
  try {
    const orderConditions = {
      'Paling Baru': 'DESC',
      'Promo': 'ASC'
    }

    const progressConditionFunc = {
      'Selesai': (progress) => progress === 100,
      'In Progress': (progress) => progress !== 100
    }

    const { filter: orderFilter, ...restFilter } = filter
    const order = orderConditions[orderFilter]

    const userTrakcer = await findByUserId(user_id, order)

    const conditions = (i) => {
      const nameCondition = !restFilter.name || i.course.name?.includes(restFilter.name)
      const categoryCondition = !restFilter.category || restFilter.category?.includes(i.course.category.category)
      const levelCondition = !restFilter.level || restFilter.level?.includes(i.course.level)
      const progressCondition = !restFilter.progress || progressConditionFunc[restFilter.progress](i.progress_course)

      return nameCondition && categoryCondition && levelCondition && progressCondition
    }

    const userTrackerFiltered = userTrakcer.filter(conditions)

    return userTrackerFiltered
  } catch (error) {
    throw new ApplicationError(error.message, 500)
  }
}

const getUserTrackerServices = async (user_id, course_id) => {
  try {
    const userTracker = await findByUserAndCourseId({ user_id, course_id })

    if (!userTracker) {
      throw new ApplicationError('User Tracker not found', 404)
    }

    return userTracker
  } catch (error) {
    throw new ApplicationError(error.message, error.statusCode || 500)
  }
}

const updateUserTrackerServices = async (payload, tracker) => {
  try {
    const { id, total_modules_viewed: totalModulesViewed } = tracker
    const { user_id, course_id, module_id } = payload

    const currentModulesViewedRaw = await findReadedModuleByUserId(user_id)
    const currentModulesViewed = currentModulesViewedRaw.map((readedModules) => readedModules.dataValues.module_id)

    const isModuleExist = await findModuleById(module_id)
    if (!isModuleExist) {
      throw new ApplicationError('Module Id not found', 404)
    }

    const isModulesViewed = currentModulesViewed?.includes(module_id)

    const total_modules_viewed = totalModulesViewed + (isModulesViewed ? 0 : 1)
    const progress_course = await getProgress(course_id, total_modules_viewed)

    // eslint-disable-next-line no-unused-vars
    const [_, updatedUserTracker] = await update({ ...payload, total_modules_viewed, progress_course }, id)
    if (updatedUserTracker && !isModulesViewed) {
      const payload = { user_id, module_id }

      await createReadedModule(payload)
    }

    return updatedUserTracker
  } catch (error) {
    throw new ApplicationError(error.message, error.statusCode || 500)
  }
}

const countTotalDataServices = async () => {
  try {
    const [total_user, total_course, total_premium_course] = await Promise.all([
      countUser(),
      countCourse(),
      countCourse({ type: 'Premium' })
    ])

    const totalData = {
      total_user: total_user.count,
      total_course: total_course.count,
      total_premium_course: total_premium_course.count
    }

    return totalData
  } catch (error) {
    throw new ApplicationError(error.message, 500)
  }
}

module.exports = {
  createUserTrackerService,
  getTrackerByUserServices,
  getUserTrackerServices,
  countTotalDataServices,
  updateUserTrackerServices
}
