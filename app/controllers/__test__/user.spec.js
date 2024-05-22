const { loginAdmin, loginUser, currentUser, updateUser, resetPassword, register, sendLinkPassword } = require('../user.js')
const userServices = require('../../services/user.js')
const authServices = require('../../services/auth.js')
const otpServices = require('../../services/otp.js')

jest.mock('../../services/user.js', () => ({
  registeService: jest.fn(),
  loginAdminSevices: jest.fn(),
  loginUserSevices: jest.fn(),
  detailUserServices: jest.fn(),
  updateUserServices: jest.fn(),
  resetPasswordServices: jest.fn(),
  findUserByEmailServices: jest.fn(),
  updateTokenPasswordServices: jest.fn()
}))

jest.mock('../../services/auth.js', () => ({
  createAccessToken: jest.fn(),
  encryptedKode: jest.fn()
}))

jest.mock('../../services/otp.js', () => ({
  createOtpServices: jest.fn()
}))

jest.mock('nodemailer', () => ({
  createTransport: jest.fn(() => ({
    sendMail: jest.fn(() => Promise.resolve())
  }))
}))

const accessToken = 'accessToken'
const user = [
  {
    name: 'Muzani',
    email: 'muzani@gmail.com',
    phone_number: '83767672368',
    country: 'Indonesia',
    city: 'Cirebon',
    photo: 'image.png'
  }
]
describe('#register', () => {
  it('should register success', async () => {
    const req = {
      body: {
        name: 'John Doe',
        email: 'john@example.com',
        phone_number: '1234567890',
        password: 'password123'
      }
    }

    const res = {
      status: jest.fn(() => res),
      json: jest.fn(() => res)
    }

    // Mock the required data and behavior for external functions
    const hashedOtp = 'hashedOtp'
    await authServices.encryptedKode.mockReturnValue(hashedOtp)
    await userServices.registeService.mockReturnValue('mockedAccessToken')
    authServices.createAccessToken.mockReturnValue('mockedAccessToken')
    await otpServices.createOtpServices.mockReturnValue('mockedAccessToken')
    // Mock transporter sendMail method

    // Simulate the function call
    await register(req, res)

    // Assertions based on the expected behavior
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      status: 'OK',
      message: 'Email sent',
      data: { accessToken: 'mockedAccessToken' }
    })
  })
})

describe('#loginAdmin', () => {
  it('should return 200 response success', async () => {
    const mockRequest = {
      id: 'b9e16c38-2b7b-4115-96a8-ee97bad08688',
      password: 'admin123'
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await userServices.loginAdminSevices.mockReturnValue(accessToken)
    authServices.createAccessToken.mockReturnValue(accessToken)
    await loginAdmin(mockRequest, mockResponse)

    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'OK',
      message: 'Login Success',
      data: {
        accessToken
      }
    })
  })

  it('should return 500 response faild', async () => {
    const error = new Error('Failed')
    const mockRequest = {
      id: 'uuidv4',
      password: 'muzani123'
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await userServices.loginAdminSevices.mockReturnValue(Promise.reject(error))
    authServices.createAccessToken.mockReturnValue(null)
    await loginAdmin(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(500)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'FAIL',
      message: error.message
    })
  })
})

describe('#loginUser', () => {
  it('should return 200 response success', async () => {
    const mockRequest = {
      email: 'muzania@gmail.com',
      password: 'muzani123'
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await userServices.loginUserSevices.mockReturnValue(accessToken)
    authServices.createAccessToken.mockReturnValue(accessToken)
    await loginUser(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'OK',
      message: 'Login Success',
      data: {
        accessToken
      }
    })
  })

  it('should return 500 response faild', async () => {
    const error = new Error('Failed')
    const mockRequest = {
      email: 'muza@gmail.com',
      password: 'muzani123'
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await userServices.loginUserSevices.mockReturnValue(Promise.reject(error))
    authServices.createAccessToken.mockReturnValue(null)
    await loginUser(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(500)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'FAIL',
      message: error.message
    })
  })
})

describe('#currentUser', () => {
  it('should return 200 success get current user', async () => {
    const mockRequest = {
      detailUser: {
        id: '67bb4c0a-b902-4dfd-a85f-eb829775b202',
        name: 'Muzani',
        email: 'muzani@gamil.com',
        phone_number: '+6283767672368',
        password: 'muzani123',
        country: 'Indonesia',
        city: 'Cirebon',
        photo: 'photo.jpg',
        role: 'member'
      }
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await currentUser(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'OK',
      message: 'Get user information success',
      data: mockRequest.detailUser
    })
  })
})

describe('#updateUser', () => {
  it('should return 201 response success', async () => {
    const mockRequest = {
      body: {
        name: 'Muzani',
        email: 'muzani@gmail.com',
        phone_number: '83767672368',
        country: 'Indonesia',
        city: 'Cirebon',
        photo: 'image.png'
      },
      user: {
        id: '67bb4c0a-b902-4dfd-a85f-eb829775b202'
      }
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await userServices.updateUserServices.mockReturnValue([null, user])
    await updateUser(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(201)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'OK',
      message: 'Update user success',
      data: user[0]
    })
  })

  it('should return 500 response faild', async () => {
    const error = new Error('Faild')

    const mockRequest = {
      body: {
        name: 'Muzani',
        email: 'muzani@gmail.com',
        phone_number: '83767672368',
        country: 'Indonesia',
        city: 'Cirebon',
        photo: 'image.png'
      },
      user: {
        id: '67bb4c0a-b902-4dfd-a85f-eb829775b202'
      }
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await userServices.updateUserServices.mockReturnValue(Promise.reject(error))
    await updateUser(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(500)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'FAIL',
      message: error.message
    })
  })
})

describe('#updatePassword', () => {
  it('should return 201 response success', async () => {
    const mockRequest = {
      body: {
        old_password: 'muzani123',
        new_password: 'muzani12345',
        confirm_password: 'muzani12345'
      },
      user: {
        id: '67bb4c0a-b902-4dfd-a85f-eb829775b202'
      }
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await userServices.updateUserServices.mockReturnValue([null, user])
    await updateUser(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(201)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'OK',
      message: 'Update user success',
      data: user[0]
    })
  })

  it('should return 500 response FAIL', async () => {
    const error = new Error('Faild')

    const mockRequest = {
      body: {
        name: 'Muzani',
        email: 'muzani@gmail.com',
        phone_number: '83767672368',
        country: 'Indonesia',
        city: 'Cirebon',
        photo: 'image.png'
      },
      user: {
        id: '67bb4c0a-b902-4dfd-a85f-eb829775b202'
      }
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await userServices.updateUserServices.mockReturnValue(Promise.reject(error))
    await updateUser(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(500)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'FAIL',
      message: error.message
    })
  })
})

describe('#resetPassword', () => {
  it('should return 200 response success', async () => {
    const message = 'Reset Password Success'
    const mockRequest = {
      params: {
        id: '123456789'
      },
      body: {
        new_password: 'muzaniganteng',
        confirm_password: 'muzaniganteng'
      }
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await userServices.resetPasswordServices.mockReturnValue(message)
    await resetPassword(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'OK',
      message
    })
  })

  it('should return 500 response failed', async () => {
    const error = new Error('failed')
    const mockRequest = {
      params: {
        id: '123456789'
      },
      body: {
        new_password: 'muzaniganteng',
        confirm_password: 'muzaniganteng'
      }
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await userServices.resetPasswordServices.mockReturnValue(Promise.reject(error))
    await resetPassword(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(500)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'FAIL',
      message: error.message
    })
  })
})

describe('#SendLinkPassword', () => {
  it('should response 200 with response success', async () => {
    const message = 'Email Sent'
    const mockRequest = {
      body: {
        email: 'test@example.com'
      }
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await userServices.findUserByEmailServices.mockReturnValue(message)
    await userServices.updateTokenPasswordServices.mockReturnValue(message)
    await sendLinkPassword(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'OK',
      message
    })
  })
})
