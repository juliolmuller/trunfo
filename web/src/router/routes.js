import StartScreen from '@/components/StartScreen'
import NewGameScreen from '@/components/NewGameScreen'
import GameScreen from '@/components/GameScreen'

export default [
  {
    name: 'start',
    path: '/',
    component: StartScreen,
  },
  {
    name: 'create',
    path: '/criar',
    component: NewGameScreen,
  },
  {
    name: 'game',
    path: '/jogo-:gameKey',
    props: true,
    component: GameScreen,
  },
  {
    path: '*',
    redirect: '/',
  },
]
