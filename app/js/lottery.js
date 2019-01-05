import 'babel-polyfill';
import Base from './lottery/base.js';
import Timer from './lottery/calculate.js';
import Calculate from './lottery/interface.js';
import Interface from './lottery/timer.js';
import $ from 'jquery';

const copyProperties = function(target,source){
    for(let key of Reflect.ownKeys(source)){
        if(key!=='constructor'&&key!=='prototype'&&key!=='name'){
            let desc = Object.getOwnPropertyDescriptor(source,key);
            Object.defineProperties(target,key,desc);
        }
    }
}

const mix = function(...mixins){
    class Mix{}
    for(let mixin of mixins){
        copyProperties(Mix,mixins);
        copyProperties(Mix.prototype,mixin.prototype)
    }
    return Mix
}

class Lottery extends mix(Base,Calculate,Interface,Timer){
    constructor(name='syy',cname='11选5',issue='**',state='**'){
        super();
        this.name=name;
        this.cname=cname;
        this.issue=issue;
        this.state= state;
        this.el='';
        this.omit = new Map();
        this.open_code = new Set();//开奖号码
        this.open_code_list = new Set();//开奖记录
        this.play_list = new Map();//玩法列表
        this.number = new Set();//选号
        this.issue_el = '#curr_issue';//选号期号选址器
        this.countdown_el='#countdown';//倒计时选择器
        this.state_el = '.state_el';//状态选择器
        this.cart_el = '.codelist';
        this.omit_el='';
        this.cur_play='r5';
        this.initPlayList();
        this.initNumber();
        this.updateState();
        this.initEvent();
    }

    /**
     * [updateState 狀態更新]
     */
    updateState(){
        let self = this;
        this.getState().then(function(res){//getState()獲取當前狀態
            self.issue = res.issue;
            self.end_time=res.end_time;
            self.state=res.state;
            //this.issue_el = '#curr_issue';
            $(self.issue_el).text(res.issue);
            self.countdown(res.end_time,function(time){
                //this.countdown_el='#countdown';
                $(self.countdown_el).html(time)
            },function(){
               setTimeout(function(){
                   self.updateState();
                   self.getOmit(self.issue).then(function(res){//getOmit()獲取遺漏數據

                   });
                   self.getOpenCode(self.issue).then(function(res){//getOpenCode()函數獲取開獎號碼

                   });
               },500);
            });
        })
    }

    /**
     * [initEvent 初始化事件]
     */
    initEvent(){
        let self = this;
        $('#plays').on('click','li',self.changePlayNav.bind(self));//base 玩法切换
        $('.boll-list').on('click','.btn-boll',self.toggleCodeActive.bind(self));//base 号码选中取消切换事件
        $('#confirm_sel_code').on('click',self.addCode.bind(self));//base 号码添加
        $('.dxjo').on('click','li',self.assistHandle.bind(self));//base 操作区大小奇偶
        $('qkmethod').on('click','.btn-middle',self.getRandomCode.bind(self));//base 添加随机号码
    }

}

export default Lottery;

