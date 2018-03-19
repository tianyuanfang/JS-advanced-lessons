//未看demo7部分、demo9
console.log(typeof null);//undefined
console.log(typeof {name:"Mike",age:20});//object
console.log(typeof function foo(){});//function


console.log(typeof Array);//function
console.log(typeof Function);//function
console.log(typeof Date);//function
console.log(typeof Number);//function
console.log(typeof String);//function
console.log(typeof Boolean);//function
console.log(typeof Math);//object
console.log(typeof JSON);//object


//构造函数
var Person = function(){
    //...
};
var p1 = new Person();
console.log(p1 instanceof Person);//true
console.log(p1 instanceof Object);//true


var obj_c = {x1:2,y1:3};//obj_c.x1在堆区还是栈区
var obj_d = {x2:2,y2:3};
console.log(obj_c.x1 === obj_d.x2);//true
console.log(obj_c === obj_d);//false
console.log({m:1}==={m:1});//false
console.log(obj_c.x1 instanceof Number);//Number不是引用类型
console.log(obj_d.x2 instanceof Number);//Number不是引用类型
console.log(obj_c.x1 instanceof Object);//false
console.log(obj_d.x2 instanceof Object);//false
console.log(typeof obj_c.x1);//number
console.log(typeof obj_d.x2);//number


//经典案例
var a =123;
function foo1(x){
	x = 345;
}
foo1(a);
console.log(a);//123

var a ={y:123};
function foo2(x){
	x.y = 345;
}
foo2(a);
console.log(a.y);//345

var a ={y:123};
function foo3(x){
	x.y = 345;
	x = {y:456};
}
foo3(a);
console.log(a.y);//345

var a ={y:123};
function foo4(x){
    x = {y:456};	
    x.y = 345;	
}
foo4(a);
console.log(a.y);//123


var a2 = new Number(200);
var b2 = new Number(200);
console.log(a2 == b2);//false(引用类型看是否指向同一个引用)
console.log(a2 === b2);//false(引用类型看是否指向同一个引用)

var a3 = new Number(200);
var b3 = a3;
console.log(a3 == b3);//true
console.log(a3 === b3);//true
b3 = new Number(200);
console.log(a3 === b3);//false


//注意：parseInt和parseFloat都为全局方法，即window全局对象的方法
console.log(parseInt === window.parseInt);//true
console.log(parseFloat === window.parseFloat);//true


//typeof：若是函数对象，则返回function；其他对象返回object
a3 = 5e2;//指数形式
console.log(a3);//500
console.log(typeof Math);//输出function 还是 object ？->object


console.log(Math.log(-1));//NaN
console.log(Math.acos(2));//NaN
console.log(NaN === NaN);//false->NaN数值未知


//Infinity与-Infinity
var y1 = 2/0;
console.log(y1);//Infinity
var y2 = -2/0;
console.log(y2);//-Infinity
isFinite(y2);//false，非有限数
isFinite(23);//true，有限数


//0与-0
var z1 = 1/Infinity;
console.log(z1);//0
var z2 = -1/Infinity;
console.log(z2);//-0


//临时包装对象
var str = "abcde";
console.log(str.length);//临时包装成了String对象->5
str.length = 1;
console.log(str.length,str);//临时包装对象并不影响原始值->5,abcde


console.log(Boolean(undefined));//false
console.log(Boolean(null));//false
console.log(Boolean(0));//false
console.log(Boolean(NaN));//false
console.log(Boolean(1));//true
console.log(Boolean(""));//false
console.log(Boolean("abc"));//true
console.log(Boolean({}));//true

if(new Boolean(false)){
    console.log("执行");
}//执行
//new Boolean(false)为对象，对象转换为Boolean类型，总为true


console.log(Number(undefined));//NaN
console.log(Number(null));//0
console.log(Number(true));//1
console.log(Number(false));//0
console.log(Number(""));//0
console.log(Number("abc"));//NaN
console.log(Number("123.345xx"));//NaN
console.log(Number("32343,345xx"));//NaN
console.log(Number({x:1,y:2}));//NaN



console.log(String(undefined));//undefined
console.log(String(null));//null
console.log(String(true));//true
console.log(String(false));//false
console.log(String(0));//0
console.log(String(234));//234
console.log(String({x:1,y:2}));//[object Object]


//比较运算符 与 隐式类型转换
var a = 3;
var b = 4;
console.log(typeof (a>b),a>b);//boolean false
console.log(typeof (a==b),a==b);//boolean false
console.log(typeof (a<b),a<b);//boolean true


//字符串
var str = "abc_def_ghi_jkl_mn";
str.split("_");//["abc", "def", "ghi", "jkl", "mn"]
str.split("_",2);//["abc", "def"]
str.concat("_opq");//abc_def_ghi_jkl_mn_opq
str.substr(4,7);//def_ghi
str.substring(4,7);//def
str.slice(2);//c_def_ghi_jkl_mn
str.slice(2,5);//c_d
str.slice(-2);//mn
str.slice(2,-2);//c_def_ghi_jkl_
/*
concat():合并两个字符串
eg:
var str="hello",
    str2="world";
var str3=str.concat(str2);
>>>>>"helloworld";

slice(start,end):两个参数结束参数为可选参数,截取的字符串不包括结束参数的下标。结束参数可以为负数，表示从字符串末位截取。但开始参数在结束参数后面则返回一个空字符串。
eg：
var str="hello world";
str.slice(0);
>>>>>>"hello world"
str.slice(0,-1);
>>>>>>"hello worl"
str.slice(2,1);
>>>>>>""

split("",length):两个参数，第二个参数为可选参数。表示要返回数值的长度，第一个参数可以是字符串也可以是正则表达式。表示已该字符串为分割。
eg:
var str6 = "abcdef".split("c");
var str7 = "abcdef".split("c",1);

var str8 = "abcdef".split("c",2);

console.log(str6,str7,str8);

>>>>>>["ab", "def"]   ["ab"] ?["ab", "def"]

charAt():通过索引返回对应的字符串,范围为(0-string.length-1);当索引值不在这个范围时，返回一个空字符串。
eg:
var str="hello world";
str.charAt(0); 
>>>>>"h";

charCodeAt():通过索引返回对应字符的unicode码（类似ASCII码），效果和用法和charAt一样，范围为（0~65535）,当索引不在范围内时，结果返回NaN
eg:
var str="hello world";
str.charCodeAt(0);
>>>>>104;

trim():去掉首尾空格、转义字符

substring():接受两个参数，第二个为可选参数。如果没有会截取全部的字符串。用法和slice一样，只是第二个参数不能为负数。
eg:
var str="hello world";
str.substring(0,5);
>>>>>>"hello";
str.substring(0);
>>>>>>"hello world";
*/


// valueOf():可返回 Boolean 对象的原始值。
//eg:
//var boo = new Boolean(false)
//document.write(boo.valueOf())->false

String(-0);//"0"





 
 


 