//安装一个稳定库 babel-polyfill
{
    console.log('a','\u0061');
    console.log('s','\u20BB7');

    console.log('s','\u{20BB7}');
}
{   //2个字节是一个长度
    let s= '𠮷';//大于两个字节
    console.log('length',s.length)

    //es5 处理
    console.log('0',s.charAt(0));//取第一个字符
    console.log('1',s.charAt(1));//取第二个字符
    console.log('at0',s.charCodeAt(0));//Unicode取码值
    console.log('at1',s.charCodeAt(1));//Unicode取码值

    //es6 处理
    let s1 = '𠮷a';
    console.log('length',s1.length);
    console.log('code0',s1.codePointAt(0));//Unicode码值
    console.log('code0',s1.codePointAt(0).toString(16));
    console.log('code1',s1.codePointAt(1));
    console.log('code2',s1.codePointAt(2).toString(16));
}

{
    //es5处理Unicode码值
    console.log(String.fromCharCode("0x20bb7"));

    //es6处理Unicode码值
    console.log(String.fromCodePoint("0x20bb7"))
}
{
    let str = '\u{20bb7}abc';
    for (let i=0;i<str.length;i++){
        console.log('es5',str[i]);
    }

    //es6字符串遍历
    for(let code of str){
        console.log('es6',code);
    }
}
{
    //字符串包含某个字符
    let str="string";
    //includes()包含某个字符
    console.log('includes',str.includes('r'));
    //startsWith()以什么开始
    console.log('start',str.startsWith('str'))
    //endsWith()以什么结束
    console.log('end',str.endsWith('ng'))
}
{
    let str = "abc";
    //repeat()字符串重复
    console.log(str.repeat(2));
}
{
    //模板字符串
    let name = "list";
    let info = "hello world";
    let m=`i am ${name},${info}`;
    console.log(m);
}
{
    //padStart(len,str);向前补白 len 长度 str补上去的字符
    console.log('1'.padStart(2,'0'));//01
    //padEnd(len,str);向后补白 len 长度 str补上去的字符
    console.log('1'.padEnd(2,'0'))//10
}
{
    //标签模板
    let user={
        name:'list',
        info:'hello world'
    };
    let str = abc`i am ${user.name},${user.info}`;
    console.log(str)
    function abc(s,v1,v2){
        console.log(v1,v2);
       return s+v1+v2;
    }
}
{
    console.log(String.raw`Hi\n${1+2}`);
    console.log(`Hi\n${1+2}`);

}
