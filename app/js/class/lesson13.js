//Generator
{
    //generator基本用法
    let tell = function*(){
        yield 'a';
        yield 'b';
        return 'c'
    };
    let k = tell();
    console.log(k.next());
    console.log(k.next());
    console.log(k.next());
    console.log(k.next());
    for(let values of tell()){
        console.log(values)
    }
}
{
    let obj = {};
    obj[Symbol.iterator]=function*(){
        yield 1;
        yield 2;
        yield 3;
    }

    for(let value of obj){
        console.log('value',value)
    }
}
{
    let obj={}
    obj[Symbol.iterator]=function*(){
        yield [1,3,2];
        yield [7,9,8];
    }
    for(let value of obj){
        console.log('value',value)
    }
}
{
    //状态机
    let state = function*(){
        while (1){
            yield 'A';
            yield 'B';
            yield 'C';
        }
    }
    let status = state();
    console.log('status',status.next());
    console.log('status',status.next());
    console.log('status',status.next());
    console.log('status',status.next());

}
{
    //抽奖
   let draw = function(count){
       console.log(`剩余${count}次`)
   }

   let residue = function*(count){
       while (count>0){
           count--
           yield draw(count);
       }
   }

   let star=residue(5);

   let btn = document.createElement('button');
   btn.id='start';
   btn.textContent='抽奖';
   document.body.appendChild(btn);

   document.getElementById('start').addEventListener('click',function(){
       star.next()
   },false)
}
{
    //长轮询
    let ajax = function* (){
        yield new Promise(function(resolve,reject){
            resolve({code:0})
        },200);
    }

    let pull = function(){
        let genertaor = ajax();
        let step = genertaor.next();
        step.value.then(function(d){
            if(d.code!=0){
                setTimeout(function(){
                    console.log('wait')
                    pull()
                },1000)
            }else {
                console.log(d)
            }
        })
    }
    pull()
}
