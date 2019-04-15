/*
 * api路径所有配置，包括所有请求路径和跟url
 */

import deafultApiSettings from '../../apiSettings.js'

const apiSettings = {
  state: {
    settings: {
      baseUrl: ''
    }
  },
  mutations: {
    Set_ApiSettings: (state, apiSettings) => {
      if (typeof apiSettings === 'function') {
        state.settings = apiSettings(state.settings)
      } else {
        state.settings = apiSettings
      }
    }
  },
  actions: {
    /** 设置api设置 */
    setApiSettings({ commit }, apiSettings) {
      commit('Set_ApiSettings', apiSettings)
    }
  }
}

apiSettings.state.settings = deafultApiSettings(apiSettings.state.settings)

export default apiSettings
