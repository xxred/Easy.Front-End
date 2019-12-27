import request from 'src/utils/request'
import store from 'src/store'

/* 此模块与store互相依赖，故使用方法返回结果 */
const api = () => store.getters.apiSettings.route

export function getRoutes() {
  return request({
    url: api().getRoutes,
    method: 'get'
  })
}
