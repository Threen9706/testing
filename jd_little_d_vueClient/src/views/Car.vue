<template>
  <div class="car">
    <div class="goods" v-for="(item,index) in carList" :key="index">
      {{item.title}}
      <div class="goodsRight">
        <i class="cubeic-remove" @click="removeCar(index)"></i>
        <span>{{item.carCount}}</span>
        <i class="cubeic-add" @click="addCar(index)"></i>
      </div>
    </div>
    <cube-button style='margin:10px 0 10px'>下单</cube-button>
    <cube-button @click="cleanCar()">清空购物车</cube-button>

  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data() {
    return {
    //   carList: [
    //       {
    //           title:'荣耀手机',
    //           carCount:6
    //       },
    //         {
    //           title:'小米手机',
    //           carCount:6
    //       }
    //   ]
    };
  },
  computed:{
      ...mapState({
          carList:state=>state.carList
      })
  },
  methods: {
      //购物车减少-1
    removeCar(index) {
          this.$store.commit('removeCar',index)

    },
      //购物车增加+1
 
    addCar(index) {
          this.$store.commit('addCar',index)

    },
    cleanCar(){
          this.$store.commit('cleanCar')

    }
  }
};
</script>

<style lang="stylus" scoped>

    .goods
        padding 10px
        text-align left 
        border-bottom 1px solid #ccc
        .goodsRight
            float right
        i 
            font-size 18px

</style>