<template>
  <div class="mine">
      <img  class="headerImg" src="https://www.25xt.com/wp-content/uploads/2019/05/Stories-Illustrations-Kit-4.png" alt="">
    <ul>
        <li v-for="item in mineList" class="mineItem" @click="itemclick(item)" :key="item.label">
        <span class="mineLabel">{{item.label}}</span>
        <i class="cubeic-arrow"></i>
        </li>
    </ul>
  </div>
</template>

<script>
export default {
    data(){
        return{
            mineList:[
                {label:'商品收藏'},
                {label:'我的足迹'},
                {label:'店铺收藏'},
                {label:'我的订单'},
                {label:'退出账户',type:'exit'},

            ]
        }
    },
    methods:{
    itemclick(item){
            if(item.type=='exit'){
                this.$store.commit('settoken','')
                localStorage.removeItem('token')
                this.$router.push({path:'/login'})
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
.headerImg 
    height 170px
    width 100%
.mineItem
    font-size 14px
    text-align left
    height 50px
    line-height 50px
    padding-left 5%
    border-bottom 1px solid #eeeeee
    .mineLabel
        display inline-block
        width 90%
</style>