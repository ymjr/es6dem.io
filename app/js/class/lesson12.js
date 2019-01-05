//lterator 和 for...of 循环
//什么是 lterator接口
{
    let arr=['he','llo','wo'];
    //调用iterator
    let m = arr[Symbol.iterator]();
    console.log(m.next())
    console.log(m.next())
    console.log(m.next())
    console.log(m.next())
    for (let [key,value] of arr.entries()){
        console.log(key,value);
    }
}

{
    //自定义iterator接口
    let obj ={
        start:[1,3,2],
        end:[7,9,8],
        [Symbol.iterator](){
            let self = this;
            let index = 0;
            let arr = self.start.concat(self.end);
            let len = arr.length;
            return {
                next(){
                    if(index<len){
                        return {
                            value:arr[index++],
                            done:false
                        }
                    }else{
                       return{
                           value:arr[index++],
                           done:true
                       }
                    }
                }
            }
        }
    }

    for(let value of obj){
        console.log(value)
    }

    let obj1={
        one:['hello','boy'],
        two:['hai','jekc'],
        [Symbol.iterator](){
            let self = this;
            let index=0;
            let arr = self.one.concat(self.two);
            let len=arr.length;
            return{
                next(){
                    if(index<len){
                        return{
                            value:arr[index++],
                            done:false
                        }
                    }else {
                        return{
                            value:arr[index++],
                            done:true
                        }
                    }
                }
            }
        }
    }

    for(let va of obj1){
        console.log(va)
    }
}
