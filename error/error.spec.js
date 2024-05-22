const { ApplicationError } = require('./index.js')

describe('#ApplicationError', () => {
  it('should throw message error', () => {
    const error = new ApplicationError('application error', 500)

    expect(error).toHaveProperty('message', 'application error')
    expect(error).toHaveProperty('statusCode', 500)
  })
})
