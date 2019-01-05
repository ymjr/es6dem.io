{
    let readonly=function(target,name,descriptor){
        descriptor.writable=false;
        return descriptor
    };

    class Test{
       @readonly
        time(){
            return '2017-03-11'
        }
    }

    let test=new Test();

    test.time=function(){
        console.log('rest time');
    }

    console.log(test.time());
}
