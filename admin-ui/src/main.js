// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import App from './App'
import store from './store'
import router from './router'

Vue.use(VueResource).use(Vuex)

// Vue.http.options.xhr = { withCredentials: true }
// Vue.http.options.emulateJSON = true

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
