import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import axios from 'axios'
import setaxios from './setaxios'

setaxios()//导出的是一个方法，直接引用即可
Vue.config.productionTip = false
//防止每次使用都要引用，挂载到vue原型上即可
Vue.prototype.$http=axios
//路由守卫

router.beforeEach((to,from,next)=>{
  //无论刷新还是跳转都会进入这里（路由前置钩子）
  //将 local storage中的token存入 vuex
  store.commit('setToken',localStorage.getItem('token'))
  if(to.meta.requireAuth){
    if(store.state.token){
      //有 token,已登录
      next()
    }else{
      next({
        path:'/login',
        //此处 fullPath --- P是大写
        query:{redirect:to.fullPath}
      })
    }
  }else{
    next()
  }
}
)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
