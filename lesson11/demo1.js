//注意：IIFE是表达式，要注意使用分号结尾，否则可能出现错误
(function() {
    console.log("111");
})();//没有分号的话会报错
(function () {
    console.log("222");
})()
//类似两个函数调用表达式，必须用分号隔开，否则会报错


true && function(a,b){
    return a>b?a:b;
}(5,9);//9->与短路，左侧为真，返回右侧


//利用立即执行表达式可以避免变量污染


//ES5作用域与变量共享问题
//查看Scope窗体中getNumFuncs中每一个函数的内
//部属性[[Scopes]]中的第0个元素闭包中的变量，看是否存在共享问题
function f(){
    var getNumFuncs = [];//函数数组
    for(var i=0;i<10;i++){
        getNumFuncs[i] = function(){
            return i;
        };
    }
    return getNumFuncs;//设置断点，查看变量共享问题
}
var tmp = f();
tmp[3]();//tmp[0]()...tmp[9]()都为10
//返回的i是变量,ES5没有块作用域，所以一旦i值改变，则数组中的值会变

//以上代码等价于 存在变量共享问题
function f(){
    var getNumFuncs = [];//函数数组
    var i=0;
    for(;i<10;i++){
        getNumFuncs[i] = function(){
            return i;
        };
    }
    return getNumFuncs;//设置断点，查看变量共享问题
}
var tmp = f();
tmp[3]();//tmp[0]()...tmp[9]()都为10


//IIFE 解决变量共享问题->使用立即执行表达式把共用的变量包起来
function f(){
    var getNumFuncs = [];//函数数组
    for(var i=0;i<10;i++){
        (function (j) {  //j可以全变成i
            getNumFuncs[j] = function(){return j;};
        })(i);
    }
    return getNumFuncs;//设置断点，查看变量共享问题
}
var tmp = f();
tmp[3]();//输出为3，tmp[0]()...tmp[9]()都为是期望的结果


//局部变量的案例
function f(){
    var getNumFuncs = [];//函数数组
    var j;
    for(var i=0;i<10;i++){
        j = i;
        getNumFuncs[i] = function(){
            return j;//如果return i;的话输出10->同上，共用i
        };
    }
    return getNumFuncs;//设置断点，查看变量共享问题
}
var tmp = f();
tmp[3]();//tmp[0]()...tmp[9]()都为9
//i=9时，j=9;i=10时，跳出循环，因此最后j=9


//变量共享问题
for (var i = 0; i < 5; i++) {
    console.log("i=",i);
    setTimeout(function() { //异步执行，共用一个i
        console.log(new Date, i);
    }, 1000*i);
}
console.log("i：",i);
// i= 0
// i= 1
// i= 2
// i= 3
// i= 4
//i：5
//Mon Apr 09 2018 20:55:02 GMT+0800 (中国标准时间) 5
//Mon Apr 09 2018 20:55:03 GMT+0800 (中国标准时间) 5
//Mon Apr 09 2018 20:55:04 GMT+0800 (中国标准时间) 5
//Mon Apr 09 2018 20:55:05 GMT+0800 (中国标准时间) 5
//Mon Apr 09 2018 20:55:06 GMT+0800 (中国标准时间) 5


//通过IIFE解决变量共享问题
for (var i = 0; i < 5; i++) {
    console.log("i=",i);
    (function(j) {  // j = i
        setTimeout(function() {
            console.log(new Date, j);
        }, 1000*i);
    })(i);
}
console.log("i:",i);
// i= 0
// i= 1
// i= 2
// i= 3
// i= 4
// i: 5
//Mon Apr 09 2018 21:02:40 GMT+0800 (中国标准时间) 0
//Mon Apr 09 2018 21:02:41 GMT+0800 (中国标准时间) 1
//Mon Apr 09 2018 21:02:42 GMT+0800 (中国标准时间) 2
//Mon Apr 09 2018 21:02:43 GMT+0800 (中国标准时间) 3
//Mon Apr 09 2018 21:02:44 GMT+0800 (中国标准时间) 4