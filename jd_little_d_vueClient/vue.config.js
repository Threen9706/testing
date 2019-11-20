module.exports = {
    configureWebpack:{
        devServer:{
            port:8089,
            open:true,
            before(app){
                //注册接口，用户信息池
                //文件形式存用户数据
                let users=[
                    {username:'Threen',paddword:'123456'},
                    {username:'鹿文',paddword:'123qwe'}
    
                ]
                app.get('/api/register',(req,res)=>{
                    const {username,password}=req.query
                    const userlength = users.filter(item=>item.username==username).length
                    if(userlength>0){
                        res.json({
                            success:false,
                            message:'用户名已存在'
                        })
                    }else{
                        res.json({
                            success:true,
                            message:'注册成功'
                        })
                    }
                })
            }
        },
       
    },

    css: {
      loaderOptions: {
        stylus: {
          'resolve url': true,
          'import': [
            './src/theme'
          ]
        }
      }
    },

    pluginOptions: {
      'cube-ui': {
        postCompile: true,
        theme: true
      }
    }
}
