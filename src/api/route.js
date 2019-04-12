import request from '../utils/request'

export function getRoutes() {
    return request({
        url: 'api/route',
        method: 'get'
    })
}