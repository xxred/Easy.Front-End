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
  // 'http://localhost:44336'
  // 'http://localhost:7877'
  'http://ids4.winoble.cn'
  settings.login = login
  settings.route = route
  return settings
}
