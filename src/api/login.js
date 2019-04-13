import request from '../utils/request'
import store from '../store'

/* 此模块与store互相依赖，故使用方法返回结果 */
const login = () => store.getters.apiSettings.login

export function loginByUsername(username, password) {
  // let data = new FormData();
  // data.append("username", username);
  // data.append("password", password);
  // 改为get
  const data = {
    username,
    password
  }

  return request({
    url: login().loginByUsername,
    method: 'get',
    // data,
    params: data
  })
}

export function logout() {
  return request({
    url: login().logout,
    method: 'post'
  })
}

export function getUserInfo() {
  return request({
    url: login().getUserInfo,
    method: 'get'
  })
}
