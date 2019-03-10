import request from '@/utils/request'

export function loginByUsername(username, password) {
  let data = new FormData();
  data.append("username", username);
  data.append("password", password);
  return request({
    url: '/Admin/Account/Login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/admin/account/logout',
    method: 'post'
  })
}

export function getUserInfo() {
  return request({
    url: '/admin/account',
    method: 'get'
  })
}