import axios from 'axios'
import store from './store.js'
import router from './router.js'


//http 全局拦截
//token 要放在 请求的header 带回给后端


export default function setaxios(){
    //请求拦截
    axios.interceptors.request.use(
        config=>{
            if(store.state.token){
                config.headers.token=store.token
            }
            return config
        }
    )





        //每次请求有返回信息都会先经过拦截器
    axios.interceptors.response.use(
        response=>{
            if(response.status==200){
                const data = response.data
                if(data.code==-1){
                    //将token清空 store和localstorage
                    store.commit('setToken','')//传递空值
                    localStorage.removeItem('token')
                    //跳转到 login 页面  （防止写入history,回退）
                    router.replace({path:'/login'})
                }
                return data
            }
            return response
        }
    )
}