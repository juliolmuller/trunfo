import Vue from 'vue'
import VueRouter from 'vue-router'
import Demo from '@/components/views/Demo'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: Demo,
    },
  ],
})
