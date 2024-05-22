const express = require('express')

const {
  createCourse,
  detailCourse,
  getAllCourse,
  getAllCourseAdmin,
  updateCourse, deleteCourse
} = require('../controllers/course.js')
const { isCategoryExist } = require('../middleware/category.js')
const { isCourseExist } = require('../middleware/course.js')
const { authorization, onlyAdmin, isAuthorization } = require('../middleware/auth.js')

const router = express.Router()

router.get('/courses', getAllCourse)
router.get('/courses/:id', isAuthorization, isCourseExist, detailCourse)

router.post('/admin/courses', authorization, onlyAdmin, isCategoryExist, createCourse)
router.get('/admin/courses', authorization, onlyAdmin, getAllCourseAdmin)
router.put('/admin/courses/:id', authorization, onlyAdmin, isCourseExist, isCategoryExist, updateCourse)
router.delete('/admin/courses/:id', authorization, onlyAdmin, isCourseExist, deleteCourse)

module.exports = router
