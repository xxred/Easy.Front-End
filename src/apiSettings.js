const login = {
  loginByUsername: '/api/Account/Login',
  logout: '/api/Account/Logout',
  getUserInfo: '/api/Account/GetUserInfo'
}

const route = {
  getRoutes: '/api/route'
}

export default settings => {
  settings.baseUrl =
  // ''
  'http://localhost:32768/'
  // 'http://localhost:7877'
  settings.login = login
  settings.route = route
  return settings
}
