const { historyOrderMessage } = require('./index')
const { JSDOM } = require('jsdom')

describe('#historyOrderMessage', () => {
  it('should return html', () => {
    const mockData = {
      nameUser: 'John Doe',
      id: '123456',
      nameCourse: 'JavaScript Basics',
      payment_date: new Date('2023-01-01'),
      price: 49.99
    }

    const { nameUser, id, nameCourse, payment_date, price } = mockData
    const message = historyOrderMessage({ nameUser, id, nameCourse, payment_date, price })

    const dom = new JSDOM(message)
    const document = dom.window.document

    expect(document.querySelector('h2').textContent).toBe('Terima Kasih atas Pembelian Course di Tempat Kami!')
    expect(document.querySelector('p').textContent).toContain(`Salam ${nameUser}`)
  })
})
