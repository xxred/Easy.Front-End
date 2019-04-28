import request from '../utils/request'
import store from '../store'

/* 此模块与store互相依赖，故使用方法返回结果 */
const api = () => store.getters.apiSettings.login

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
    url: api().loginByUsername,
    method: 'get',
    // data,
    params: data
  })
}

export function logout() {
  return request({
    url: api().logout,
    method: 'post'
  })
}

export function getUserInfo() {
  return request({
    url: api().getUserInfo,
    method: 'get'
  })
}
