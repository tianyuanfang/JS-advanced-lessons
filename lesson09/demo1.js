//预解析时，var function提前
foo();//报错
var foo = function(){
    console.log("foo");
};
//等价于
var foo;
foo();//报错
foo=function(){
	console.log("foo");
}


console.log(foo);//undefined
var foo = function(){
    console.log("foo");
};
foo();//foo
//等价于
var foo;
console.log(foo);//undefined
foo = function(){
    console.log("foo");
};
foo();//foo


AA();//AA_1
function AA(){
    console.log("AA_1");
}
var AA = function AA(){
    console.log("AA_2");
};
AA();//AA_2
//等价于
function AA(){
    console.log("AA_1");
}
var AA;
AA();//AA_1
AA = function AA(){
    console.log("AA_2");
};
AA();//AA_2


//静态词法作用域 与调用形式无关
var name = "Jack";
function echo() {
    console.log(name);
}
function foo() {
    var name = "Bill";
    echo();
}
foo();//Jack


//全局变量与局部变量
var x = "outside f1";
var f1 = function () {
    //var x = "inside f1";//如果没有这行，则两次输出都为outside f1
    console.log(x);//outside f1
};
f1();
console.log(x);//outside f1

var x = "outside f1";
var f1 = function () {
    var x = "inside f1";
    console.log(x);//inside f1
};
f1();
console.log(x);//outside f1


//若函数内未加var 则相当于创建了全局变量
var f2 = function () {
    var y = "局部";
    //y = "全局";
    console.log(y);//局部
};
f2();
console.log(y);//报错

var f2 = function () {
    //var y = "局部";
    y = "全局";
    console.log(y);//全局
};
f2();
console.log(y);//全局


//ES5中无块作用域
if(true){
    var z = 23;
}
console.log(z);//正常输出

if(true){
    (function () { //IIFE start
        var z = 23;
    }());           //IIFE end
}//匿名函数，立即执行，所以z是局部变量
console.log(z);//报错


if(true){
    var i = 0;
}
function foo(){
    console.log("j:",j);//undefined
    var j = 10;
    console.log("j:",j);//10
}
foo();
console.log("i:",i);//0
console.log("j:",j);//报错
//等价于
var i;
function foo(){
	var j;
    console.log("j:",j);//undefined
    j = 10;
    console.log("j:",j);//10
}
if(true){i=0;}
foo();
console.log("i:",i);//0
console.log("j:",j);//报错