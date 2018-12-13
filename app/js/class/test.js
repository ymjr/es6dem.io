{   //结构赋值
    let a,b,rest;
    [a,b]=[1,2];
    console.log(a,b)
}
{
    let a,b,rest;
    [a,b,...rest]=[1,2,3,4,5]
    console.log(a,b,rest)
}
{
    let a,b;
    ({a,b}={a:1,b:2})
    console.log(a,b)
}
{   //如果结构赋值没有配对就是undefined
    let a,b,rest;
    [a,b,c]=[1,2];
    console.log(a,b,c)
}
{
let a=1;
let b=2;
[a,b]=[b,a]
    console.log(a,b)
}
{
    function f(){
        return [1,2]
    }
    let a,b;
    [a,b]=f();
    console.log(a,b)
}
{
    function f() {
        return [1,2,3,4,5]
    }
    let a,b,c;
    [a,,,b]=f();
    console.log(a,b)
}
{
    function f() {
        return [1,2,3,4,5,6,7,8]
    }
    let a,b,c;
    [a,,,...b]=f();
    console.log(a,b)
}{
    let o={p:42,q:true};
    let {p,q}=o;
    console.log(p,q)
}
{
    let {a=10,b=5}={a:7}
    console.log(a,b)
}
{
    let metaData={
        title:'abc',
        test:[{
            title:'test',
            desc:'descrifksjfh'
        }]
    }
    let {title:esTitle,test:[{title:cnTitle}]}=metaData;
    console.log(esTitle,cnTitle)
}































































