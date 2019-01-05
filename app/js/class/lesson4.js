//函数扩展
//参数默认值   rest参数    扩展运算符   箭头函数    this绑定    尾调用
{
    //参数默认值
    function test(x,y='world'){
        console.log('默认值',x,y)
    }
    test('hello');
    test('hello','kill');
}
{
    //作用域
    let x = 'test';
    function test2(c,y=x){
        console.log('作用域',c,y)
    }
    test2('kill');
    test2();
}
{   //  res参数
    function test3(...arg){
        for(let v of arg){
            console.log('res',v)
        }
    }
    test3('q',2,3,4,6,'h');
}
{   //  res
    console.log(...[1,2,3]);
    console.log('a',...[1,2,3])
}
{
    //箭头函数
    let arrow = v => v*2;
    let arrow2 = ()=> 5;
    console.log('arrow',arrow(3));
    console.log('arrow2',arrow2());
}
{
    //尾调用
    function tail(x){
        console.log('tail',x);
    }
    function fx(x){
        return tail(x)
    }
    fx(123)
}

















