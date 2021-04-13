import { Application } from '../@types'
import GameService from './Game.service'

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
function configureServices(app: Application) {
  app.use(
    `/${process.env.GAME_SERVICE_NAME}`,
    new GameService(),
  )
}

export default configureServices
