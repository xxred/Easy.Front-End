import { asyncRouterMap, constantRouterMap } from '../../router'
import { getRoutes } from '../../api/route'

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
    const tmp = {
      ...route
    }
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
  const fmRoutes = []
  routes.forEach(router => {
    const component = router.component
    router.component = resolve => {
      // 动态加载组件会编译加载项目所有组件
      // require(['../../' + component + '.vue'], resolve)
    }

    let children = router.children
    if (children && children instanceof Array) {
      children = formatRoutes(children)
    }

    router.children = children

    fmRoutes.push(router)
  })

  return fmRoutes
}

const permission = {
  state: {
    // 将展示在侧边栏的菜单
    routers: constantRouterMap,
    // 将要添加到路由系统中的新路由
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = state.addRouters.concat(routers)
      state.routers = state.routers.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(async resolve => {
        const { roles } = data
        let accessedRouters
        // const routeRes = await requestRoutes()
        // const asyncRouterMap = formatRoutes(routeRes.data)
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
