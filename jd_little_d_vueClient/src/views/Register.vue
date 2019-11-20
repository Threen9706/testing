<template>
  <div>
    <img class="headerImg" src="../assets/6.jpg" alt />

    <cube-form :model="model" :schema="schema" @submit="submitHandler"></cube-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {
        username: "",
        password: ""
      },
      schema: {
        fields: [
          //用户名配置
          {
            type: "input",
            modelKey: "username",
            label: "用户名",
            props: {
              placeholder: "请输入用户名"
            },
            rules: {
              //校验规则
              required: true,
              type: "string",
              min: 3,
              max: 15
            },
            trigger: "blur",
            messages: {
              required: "用户名不能为空",
              min: "用户名长度不能少于3个字符",
              max: "用户名长度不能大于15个字符"
            }
          },
          //密码配置
          {
            type: "input",
            modelKey: "password",
            label: "密码",
            props: {
              placeholder: "请输入密码",
              type: "password",
              eye: {
                open: false
              }
            },
            rules: {
              //校验规则
              required: true,

              min: 6,
              max: 15
            },
            trigger: "blur",
            messages: {
              required: "密码不能为空",
              min: "密码长度不能少于6个字符",
              max: "密码长度不能大于15个字符"
            }
          },
          {
            type: "submit",
            label: "注册"
          }
        ]
      }
    };
  },
  methods: {
    submitHandler(e) {
      e.preventDefault();
      this.$http
        .get("/api/register", {
          params: this.model
        })
        .then(res => {
          console.log(res.success);
        })
        .catch(err => {
          console.log(err);
        });
      //  this.$http.get('/api/register',{params:this.model}).then(res=>{
      //           console.log(res.success)
      //       }).catch(err=>{
      //           console.log(err)
      //       })
    }
  }
};
</script>

<style lang='stylus' scoped>
.headerImg {
  height: 150px;
  width: 100%;
}
</style>