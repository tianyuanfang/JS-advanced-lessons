// Part111111111111111  函数回调
// 案例一 同步执行的回调
var arr1 = [1, 3, 5, 7, 9];
console.log("arr1:", arr1);
var newArray1 = arr1.map(function(a) {
    return a * a;
});
console.log("newArray1:", newArray1);

var arr2 = [1, 3, 5, 7, 9];
console.log("arr2:", arr2);
var newArray2 = arr2.filter(function(a) { //产生新数组，新数组的元素是返回为true的那些元素
    return (a > 2 && a < 8) ? true : false;
});
console.log("newArray2:", newArray2);
//arr1: (5) [1, 3, 5, 7, 9]
//newArray1: (5) [1, 9, 25, 49, 81]
//arr2: (5) [1, 3, 5, 7, 9]
//newArray2: (3) [3, 5, 7]


// 案例二 异步执行的回调(通过定时器模拟)
var LTimeOperation = function(taskID) {
    var id = taskID;
    //思考什么时候将方法定义在构造函数内，什么时候定义在构造函数的prototype属性上
    this.go = function(callback) {
        console.log('Start LTimeOperation #' + id);
        var delay = parseInt((Math.random() * 10000000) % 5000);
        setTimeout(function() {
            console.log('task #' + id + ' cost ' + delay + ' ms.');
            callback();
        }, delay);
    }
};

function f2() {
    console.log('this is f2, i am callback!\n');
}
for (var i = 0; i < 5; i++) {
    var task = new LTimeOperation(i);
    task.go(f2);
}
//其中一种情况
//Start LTimeOperation #0
//Start LTimeOperation #1
//Start LTimeOperation #2
//Start LTimeOperation #3
//Start LTimeOperation #4

//  task #4 cost 141 ms.
//  this is f2, i am callback!

//  task #1 cost 479 ms.
//  this is f2, i am callback!

//  task #3 cost 3435 ms.
//  this is f2, i am callback!

//  task #2 cost 3814 ms.
//  this is f2, i am callback!

//  task #0 cost 4129 ms.
//  this is f2, i am callback!


// Part22222222222222  事件触发与事件监听
// 案例一 在控制台中输出window 和 document ，看看window中的on 
//和document中的on
document.onclick = function() {
    console.log("document 被点击了！");
};

// 案例二->见demo2.html
//setAttribute() 方法添加指定的属性，并为其赋指定的值
for (var i = 0; i < 5; i++) {
    var btn = document.createElement("button");
    btn.setAttribute("id", "btnId" + i);
    btn.setAttribute("style", "width:200px");
    btn.setAttribute("style", "height:20px");
    document.body.appendChild(btn);
    console.log(btn);
}
//思考异步 与 变量共享的问题 ES5如何用IIFE来解决共享问题
//异步要用立即执行表达式括起来
for (var i = 0; i < 5; i++) {
    (function(i) {
        document.getElementById("btnId" + i).addEventListener("click",
            function() {
                document.bgColor = "#" + i * 2 + i * 2 + i * 2 + i * 2 + "00";
                console.log("#" + i * 2 + i * 2 + i * 2 + i * 2 + "00");
            });
    })(i);
}

// 案例三 在Nodejs环境下进行调试????????????????????????????????????????
var http = require('http');
var url = 'http://www.baidu.com';

http.get(url, function(res) {
    res.setEncoding('utf-8');
    res.on('data', function(data) {
        console.log(data);
    });
    res.on('end', function(end) {
        console.log('End!');
    });
});


//发布-订阅 实例/////////////////////
//发布-订阅模式又叫观察者模式，它定义了对象间的一种一对多的关系，
//让多个观察者对象同时监听某一个主题对象，当一个对象发生改变时，
//所有依赖于它的对象都将得到通知
var Subject = function() { //主题对象
    var _observer = [];
    this.attach = function(observer) { //添加一个观察者
        _observer.push(observer);
    };
    this.detach = function() { //删除一个观察者
        _observer.pop();
    };
    this.notify = function(msg) { //收到通知
        for (var i = 0; i < _observer.length; i++) {
            _observer[i].update(msg);
        }
    };
    this.print = function() {
        console.log(_observer.length);
        console.log(_observer);
    };
};
var Observer = function(name) {
    this.update = function(msg) {
        console.log('i am ' + name + ',and i get the message: ' + msg);
    };
};
var sub = new Subject()
sub.attach(new Observer('a'));
sub.attach(new Observer('b'));
sub.notify('hello');
sub.print();
//i am a,and i get the message: hello
//i am b,and i get the message: hello
//2
//(2) [Observer, Observer]
setTimeout(function() {
    sub.detach();
    sub.attach(new Observer('c'));
    sub.notify('world');
    sub.print();
}, 5000);
// i am a,and i get the message: world
// i am c,and i get the message: world
// 2
// (2) [Observer, Observer]

//Promise 参见ES6部分///////////////////////