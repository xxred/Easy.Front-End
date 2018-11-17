import Vue from 'vue';
import App from './App.vue';
import router from './router'
import store from './store'
import Cookies from 'js-cookie'
import Element from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css
import './icons' // icon

Vue.use(Element, {
    size: Cookies.get('size') || 'medium', // set element-ui default size
    //i18n: (key, value) => i18n.t(key, value)
})

Vue.config.productionTip = true;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
