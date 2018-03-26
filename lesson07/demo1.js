//函数定义
//1.直接定义：function 函数名(){...}
//2.函数表达式：var max=function(){...}->匿名或不匿名函数
//3.Function构造函数：var add=new Function("a","b","return a+b");

//略讲：非匿名函数便于调用栈追踪 测试使用匿名和非匿名函数的区别
var foo = function max(a,b){
    console.trace();
    return console.log(a>b?a:b);
};
foo(2,3);
//console.trace
// max
// 3


//函数调用
//普通函数直接调用
function test1() {
    console.log("this is",this);
}
test1();//window->主体


//思考嵌套的情况下
function test2() {
    function test3(){
        console.log("this is",this);
    }
    test3();
}
test2();//window->嵌套下主体是window

var x=45;
var obj = {   
    x:23,
    test:function(){
       function foo(){
            console.log(this.x);
         }
       foo();  
    } 
};
obj.test();//45->嵌套类下主体是window


//简单举例
var obj={
   x:1,
   f1:function(){
     return function f2(){
         consloe.log(this.x);
      }
    }
}
obj.f1();
// ƒ f2(){
//        consloe.log(this.x);
//       }


//对象方法调用
var obj = {
    name:"obj",
    x:23,
    test:function(){
        console.log(this.x,this);
    }
};
obj.test();//23 {name: "obj", x: 23, test: ƒ}

//给obj动态添加方法
var sayHi = function () {
    console.log("Hi，i'm",this.name);
};
obj.sayHi = sayHi;//添加给对象添加方法
obj.sayHi();//Hi，i'm obj
//思考：若直接调用sayHi();
//var name = "全局";
//sayHi();//Hi，i'm 全局

//思考如下代码 详情参见高阶函数章节
var fun1 = function () {
    return function fun2() {
        return this.x;//若改为 return this;
    }
};
obj.fun3 = fun1;
obj.fun4 = fun1();
/*
类似于
fun3:function () {
    return function fun2() {
        return this.x;
    }
};
fun4:function fun2() {
        return this.x;
    }
*/
console.log(obj.fun3());
    //   ƒ fun2() {
    //     return this.x;
    // }
console.log(obj.fun3()());//undefined->相当于嵌套函数，this为window
console.log(obj.fun4());//23


var obj = {
    name:"obj",
    x:23,
    test:function(){
        console.log(this.x,this);
    }
};
var fun1 = function () {
    return function fun2() {        
      return this;
    }
};
obj.fun3 = fun1;
obj.fun4 = fun1();
console.log(obj.fun3());   
console.log(obj.fun3()());
console.log(obj.fun4());
// ƒ fun2() {       
//     return this;
// }
// Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, frames: Window, …}
// {name: "obj", x: 23, test: ƒ, fun3: ƒ, fun4: ƒ}


var x=45;
var test=function(){
  console.log("输出：",this.x);
}
var obj={
 x:23
}
obj.test=test;
obj.test();//输出：23->主体：obj
test();//输出：45->主体：window


//间接调用 实例一 间接调用的对象要和原对象之间，
//在数据结构上有对应的相似处，以便不影响调用效果
objA = {name:"AA"};
objB = {name:"BB"};
objA.foo = function(){
    console.log(this.name);
};
objA.foo();//AA
objA.foo.call(objB);//BB->objB为主体，调用方法objA.foo()


//间接调用 实例二 移花接木 吸星大法
//fish.swim.call(me,3,4);->call():me是主体，调用fish.swim()方法，直接传参数
//bird.fly.apply(me,[7,8]);—>apply():me是主体，调用bird.fly()方法，用数组传参数
var name="全局";
var fish = {
    name:"fish",
    swim:function (m,n) {
        console.log("i'm "+this.name+" i cam swim ___",m,n);
    }
};
var bird = {
    name:"polly",
    fly:function(m,n){
        console.log("i'm:"+this.name+" i can fly ___",m,n);
    }
};
var me = {
    name:"ABC"
};
bird.fly(5,6);//i'm:polly i can fly ___ 5 6
fish.swim.call(me,3,4);//i'm ABC i cam swim ___ 3 4
bird.fly.apply(me,[7,8]);//i'm:ABC i can fly ___ 7 8
fish.swim(1,2);//i'm fish i cam swim ___ 1 2
fish.swim.call(null,1,2);//i'm 全局 i cam swim ___ 1 2
fish.swim.call(undefined,1,2);//i'm 全局 i cam swim ___ 1 2



function test() {
    console.log(arguments);
    console.log(Array.prototype.slice.call(arguments));//slice：划分为数组
}
test(1,2,3,"4",5);//[1, 2, 3, "4", 5]


//实参数大于形参数
function test() {
    console.log(arguments);
//Arguments(2) ["hello,", "world!", callee: ƒ, Symbol(Symbol.iterator): ƒ]
    console.log(test.arguments);
//Arguments(2) ["hello,", "world!", callee: ƒ, Symbol(Symbol.iterator): ƒ]
    console.log(test.arguments==arguments);//false->指向的不是一个引用
    console.log(arguments.length);//2
    console.log(typeof arguments);//object->类数组对象
    console.log(arguments instanceof Array);//false
    console.log(arguments instanceof Object);//true
    console.log(Array.prototype.slice.call(arguments));//["hello,", "world!"]
    var s = "";
    for (var i = 0; i < arguments.length; i++) {
        s += arguments[i];
    }
    return s;//"hello,world!"
}
test("hello,", "world!");


//实参数小于形参数->用默认值赋给没传的值
var sum = function(a,b,c){
    b = b||4;
    c = c||5;
    return a+b+c;
};
console.log(sum(1,2,3));
console.log(sum(1,2));
console.log(sum(1));


//值传递
var a = 1;
function foo(x) {
    console.trace("a:",a," x:",x);// a: 1  x: 1
    x = 2;//step 2222
    console.trace("a:",a," x:",x);//step 3333 // a: 1  x: 2
}

console.trace("a:",a);// a: 1
foo(a);// step 1111
console.trace("a:",a); // step 4444  a仍为1 // a: 1


//引用传递
var obj = {x:1};
function fee(o){
    console.trace("obj.x :",obj.x," o.x :",o.x);//obj.x : 1  o.x : 1
    o.x = 3;
    console.trace("obj.x :",obj.x," o.x :",o.x);//obj.x : 3 o.x : 3
}
console.trace("obj.x :",obj.x);//obj.x : 1
fee(obj);
console.trace("obj.x :",obj.x);//obj.x : 3
document.onclick = function () {//测试Event Listener Breakpoints
    alert("click");
    //var body =  document.getElementsByName("body");
};

