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
    // 'http://ids4.hebinghong.com'
    'http://ids4.winoble.cn'

  // 'http://localhost:44336'
  settings.login = login
  settings.route = route
  return settings
}
