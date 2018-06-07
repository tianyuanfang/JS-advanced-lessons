//Part11111 ES5
//ES5中没有块作用域，通过var声明的变量，容易造成变量污染、变量共享
//可以通过IIFE来解决上述问题
//变量共享问题
for (var i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log(new Date, i);
    }, 1000 * i);
}
//Mon Jun 04 2018 15:55:36 GMT+0800 (中国标准时间) 3
//Mon Jun 04 2018 15:55:37 GMT+0800 (中国标准时间) 3
//Mon Jun 04 2018 15:55:38 GMT+0800 (中国标准时间) 3

//通过IIFE解决变量共享问题
for (var i = 0; i < 3; i++) {
    (function(j) { // j = i
        setTimeout(function() {
            console.log(new Date, j);
        }, 1000 * i);
    })(i);
}
//Mon Jun 04 2018 15:57:29 GMT+0800 (中国标准时间) 0
//Mon Jun 04 2018 15:57:30 GMT+0800 (中国标准时间) 1
//Mon Jun 04 2018 15:57:31 GMT+0800 (中国标准时间) 2


//Part22222 ES6(ES2015)有块级作用域
//使用了let就可以避免var所带来的问题
let userId = 123;
document.onclick = function() {
    console.log("userId = ", userId);
};
//......
let a = 2,
    b = 3;
if (a < b) {
    let userId = 234;
}
//一点击：userId =  123


//let 定义的变量 并不像 var 那样直接作为全局对象的属性
var x = 23;
let y = 34;
console.log(window.x, window.y); //23 undefined


//使用let可有效避免变量共享问题
for (let i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log(new Date, i);
    }, 1000 * i);
}
//Mon Jun 04 2018 16:07:58 GMT+0800 (中国标准时间) 0
//Mon Jun 04 2018 16:07:59 GMT+0800 (中国标准时间) 1
//Mon Jun 04 2018 16:08:00 GMT+0800 (中国标准时间) 2


//const声明常量，常变量经常大写
const PI = 3.1415926;
console.log(PI); //3.1415926
PI = 3; //给常量再赋值 报错


//声明时必须赋值,一旦声明必须立即初始化
const foo; //报错
const foo = 123; //ok


//const作用域同let
if (true) {
    const MAX = 5;
}
console.log(MAX); //报错


//const 除了声明常量外，也常用来声明不变的函数
const fee = function() {
    //...
};


//const指向的对象引用不可变，但其属性或元素（如果是数组对象的话）是可变的
const a = []; //a指向一个空数组
a.push(123, 234); //可以
a.length = 1; //可以
a = "str"; //报错
//因为a是const常量，其元素或属性可改，但其引用不能修改
//类似于 const指针


// ES6中 let和const 不进行变量提升特性
//var 声明变量
console.log(a); //undefined
var a = 1;
console.log(a); //1

//预解析 上述代码等效于
// var a;
// console.log(a);
// a = 1;
// console.log(a);


//ES5中，没有块作用域，但有函数作用域
var temp = new Date();

function f() {
    console.log(temp);
    if (false) {
        var temp = "Hi!";
    }
}
f(); //undefined
//预解析 上述代码等效于
// var temp = new Date();
// function f() {
//     var temp;
//     console.log(temp);
//     if(false){
//         temp = "Hi!";
//     }
// }
// f();


// let和const的暂时性死区特性
// 只要块级作用域内存在let，它所声明的变量就“绑定”在这个区域，不再受外部影响
// let对这个块从一开始就形成了封闭的作用域，凡是在声明之前使用该变量，就会报错
// let和const不存在变量提升
console.log(a); //报错
let a = 2;


let temp = new Date();

function f() {
    console.log(temp);
    if (false) {
        let temp = "Hi!"; //let在if中形成了暂时性死区
    }
}
f(); //Thu Jun 07 2018 08:12:51 GMT+0800 (中国标准时间)


var temp = new Date();

function f() {
    console.log(temp);
    let temp = "Hi!"; //let在f()中形成了块级暂时性死区，必须先定义后使用  
}
f(); //报错


typeof b; //报错 ReferenceError 需要使用前定义
let b; //若没有此行，上一行->undefiend

var tmp = 123;
if (true) {
    tmp = "abc"; //报错 ReferenceError 需要使用前定义
    let tmp;
}

//let const不能重复声明
let abc;
let abc; //报错

function foo1() {
    let x;
    var x;
}
foo1(); //报错 重复定义

function foo2() {
    let x;
    let x;
}
foo2(); //报错 重复定义