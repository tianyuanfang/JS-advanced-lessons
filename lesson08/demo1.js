function foo(){}
console.log(foo); //ƒ foo(){}
console.log(typeof foo); //function
console.log(foo instanceof Object); //true
console.log(foo instanceof Function); //true
console.log(foo === window.foo); //true


//Function Array Date Error是函数，Math JSON是非函数对象
console.log(typeof Function);//function
console.log(typeof Array);//function
console.log(typeof Date);//function
console.log(typeof Error);//function
console.log(typeof Math);//object
console.log(typeof JSON);//object


var a=new Array(5);
console.log(a);//(5) [empty × 5]->长度为5

var b=new Array("5");
console.log(b);//["5"]->长度为1


console.log(typeof new Function());//function->创建函数的第三种方法
console.log(typeof new Array());//object
console.log(typeof new Date());//object
console.log(typeof new new Function());//object


//Function Array Date Error是函数，Math JSON是非函数对象
console.log(Function instanceof Function);//true
console.log(Function instanceof Object);//true

console.log(Array instanceof Function);//true
console.log(Array instanceof Object);//true

console.log(Date instanceof Function);//true
console.log(Date instanceof Object);//true

console.log(Math instanceof Function);//false
console.log(Math instanceof Object);//true

console.log(JSON instanceof Function);//false
console.log(JSON instanceof Object);//true


function f(x,y,z){}
console.log(f.length);//3->形参长度
f(1,2);
console.log(arguments.length);//2->实参长度


//函数对象属性之arguments 实参集合（类似数组的一个对象）
var foo = function (a,b){
    console.log(arguments);//类似数组的一个对象    
    //arguments 是Symbol类型，独一无二的，具体参见后续ES6部分
    //Arguments(4) [1, 2, 3, 4, callee: ƒ, Symbol(Symbol.iterator): ƒ]
    console.log(foo.arguments);
    //Arguments(4) [1, 2, 3, 4, callee: ƒ, Symbol(Symbol.iterator): ƒ]
    console.log(arguments === foo.arguments);//false

    console.log(arguments.length);//4
    var args = Array.prototype.splice.call(arguments,0);//移除0个元素
    console.log(args);//(4) [1, 2, 3, 4]
    var args = Array.prototype.splice.call(arguments,2);//移除2个元素
    console.log(args);//(2) [3, 4]
};
foo(1,2,3,4);


//函数对象属性之length 形参个数
function checkVarCount(a, b) {
    if (checkVarCount.length !== arguments.length) {
        alert("The count of the parameters you passed into the function"
        	+" doesn't match the function definition.");
    }else{
        alert("Successfully call the function");
    }
}
checkVarCount(1, 2);
//Successfully call the function
checkVarCount(1);
//The count of the parameters you passed into the function doesn't 
//match the function definition.


//函数对象属性之caller 获取调用当前函数的函数。
//例一
function test() {
    if (test.caller == null) {
        console.log("test is called from the toppest level");
    } else {
        console.log("test is called from the function:");
        console.log(test.caller.toString());
    }
}

//caller属性只有当函数正在执行时才被定义
console.log("没有调用的情况下test.caller为：",test.caller);
//没有调用的情况下test.caller为：null

test();//test is called from the toppest level

function testOuter() {
    test();
}
testOuter();
//test is called from the function:
// function testOuter() {
//     test();
// }

//例二
var obj = {
    foo1:function(){
        console.log(this.foo1.caller);
    },
    foo2:function abc(){
        this.foo1();
    }
};
obj.foo1();//null
obj.foo2();
// ƒ abc(){
//         this.foo1();
//     }


//函数对象属性之callee 返回正被执行的 Function 对象，
//即指定的 Function 对象的正文
//callee 属性是 arguments 对象的一个成员
//该属性仅当相关函数正在执行时才可用。通常这个属性被用来递归调用匿名函数
//求阶乘
var func = function(n){
    if (n <= 0)
        return 1;
    else
        return n * func(n - 1);
        //return n * arguments.callee(n - 1);
};
console.log(func(4));//24

//优点，可以是匿名函数
(function(n){
    if (n <= 0)
        return 1;
    else
        return n * arguments.callee(n - 1);
}(4));    


//函数对象属性之 prototype
//获取对象的原型。每一个构造函数都有一个prototype属性，指向另一个对象。
//这个对象的所有属性和方法，都会被构造函数的实例继承。
function Man(name, age) {
    this.name = name;
    this.age = age;
}
Man.prototype.sex = "M";
Man.prototype.sayHi = function () {
    console.log("Hi,i'm",this.name);
};
var li = new Man("Leo", 10);
li.sayHi();//Hi,i'm Leo
console.log(li.sex);//M

Man.prototype.isStrong = true;
console.log(li.isStrong);//true


//函数对象属性之 constructor 获取创建某个对象的构造函数。可以用来判断对象是哪一类
var x = new String("Hello");
if (x.constructor === String){
    console.log("Object is a String.");
}//Object is a String.

function MyObj() {
    this.number = 1;
}
var y = new MyObj();
if (y.constructor === MyObj){
    console.log("Object constructor is MyObj.");
}// Object constructor is MyObj.


//关于绑定 例一
var x = 45;
var obj = {
    x:23,
    test:function(){
        function foo(){
            console.log(this.x);
        }
        foo.bind(this)();//var fee = foo.bind(this); fee();
        //bind强制转换实体为obj，输出：23
        foo();//45
    }
};
obj.test();


//函数对象方法之 bind 硬绑定 例二
// function.bind(thisArg[,arg1[,arg2[,argN]]])
// 在绑定功能中，this对象解析为传入的对象。
// 返回一个与 function 函数相同的新函数，只不过函数中的this对象和参数不同。
//定义原始功能。
var checkNumericRange = function (value) {
    if (typeof value !== 'number')
        return false;
    else
        return value >= this.minimum && value <= this.maximum;
};
//范围对象将成为回调函数中的这个值。
var range = { minimum: 10, maximum: 20 };

//绑定checkNumericRange函数。
var boundCheckNumericRange = checkNumericRange.bind(range);

//使用新函数检查12是否在数字范围内。
var result = boundCheckNumericRange (12);
//相当于range.boundCheckNumericRange (12)
console.log(result);//true


//bind 参数的问题 例三
// 该绑定函数将 bind 方法中指定的参数用作第一个参数和第二个参数。
// 在调用该绑定函数时，指定的任何参数将用作第三个、第四个参数（依此类推）
//用四个参数定义原始函数。
var displayArgs = function (val1, val2, val3, val4) {
    console.log(val1 + " " + val2 + " " + val3 + " " + val4);
};
var emptyObject = {};
//创建一个使用12和"a"参数的新函数作为第一个和第二个参数。
var displayArgs2 = displayArgs.bind(emptyObject, 12, "a");
//调用新的函数,使用"b"和"c"参数作为第三和第四个参数。
displayArgs2("b", "c");//12 a b c


//函数对象方法之 toString与valueOf 继承自Object.prototype的方法
//返回对象的字符串表示形式：objectname.toString([radix])
//关于toString与valueOf的详细内容参见JS对象相关章节
var foo = function () {
    console.log("foo");
};
console.log(foo.toString()," ___ ",typeof foo.toString());
// function () {
//     console.log("foo");
// }  ___  string
console.log(foo.valueOf()," ___ ",typeof foo.valueOf());
// ƒ () {
//     console.log("foo");
// } " ___ " "function"
console.log(foo.hasOwnProperty("toString"));//false
console.log(Object.prototype.hasOwnProperty("toString"));//true

console.log(foo.hasOwnProperty("valueOf"));//false
console.log(Object.prototype.hasOwnProperty("valueOf"));//true


//函数作为参数被传递（最常见的形式，回调函数）
//回调函数就是一个参数，将这个函数作为参数传到另一个函数里面，
//当那个函数执行完之后，再执行传进去的这个函数。这个过程就叫做回调。
//实例一 高阶函数一般应用 01
function add(x, y, f) {
    return f(x) + f(y);
}
add(2,3,function(z){return z*z;});//13
add(2,-3,Math.abs);//2的绝对值+(-3)的绝对值->5
add(2,3,Math.sqrt);//根号2+根号3->3.1462643699419726


//z = 2*(x+1)-3*y*y;
//c = 2*a*a-3*(b-1);
//k = 2*(i+1)-3(j-1);
function foo(x,y,c1,c2){
    return 2*c1(x)-3*c2(y);
}
function f1(x){return x+1;}
function f2(x){return x-1;}
function f3(x){return x*x;}
foo(1,1,f1,f3);//4-3=1
foo(1,1,f3,f2);//2-0=2
foo(1,1,f1,f2);//4-0=4


//实例一  高阶函数一般应用 02
var word_2 = "do another thing.";
var function_1=function(callback){
    this.word_1 = "do something.";
    console.log(this.word_1);
    console.log(callback);
    (callback && typeof(callback) === "function") && callback();
};
var function_2=function(){console.log(this.word_2)};
function_1(function_2);
//do something.
//ƒ (){console.log(this.word_2)}
//do another thing.


// 下述实例本章仅供参考，详细内容在Array章节具体介绍
// 实例二 数组相关的高阶函数 map reduce filter sort详情参见数组章节
function pow(x) {
    return x * x;
}
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
arr.map(pow); // [1, 4, 9, 16, 25, 36, 49, 64, 81]

//将数组所有元素改为数字类型
var result = ["1", "2", "3"].map(function(val) {
    return parseInt(val);
});
for (var i=0;i<result.length;i++){
    console.log(typeof result[i]);
}//3 number


//reduce 相当于 [x1, x2, x3, x4].reduce(f) = f(f(f(x1, x2), x3), x4)
var arr = [1, 3, 5, 7, 9];
arr.reduce(function f(x, y) {
    return x + y;
}); //25


//filter 数组过滤,返回为false的将被过滤掉
var arr = [1, 2, 4, 5, 6, 9, 10, 15];
var r = arr.filter(function (x) {
    return x % 2 !== 0;
});
r; //[1, 5, 9, 15]


// sort 排序
var arr = [10, 20, 1, 2];
arr.sort(function (x, y) {
    if (x < y) {
        return -1;
    }
    if (x > y) {
        return 1;
    }
    return 0;
}); // [1, 2, 10, 20]


//实例三 常用回调函数 设置超时和时间间隔的方法、异步请求、事件监听和处理
//超时回调实例
var timeOutId = setTimeout( function () {
    console.log("你已超时！");
},1000);
//假如这里有耗时的代码
//clearTimeout(timeOutId);

//间隔回调实例
var timeInterval = setInterval(function () {
    console.log("Hi");
},1000);
//clearInterval(timeInterval);

//事件监听回调实例
document.addEventListener("click", function(){
    //document.getElementById("demo").innerHTML = "Hello World";
    console.log("click callback");
});

//异步请求回调实例，详情参见Ajax章节
//http://www.runoob.com/try/try.php?filename=tryajax_xml


//函数作为返回值输出:详见lesson07-demo1.js-90行
var x=12;
var obj = {
    x:34,
    fun2:function(){
        console.log(this.x,this);
    }
};
var fun1 = function () {
    return function fun2() {
        return this.x;//若改为 return this;
    }
};
obj.fun3 = fun1;
obj.fun4 = fun1();
console.log("输出：",obj.fun3());
// ƒ fun2() {
//         return this.x;
//     }
console.log("输出：",obj.fun3()());//12
console.log("输出：",obj.fun4());//34


var x=12;
var obj = {
    x:34,
    fun2:function(){
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
console.log("输出：",obj.fun3());
 // ƒ fun2() {
 //        return this;
 //    }
console.log("输出：",obj.fun3()());//window
//Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, frames: Window, …}
console.log("输出：",obj.fun4());//obj
//{x: 34, fun2: ƒ, fun3: ƒ, fun4: ƒ}