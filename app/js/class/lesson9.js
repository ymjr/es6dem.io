//Proxy 和 Reflect 实现代理
{
    //Proxy 实现代理
    let obj ={
        time:'2017-03-11',
        name:'net',
        _r:123
    };

    let monitor = new Proxy(obj,{
        //拦截对象属性的读取
        get(target,key){
            return target[key].replace('2017','2018')
        },
        //拦截对象设置属性
        set(target,key,value){
            if(key==='name'){
                return target[key]=value;
            }else {
                return target[key];
            }
        },
        //拦截key in object 操作
        has(target,key){
            if(key==='name'){
                return target[key]
            }else {
                return false
            }
        },
        //拦截delete 删除操作
        deleteProperty(target,key){
            if(key.indexOf('_')>-1){
                delete target[key];
                return true;
            }else{
                return target[key]
            }
        },
        //拦截 Object.keys,Object.getOwnPropertySymbols,Object.getOwnPropertyNames
        ownKeys(target){
            //此处不能用 find find返回符合条件的一个数 filter返回符合条件的所有并是一个数组
            return Object.keys(target).filter(item=>item!='time');
        }
    });

    console.log('get',monitor.time)
    monitor.time='2018';
    console.log('set',monitor);
    monitor.name='tang';
    console.log('set',monitor);
    console.log('has','name' in monitor,'time' in monitor)

    // delete monitor.time;
    // console.log('delete',monitor)
    //
    // delete monitor._r;
    // console.log('delete',monitor);
    console.log('ownKeys',Object.keys(monitor));
}
{
    //find 和 filter 的区别
    //find返回符合条件的一个数 filter返回符合条件的所有并是一个数组
    let obj ={
        time:'2017-03-11',
        name:'net',
        _r:123
    };
    let fin = Object.keys(obj).find(item=>item!='time')
    let fil = Object.keys(obj).filter(item=>item!='time')
    console.log('find',fin);//返回符合的第一个数 name
    console.log('filter',fil);//返回一个数组[ "name", "_r" ]
}
{
    let obj ={
        time:'2017-03-11',
        name:'net',
        _r:123
    };
    Reflect.get(obj,'time')//获取 2017-03-11
    console.log('Reflect get',Reflect.get(obj,'time'));
    Reflect.set(obj,'name','tang')//设置
    console.log('Reflect set',obj);
    console.log('has',Reflect.has(obj,'name'))//true
}
{
    //hasOwnProperty()判断原型链上是否有某个属性
    function validator(target,validator){
        return new Proxy(target,{
            _varlidator:validator,
            set(target,key,value,proxy){
                if(target.hasOwnProperty(key)){
                    let va = this._varlidator[key];
                    if(!!va(value)){
                        return Reflect.set(target,key,value,proxy)
                    }else {
                        throw Error(`不能设置${key}到${value}`)
                    }
                }else {
                        throw Error(`${key}不存在`)
                }
            }
        })
    }
    //条件
    const personValidators={
        name:function(val){
            return typeof val ==='string'
        },
        age:function(val){
            return typeof val ==='number' && val>18
        }
    }

    class Person{
        constructor(name,age){
            this.name=name;
            this.age=age;
            return validator(this,personValidators)
        }
    }
    const person = new Person('lilei',30);
    person.age=22;
    console.info(person);
}














