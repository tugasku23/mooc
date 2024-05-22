const { createCourse, getAllCourse, detailCourse, updateCourse, deleteCourse, getAllCourseAdmin } = require('../course.js')

const courseServices = require('../../services/course.js')

jest.mock('../../services/course.js', () => ({
  createCourseServices: jest.fn(),
  getAllCourseServices: jest.fn(),
  getAllCourseforAdminServices: jest.fn(),
  detailCourseServices: jest.fn(),
  updateCourseServices: jest.fn(),
  deteleCourseServices: jest.fn(),
  getDetailCourse: jest.fn()
}))

jest.mock('../../services/category.js', () => ({
  createCategoryServices: jest.fn()
}))

const course = {
  id: '5ec9d2c2-d8ca-44b2-9691-148ee1abba34',
  name: 'Web Development 101',
  code: 'WD1130',
  level: 'Beginner',
  facilitator: 'Harris s v',
  price: 7999999,
  type: 'premium',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
  telegram_group: 'https://t.me/+CgHkE3Xy4Dk5ZWM9',
  on_boarding: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  introduction_video: 'https://www.youtube.com/watch?v=xvFZjo5PgG0',
  createdAt: '2023-11-24T17:07:16.802Z',
  updatedAt: '2023-11-24T17:07:16.802Z'
}

const user = {
  id: '80c55a44-e778-4b69-bcf4-bf71b1834bf9',
  name: 'John Smith',
  email: 'john.smith@gmail.com',
  role: 'member'
}

describe('#createCourse', () => {
  it('should return 201 response success', async () => {
    const mockRequest = {
      course
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await courseServices.createCourseServices.mockReturnValue(course)
    await createCourse(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(201)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'OK',
      message: 'Create course success',
      data: course
    })
  })

  it('should return 500 response FAIL', async () => {
    const error = new Error('FAIL')

    const mockRequest = {
      course
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await courseServices.createCourseServices.mockReturnValue(Promise.reject(error))
    await createCourse(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(error.statusCode || 500)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'FAIL',
      message: error.message
    })
  })
})

describe('#getAllCourse', () => {
  it('should return 200 response success', async () => {
    const mockRequest = {}

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await courseServices.getAllCourseServices.mockReturnValue([course])
    await getAllCourse(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'OK',
      message: 'Get all courses success',
      data: [course]
    })
  })

  it('should return 500 response FAIL', async () => {
    const error = new Error('FAIL')
    const mockRequest = {}

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await courseServices.getAllCourseServices.mockReturnValue(Promise.reject(error))
    await getAllCourse(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(500)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'FAIL',
      message: error.message
    })
  })
})

describe('#getAllCourseAdmin', () => {
  it('should return 200 response success', async () => {
    const mockRequest = {}

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await courseServices.getAllCourseforAdminServices.mockReturnValue(course)
    await getAllCourseAdmin(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'OK',
      message: 'Get all courses success',
      data: course
    })
  })

  it('should return 500 response FAIL', async () => {
    const error = new Error('FAIL')
    const mockRequest = {}

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await courseServices.getAllCourseforAdminServices.mockReturnValue(Promise.reject(error))
    await getAllCourseAdmin(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(error.statusCode || 500)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'FAIL',
      message: error.message
    })
  })
})

describe('#detailCourse', () => {
  it('should return 200 response success', async () => {
    const mockRequest = {
      course,
      user
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await courseServices.getDetailCourse.mockReturnValue(course)
    await detailCourse(mockRequest, mockResponse)
    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'OK',
      message: 'Get detail course success',
      data: course
    })
  })

  it('should return 500 response FAIL', async () => {
    const error = new Error('FAIL')
    const mockRequest = {
      course,
      user
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await courseServices.getDetailCourse.mockReturnValue(Promise.reject(error))
    await detailCourse(mockRequest, mockResponse)
    expect(mockResponse.status).toHaveBeenCalledWith(500)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'FAIL',
      message: error.message
    })
  })
})

describe('#updateCourse', () => {
  it('should return 201 response success', async () => {
    const mockRequest = {
      course: {
        id: '5ec9d2c2-d8ca-44b2-9691-148ee1abba34'
      },
      body: {
        payload: course
      }
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await courseServices.updateCourseServices.mockReturnValue(course)
    await updateCourse(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(201)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'OK',
      message: 'Update course success',
      data: course
    })
  })

  it('should return 500 response FAIL', async () => {
    const error = new Error('FAIL')

    const mockRequest = {
      params: {
        id: '67bb4c0a-b902-4dfd-a85f-eb829775b202'
      }
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await courseServices.updateCourseServices.mockReturnValue(Promise.reject(error))
    await updateCourse(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(500)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'FAIL',
      message: error.message
    })
  })
})

describe('#deleteCourse', () => {
  it('should return 200 response success', async () => {
    const message = 'Course deleted successfully'

    const mockRequest = {
      course: {
        id: '67bb4c0a-b902-4dfd-a85f-eb829775b202'
      }
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await courseServices.deteleCourseServices.mockReturnValue(message)
    await deleteCourse(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'OK',
      message: 'Detele course success'
    })
  })

  it('should return 500 response FAIL', async () => {
    const error = new Error('FAIL')

    const mockRequest = {
      course: {
        id: '67bb4c0a-b902-4dfd-a85f-eb829775b202'
      }
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await courseServices.deteleCourseServices.mockReturnValue(Promise.reject(error))
    await deleteCourse(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(500)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'FAIL',
      message: error.message
    })
  })
})
