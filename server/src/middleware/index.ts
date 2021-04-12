import cors from 'cors'
import express from '@feathersjs/express'
import { Application } from '../@types'

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
function configureMiddleware(app: Application) {
  app.use(cors())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
}

export default configureMiddleware
