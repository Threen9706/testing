import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      token:'',
      carList:[],//存储购物车商品的数据
  },
  mutations: {
    //设置vuex的 token
      setToken(state,token){
        state.token = token
      },
      //添加到购物车
      toCar(state,tag){
        // if()
        //find()---返回第一个符合函数内条件的结果（对象）
        // var token1 = window.localStorage.getItem("token")
        // console.log(token1)
        let goods = state.carList.find(v=>v.title==tag.label)
        if(goods){
          goods.carCount+=1
        }else{
          state.carList.push({title:tag.label,carCount:1})
        }
      
      },
      //购物车页面添加方法
      addCar(state,index){
          state.carList[index].carCount++;
      },
      //购物车页面减少方法
      removeCar(state,index){
        if(state.carList[index].carCount>1){
        state.carList[index].carCount--;
      }else{
        if(window.confirm('确定移除该商品吗？')){
          state.carList.splice(index,1);
             }
          }
      },

      cleanCar(state){
        if(state.carList.length>0){
          if(window.confirm('确定清空购物车里所有数据吗？')){
          state.carList=[]
        }
        }else{
          alert('购物车已经空啦！')
         }
       }
     },
  actions: {

  },
  getters:{
    carCountSum:state=>{
      let num=0;
      state.carList.forEach(v=>{
        num += v.carCount
      })
      return num;
    }
  }
})
