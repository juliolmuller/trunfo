import Vue from 'vue'
import './plugins/composition-api'
// import './plugins/service-workers'
import App from './components/App'
import vuetify from './plugins/vuetify'
import router from './router'

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount('#app')