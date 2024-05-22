const {
  createCourseServices,
  getAllCourseServices,
  getAllCourseforAdminServices,
  getDetailCourse,
  updateCourseServices,
  deteleCourseServices
} = require('../services/course.js')

const createCourse = async (req, res) => {
  try {
    const response = await createCourseServices(req.body)

    res.status(201).json({
      status: 'OK',
      message: 'Create course success',
      data: response
    })
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'FAIL',
      message: error.message
    })
  }
}

const getAllCourse = async (req, res) => {
  try {
    const filter = req.query
    const response = await getAllCourseServices(filter)

    res.status(200).json({
      status: 'OK',
      message: 'Get all courses success',
      data: response
    })
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'FAIL',
      message: error.message
    })
  }
}

const getAllCourseAdmin = async (req, res) => {
  try {
    const filter = req.query
    const response = await getAllCourseforAdminServices(filter)

    res.status(200).json({
      status: 'OK',
      message: 'Get all courses success',
      data: response
    })
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'FAIL',
      message: error.message
    })
  }
}

const detailCourse = async (req, res) => {
  try {
    const user = req.user
    const course = req.course

    const detailCourse = await getDetailCourse(user, course)

    res.status(200).json({
      status: 'OK',
      message: 'Get detail course success',
      data: detailCourse
    })
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'FAIL',
      message: error.message
    })
  }
}

const updateCourse = async (req, res) => {
  try {
    const payload = req.body
    const course = req.course

    const rupdatedCourse = await updateCourseServices(payload, course)

    res.status(201).json({
      status: 'OK',
      message: 'Update course success',
      data: rupdatedCourse
    })
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'FAIL',
      message: error.message
    })
  }
}

const deleteCourse = async (req, res) => {
  try {
    const { id } = req.course
    await deteleCourseServices(id)

    res.status(200).json({
      status: 'OK',
      message: 'Detele course success'
    })
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'FAIL',
      message: error.message
    })
  }
}

module.exports = {
  createCourse,
  detailCourse,
  getAllCourse,
  getAllCourseAdmin,
  updateCourse,
  deleteCourse
}
