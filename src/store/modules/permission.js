import { asyncRouterMap, constantRouterMap } from '../../router'
import { getRoutes } from '../../api/route'

// 添加/编辑页的路由，不需要加到菜单显示
const addRouters = []

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
    if (router.component) {
      const component = router.component
      router.component = resolve => {
        // 动态加载组件会编译加载项目所有组件
        // 这里不能全写变量，写开头确定起始地址，写结尾确定文件名
        // 这样就相当于编译'@/**/*.vue'，编译之后模块列表才会有所有的模块，传模块路径匹配才会命中
        require(['@/' + component + '.vue'], resolve)
      }
    } else if (router.template) {
      router.component = resolve => {
        resolve({
          template: router.template
        })
      }
    } else {
      const component = `${router.name}/index`
      router.component = async resolve => {
        try {
          // 尝试加载模块
          await require(['@/views/' + component + '.vue'], resolve)
        } catch {
          // 加载失败，不存在此模块，使用默认模板
          console.log('@/views/' + component + '.vue不存在，加载默认模板')
          resolve({
            template: `<table-base table-name="${router.name}" />`
          })
        }
      }
    }

    let children = router.children
    if (children && children instanceof Array) {
      children = formatRoutes(children)
    }

    router.children = children

    fmRoutes.push(router)

    // 添加/编辑页路由
    const r = {
      path: router.path,
      component: resolve => {
        require(['@/views/layout/Layout.vue'], resolve)
      },
      children: [
        {
          path: `/:tableName(${router.name})/:type(Edit|Add)/:id?`,
          component: async resolve => {
            try {
              // 尝试加载模块
              await require(['@/views/' + router.name + '/form.vue'], resolve)
            } catch {
              // 加载失败，不存在此模块，使用默认模板
              console.log(
                '@/views/' + router.name + '/form.vue不存在，加载默认模板'
              )
              resolve({
                template: `<form-base />`
              })
            }
          }
        }
      ]
    }
    addRouters.push(r)
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
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    },
    ADD_ROUTERS: (state, routers) => {
      state.addRouters = state.addRouters.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(async resolve => {
        const { roles } = data
        let accessedRouters
        const routeRes = await requestRoutes()
        const asyncRouters = asyncRouterMap.concat(formatRoutes(routeRes.data))
        if (roles.includes('admin')) {
          accessedRouters = asyncRouters
        } else {
          accessedRouters = filterAsyncRouter(asyncRouters, roles)
        }
        commit('SET_ROUTERS', accessedRouters)
        commit('ADD_ROUTERS', addRouters)
        resolve()
      })
    }
  }
}

export default permission
