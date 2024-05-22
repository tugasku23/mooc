const { createChapter, getAllChapter, getDetailChapter, updateChapter, deleteChapter } = require('../chapter')

const chapterServices = require('../../services/chapter.js')

jest.mock('../../services/chapter.js', () => ({
  createChapterService: jest.fn(),
  getAllChaptersService: jest.fn(),
  getDetailChapterServices: jest.fn(),
  updateChapterServices: jest.fn(),
  deleteChapterService: jest.fn()
}))

const chapter = {
  course_id: '80c55a44-e778-4b69-bcf4-bf71b1834bf9',
  index: 1,
  name: 'chapter lorem ipsum',
  createdAt: new Date(),
  updatedAt: new Date()
}

const user = {
  id: '80c55a44-e778-4b69-bcf4-bf71b1834bf9',
  name: 'John Smith',
  email: 'john.smith@gmail.com',
  role: 'member'
}

describe('#createChapter', () => {
  it('should return 200 response success', async () => {
    const mockRequest = {
      body: {
        chapter
      }
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await chapterServices.createChapterService.mockReturnValue(chapter)
    await createChapter(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(201)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'OK',
      message: 'Create chapter success',
      data: chapter
    })
  })

  it('should return 500 response Failed', async () => {
    const error = new Error('Failed')
    const mockRequest = {
      body: {
        chapter
      }
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await chapterServices.createChapterService.mockReturnValue(Promise.reject(error))
    await createChapter(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(500)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'FAIL',
      message: error.message
    })
  })
})

describe('#getAllChapters', () => {
  it('shouls return 200 response success', async () => {
    const mockRequest = { }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await chapterServices.getAllChaptersService.mockReturnValue([chapter])
    await getAllChapter(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'OK',
      message: 'Get all chapter success',
      data: [chapter]
    })
  })

  it('shouls return 500 response FAIL', async () => {
    const error = new Error('Failed')
    const mockRequest = { }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await chapterServices.getAllChaptersService.mockReturnValue(Promise.reject(error))
    await getAllChapter(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(500)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'FAIL',
      message: error.message
    })
  })
})

describe('#getDetailChapter', () => {
  it('should return 200 response success', async () => {
    const mockRequest = {
      chapter,
      user
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await chapterServices.getDetailChapterServices.mockReturnValue(chapter)
    await getDetailChapter(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'OK',
      message: 'Get detail chapter success',
      data: chapter
    })
  })

  it('should return 500 response FAIL', async () => {
    const error = new Error('FAIL')
    const mockRequest = {
      chapter,
      user
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await chapterServices.getDetailChapterServices.mockReturnValue(Promise.reject(error))
    await getDetailChapter(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(500)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'FAIL',
      message: error.message
    })
  })
})

describe('#updateChapter', () => {
  it('should return 200 response success', async () => {
    const mockRequest = {
      chapter: {
        id: '80c55a44-e778-4b69-bcf4-bf71b1834bf9'
      },
      body: {
        chapter
      }
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await chapterServices.updateChapterServices.mockReturnValue(chapter)
    await updateChapter(mockRequest, mockResponse)
    expect(mockResponse.status).toHaveBeenCalledWith(201)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'OK',
      message: 'Update chapter success',
      data: chapter
    })
  })
  it('should return 500 response FAIL', async () => {
    const error = new Error('FAIL')
    const mockRequest = {
      chapter: {
        id: '80c55a44-e778-4b69-bcf4-bf71b1834bf9'
      },
      body: {
        chapter
      }
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await chapterServices.updateChapterServices.mockReturnValue(Promise.reject(error))
    await updateChapter(mockRequest, mockResponse)
    expect(mockResponse.status).toHaveBeenCalledWith(500)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'FAIL',
      message: error.message
    })
  })
})

describe('#deleteChapter', () => {
  it('should return response 200 with response success', async () => {
    const message = 'Delete chapter success'
    const mockRequest = {
      chapter
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await chapterServices.deleteChapterService.mockReturnValue(message)
    await deleteChapter(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'OK',
      message
    })
  })
  it('should return response 500 with response FAIL', async () => {
    const error = new Error('FAIL')
    const mockRequest = {
      chapter
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await chapterServices.deleteChapterService.mockReturnValue(Promise.reject(error))
    await deleteChapter(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(500)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'FAIL',
      message: error.message
    })
  })
})
