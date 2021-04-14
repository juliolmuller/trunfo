import 'dotenv/config' // eslint-disable-line import/no-internal-modules
import logger from './logger'
import app from './app'

const port = process.env.PORT
const server = app.listen(port)

server.on('listening', () => {
  console.log(`Server running on http://localhost:${process.env.PORT}/`)
})

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at: Promise ', promise, reason)
})
