const login = {
  loginByUsername: '/api/Account/Login',
  logout: '/api/Account/Logout',
  getUserInfo: '/api/Account/GetUserInfo'
}

const route = {
  getRoutes: '/api/route'
}

export default settings => {
  settings.baseUrl = ''
  // settings.baseUrl = 'https://localhost:44336'

  settings.login = login
  settings.route = route
  return settings
}
