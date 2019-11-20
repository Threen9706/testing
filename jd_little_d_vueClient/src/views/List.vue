<template>
  <div class="list">
    <cube-scroll class="leftList">
      <ul>
        <li
          v-for="(item,index) in tabslabel"
          @click="selectlist(index)"
          :class="item.active?'active':''"
          :key="index"
        >{{ item.label }}</li>
      </ul>
    </cube-scroll>
    <cube-scroll class="rightList">
      <ul>
        <li v-for="(tag,index) in tags" :key="index">
          <img :src="tag.image" />
          <p>
            {{tag.label}}
            <i class="cubeic-add" @click="addToCar($event,tag)"></i>
          </p>
        </li>
      </ul>
    </cube-scroll>

    <div class="ball-wrap">
      <transition @before-enter="beforeEnter" @enter="enter" @afterEnter="afterEnter">
        <div class="ball" v-if="ball.show">
          <div class="inner">
            <i class="cubeic-add"></i>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ball: {
        show: false,
        el: ""
      },
      tags: [],
      tokenFlag: "",
      tabslabel: [
        {
          label: "热门推荐",
          active: true
        },
        {
          label: "家用电器",
          active: false
        },
        {
          label: "手机数码",
          active: false
        },
        {
          label: "电脑周边",
          active: false
        },
        {
          label: "3c推荐",
          active: false
        },
        {
          label: "计生情趣",
          active: false
        },
        {
          label: "美妆护肤",
          active: false
        },
        {
          label: "口红",
          active: false
        },
        {
          label: "手袋",
          active: false
        },
        {
          label: "金银财宝",
          active: false
        },
        {
          label: "手机数码",
          active: false
        },
        {
          label: "手机数码",
          active: false
        },
        {
          label: "金银财宝",
          active: false
        },
        {
          label: "手机数码",
          active: false
        },
        {
          label: "手机数码",
          active: false
        }
      ]
    };
  },
  methods: {
    //获取分类
    async getclassify(index) {
      try {
        var tags = await this.$http.get(
          "http://localhost:8087/list/list_tags",
          { params: { type: index } }
        );
        this.tags = tags;
      } catch (error) {
        console.log(error);
      }
    },
    //click左侧
    selectlist(index) {
      this.tabslabel.forEach((val, ind) => {
        if (index == ind) {
          val.active = true;
        } else {
          val.active = false;
        }
      });
      this.getclassify(index);
    },
    addToCar(e, tag) {
      if (this.tokenFlag) {
        this.$store.commit("toCar", tag);
        //点击添加显示小球
        this.ball.show = true;
        //   this.ball.show=true
        //获取点击的元素
        this.ball.el = e.target;
      } else {
        const toast = this.$createToast({
          txt: "请先登录再添加商品噢",
          mask: true 
        });
        toast.show();
        setTimeout(()=>{window.location.pathname='/login'}, 1500);
      }
    },
    beforeEnter(el) {
      //   让小球移动到点击的位置
      //   获取点击位置---dom节点
      if (this.tokenFlag) {
        const dom = this.ball.el;
        const rect = dom.getBoundingClientRect(); //获取点击的dom的位置（x,y坐标）
        console.log(rect);
        const x = rect.left - window.innerWidth * 0.7;
        const y = -(window.innerHeight - rect.top);
        el.style.display = "block";
        el.style.transform = `translate3d(0,${y}px,0)`;
        //获取 inner
        const inner = el.querySelector(".inner");
        inner.style.transform = `translate3d(${x}px,0,0)`;
      }
    },
    enter(el, done) {
      if (this.tokenFlag) {
        //触发重绘
        document.body.offsetHeight;
        //小球移动回到原点，就是购物车的位置
        el.style.transform = `translate3d(0,0,0)`;
        const inner = el.querySelector(".inner");
        inner.style.transform = `translate3d(0,0,0)`;
        //过渡完成后执行的事件
        el.addEventListener("transitionend", done);
      }
    },
    afterEnter(el) {
      if (this.tokenFlag) {
        //结束时隐藏小球
        this.ball.show = false;
        el.style.display = "none";
      }
    }
  },
  created() {
    this.getclassify(0);
  },
  mounted() {
    const leftList = document.querySelector(".leftList");
    const rightList = document.querySelector(".rightList");
    const bodyheight = document.documentElement.clientHeight;
    leftList.style.height = bodyheight - 57 + "px";
    rightList.style.height = bodyheight - 57 + "px";
    this.tokenFlag = window.localStorage.getItem("token");
   
  }
};
</script>

<style lang="stylus" scoped>
.ball-wrap {
  .ball {
    position: fixed;
    left: 70%;
    bottom: 10px;
    z-index: 1003;
    color: red;
    transition: all 1s cubic-bezier(0.49, -0.29, 0.75, 0.41);

    .inner {
      width: 16px;
      height: 16px;
      transition: all 1s linear;
    }
  }
}

.list {
  display: flex;

  .leftList {
    width: 30%;

    li {
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #ffffff;
      color: #333;
      background: #f8f8f8;
      font-size: 16px;
    }

    .active {
      background: #fff;
      color: #e93b3d;
    }
  }

  .rightList {
    width: 70%;

    ul {
      display: flex;
      flex-wrap: wrap;

      li {
        width: 50%;
        justify-content: center;
        align-items: center;
        font-size: 16px;

        img {
          width: 80px;
          height: 80px;
        }
      }
    }
  }
}
</style>


                       