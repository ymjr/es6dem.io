//数据结构
// Set的用法   WeakSet的用法    Map的用法    WeakMap的用法
{   //Set集合相当于一个数组
    //add添加元素
    let list = new Set();
    list.add(5);
    list.add(7);
    console.log(list)
    //size 获取长度
    console.log('size',list.size);
}
{
    let arr = [1,2,3,4,5,6];
    let list = new Set(arr);
    console.log(list,'size',list.size);
}
{
    //Set添加重复元素是不生效的
    let list = new Set();
    list.add(1);
    list.add(2);
    list.add(1);
    console.log('list',list)//[1,2]
    //Set去重
    let arr = [1,2,3,4,5,6,2,3,5,'1'];
    let list1 = new Set(arr);
    console.log('unique',list1);[1,2,3,4,5,'1'];
}
{
    //add添加     delete删除    clear清空     has判断
    let arr = ['add','delete','clear','has'];
    let list = new Set(arr);
    console.log('add',list.add('true'));Set[ "add", "delete", "clear", "has", "true" ]
    console.log('has',list.has('add'));//true
    console.log('delete',list.delete('delete'),list);// Set [ "add", "clear", "has","true" ]
    console.log('clear',list.clear(),list)//Set []
}
{
    //Set遍历
    let arr = ['add','delete','clear','has'];
    let list = new Set(arr);
    for (let key of list.keys()){
        console.log('keys',key)//keys add  keys delete  keys clear  keys has
    }
    for (let values of list.values()){
        console.log('values',values)//values add  values delete  values clear  values has
    }
    for (let values of list){
        console.log('values',values)//values add  values delete  values clear  values has
    }
    for (let [key,value] of list.entries()){
        console.log('entries',key,value)//entries add add  entries delete delete  entries clear clear  entries has has
    }

    list.forEach(function(item){
        console.log(item)
        console.log(list[item])
    })
}
{
    //WeakSet的用法 弱引用    WeakSet的元素只能是对象
    //没有 clear 方法  没有Set属性  不能遍历
    let weakList = new WeakSet();
    let arg = {};
    weakList.add(arg);
    //weakList.add(2);
    console.log('weakList',weakList);
}
{
    //map添加元素用 set 获取元素用get map特性是key可以是任何数据类型
    let map = new Map();
    let arr = ['123'];
    map.set(arr,456);//set添加新元素
    map.set('Anar',789)
    console.log(map);
    map.has(arr);//是否存在key arr: true
    map.get(arr);//获取 456
    map.delete('Anar');//删除'Anar'
    map.clear();//清空
    console.log(map)
}
{
    let map = new Map([['set',123],['get',456],['has',789]])
    map.get('set')//123
    map.size//3
    //遍历
    for(let key of map.keys()){
        console.log(key)
    }
    for(let values of map.values()){
        console.log(values)
    }
    for(let [key,values] of map.entries()){
        console.log(key,values)
    }
    map.forEach(function(item){
        console.log(item)
    })
}
{
    //WeakMap的用法 key值必须是对象
    //没有 clear 方法  没有Set属性  不能遍历
    let weakmap = new WeakMap();
    let o = {};
    weakmap.set(o,123);
    console.log(weakmap)
    console.log(weakmap.get(o))
}

















