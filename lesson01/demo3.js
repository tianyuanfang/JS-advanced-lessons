//未看demo12部分、demo14部分、demo15部分
console.log(a);//undefined
if(true)
{
    var a = 2;
}
console.log(a);//2

console.log(b);//undefined
if(false)
{
    var b = 3;
}
console.log(b);//undefined


console.log(typeof NaN);//Number
console.log(typeof Infinity);//Number


var a=null;
console.log(typeof a);//Object->JS特殊之处


var arr = ["apple", "pear", "banana"];
var func = function(){
    return "this a function";
};
var obj = new Object();
console.log(typeof arr); //object
console.log(typeof func); //function
console.log(typeof obj); //object
console.log(arr instanceof Array);//true
console.log(func instanceof Object);//true


console.log(typeof Number); //function
console.log(typeof String); //function
console.log(typeof Boolean);//function
console.log(typeof Object);//function
console.log(typeof Array);//function
console.log(typeof Function);//function
console.log(typeof RegExp);//function
console.log(typeof Error);//function
console.log(typeof Math);//object
console.log(typeof JSON);//object->直接创建对象的方法


//==、=== 回顾 值类型与引用类型回顾 不同类型变量 判等时的区别
//判等步骤
//1.看是==还是===

//2.如果是===则先看类型
// 类型不同肯定false
// 类型相同（如果是基本类型：判断值是否相等；如果是引用类型：判断引用是否是同一个引用）

//3.如果是==则先看类型
// 先试着进行类型转换
// 转换后（如果是基本类型：判断值是否相等；如果是引用类型：判断引用是否是同一个引用）

var b1 = {};
var b2 = {};
console.log(b1==b2);//false(指向的不是一个引用)
console.log(b1===b2);//false(指向的不是一个引用)
console.log(b1===b1);//true 

var c1 = 23;
var c2 = new Number(23);
console.log(c1==c2);//true 
console.log(c1===c2);//false
console.log(typeof c2);//object


//包装对象
var str2 = "abc";
console.log(str2.length);//3
str2.length = 1;
console.log(str2);//abc
//原始类型变量的不可变性，指的是包装对象的改变并不影响原始类型的变量

//怎么理解JS中都是对象这句话
//访问基本类型的变量属性时，会创建临时包装对象，访问的是该包装对象的属性
//另外改变此临时包装对象的属性，并不会影原变量（原始类型变量的不可变性）

//undefined与null 未确定的值、空引用

//typeof 与 instance
//typeof 常用于检测基本类型的变量
//instance 常用于检测引用类型的变量 
//instance左侧期望是一个对象，右侧期望是一个类型
console.log({}instanceof Object);//true
console.log([]instanceof Object);//true
console.log([]instanceof Array);//true


//数字类型
console.log(1===1.0);//true
console.log(Number("xyz"));//NaN
console.log(3/0);//Infinity


foo();//可以在定义前执行，解析器会将foo函数声明提升
function foo() {
    console.log("foo");
}


//变量作用域，了解词法作用域（静态性）
var x = 23;
var foo = function () {
    var x = 34;
    console.log("inside x:",x);//34
    y = 45;//不加var->全局变量
    console.log("inside y:",y);//45
};
foo();//如果没调用会如何
console.log("outside x:", x);//23
console.log("outside y:", y);//45

var x = 23;
var foo = function () {
    var x = 34;
    console.log("inside x:",x);//34
    var y = 45;//加var->局部变量
    console.log("inside y:",y);//45
};
foo();//如果没调用会如何
console.log("outside x:", x);//23
console.log("outside y:", y);//报错，y被释放了，未定义

var x = 23;
var foo = function () {
    var x = 34;
    console.log("inside x:",x);
    y = 45;//不加var
    console.log("inside y:",y);
};
//foo();//如果没调用会如何
console.log("outside x:", x);//23
console.log("outside y:", y);//报错，y没有定义

var x = 23;
var foo = function () {
    var x = 34;
    console.log("inside x:",x);
    var y = 45;//加var
    console.log("inside y:",y);
};
//foo();//如果没调用会如何
console.log("outside x:", x);//23
console.log("outside y:", y);//报错，y没有定义


var student = {
    name:"Jack",
    age:23,
    sayHi:function () {
        console.log("Hi,i'm",this.name,",i'm",this.age,"years old!");
    }
}; 
console.log(student.name);//Jack
console.log(student["age"]);//23
console.log(student.sayHi);//ƒ(){console.log("Hi,i'm",this.name,",i'm",this.age,"years old!");}
student.sayHi();//Hi,i'm Jack ,i'm 23 years old!


//字符串常用方法，字符串的方法源于String.prototype
var str1 = "aaa".concat("bbb");//返回字符串->aaabbb  

var str2 = "abcdef".slice(2);//cdef
var str3 = "abcdef".slice(2,5);//cde
var str4 = "abcdef".slice(-2);//ef
var str5 = "abcdef".slice(2,-2);//cd

var str6 = "abcdef".split("c");//返回数组->["ab", "def"] 
var str7 = "abcdef".split("c",1);//["ab"] 
var str8 = "abcdef".split("c",2);//["ab", "def"] 

var str9 = "abcdef".charAt(2);//c

var str10 = "abcdefabcdef".indexOf("d",1);//3
var str11 = "abcdefabcdef".indexOf("d",4);//从第4个开始找->9

var str12 = "    abc def     \r\n  ".trim();//abc def
//返回已移除前导空格、尾随空格和行终止符(转义字符)的原始字符串

//substr 与 substring的区别
var str13 = "abcdefghijklmn";
var str14 = str13.substr(2,5);//后一个参数代表长度
console.log(str13,str14);//str13 未受到破坏->abcdefghijklmn  cdefg

var str15 = str13.substring(2,5);//后一个参数代表第几个end
console.log(str13,str15);//str13 未受到破坏->abcdefghijklmn  cde


//通过字面量创建
var student = {
    name:"Jack",
    age:23,
    sayHi:function () {
        console.log("Hi,i'm",this.name,",i'm",this.age,"years old!");
    }
};
console.log(student.name);//Jack
console.log(student["age"]);//23
console.log(student.sayHi);
//ƒ () {
//       console.log("Hi,i'm",this.name,",i'm",this.age,"years old!");
//   }
student.sayHi();//Hi,i'm Jack ,i'm 23 years old!

//添加属性，删除属性
student.id = 2015015001;
console.log(student.id);//2015015001
delete  student.id;
console.log(student.id);//undefined

//查看对象是否有某个属性 in   for...in   Object.keys()
console.log("name" in student);//true
for(var k in student){
    console.log(k,student[k]);//k:属性   student[k]:属性值
}
// name Jack
// age 23
// sayHi ƒ () {
//         console.log("Hi,i'm",this.name,",i'm",this.age,"years old!");
//     }
console.log(Object.keys(student));//["name", "age", "sayHi"]


var arr2 = ['a','b','c'];
var arr3 = arr2.slice(1,2);//并不破坏arr2->返回数组
// var arr3 = arr2.slice(1);//["b","c"]
console.log(arr2);//['a','b','c'];
console.log(arr3);//['b'];


var arr4 = ['m','n'];
var pushReturn = arr4.push('o');
console.log(pushReturn);//push后数组的长度->3
console.log(arr4);//["m", "n", "o"]

var popReturn =arr4.pop();
console.log(popReturn);//pop出的元素->o
console.log(arr4);//["m", "n"]

var arr5 = [1,2,3,4];
var shiftReturn = arr5.shift();
console.log(shiftReturn);//shift移除的元素->1
console.log(arr5);//[2,3,4]

var unshiftReturn = arr5.unshift(0);
//unshift()方法可向数组的开头添加一个或更多元素，并返回新的长度。
console.log(unshiftReturn);//unshift后数组的长度->4
console.log(arr5);//[0,2,3,4]

var joinReturn1 = arr6.join();
console.log(joinReturn1);//ab,cd,ef

var arr7 = ["x","y","z"];
var arr8 = arr7.splice(1,1,"m");
console.log(arr7,arr8);//["x", "m", "z"] ["y"]
/*splice(index,howmany,item1,...,itemX) 方法
向/从数组中添加/删除项目，然后返回被删除的项目。*/
//index 必需。整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置。
//howmany 必需。要删除的项目数量。如果设置为 0，则不会删除项目。
//item1, ..., itemX   可选。向数组添加的新项目。














