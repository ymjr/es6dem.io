//数组扩展
{  //Array.of
    let arr = Array.of(3,4,5,6,7)
    console.log('arr',arr)// [ 3, 4, 5, 6, 7 ]

    let arr1 = Array.of();
    console.log('arr1',arr1)//[]空数组
}
{
    //Array.from 把集合转化成数组
    let p=document.querySelectorAll('p');
    let pArr = Array.from(p);
    pArr.forEach(function(item){
        //innerText textContent 获取DOM节点文本
        console.log(item.textContent);
    })

    //Array.from 把数组进行遍历
    Array.from(pArr,function(item){
        //console.log(item);
    })
    console.log(Array.from([1,3,5],function(item){return item*2}))
}
{
    //fill(替换值，起始长度位置，结束长度位置)替换
    console.log('fill-7',[1,'a',undefined].fill(7));
    console.log('fill,pos',['a','b','c'].fill(7,0,1));
}
{
    //获取 数组 keys 和数组 values entries()数组的下标和值
    for(let index of ['1','c','ks'].keys()){
        console.log('keys',index);
    }
    for(let value of ['1','c','ks'].values()){
        console.log('values',value);
    }
    for(let [index,value] of ['1','c','ks'].entries()){
        console.log('values',index,value);
    }
}
{
    //指定位置的值复制到其他位置
    console.log([1,2,3,4,5].copyWithin(0,2,3))//0代表替换位置起始，2代表读取位置起始，3代表读取位置结束
}
{
    //查找find只查找出第一个符合条件的值 findIndex只查找出第一个符合条件的下标
    console.log([1,2,3,4,5,6].find(function (item) {
        return item>3
    }))//4

    console.log([1,2,3,4,5,6].findIndex(function (item) {
        return item>3
    }))//3
}
{
    //数组中包含某个值 includes()
    console.log('number',[1,2,NaN].includes(1));//true
    console.log('number',[1,2,NaN].includes(NaN));//true
}
