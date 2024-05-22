const { getAllNotifByUser, updateNotif } = require('../notification.js')

const notifServices = require('../../services/notification.js')

jest.mock('../../services/notification.js', () => ({
  findAllNotifServices: jest.fn(),
  updateNotifServices: jest.fn()
}))

const notification = {
  id: '9571cb11-5523-4a0b-85c1-8231d78a783b',
  title: 'Notifikasi',
  message: 'Selamat pembelian course telah berhasil',
  addtional_message: null,
  is_readed: true,
  date_notif: '2023-12-20T15:42:31.898Z'
}

const user = {
  id: '80c55a44-e778-4b69-bcf4-bf71b1834bf9',
  name: 'John Smith',
  email: 'john.smith@gmail.com',
  role: 'member'
}

describe('#getAllNotifByUser', () => {
  it('should return 200 with response success', async () => {
    const mockRequest = {
      user
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await notifServices.findAllNotifServices.mockReturnValue(notification)
    await getAllNotifByUser(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'OK',
      message: 'Get all notifications success',
      data: notification
    })
  })

  it('should return 500 with response FAIL', async () => {
    const error = new Error('FAIL')
    const mockRequest = {
      user
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await notifServices.findAllNotifServices.mockReturnValue(Promise.reject(error))
    await getAllNotifByUser(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(500)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'FAIL',
      message: error.message
    })
  })
})

describe('#updateNotif', () => {
  it('should return 201 response success', async () => {
    const message = 'Notification already readed'
    const mockRequest = {
      notif: {
        id: '80c55a44-e778-4b69-bcf4-bf71b1834bf9'
      }
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await notifServices.updateNotifServices.mockReturnValue(message)
    await updateNotif(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(201)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'OK',
      message
    })
  })

  it('should return 500 response FAIL', async () => {
    const error = new Error('FAIL')
    const mockRequest = {
      notif: {
        id: '80c55a44-e778-4b69-bcf4-bf71b1834bf9'
      }
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await notifServices.updateNotifServices.mockReturnValue(Promise.reject(error))
    await updateNotif(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(500)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'FAIL',
      message: error.message
    })
  })
})
