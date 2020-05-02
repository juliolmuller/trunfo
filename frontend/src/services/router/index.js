import Vue from 'vue'
import VueRouter from 'vue-router'
import Start from '@/components/views/Start'
import Create from '@/components/views/Create'
import Invite from '@/components/views/Invite'
import Register from '@/components/views/Register'
import Demo from '@/components/views/Demo'

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
      component: Demo,
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
