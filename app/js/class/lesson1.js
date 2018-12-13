{
    let regex = new RegExp('xyz','i');
    let regex2 = new RegExp(/\d/);
    let str='abc11'
    console.log(regex.test(str),regex2.test(str))
    let regex3 = new RegExp(/xyz/ig,'i');
    console.log(regex3.flags);
}
{
    //y修饰符
    let s = 'aaa_bb_b';
    let a1 = /b+/g;
    let a2 = /b+/y;
    console.log('one',a1.exec(s),a2.exec(s));
    console.log('one',a1.exec(s),a2.exec(s));
    console.log(a1.sticky,a2.sticky)
}
{

}
















