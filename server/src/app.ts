import feathers, { HookContext as FeathersHookContext } from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio'
import express from '@feathersjs/express'

import { Application } from './@types'
import logger from './logger'
import middleware from './middleware'
import services from './services'
import channels from './channels'
import appHooks from './hooks'

type HookContext<T = any> = {
  app: Application
} & FeathersHookContext<T>

const app: Application = express(feathers())

app.configure(socketio())
app.configure(express.rest())
app.configure(middleware)
app.configure(services)
app.configure(channels)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.notFound())
app.use(express.errorHandler({ logger } as any))

app.hooks(appHooks)

export {
  app as default,
  HookContext,
}
