import Vue from 'vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './plugins/composition-api'
import './plugins/service-workers'
import App from './components/App'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app')
