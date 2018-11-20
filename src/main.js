import Vue from 'vue';

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App.vue';
import router from './router'
import store from './store'

import './icons' // svgicon
import './errorLog' // error log
import './permission' // permission control

// import * as filters from './filters' // global filters

Vue.use(Element, {
    size: Cookies.get('size') || 'medium', // set element-ui default size
    //i18n: (key, value) => i18n.t(key, value)
})

// // register global utility filters.
// Object.keys(filters).forEach(key => {
//     Vue.filter(key, filters[key])
// })

Vue.config.productionTip = true;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
