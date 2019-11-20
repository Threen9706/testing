<template>
  <div id="index">
    <cube-slide ref="slide" :data="items" @change="changePage">
      <cube-slide-item
        v-for="(item, index) in items"
        :key="index"
        @click.native="clickHandler(item, index)"
      >
        <a :href="item.url">
          <img class="banner" :src="item.img" />
        </a>
      </cube-slide-item>
    </cube-slide>

    <cube-slide :loop="false" :auto-play="false" ref="slidelists" :data="lists">
      <cube-slide-item v-for="(list, index) in lists" :key="index">
        <ul class="listul">
          <li  class="listli" v-for="(item,index2) in list" :key="index2">
            <a :href="item.url">
              <img :src="item.img"  />
                 <!-- <img src="../assets/img/+{{item.img"  /> -->
              <p>{{item.label}}</p>
            </a>
          </li>
        </ul>
      </cube-slide-item>
    </cube-slide>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      lists: [
        [],
        []
      ]
    };
  },
  methods: {
    changePage(current) {
      console.log("当前轮播图序号为:" + current);
    },
    clickHandler(item, index) {
      console.log(item, index);
    }

  },
  async created() {
    try {
      const items = await this.$http.get("http://localhost:8087/index/banner");
      this.items = items;
      var lists = await this.$http.get("http://localhost:8087/index/list");
      for(var i =0;i<lists.length;i++){
        lists[i].img = require('../assets/img/' + lists[i].img);
        if(i<=7){
          this.lists[0].push(lists[i]);
        }else{
          this.lists[1].push(lists[i]);
        }
      }
    } catch (error) {
      console.log(error);
    }

  }
};
</script>

<style lang='stylus' scoped>
#index 
  a 
    .banner 
      dispalay: block;
      width: 100%;
      height: 175px;
  .listul
    display flex
    flex-wrap wrap
  .listli
    width 25%
    justify-content center
    img 
      width  35px
      height 35px
      border-radius 50%
      padding 5px 0
    p
      font-size 14px
      bottom 10px
</style>