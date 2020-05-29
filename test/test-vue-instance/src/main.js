import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css' // is it necessary?
// import BootstrapVue from 'bootstrap-vue'
// Vue.use(BootstrapVue)
Vue.config.productionTip = false

Vue.config.errorHandler = function(err/*, vm, info*/) {
  throw err
}
Vue.config.warnHandler = function(err/*, vm, info*/) {
  throw Error(err)
}

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
