import '@feathersjs/transport-commons'
import { HookContext } from '@feathersjs/feathers'
import { Application } from '../@types'

function configureChannels(app: Application) {
  if (typeof app.channel !== 'function') {
    // If no real-time functionality has been configured just return
    return
  }

  app.on('connection', (connection: any): void => {
    // On a new real-time connection, add it to the anonymous channel
    app.channel('anonymous').join(connection)
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  app.publish((data: any, hook: HookContext) => {
    // Here you can add event publishers to channels set up in `channels.ts`
    // To publish only for a specific event use `app.publish(eventname, () => {})`

    console.log('Publishing all events to all authenticated users. See `channels.ts` and https://docs.feathersjs.com/api/channels.html for more information.'); // eslint-disable-line

    // e.g. to publish all service events to all authenticated users use
    return app.channel('authenticated')
  })

  // Here you can also add service specific event publishers
  // e.g. the publish the `users` service `created` event to the `admins` channel
  // app.service('users').publish('created', () => app.channel('admins'));

  // With the userid and email organization from above you can easily select involved users
  // app.service('messages').publish(() => {
  //   return [
  //     app.channel(`userIds/${data.createdBy}`),
  //     app.channel(`emails/${data.recipientEmail}`)
  //   ];
  // })
}

export default configureChannels