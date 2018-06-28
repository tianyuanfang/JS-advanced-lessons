//demo01
// Promise构造函数用于实例化Promise对象
// Promise构造函数接受一个函数（执行器）作为参数，创建Promise对象时，执行器会立即执行
// 该执行器的两个参数分别是resolve函数和reject函数。
// resolve和reject这两个函数，由 JavaScript 引擎提供，不用自己部署。

// resolve函数的作用是，将Promise对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved）
// 在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；
// reject函数的作用是，将Promise对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected）
// 在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

// Promise实例生成以后，可以用then方法分别指定resolved状态和rejected状态的回调函数


// Promise案例一
var myFirstPromise = new Promise(function(resolve, reject) {
    //当异步代码执行成功时，我们才会调用resolve(...), 当异步代码失败时就会调用reject(...)
    //在本例中，我们使用setTimeout(...)来模拟异步代码，实际编码时可能是XHR请求或是HTML5的
    //一些API方法.
    console.log("step1");
    setTimeout(function() {
        resolve("成功!"); // 思考：如果改为 reject("失败");
        reject("失败");
    }, 2500);
    //简写的方式  setTimeout(resolve,2500,"成功!");//等效于上面3行
    console.log("step2");
});
myFirstPromise.then(function(successMessage) {
    //successMessage的值是上面调用resolve(...)方法传入的值.
    console.log("Yes! " + successMessage);
}, function(errorMessage) {
    console.log("No! " + errorMessage);
});
// step1
// step2
// Promise {<pending>}
// Yes! 成功!


//Promise 案例二
var promise = new Promise(function(resolve, reject) {
    console.log("创建Promise对象时，执行器会立即执行");
    var a = "xxx";
    setTimeout(() => {
        if (a == "abc") {
            resolve(a);
        } else {
            reject(new Error("error"));
        }
    }, 2000); //2秒后执行（异步执行）
    a = "abc"; //试试改为 a = "yyy";
});
promise.then(function(val) { //切换到fulfilled状态后调用，接收resolve的参数
    console.log(val);
}, function(err) { //切换到rejected状态后调用，接收reject的参数
    console.log(err);
});
//当 a = "abc"时
// 创建Promise对象时，执行器会立即执行
// Promise {<pending>}
// abc

//当 a = "yyy"时
// 创建Promise对象时，执行器会立即执行
// Promise {<pending>}
// Error: error
//     at setTimeout (<anonymous>:8:20)


// 案例三
function timeout(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms, 'done');
        //注意：一旦状态改变，就不会再变状态，就凝固了，不会再变了
        setTimeout(reject, ms + 500, 'failed'); //思考：会转换为reject状态么->会
    });
}
timeout(1000).then(
    (value) => {
        console.log(value);
    },
    (err) => { //思考：此行是否会被调用
        console.log(err);
    });
//Promise {<pending>}
//done


//补充案例
// var p = new Promise((a,b)=>{
new Promise((a, b) => {
    setTimeout(a, 1000, "x"); //setTimeout(b,1000,"x");
}).then(
    (v) => { console.log("v1:", v) },
    (e) => { console.log("e1:", e) }
).then(
    (v) => { console.log("v2:", v) },
    (e) => { console.log("e2:", e) }
);
//Promise {<pending>}
//v1: x
//v2: undefined


//demo02
//Promise的原型方法，Promise.prototype.then
//then的基本案例 Part1
function promiseTest(ms) {
    return new Promise((resolve, reject) => {
        console.log(111);
        setTimeout(resolve, ms, 'done'); //setTimeout(reject, ms, 'failed');
        //return setTimeout(resolve, ms, 'done');//若不想输出222，则需要立即返回
        console.log(222);
    });
}
promiseTest(2000).then(
        (val) => { console.log('this is success callback:', val) },
        (err) => { console.log('this is fail callback:', err) }
    )
    // 111
    // 222
    // Promise {<pending>}
    // this is success callback: done


//then的链式调用 Part2
var p = new Promise(function(resolved, rejected) {
    console.log("11");
    resolved("22"); //思考：rejected("22");
    console.log("33");
});
p.then(function(v1) {
        console.log("44", v1);
    }, function(e1) {
        console.log("55", e1);
    })
    .then(function(v2) {
        console.log("66", v2);
    }, function(e2) {
        console.log("77", e2);
    })
    .then(function(v3) {
        console.log("88", v3);
    }, function(e3) {
        console.log("99", e3);
    });
// 11
// 33
// 44 22
// 66 undefined
// 88 undefined
// Promise {<resolved>: undefined}


//返回值为新的Promise的情况
var p = new Promise(function(resolved, rejected) {
    console.log("11");
    rejected("22");
    console.log("33");
});
p.then(function(v1) {
        console.log("44", v1);
    }, function(e1) {
        console.log("55", e1);
        return new Promise((resolved, rejected) => {
            // rejected("55");
            setTimeout(() => {
                rejected("55");
            }, 2000, );
        });
    })
    .then(function(v2) {
        console.log("66", v2);
    }, function(e2) {
        console.log("77", e2);
    })
    //11
    //33
    //55 22
    //Promise {<pending>}
    //77 55


//补充案例
////11111111
var p = new Promise((resolve, reject) => {
    setTimeout(resolve, 2000, "hi");
});
p.then((v) => { console.log(v) });
//Promise {<pending>}
//hi

////222222222
var p = new Promise((resolve, reject) => {
    setTimeout(resolve, 2000, "hi");
});
var x = p.then((v) => { console.log(v) });
console.log(x);
console.log(x instanceof Promise);
//Promise {<pending>}
//true
//hi

////3333333
var p = new Promise((resolve, reject) => {
    setTimeout(resolve, 2000, "hi");
});
var x = p.then((v) => { console.log("x:", v) });
console.log(x instanceof Promise);
var y = x.then((v) => { console.log("y:", v) });
console.log(y instanceof Promise);
//true
//true
//x: hi
//y: undefined

////4444444444
var p = new Promise((resolve, reject) => {
    setTimeout(resolve, 2000, "hi");
});
p.then((v) => {
    console.log("x:", v);
    return new Promise((resolve, reject) => {
        setTimeout(resolve, 2000, v + ":xx");
    })
}).then(v => console.log(v), e => console.log(e));
// Promise {<pending>}
// x: hi
// hi:xx