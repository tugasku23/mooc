const { createModuleService, getAllModulesService, updateModuleService, deleteModuleService } = require('../services/module.js')

const createModule = async (req, res) => {
  try {
    const module = await createModuleService(req.body)

    res.status(201).json({
      status: 'OK',
      message: 'Create module success',
      data: module
    })
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'FAIL',
      message: error.message
    })
  }
}

const getAllModule = async (req, res) => {
  try {
    const queryParams = req.query
    const modules = await getAllModulesService(queryParams)

    res.status(200).json({
      status: 'OK',
      message: 'Get all modules success',
      data: modules
    })
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'FAIL',
      message: error.message
    })
  }
}

const getDetailModule = async (req, res) => {
  const module = req.module

  res.status(200).json({
    status: 'OK',
    message: 'Get detail module success',
    data: module
  })
}

const updateModule = async (req, res) => {
  try {
    const module = req.module
    const payload = req.body

    const updatedModule = await updateModuleService(payload, module)
    res.status(201).json({
      status: 'OK',
      message: 'Update module success',
      data: updatedModule
    })
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'FAIL',
      message: error.message
    })
  }
}

const deleteModule = async (req, res) => {
  try {
    const module = req.module
    await deleteModuleService(module)

    res.status(200).json({
      status: 'OK',
      message: 'Delete module success'
    })
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'FAIL',
      message: error.message
    })
  }
}

module.exports = {
  createModule,
  getAllModule,
  getDetailModule,
  updateModule,
  deleteModule
}
