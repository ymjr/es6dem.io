var express = require('express');
var mockjs = require('mockjs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var makeIssue = function(){
  var date = new Date();
  var first_issue_date = new Date();//第一注时间
  first_issue_date.setHours(9);//小时
  first_issue_date.setMinutes(10);//分
  first_issue_date.setSeconds(0);//秒
  var end_issue_date = new Date(first_issue_date.getTime()+77*10*60*1000);//截止日期  77期10分钟1期 1分钟60秒 1秒1000毫秒

  var cur_issue,end_time,state;//cur_issue结果 end_time截止时间 state状态值
//销售时间应该在 9:00:00 至 22:00:00  第一注开始在9:10:00
  if(date.getTime()-first_issue_date.getTime()>0&&date.getTime()-end_issue_date.getTime()<0){
    //正常销售
    var cur_issue_date=new Date();//开始时间 9:00:00
    cur_issue_date.setHours(9);
    cur_issue_date.setMinutes(0);
    cur_issue_date.setSeconds(0);
    var minus_time = date.getTime()-cur_issue_date.getTime();//执行过的时间 当前时间-9:00:00开始时间
    var h = Math.ceil(minus_time/1000/60/10);//Math.ceil向上取整  执行过的次数 期数
    var end_date = new Date(cur_issue_date.getTime()+1000*60*10*h);//期数 结束时时间
    end_time = end_date.getTime();//结束时的时间
      //保存结果getFullYear()年 getMonth()月 getDate()天 h期数 join()转字符串
    cur_issue = [end_date.getFullYear(),('0'+(end_date.getMonth()+1)).slice(-2),('0'+end_date.getDate()).slice(-2),('0'+h).slice(-2)].join('')
  }else{
    //今天销售已截止
      first_issue_date.setDate(first_issue_date.getDate()+1);
      end_time = first_issue_date.getTime();
      cur_issue=[first_issue_date.getFullYear(),('0'+(first_issue_date.getMonth()+1)).slice(-2),('0'+first_issue_date.getDate()).slice(-2),'01'].join('');
  }
  var cur_date = new Date();
  if(end_time-cur_date.getTime()>1000*60*2){
    state='正在销售'
  }else {
      state = '开奖中'
  }
  return {
    issue:cur_issue,
      state:state,
      end_time:end_time
  }
}


  router.get('/get/omit',function(req,res,next){
    res.json(mockjs.mock({
        'data|11':[/[1-9]{1,3}|0/],
        'issue':/[1-9]{8}/
    }))
  })

  router.get('/get/opencode',function(req,res,next){
    var issue = makeIssue().issue;
    var date = mockjs.mock({
        'data':[/[1-3]/,/[6-7]/,/[8-9]/,/1[0-1]/]
    }).data;
    res.json({
        issue:issue,
        data: data
    })
  })

  router.get('/get/state/',function(req,res,next){
    var state = makeIssue();
    res.json(state);
  })

module.exports = router;
