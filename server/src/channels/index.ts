import '@feathersjs/transport-commons'
import { HookContext } from '@feathersjs/feathers'
import { Application } from '../@types'

function configureChannels(app: Application) {
  if (typeof app.channel !== 'function') {
    // If no real-time functionality has been configured just return
    return
  }

  app.on('connection', (connection: any): void => {
    app.channel('everyone').join(connection)
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  app.publish((data: any, hook: HookContext) => {
    return app.channel('everyone')
  })
}

export default configureChannels
