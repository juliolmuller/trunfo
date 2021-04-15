import { Application } from '../@types'
import GameService from './Game.service'

function configureServices(app: Application) {
  const gamesEndpoint = `/${process.env.GAME_SERVICE_NAME}`

  console.log(`• Registering service at "${gamesEndpoint}"`)
  app.use(gamesEndpoint, new GameService())
}

export default configureServices
