import Storage from 'src/utils/storage'

const app = {
  state: {
    sidebar: {
      opened: !+Storage.getItem('sidebarStatus'),
      withoutAnimation: false
    },
    device: 'desktop',
    language: Storage.getItem('language') || 'en',
    size: Storage.getItem('size') || 'medium',
    // baseUrl: "https://localhost:44336"
    baseUrl: ''
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Storage.setItem('sidebarStatus', 1)
      } else {
        Storage.setItem('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Storage.setItem('sidebarStatus', 1)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    SET_LANGUAGE: (state, language) => {
      state.language = language
      Storage.setItem('language', language)
    },
    SET_SIZE: (state, size) => {
      state.size = size
      Storage.setItem('size', size)
    }
  },
  actions: {
    toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    closeSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    toggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language)
    },
    setSize({ commit }, size) {
      commit('SET_SIZE', size)
    }
  }
}

export default app
