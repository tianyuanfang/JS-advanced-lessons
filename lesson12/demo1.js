function f1(){
	var x = 1;
	function f2(){
		return x++;
	}
	return f2();
}
var f3 = f1();
//观察f1中的x变量
console.log(f3);//输出1
console.log(f3);//输出1
//x会被释放


function f1(){
	var x = 1;
	function f2(){
		return x++;
	}
	return f2;
}
var f3 = f1();
//观察f1中的x变量
console.log(f3());//输出1
console.log(f3());//输出2
//返回函数对象，x未被释放->闭包->f2与x


function createInc(startValue){
	return function(step){
		startValue+=step;
		return startValue;
	}
}
var inc = createInc(5);
console.log(inc(1));//输出6
console.log(inc(2));//输出8
inc = createInc(5);
console.log(inc(1));//输出6
//闭包，startValue未被释放，闭包是一个独立的包裹体


function createInc(startValue){
	return function(step){
		startValue+=step;
		return startValue;
	}
}
var inc = createInc(5);
console.log(inc(1));//输出6
console.log(inc(2));//输出8
var inc2 = createInc(5);
console.log(inc(1));//输出9
console.log(inc2(1));//输出6
//闭包是一个独立的包裹体


function foo() {
    var i = 0;
    function bar() {
        console.log(++i);
    }
    return bar();
}
foo();//1
foo();//1
//返回的不是函数对象，不是闭包


function foo() {
    var i = 0;
    function bar() {
        console.log(++i);
    }
    return bar;
}
var a = foo();
var b = foo();
a();//输出1
a();//输出2
b();//输出1


var tmp = 100;//注意：词法作用域,形成的闭包不包含此行的变量tmp
function foo(x) {
    var tmp = 3;//注意：词法作用域，思考：若屏蔽此行，会输出什么？
    //foo之外的tmp不是闭包的一部分
    return function (y) {
        console.log(x + y + (++tmp));//x，tmp未被释放，x=2
    }
}
var fee = foo(2); // fee 形成了一个闭包
fee(10);//16  x=2,y=10,tmp=4
fee(10);//17  x=2,y=10,tmp=5
fee(10);//18  x=2,y=10,tmp=6

var tmp = 100;//注意：词法作用域,形成的闭包不包含此行的变量tmp
function foo(x) {
    //var tmp = 3;//注意：词法作用域，思考：若屏蔽此行，会输出什么？
    //foo之外的tmp不是闭包的一部分
    return function (y) {
        console.log(x + y + (++tmp));//x未被释放，x=2
    }
}
var fee = foo(2); // fee 形成了一个闭包
fee(10);//113  x=2,y=10,tmp=101
fee(10);//114  x=2,y=10,tmp=102
fee(10);//115  x=2,y=10,tmp=103


//?????????????????????????????????????????????????????????????????
function f1(m){//m=2
	var z = 100;
	function f2(x) {//x=2
    	return function (y) {//y=10
        	console.log(x + y + (++z));//设置断点，查看有几个闭包
    	}
	}
	return f2(m);
}
var f3 = f1(2); 
f3(10);//113
f3(10);//114
//两个闭包
//f1作用域与z、f2作用域与x


function foo(x) {//x=2，x是对象
    var tmp = 3;
    return function (y) {//y=10
        x.count = x.count ? x.count + 1 : 1;
        console.log(x + y + tmp,x.count);
    }
}
var age = new Number(2);
var bar = foo(age); //和相关作用域形成了一个闭包
bar(10); //15 1
bar(10); //15 2
bar(10); //15 3


function fn() {
    var max = 10;//若屏蔽此行，则输出100
    return function bar(x) {//x=15
        if(x > max){
            console.log(x);
        }else {
            console.log(max);
        }
    }
}
var f1 = fn();
var max = 100;
f1(15);//15


function counter() {
    var n = 0;
    return {
        count:function () {return ++n;},
        reset:function () {n = 0;return n;}
    }
}
var c = counter();//n=0
var d = counter();//n=0
console.log(c.count());//1 c.n=1
console.log(d.count());//1 d.n=1
console.log(c.reset());//0 c.n=0
console.log(c.count());//1 c.n=1
console.log(d.count());//2 d.n=2
//闭包是一个独立的包裹体
//返回的是一个对象，两个闭包


function f1(){
    var n = 999;
    function f2(){
        console.log(++n);
    }
    return f2;
}
var f = f1();
f();//输出1000
f();//输出1001


// 闭包实例
// 函数f1中的局部变量n一直保存在内存中，并没有在f1调用后被自动清除
// 原因就在于f1是f2的父函数，而f2被赋给了一个全局变量result，
// 这导致f2始终在内存中，而f2的存在依赖于f1，因此f1也始终在内存中，
// 不会在调用结束后，被垃圾回收机制（garbage collection）回收
var n = 10;
function f1(){
    var n=999;
    nAdd=function(){n+=1;};//思考：nAdd是闭包么? n是哪个作用域下的变量
    function f2(){
        console.log(n);
    }
    return f2;
}
var result=f1();
result(); //输出999
nAdd();//n=1000
result(); //输出1000


//闭包 应用案例 实现数据的封装 私有属性
function Person(){
    var name = "default";
    return {
        getName : function(){
            return name;
        },
        setName : function(newName){
            name = newName;
        }
    }
};
var john = Person();
console.log(john.getName());//default
john.setName("john");
console.log(john.getName());//john

var jack = Person();
console.log(jack.getName());//default
jack.setName("jack");
console.log(jack.getName());//jack


var m = 10;
function f1(){
    nAdd=function(){++m;};
    function f2(){
        console.log(m);
    }
    return f2;
}
var result1=f1();
var result2=f1();
document.onclick = result1; //输出11,一点击执行f2
nAdd();//m=11
result2(); //输出11


var m = 10;
function f1(){
    nAdd=function(){++m;};
    function f2(){
        console.log(m);
    }
    return f2;
}
var result1=f1();
var result2=f1();
result1(); //输出10
nAdd();//m=11
result2();//输出11
result1();//输出11


// 比如说我现在的需求是这样的，在网页中有时候会需要遮罩层，
//调用的时候我就创建一个，但是你不可能每次调用创建，
//所以如果存在就用以前的，如果不存在就创建新的
function fn() {
    var a;
    return function() {
        return a || (a = document.body.
            appendChild(document.createElement('div')));
    }
};
var f = fn();
f();
//a为undefined，则创建一个div标签；否则直接返回一个div标签


//定时与节点 闭包应用案例 2秒后执行，由于闭包所以objID此时还存在
//虽然有时没有直接用，但闭包无时无刻不存在
//setTimeout()里的函数就是闭包
function closureExample(objID, text, timedelay) {
    setTimeout(function() {
        //document.getElementById(objID).innerHTML = text;
        console.log(objID,text);
    }, timedelay);
}
closureExample("myDiv","Closure is Create", 2000);
//2秒后，输出：myDiv Closure is Create


//闭包 应用案例 创建一个简单数据库
var db = (function() {
       var data = {};   
        return function(key, val) {
            if (val === undefined) { return data[key] } // get
            else { return data[key] = val } // set
        };   
    })();//立即执行，返回这个内部函数，它形成了一个闭包
db('x'); //undefined->读取data['x']
db('x', 1); // 设置data['x']为1
db('x'); //1->读取data['x']


(function () {
    var m = 0;
    function getM(){
        return m;
    }
    function setM(val){
        m = val;
    }
    window.g = getM;
    window.f = setM;
}());//立即执行
f(100);//m=100
g();//100


//注意闭包与不经意的变量共享
//没有IIFE时，返回i和pos时的区别
function f(){
    var result = [];
    for (var i = 0; i < 3; i++) {
        //(function(){
            var pos = i;
            var func = function(){
                return pos;//若是return i;的话,最终输出是3
            }
            result.push(func);
            //console.log(i,pos);
        //}());
    }
    return result;//数组每个成员都是函数
}
console.log(f()[1]());// 输出2

//有IIFE时，返回i和pos时的区别
function f(){
    var result = [];
    for (var i = 0; i < 3; i++) {
        (function(){
            var pos = i;
            var func = function(){
                return pos;//若是return i;的话,最终输出是3->共享i
            }
            result.push(func);
            //console.log(i,pos);
        }());
    }
    return result;//数组每个成员都是函数
}
console.log(f()[1]());// 输出1


//demo16,按按钮，对应几秒后添加一个列表项


    

