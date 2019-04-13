const login = {
  loginByUsername: '/admin/account/login',
  logout: '/admin/account/logout',
  getUserInfo: '/admin/account'
}

export default (settings) => {
  settings.baseUrl = ''
  settings.login = login
  return settings
}
