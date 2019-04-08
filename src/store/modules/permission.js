import { asyncRouterMap, constantRouterMap } from '@/router'
import { getRoutes } from '@/api/route'


// let asyncRouterMap

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
    if (route.meta && route.meta.roles) {
        return roles.some(role => route.meta.roles.includes(role))
    } else {
        return true
    }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(routes, roles) {
    const res = []

    routes.forEach(route => {
        const tmp = { ...route }
        if (hasPermission(roles, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRouter(tmp.children, roles)
            }
            res.push(tmp)
        }
    })

    return res
}

function requestRoutes() {
    return getRoutes()
}

function formatRoutes(routes) {
  let fmRoutes = [];
  routes.forEach(router=> {

    let component = router.component
    router.component = (resolve)=>{
        // require(['@/' + component + '.vue'], resolve) // TODO 这一行导致编译不通过，可能多加载了什么东西
    }
    
    let children = router.children
    if (children && children instanceof Array) {
      children = formatRoutes(children);
    }

    router.children = children
    
    fmRoutes.push(router);
  })

  return fmRoutes;
}

const permission = {
    state: {
        routers: constantRouterMap,
        addRouters: []
    },
    mutations: {
        SET_ROUTERS: (state, routers) => {
            state.addRouters = routers
            state.routers = constantRouterMap.concat(routers)
        }
    },
    actions: {
        GenerateRoutes({ commit }, data) {
            return new Promise(async resolve => {
                const { roles } = data
                let accessedRouters
                // let routeRes = await requestRoutes()
                // asyncRouterMap = formatRoutes(routeRes.data)
                if (roles.includes('admin')) {
                    accessedRouters = asyncRouterMap
                } else {
                    accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
                }
                commit('SET_ROUTERS', accessedRouters)
                resolve()
            })
        }
    }
}

export default permission