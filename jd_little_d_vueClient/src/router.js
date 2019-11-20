import Vue from 'vue'
import Router from 'vue-router'
import Register from './views/Register.vue'
// import Login from './views/Login.vue'
// import Index from './views/Index.vue'
// import Botnav from './views/BottomNav.vue'






Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      redirect: '/login'
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "about" */ './views/Register.vue')
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
   //路由懒加载
    },
    {
      path: '/index',
      name: 'index',
      component: () => import( './views/Index.vue')
   //路由懒加载
    },
    {
      path: '/botnav',
      name: 'botnav',
       //路由懒加载
      component: () => import( './views/ButtomNav.vue'),
      //嵌套二级路由
      children:[
        {
          path: 'index',
          name: 'index',
          component: () => import( './views/Index.vue')
       //路由懒加载
        }, 
        {
          path: 'list',
          name: 'list',
          component: () => import( './views/List.vue')
       //路由懒加载
        }, 
        {
          path: 'car',
          name: 'car',
          meta:{
            requireAuth:true,   //有这个字段，会认为这个路由页面是要有登陆权限的
          },
          component: () => import( './views/Car.vue')
       //路由懒加载
        }, 
        {
          path: 'mine',
          name: 'mine',
          meta:{
            requireAuth:true,   //有这个字段，会认为这个路由页面是要有登陆权限的
          },
          component: () => import( './views/Mine.vue')
       //路由懒加载
        }, 
        {
          path: 'search',
          name: 'search',
          component: () => import( './views/Search.vue')
       //路由懒加载
        },
   ]
    },
  ]
})
