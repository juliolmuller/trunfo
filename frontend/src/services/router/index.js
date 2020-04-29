import Vue from 'vue'
import VueRouter from 'vue-router'
import Demo from '@/components/views/Demo'
import Start from '@/components/views/Start'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'start',
      component: Start,
    },
    {
      path: '/criar',
      name: 'create',
      component: Demo,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
})
