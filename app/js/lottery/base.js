import $ from 'jquery';
class Base{
    /**
     * [initPlayList 初始化奖金和玩法及说明]
     *@return {[type]} [description]
     */
  initPlayList(){
      //map存储数据
    this.play_list.set('r2',{
        bonus:6,
        tip:'从01～11中任选2个或多个号码，所选号码与开奖号码相同，即中奖<em class="red">6</em>元',
        name:'任二'
    })
        .set('r3',{
            bonus: 19,
            tip:'从01～11中任选3个或多个号码，所选号码与开奖号码相同，即中奖<em class="red">19</em>元',
            name: '任三'
        })
        .set('r4',{
            bonus:78,
            tip:'从01～11中任选4个或多个号码，所选号码与开奖号码相同，即中奖<em class="red">78</em>元',
            name:'任四'
        })
        .set('r5',{
            bonus:540,
            tip:'从01～11中任选5个或多个号码，所选号码与开奖号码相同，即中奖<em class="red">540</em>元',
            name:'任五'
        })
        .set('r6',{
            bonus:90,
            tip:'从01～11中任选6个或多个号码，所选号码与开奖号码相同，即中奖<em class="red">90</em>元',
            name:'任六'
        })
        .set('r7',{
            bonus:26,
            tip:'从01～11中任选7个或多个号码，所选号码与开奖号码相同，即中奖<em class="red">27</em>元',
            name:'任七'
        })
        .set('r8',{
            bonus:9,
            tip:'从01～11中任选8个或多个号码，所选号码与开奖号码相同，即中奖<em class="red">9</em>元',
            name:'任八'
        })
  }

    /**
     *[initNumber 初始化号码]
     *
     */
  initNumber(){
    for(let i=1;i<12;i++){
        //set数据结构 初始化set ['01','02'...'11']的数据
        //padStart es6字符串扩展 字符串长度为 2 不足则在前面添加 '0'
        this.number.add(`${i}`.padStart(2,'0'))
    }
  }

    /**
     * [setOmit 设置遗漏数据]
     * @param omit
     */
  setOmit(omit){
      //map数据
      let self = this;
      set.omit.clear();
      for(let [index,item] of omit.entries()){
          self.omit.set(index,item)
      }
      $(self.omit_el).each(function(index,item){
          $(item).text(self.omit.get(index))
      });
  }

    /**
     * [setOpenCode 设置开奖]
     */
    setOpenCode(code){
        //set数据结构 开奖号不重复
        let self = this;
        self.open_code.clear();
        for(let item of code.values()){
            self.open_code.add(item);
        }
        self.updateOpenCode&&self.updateOpenCode.call(self,code)
    }

    /**
     * [toggleCodeActive 号码选中取消]
     */
    toggleCodeActive(e){
        let self = this;
        let $cur = $(e.currentTarget);
        $cur.toggleClass('btn-boll-active');
        self.getCount();
    }

    /**
     * [changPlayNav 切换玩法]
     * @param e
     */
    changePlayNav(e){
        let self = this;
        //$cur jq事件代理
        let $cur = $(e.currentTarget);
        //样式切换
        $cur.addClass('active').siblings().removeClass('active');
        //cur_play 点击当前的desc 属性
        //toLocaleLowerCase转换成小写
        self.cur_play = $cur.attr('desc').toLocaleLowerCase();
        //从play_list map中获取数据 修改#zx_sm span html
        $('#zx_sm span').html(self.play_list.get(self.cur_play).tip);
        $('.boll-list .btn-boll').removeClass('btn-boll-active');
        self.getCount();//重新计算
    }

    /**
     * [assistHandle 操作区]
     * @param e
     */
    assistHandle(e){
        e.preventDefault();
        let self = this;
        let $cur = $(e.currentTarget);
        //index 点击下标
        let index = $cur.index();
        $('.boll-list .btn-boll').removeClass('btn-boll-active');
        if(index===0){
            $('.boll-list .btn-boll').addClass('btn-boll-active');
        }
        if(index===1){
            $('.boll-list .btn-boll').each(function(i,t){
                if(t.textContent-5>0){
                    $(t).addClass('btn-boll-active')
                }
            })
        }
        if(index===2){
            $('.boll-list .btn-boll').each(function(i,t){
                if(t.textContent-6<0){
                    $(t).addClass('btn-boll-active')
                }
            })
        }
        if(index===3){
            $('.boll-list .btn-boll').each(function(i,t){
                if(t.textContent%2==1){
                    $(t).addClass('btn-boll-active')
                }
            })
        }
        if(index===4){
            $('.boll-list .btn-boll').each(function(i,t){
                if(t.textContent%2==0){
                    $(t).addClass('btn-boll-active')
                }
            })
        }
        //计算金额
        self.getCount();
    }

    /**
     * [getName 获取当前彩票名称]
     */
    getName(){
        return this.name
    }

    /**
     * [addCode 添加号码]
     */
    addCode(){
        let self = this;
        //获取选中号码返回一个集合然后用正则分割成数组
        let $active = $('.boll-list .btn-boll-active').text().match(/\d{2}/g);
        let active = $active?$active.length:0;
        let count = self.computeCount(active,self.cur_play);
        if(count){
            self.addCodeItem($active.join(''),self.cur_play,self.play_list.get(self.cur_play).name,count)
        }
    }


    /**
     * [addCodeItem 添加单次号码]
     * @param code 选中号码
     * @param type 类型
     * @param typeName 类型名称
     * @param count 注数
     */
    addCodeItem(code,type,typeName,count){
        let self = this;
        const tpl=`
        <li codes="${type}|${code}" bonus="${count*2}" count="${count}">
            <div class="code">
            <b>${typeName}${count>1?'复式':'单式'}</b>
            <b class="em">${code}</b>
            [${count}注,<em class="code-list-money">${count*2}</em>元]
            </div>
        </li>`;
        $(self.cart_el).append(tpl);
        //购物车计算金额
        self.getTotal();
    }

    /**
     * [getCount 计算选中号码金额]
     */
    getCount(){
        let self = this;
        let active = $('.boll-list .btn-boll-active').length;//获取选中号码长度
        let count = self.computeCount(active,self.cur_play);//计算注数
        let range = self.computeBonus(active,self.cur_play);//奖金范围预测
        let money = count*2;//计算花的钱
        let win1 = range[0]-money;//最小盈利额
        let win2 = range[1]-money;//最大盈利额
        let tpl;
        //Math.abs() 返回一个绝对值 Math.abs(-5) 返回 5
        let c1 = (win1<0&&win2<0)?Math.abs(win1):win1;
        let c2 = (win1<0&&win2<0)?Math.abs(win2):win2;
        if(count === 0){
            tpl=`您选了<b class="red">${count}</b>注，共<b class="red">${count*2}</b>`
        }else if(range[0]===range[1]){
            tpl=`您选了<b>${count}</b>注，共<b>${count*2}</b>元<em>
                若中奖，奖金：
                <strong class="red">${range[0]}</strong>元，
                您将${win1>=0?'盈利':'亏损'}
                <strong class="${win1>=0?'red':'green'}">${Math.abs(win1)}</strong>元
            </em>`
        }else {
            tpl=`您选了<b>${count}</b>注，共<b>${count*2}</b>元<em>
                若中奖，奖金：
                <strong class="red">${range[0]}</strong>至<strong class="red">${range[1]}</strong>元，
                您将${(win1<0&&win2<0)?'亏损':'盈利'}
                <strong class="${win1>=0?'red':'green'}">${c1}</strong>至
                <strong class="${win2>=0?'red':'green'}">${c1}</strong>元
            </em>`
        }
        $('.sel_info').html(tpl);
    }

    /**
     * [getTotal 计算所有金额] 购物车
     */
    getTotal(){
        let count=0;
        //遍历购物车注数条目
        $('.codelist li').each(function(index,item){
            count+=$(item).attr(count)*1;
        })
        $('#count').text(count);
        $('#money').text(count*2);
    }

    /**
     * [getRandom 随机数生成]
     * {type} num 随机数长度
     */
    getRandom(num){
        let arr=[],index;
        //第50行定义了一个this.number set数据 随机空间 01到11
        let number = Array.from(this.number);
        while(num--){
            //Math.random()随机生成数  number.length范围是number的长度
            //parseInt字符串转数字
            index = Number.parseInt(Math.random()*number.length);
            arr.push(number[index]);
            //
            number.splice(index,1);
        }
        return arr.join(' ');
    }

    /**
     * [getRandomCode 添加随机号码]
     * @param e
     */
    getRandomCode(e){
        //阻止默认事件
        e.preventDefault();
        //获取属性
        let num = e.currentTarget.getAttribute('count');
        //获取当前玩法 cur_play 全局对象 保存当前玩法
        let play = this.cur_play.match(/\d+/g)[0];
        let self = this;
        if(num==='0'){
            $(self.cart_el).html('')
        }else{
            for(let i=0;i<num;i++){
                //调用添加添加单次号码
                self.addCodeItem(self.getRandom(play),self.cur_play,self.play_list.get(self.cur_play).name,1);
            }
        }
    }
}
export default Base
