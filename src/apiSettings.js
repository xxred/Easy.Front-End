const login = {
  loginByUsername: '/admin/account/login',
  logout: '/admin/account/logout',
  getUserInfo: '/admin/account'
}

export default settings => {
  settings.baseUrl = 'https://localhost:44336'
  settings.login = login
  return settings
}
