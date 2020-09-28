// import Vue from 'vue'
// import Router from 'vue-router'

/* Layout */
const Layout = () => import('src/views/layout/Layout')

/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('src/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('src/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('src/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('src/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('src/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('src/views/dashboard/index'),
        name: 'Dashboard',
        meta: {
          title: '首页',
          icon: 'dashboard',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    children: [
      {
        path: 'index',
        component: () => import('src/views/guide/index'),
        name: 'Guide',
        meta: {
          title: '引导页',
          icon: 'guide',
          noCache: true
        }
      }
    ]
  }
]

export default new VueRouter({
  mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/error-log',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: 'log',
        component: () => import('src/views/errorLog/index'),
        name: 'ErrorLog',
        meta: {
          title: 'errorLog',
          icon: 'bug'
        }
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]
