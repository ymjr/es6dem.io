//正则
{
    let regex = new RegExp('xyz','i');
    let regex2 = new RegExp(/\d/);
    let str='abc11'
    console.log(regex.test(str),regex2.test(str))
    let regex3 = new RegExp(/xyz/ig,'i');
    //flags获取修饰符的一种方式
    console.log(regex3.flags);
}
{
    //y修饰符 只匹配一次
    let s = 'aaa_bb_b';
    let a1 = /b+/g;
    let a2 = /b+/y;
    console.log('one',a1.exec(s),a2.exec(s));
    console.log('one',a1.exec(s),a2.exec(s));
    //sticky判断正则对象开启y修饰符
    console.log(a1.sticky,a2.sticky)
}
{
    //u修饰符 代表 Unicode
    //大于两个字节的要用u
    console.log('u-1',/^\uD83D/.test('\uD83D\uDC2A'))
    console.log('u-2',/^\uD83D/u.test('\uD83D\uDC2A'))

    console.log(/\u{61}/.test('a'));
    console.log(/\u{62}/u.test('b'));

    console.log('\u{20BB7}');

    let s='𠮷';

    console.log('u',/^.$/.test(s));
    console.log('u-2',/^.$/u.test(s));

    console.log('test',/𠮷{2}/.test('𠮷𠮷'));
    console.log('test-2',/𠮷{2}/u.test('𠮷𠮷'));

    //s修饰符 暂时还没有实现 空格符 制表符


}
















