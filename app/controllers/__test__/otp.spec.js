const { confirimCodeOtp, sendOtp } = require('../otp.js')

const otpServices = require('../../services/otp.js')
const authServices = require('../../services/auth.js')

jest.mock('../../services/otp.js', () => ({
  confimOtpServices: jest.fn(),
  createOtpServices: jest.fn(),
  updateOtpServices: jest.fn(),
  findOtpCode: jest.fn()
}))

jest.mock('../../services/auth.js', () => ({
  encryptedKode: jest.fn()
}))

jest.mock('nodemailer', () => ({
  createTransport: jest.fn(() => ({
    sendMail: jest.fn(() => Promise.resolve())
  }))
}))

describe('sendOtp function', () => {
  it('Should return 200 with response 200', async () => {
    const message = 'Email sent'
    const mockRequest = {
      user: {
        email: 'test@example.com',
        id: 'user123',
        name: 'John Doe'
      }
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await authServices.encryptedKode.mockReturnValue(message)
    await otpServices.findOtpCode.mockReturnValue(message)
    await otpServices.updateOtpServices.mockReturnValue(message)
    await otpServices.createOtpServices.mockReturnValue(message)
    await sendOtp(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'OK',
      message
    })
  })
})

describe('#confirimCodeOtp', () => {
  it('should return 200 response success', async () => {
    const message = 'Confirm OTP code success'

    const mockRequest = {
      user: {
        id: '67bb4c0a-b902-4dfd-a85f-eb829775b202'
      },
      body: {
        code1: 1,
        code2: 2,
        code3: 3,
        code4: 4,
        code5: 5,
        code6: 6
      }
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await otpServices.confimOtpServices.mockReturnValue(message)
    await confirimCodeOtp(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'OK',
      message
    })
  })

  it('should return 500 response failed', async () => {
    const error = new Error('failed')

    const mockRequest = {
      user: {
        id: '67bb4c0a-b902-4dfd-a85f-eb829775b202'
      },
      body: {
        code1: 1,
        code2: 2,
        code3: 3,
        code4: 4,
        code5: 5,
        code6: 6
      }
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await otpServices.confimOtpServices.mockReturnValue(Promise.reject(error))
    await confirimCodeOtp(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(500)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'FAIL',
      message: error.message
    })
  })
})
