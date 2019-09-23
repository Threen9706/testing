var express = require('express');
var router = express.Router();
var mongoUtil = require("../libs/mongoUtil");
var dbutil = new mongoUtil("localhost", "27017", "jd_vue_3x");

/* GET home page. */
router.get('/banner', function(req, res, next) {
  dbutil.find({banner:'true'},{},'imgs',(err,result)=>{
    if(err){
      console.log(err);
    }else{
      // console.log(result);
      res.send(result);
    }
  })
});

router.get('/list', function(req, res, next) {
  dbutil.find({listIco:'true'},{},'imgs',(err,result)=>{
    if(err){
      console.log(err);
    }else{
      // console.log(result);
      res.send(result);
    }
  })
});


module.exports = router;
