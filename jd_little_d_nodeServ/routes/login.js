var express = require('express');
var router = express.Router();
var mongoUtil = require("../libs/mongoUtil");
const jwt = require('jsonwebtoken');  //用来生成token
var dbutil = new mongoUtil("localhost", "27017", "jd_vue_3x");


/* GET login page. */
router.post('/', function (req, res, next) {
  
    console.log(req.body);
    var { username, password } = req.body;

    dbutil.find({ username: username }, {}, 'users', (err, data) => {
        if (err) {
            console.log(err)
        } else {
            console.log(data[0].password + '----------1');
            if (data.length > 0) {
                console.log(data[0]);
                let content = { username: req.body.username }; //要生成token 的主题信息
                let secretKey = 'tokenkey' //加密的密钥
                let token = jwt.sign(content, secretKey, {
                    expiresIn: 60 * 60 * 1  //一小时过期
                });
         
                if (Number(password) == data[0].password) {
                    res.json({
                        code: 0,
                        message: '登录成功',
                        token:token
                    })
                } else {
                    res.json({
                        code: 1,
                        message: '密码错误'
                    })
                }

            } else {
                res.json({
                    code: 1,               
                    message: '此用户不存在，请检查/注册'
                })
            }
        }

    })
});

module.exports = router;
