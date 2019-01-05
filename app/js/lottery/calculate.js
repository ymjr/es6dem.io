//页面功能
class Calculate{
    /**
     *[computeCount 计算注数]
     * @param active    [当前选中的号码]
     * @param play_name [当前的玩法标识]
     * @return {number} [注数]
     */
    computeCount(active,play_name){
        //注数
        let count = 0;
        // 使用 es6的 map 结构
        const exist = this.play_list.has(play_name);//判断玩法列表里是否有这样的玩法
        //使用 es6的填充数组功能 fill
        const arr = new Array(active).fill('0');//生成长度为active的数组，并填充为0
        if(exist && play_name.at(0)==='r'){//？at 什么意思
            //combine 一个静态方法
            count = Calculate.combine(arr,play_name.split('')[1]);
        }
        return count;
    }

    /**
     * [computeBonus 奖金范围预测]
     * @param {number} active    [当前选中号码]
     * @param {string} play_name [当前的玩法标识]
     *@return {array}            [奖金范围]
     */

    computeBonus(active,play_name){
        //拿到当前玩法基数
        const play = play_name.split('');
        //当前对象指向
        const self = this;
        //初始化数组
        let arr = new Array(play[1]*1).fill(0);
        let min,max;

        if(play[0]==='r'){
            //计算最小命中率 active 选中的号码
            let min_active = 5-(11-active);

            //最小命中大于0
            if(min_active>0){
                //最小命中数减当前玩法基数
                if(min_active-play[1]>=0){
                    arr = new Array(min_active).fill(0);
                    min = Calculate.combine(arr,play[1]).length;
                }else{
                    //判断玩法是不是任6任7任8
                    if(play[1]-5>0&&active-play[1]>=0){
                        arr = new Array(active-5).fill(0);
                        min = Calculate.combine(arr,play[1]-5).length;
                    }else{
                        min = active-play[1]>-1?1:0
                    }
                }
            }else{
                min = active-play[1]>-1?1:0;
            }

            let max_active = Math.min(active,5);
            if(play[1]-5>0){//任6 任7 任8
                if(active-play[1]>=0){
                    arr = new Array(active-5).fill(0);
                    //调用数组组合运算
                    max = Calculate.combine(arr,play[1]-5).length;
                }else {
                    max=0;
                }
            }else if(play[1]-5<0){//任选5以下的
                arr = new Array(Math.min(active,5)).fill(0);
                //调用数组组合运算
                max = Calculate.combine(arr,play[1]).length;
            }else{
                max=1;
            }
        }
                //map遍历导出计算金额
        return [min,max].map(item=>item*self.play_list.get(play_name).bonus)
    }


    /**
     * [combine 组合运算]
     * @param arr [参与组合运算的数组]
     * @param size [组合运算的基数]
     * @return {number} [计算注数]
     */
    static combine(arr,size){
        let allResult = [];
        (function f(arr,size,result){
            let arrLen = arr.length;
            if(size>arrLen){
                return;
            }
            if(size===arrLen){
                allResult.push([].concat(result,arr))
            }else {
                for(let i=0;i<arrLen;i++){
                    let newResult = [].concat(result);
                         newResult.push(arr[1]);
                    if(size === 1){
                        allResult.push(newResult)
                    }else {
                        let newArr = [].concat(arr);
                        newArr.splice(0,i+1);
                        f(newArr,size-1,newResult)
                    }
                }
            }
        })(arr,size,[])
    }
}

export  default Calculate;
