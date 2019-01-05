//Promise
//什么是异步  Promise的作用   Promise的基本用法
{
    //基本定义
    let ajax = function(callback){
       // console.log('执行');
        setTimeout(function(){
            callback&&callback.call()
        },1000);
    }
    ajax(function(){
       // console.log('timeout1');
    })
}
{
    //Promise
    let ajax=function(){
        //console.log('执行2，Promise');
        return new Promise(function(resolve,reject){
            setTimeout(function () {
                resolve()//执行下一步操作
            }, 1000);
        })
    };
    ajax().then(function(){
       // console.log('promise,timeout2');
    })
}
{   //Promis执行顺序
    let ajax=function(num){
        console.log('执行3，Promise');
        return new Promise(function(resolve,reject){
            setTimeout(function () {
                resolve()//执行下一步操作
            }, 1000);
        })
    };

    let obj =ajax(6).then(function(num){
        console.log('Promise3-1');
        return new Promise(function (resolve,reject) {

                setTimeout(function(){
                    resolve();
                },1000);

        })
    })
    .then(function(){
        console.log('Promise3-2')
        return new Promise(function(resolve,reject){
            setTimeout(function(){
                resolve();
            },1000)
        })
    })
    .then(function(){
        console.log('Promise3-3')
    })
}

{
    //catch()捕获错误
    let ajax=function(num){
        console.log('执行--4，Promise');
        return new Promise(function(resolve,reject){
            if(num>5){
                setTimeout(function () {
                    resolve()//执行下一步操作
                }, 1000);
            }else{
                throw new Error('出错了')
            }
        })
    };

    ajax(6).then(function(){
        console.log('log',6);
    }).catch(function(err){
        console.log('catch',err);
    })

    ajax(3).then(function(){
        console.log('log',3);
    }).catch(function(err){
        console.log('catch',err);
    })
}
{
    //Promis高级用法 Promiss all([])  全部图片加载完就添加到页面

    function loadImg(src){
        return new Promise((resolve,reject)=>{
            let img = document.createElement('img');
            img.src = src;
            img.onload=function(){
                resolve(img);
            }
            img.onerror=function(err){
                reject(err);
            }
        })
    }

    function showImgs(imgs){
        imgs.forEach(function(img){
            document.body.appendChild(img);
            img.style.height='100px';
            img.style.width='100px';
        })
    }

    // 所有图片加载完就添加到页面
    Promise.all([
        loadImg('http://pic1.win4000.com/wallpaper/2/587987c5e6ca3.jpg'),
        loadImg('http://img.pptjia.com/image/20180117/f4b76385a3ccdbac48893cc6418806d5.jpg'),
        loadImg('http://pic6.photophoto.cn/20080219/0034034467797362_b.jpg'),
        loadImg('http://pic20.photophoto.cn/20110927/0034034802983209_b.jpg')
    ]).then(showImgs).catch(function(err){
       console.log('catch',err);
    })
}

{
    //Promise高级用法  Promise.race([]) 一个图片加载完就添加到页面
    function loadImg(src){
        return new Promise((resolve,reject)=>{
            let img = document.createElement('img');
            img.src = src;
            img.onload=function(){
                resolve(img);
            }
            img.onerror=function(err){
                reject(err);
            }
        })
    }

    function showImgs(img){
        let p = document.createElement('p');
        p.appendChild(img);
        document.body.appendChild(p)
        img.style.height='100px';
        img.style.width='100px';
    }

   // 一个图片加载完就添加到页面其他忽略不管
    Promise.race([
        loadImg('http://pic1.win4000.com/wallpaper/2/587987c5e6ca3.jpg'),
        loadImg('http://img.pptjia.com/image/20180117/f4b76385a3ccdbac48893cc6418806d5.jpg'),
        loadImg('http://pic6.photophoto.cn/20080219/0034034467797362_b.jpg'),
        loadImg('http://pic20.photophoto.cn/20110927/0034034802983209_b.jpg')
    ]).then(showImgs).catch(function(err){
        console.log('catch',err);
    })
}


















