require('dotenv').config()
const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)

io.on('connection', (socket) => {
  console.log('> Novo cliente conectado.')

  socket.on('disconnect', () => {
    console.log('< Cliente desconectado.')
  })
})

http.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`)
})
