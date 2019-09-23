var express = require('express');
var router = express.Router();
var mongoUtil = require("../libs/mongoUtil");
var dbutil = new mongoUtil("localhost", "27017", "jd_vue_3x");

/* GET home page. */
router.get('/list_tags', function(req, res, next) {
    // console.log(req.query);
    var type = req.query.type;
    switch(type){
        case '0':
        dbutil.find({listTagImg:true},{},'imgs',(err,result)=>{
            if(err){
              console.log(err);
            }else{
            //   console.log(result);
              res.send(result);
            }
          });
        break;
        case '1':
          dbutil.find({listTagImg:true,label:'小米'},{},'imgs',(err,result)=>{
            if(err){
              console.log(err);
            }else{
            //   console.log(result);
              res.send(result);
            }
          })
        break;
        case '2':
        dbutil.find({listTagImg:true,label:'荣耀'},{},'imgs',(err,result)=>{
          if(err){
            console.log(err);
          }else{
          //   console.log(result);
            res.send(result);
          }
        })
      break;
      case '3':
      dbutil.find({listTagImg:true,label:'雪梨手机'},{},'imgs',(err,result)=>{
        if(err){
          console.log(err);
        }else{
        //   console.log(result);
          res.send(result);
        }
      })
    break;
    case '4':
    dbutil.find({listTagImg:true,label:'华为'},{},'imgs',(err,result)=>{
      if(err){
        console.log(err);
      }else{
      //   console.log(result);
        res.send(result);
      }
    })
  break;
  case '5':
  dbutil.find({listTagImg:true,label:'小米'},{},'imgs',(err,result)=>{
    if(err){
      console.log(err);
    }else{
    //   console.log(result);
      res.send(result);
    }
  })
break;
case '6':
dbutil.find({listTagImg:true,label:'荣耀'},{},'imgs',(err,result)=>{
  if(err){
    console.log(err);
  }else{
  //   console.log(result);
    res.send(result);
  }
})
break;
case '7':
dbutil.find({listTagImg:true,label:'雪梨手机'},{},'imgs',(err,result)=>{
  if(err){
    console.log(err);
  }else{
  //   console.log(result);
    res.send(result);
  }
})
break;
case '8':
dbutil.find({listTagImg:true,label:'华为'},{},'imgs',(err,result)=>{
  if(err){
    console.log(err);
  }else{
  //   console.log(result);
    res.send(result);
  }
})
break;
    }

});



module.exports = router;
