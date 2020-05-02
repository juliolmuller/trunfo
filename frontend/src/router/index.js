import Vue from 'vue'
import VueRouter from 'vue-router'
import Start from '@/components/start/Start'
import Create from '@/components/creation/Create'
import Invite from '@/components/invitation/Invite'
import Register from '@/components/game/Register'
import Game from '@/components/game/Game'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'hash',
  routes: [
    {
      name: 'start',
      path: '/',
      component: Start,
    }, {
      name: 'create',
      path: '/criar',
      component: Create,
    }, {
      name: 'game',
      path: '/jogo-:game',
      props: true,
      component: Game,
    }, {
      name: 'invite',
      path: '/jogo-:game/convidar',
      props: true,
      component: Invite,
    }, {
      name: 'register',
      path: '/jogo-:game/registrar',
      props: true,
      component: Register,
    }, {
      path: '*',
      redirect: '/',
    },
  ],
})
