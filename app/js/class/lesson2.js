//数值扩展
{
    console.log(0b111110111)//2进制数值表示方法
    console.log(0o767)//8进制数值表示方法
}
{
    //Number.isFinite判断数值是不是有尽
    console.log('15',Number.isFinite(15));//true
    console.log('NaN',Number.isFinite(NaN));//false
    console.log('1/0',Number.isFinite(1/0));//false

    //Number.isNaN 判断不是一个数
    console.log('NaN',Number.isNaN(NaN));//true
    console.log('2',Number.isNaN(2));//false
}
{
    //Number.isInteger判断是不是整数
    console.log('25',Number.isInteger(25));//true
    console.log('25.0',Number.isInteger(25.0));//true
    console.log('25.1',Number.isInteger(25.1));//false
    console.log('25',Number.isInteger('25'));//false 参数只能是数字
}
{
    //js最大 和 最小存储范围
    console.log(Number.MAX_SAFE_INTEGER,Number.MIN_SAFE_INTEGER);
    //判断数的安全范围值 Number.isSafeInteger(); 参数要保证是一个数
    console.log('10',Number.isSafeInteger(10))//true
    console.log('a',Number.isSafeInteger('a'));//false 'a'不是一个数字
}
{
    //Math.trunc 取整
    console.log(4.1,Math.trunc(4.1));//4 只取整数部分
    console.log(4.9,Math.trunc(4.9));//4 只取整数部分
}
{
    //Math.sing 判断 正负零NaN
    console.log('-5',Math.sign(-5));//-1
    console.log('0',Math.sign(0));//0
    console.log('5',Math.sign(5));//1
    console.log('50',Math.sign('50'));//1 可以传字符串类型的数字
    console.log('foo',Math.sign('foo'));//NaN
}
{
    //Math.cbrt()求立方根
    console.log('-1',Math.cbrt(-1));//-1
    console.log('8',Math.cbrt(8));//2
}
