//未看demo7部分
//复习
//part1
var a = [1,2,3];
var b = a;
console.log(a,b);//[1,2,3] [1,2,3]
b.pop();
console.log(a,b);//[1,2] [1,2]
b = [4,5,6];
console.log(a,b);//[1,2] [4,5,6]

//part2
function foo(x) {
    x.push(4);
    x = [5,6,7];
    x.push(8);
    console.log(x);
}
var a = [1,2,3];
foo(a);
console.log(a);//[5,6,7,8] [1,2,3,4]

//part3
function foo(x) {
    x.push(4);
    console.log(x);
    x.length = 0;
    x.push(5,6,7,8);
    console.log(x);
}
var a = [1,2,3];
foo(a);
console.log(a);//[1,2,3,4] [5,6,7,8] [5,6,7,8]


function f(a)
{
console.log(a);
console.log(arguments[1]);
console.log(arguments[2]);
}
f(1,2,3);//1,2,3
//arguments:函数调用时，传递的实参比形参多，多的实参隐藏在arguments里


//Part1 不同类型的表达式
23;//其中的23为原始表达式
obj = {x:2};// ={x:2}为对象初始化表达式
arr = [1,2];// =[1,2]为数组初始化表达式
var foo = function(){ // = function(){}为函数定义表达式
    console.log("foo");
};
obj.x;//obj.x为属性访问表达式
foo();//foo()为函数调用表达式
2+3;//2+3为算数运算表达式
2>3;//2>3为关系运算表达式
1&&2;//1&&2为逻辑运算表达式


//Part2 关于语句
2>3;//表达式语句
//条件语句
var a=2,b=3;
if(a>b){
    console.log("a > b");
}
else{
    console.log("a < b");
}


//ES5中没有块作用域
if(false){
	var b=30;
}
console.log(b);//undefined

if(true){
	var a=20;
}
console.log(a);//20

{
	var a=20;
}
console.log(a);//20


//显式声明全局变量
//1.在function外部定义var+变量
//2.使用window全局对象来声明，全局对象的属性对应也是全局变量


// 严格模式的目的：
// 消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为
// 消除代码运行的一些不安全之处，保证代码运行的安全

// 严格模式使用方式
"use strict"//全局使用

function foo() {
    "use strict"//函数内部使用
}


//严格模式下全局变量必须显式声明
function f(){
 	a=1;
}
f();
console.log(a);//1

function f(){
	'use strict'
 	a=1;
}
f();
console.log(a);//报错


//一般函数中的this（严格模式下）是undefined，非严格模式下是全局变量
function f(){
	console.log(this);
}
f();//Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, frames: Window, …}

function f(){
	console.log(this===window);
}
f();//true

function f(){
	'use strict'
	console.log(this===window);
	console.log(this===undefined);
}
f();//false,true

function f(){
	'use strict'
	console.log(typeof this);
}
f();//undefined

function f(){
	//'use strict'
	console.log(typeof this);
}
f();//object->window是对象

function isStrictMode(){
	'use strict'
	console.log(this===undefined?true:false);
}
isStrictMode();//true


//严格模式下禁止删除不可改变的属性，未定义的变量
var str="abc";
function f(){
	 str.length=1;
	 console.log(str.length);
}
f();//3

var str="abc";
function f(){
	'use strict'
	 str.length=1;
	 console.log(str.length);
}
f();//报错


//严格模式下禁止函数参数重名
function f(a,a,b){
 	return a+b;
}
f(2,3,4);//7

function f(a,a,b){
	'use strict'
 	return a+b;
}
f(2,3,4);//报错


//switch语句中的case在比较时使用的是全等操作符(===)比较,因此不会发生隐式类型转换
var i = "1";
switch(i){
    case 1:
        console.log("case 1 Number");
        break;
    default:
        console.log("default");
}
//输出default 而不是 case 1 Number


// 存在二义性的语句，要避免有二义性的语句
//以下既可以当对象，也可以当做语句块
var max = function (x,y) {
    return x>y?x:y;
};

var x = {
    foo:max(2,3)
}

{
    console.log(123);
    console.log(456);
    foo:max(2,3)
}

{
    foo:max(2,3)
}


//全局变量和局部变量
function foo(){
	var a=b=3;//相当于b=3;var a=b;->所以a是局部变量，b是全局变量
}
foo();
console.log("b:",b);//3
console.log("a:",a);//报错，a被释放了

function foo(){
	var a,b=3;
	console.log("b:",b);//3
	console.log("a:",a);//undefined
}
foo();
console.log("b:",b);//报错，b为局部变量
console.log("a:",a);//报错，a为局部变量
//a,b是局部变量，a未赋值，为undefined；b=3


//严格模式下禁止删除未定义的变量
//非严格模式下
delete foo;
delete window.foo;//true
//严格模式下
'use strict';
delete foo;
delete window.foo;//报错


//arguments
// 如果调用的参数多于正式声明接受的参数，则可以使用arguments对象。
// 这种技术对于可以传递可变数量的参数的函数很有用。
// 使用 arguments.length来确定传递给函数参数的个数，然后使用arguments对象来处理每个参数。
// 要确定函数签名中（输入）参数的数量，请使用Function.length属性。


//assert方法有2个参数，其中一个是一个逻辑表达式，也就是我们进行判断的语句，
//第二个参数是一个字符串，
//当第一个参数的逻辑结果为false 的时候输出该字符串语句，一般我们设置为出错语句。
var str="abc";
console.assert(str.length==4,"字符串长度不是4");
//Assertion failed: 字符串长度不是4


function f(a){
    "use strict";
    a = 42;
    return [a, arguments[0]];
}
var pair = f(17);
console.log(pair[0]);//console.assert(pair[0] === 42);
console.log(pair[1]);//console.assert(pair[1] === 17);
//->arguments[0]相当于参数值
//类似于以下程序
function f(a){
    "use strict";
    a = 42;
    console.log(a);//pair[0]
    console.log(arguments[0]);//pair[1]
}
f(17);//42,17


// 利用switch的穿透性:求某月某日是一年中的第几天?
var year = 2017,
    month = 5,
    date = 20,
    sum = 0;
switch(month-1){
    case 11:
        sum += 30;
    case 10:
        sum += 31;
    case 9:
        sum += 30;
    case 8:
        sum += 31;
    case 7:
        sum += 31;
    case 6:
        sum += 30;
    case 5:
        sum += 31;
    case 4:
        sum += 30;
    case 3:
        sum += 31;
    case 2:
        sum += year%4==0&&year%100!=0||year%400==0?29:28;
    case 1:
        sum += 31;
    default:
        sum += date;
}
console.log(sum);//140


//for ... in 遍历数组
var arr = [2,,"33"];
for(var i in arr){
    console.log(i,arr[i]);
}
//0 2
// 2 33
 
//for ... in 遍历对象
var obj = {x:10,y:20,z:"30"};
for(var k in obj){
    console.log(k,typeof k,obj[k],typeof obj[k]);
}
// x string 10 number
// y string 20 number
// z string 30 string

/*
 #include <iostream>
 using namespace std;
 int main()
 {
 	for(int i =0;i<5;i++){
 	cout<<"i = "<<i<<endl;
 }
 	//cout<<"i = "<<i<<endl;
 	//这里是否能输出i，和JavaScript（ES5）有什么不同->不能输出，i是局部变量
 	return 0;
 }
 */


var obj1 = {x:1};
var obj2 = Object.create(obj1);
obj2.y = 2;
obj2.z = 3;
for(var k in obj2){
    console.log(k,obj2[k]);
}
// y 2
// z 3
// x 1->
// obj2的原型是obj1，遍历属性的话是先遍历自身属性：y和z，
// 遍历完之后再在原型上找属性，是这样的顺序。
// 所以先输出y，z，然后再输出的x
