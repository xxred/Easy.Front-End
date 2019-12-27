import Vue from 'vue'
import Storage from 'src/utils/storage'
import Request from 'src/utils/request'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import 'src/styles/index.scss' // global css

import App from 'src/App.vue'
import router from 'src/router'
import store from 'src/store'

import apiSettings from 'src/apiSettings'

// 设置api地址
store.dispatch('setApiSettings', apiSettings)

import 'src/icons' // svgicon
import 'src/errorLog' // error log
import 'src/permission' // permission control

Vue.use(Element, {
  size: Storage.getItem('size') || 'medium' // set element-ui default size
  // i18n: (key, value) => i18n.t(key, value)
})

// 注册全局table基础组件
Vue.component('table-base', () => import('src/views/common/tableBase.vue'))
Vue.component('form-base', () => import('src/views/common/formBase.vue'))

Vue.config.productionTip = false
Vue.prototype.$axios = Request

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
