const login = {
  loginByUsername: '/admin/account/login',
  logout: '/admin/account/logout',
  getUserInfo: '/admin/account'
}

const route = {
  getRoutes: '/api/route'
}

export default settings => {
  settings.baseUrl = 'https://localhost:44336'

  settings.login = login
  settings.route = route
  return settings
}
