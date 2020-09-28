// import Vue from 'vue'
// import Vuex from 'vuex'
import apiSettings from './modules/apiSettings'
import app from './modules/app'
import errorLog from './modules/errorLog'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import user from './modules/user'
import getters from './getters'

const store = new Vuex.Store({
  modules: {
    apiSettings,
    app,
    errorLog,
    permission,
    tagsView,
    user
  },
  getters
})

export default store
