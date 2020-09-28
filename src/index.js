import Storage from './utils/storage'
import Request from './utils/request'
import Router from './router'
import Store from './store'

import FormBase from './views/common/formBase.vue'
import TableBase from './views/common/tableBase.vue'
import App from './App.vue'

const components = [
  FormBase, TableBase
]

const install = (Vue, opts = {}) => {
  require('./icons') // svgicon
  require('./errorLog')// error log
  require('./permission') // permission control

  components.forEach(component => {
    Vue.component(component.name, component)
  })

  Vue.prototype.$axios = Request
}

/**
 * 设置api地址
 * @param {*} apiSettings
 */
const setApiSettings = apiSettings => {
  // Store.dispatch('setApiSettings', apiSettings)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  setApiSettings,
  Storage,
  Request,
  Router,
  Store,
  FormBase,
  TableBase,
  App
}
