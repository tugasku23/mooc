/* eslint-disable no-unused-vars */
const express = require('express')

const {
  createChapter,
  getAllChapter,
  getDetailChapter,
  updateChapter,
  deleteChapter
} = require('../controllers/chapter')
const { isCourseExistInPayload } = require('../middleware/course')
const { isChapterExist } = require('../middleware/chapter')
const { isAuthorization, authorization, onlyAdmin } = require('../middleware/auth')

const router = express.Router()

router.get('/chapters/:id', isAuthorization, isChapterExist, getDetailChapter)

router.post('/admin/chapters', authorization, onlyAdmin, isCourseExistInPayload, createChapter)
router.get('/admin/chapters', authorization, onlyAdmin, getAllChapter)
router.put('/admin/chapters/:id', authorization, onlyAdmin, isChapterExist, isCourseExistInPayload, updateChapter)
router.delete('/admin/chapters/:id', authorization, onlyAdmin, isChapterExist, deleteChapter)

module.exports = router
