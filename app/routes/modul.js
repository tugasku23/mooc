/* eslint-disable no-unused-vars */
const express = require('express')

const {
  createModule,
  getAllModule,
  getDetailModule,
  updateModule,
  deleteModule
} = require('../controllers/module')
const { isChapterExistInPayload } = require('../middleware/chapter')
const { isModuleExist } = require('../middleware/module')
const { authorization, onlyAdmin } = require('../middleware/auth')

const router = express.Router()

// router.get('/modules/:id', isModuleExist, getDetailModule)

router.post('/admin/modules', authorization, onlyAdmin, isChapterExistInPayload, createModule)
router.get('/admin/modules', authorization, onlyAdmin, getAllModule)
router.put('/admin/modules/:id', authorization, onlyAdmin, isModuleExist, isChapterExistInPayload, updateModule)
router.delete('/admin/modules/:id', authorization, onlyAdmin, isModuleExist, deleteModule)

module.exports = router
