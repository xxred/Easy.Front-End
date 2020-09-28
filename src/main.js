import Vue from 'vue'
// import VueRouter from 'vue-router'
// import Vuex from 'vuex'
// import Element from 'element-ui'
import EasyFE from './index'
import apiSettings from './apiSettings'

/* A modern alternative to CSS resets */
import 'normalize.css/normalize.css'
/* element-ui */
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.scss'

// Vue.use(VueRouter)
// Vue.use(Vuex)

const router = EasyFE.Router
const store = EasyFE.Store
const App = EasyFE.App
// const Storage = EasyFE.Storage

// Vue.use(Element, {
//   size: Storage.getItem('size') || 'medium' // set element-ui default size
//   // i18n: (key, value) => i18n.t(key, value)
// })
Vue.use(EasyFE)

EasyFE.setApiSettings(apiSettings)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
