import Vue from 'vue'
import Vuex from 'vuex'
import apiSettings from 'src/store/modules/apiSettings'
import app from 'src/store/modules/app'
import errorLog from 'src/store/modules/errorLog'
import permission from 'src/store/modules/permission'
import tagsView from 'src/store/modules/tagsView'
import user from 'src/store/modules/user'
import getters from 'src/store/getters'

Vue.use(Vuex)

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
