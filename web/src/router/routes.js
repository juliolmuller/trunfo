import StartScreen from '@/components/StartScreen'
import NewGameScreen from '@/components/NewGameScreen'
import WaitingAreaScreen from '@/components/WaitingAreaScreen'
import NewPlayerScreen from '@/components/NewPlayerScreen'
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
    path: '/jogo-:game',
    props: true,
    component: GameScreen,
  },
  {
    name: 'invite',
    path: '/jogo-:game/convidar',
    props: true,
    component: WaitingAreaScreen,
  },
  {
    name: 'register',
    path: '/jogo-:game/registrar',
    props: true,
    component: NewPlayerScreen,
  },
  {
    path: '*',
    redirect: '/',
  },
]
