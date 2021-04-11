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
    path: '/jogo-:gameKey',
    props: true,
    component: GameScreen,
  },
  {
    name: 'invite',
    path: '/jogo-:gameKey/convidar',
    props: true,
    component: WaitingAreaScreen,
  },
  {
    name: 'register',
    path: '/jogo-:gameKey/registrar',
    props: true,
    component: NewPlayerScreen,
  },
  {
    path: '*',
    redirect: '/',
  },
]
