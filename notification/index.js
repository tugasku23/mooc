const app = require('../app')
const io = require('socket.io').listen(app)

io.on('connection', (socket) => {
  console.log(`User connected ${socket.id}`)
})
