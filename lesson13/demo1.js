//new Function()才是创建函数的方法
//new (new Function())不是创建函数的方法
console.log(new Function() instanceof Function);//true
console.log(new Function() instanceof Object);//true
console.log(new (new Function()) instanceof Function);//false
console.log(new (new Function()) instanceof Object);//true
//new Function()创建了一个函数，函数亦是对象
//new (new Function())创建了一个对象，不是函数


//构造器对象
var i = new String("str");          // String Object
var h = new Number(1);              // Number Object
var g = new Boolean(true);          // Boolean Object
var j = new Object({name : "Tom"}); // Object Object
var k = new Array([1, 2, 3, 4]);    // Array Object
var l = new Date();                 // Date Object
var m = new Error();				// Error Object
var n = new Function();				//Function Object
var o = new RegExp("\\d"); 			//RegExp Object


// typeof->typeof 构造器对象->function；typeof 非构造器对象->object
console.log(typeof Array);//function
console.log(typeof Function);//function
console.log(typeof Date);//function
console.log(typeof Number);//function
console.log(typeof String);//function
console.log(typeof Boolean);//function
console.log(typeof Math);//object
console.log(typeof JSON);//object

// instanceof->构造器对象既是函数，又是对象；非构造器对象仅是对象
console.log(Object instanceof Function);//true
console.log(Object instanceof Object);//true
console.log(Boolean instanceof Function);//true
console.log(Boolean instanceof Object);//true
console.log(String instanceof Function);//true
console.log(String instanceof Object);//true
console.log(Number instanceof Function);//true
console.log(Number instanceof Object);//true
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


// 访问器属性 实例一:get读取，set修改
var o = {
    _x:1.0,//如果都写成x会怎样
    get x(){
        return this._x;//如果都写成x会怎样
    },
    set x(val){
        this._x = val;//如果都写成x会怎样
    }
};
console.log(o.x);//1->读取
o.x = 2;//修改
console.log(o.x,o._x);//2 2
//??????????????????????????????????????????????????????????????
// o.hasOwnProperty("x");//访问器属性->true
// o.hasOwnProperty("_x");//数据属性->true


//访问器属性 实例二 只读
var o = {
    _x:1.0,
    get x(){
        return this._x;
    }
};
console.log(o.x);//1
o.x = 2;////为o对象添加一个属性x:2
console.log(o.x,o._x);//1 1->get、set属性优先级高于数据属性_x,x


// 访问器属性 实例三
var p1 = {
    _name:"Jack",
    _age:23,
    set age(val){
        if(val>0&&val<150){
            this._age = val;
        }else{
            console.log("请设置正常年龄");
        }
    },
    get age(){
        return this._age;
    }
};
p1.age = 178;//请设置正常年龄
console.log(p1.age);//23


//访问器属性 综合实例
//atan2(y,x)->atan()方法可返回数字的反正切值;
//即返回的值表示坐标（x，y）与X轴之间的角度的弧度。
var p ={
    x:1,
    y:1,
    get r(){return Math.sqrt(this.x*this.x+this.y*this.y);},
    set r(newValue){
        var oldValue = Math.sqrt(this.x*this.x+this.y*this.y);
        var ratio = newValue/oldValue;
        this.x*=ratio;
        this.y*=ratio;
    },
    get theta(){return Math.atan2(this.y,this.x);}
};
var q = Object.create(p);//q.__proto__===p;
q.x = 2;
q.y = 2;
console.log(q.r);//2.8284271247461903
console.log(q.theta);//0.7853981633974483


//创建对象 三种方法
//通过字面量的方式创建 JS对象
var obj = {
    num:10,
    str:"Hi",
    show:function(){
        return this.str;
    }
};
console.log(obj.num);//10
console.log(obj.str);//Hi
console.log(obj.show());//Hi
console.log(obj.__proto__);
//{constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …}
console.log(obj.__proto__ === Object.prototype);//true


//通过Object工场方法创建JS对象,注：JS对象是通过原型链的方式实现的对象继承
var newObj = Object.create(obj);//newObj的原型是obj
newObj.age = 23;
console.log(newObj.num);//10
console.log(newObj.str);//Hi
console.log(newObj.show());//Hi
console.log(newObj.age);//自有属性->23
console.log(newObj.__proto__);//{num: 10, str: "Hi", show: ƒ}
console.log(newObj.__proto__ === obj);//true

//Object.create的第二个参数，参见属性特性章节
/*
o = {};
// 以字面量方式创建的空对象就相当于:
o = Object.create(Object.prototype);
o = Object.create(Object.prototype, {
    // foo会成为所创建对象的数据属性
    foo: {
        writable:true,
        configurable:true,
        value: "hello"
    },
    // bar会成为所创建对象的访问器属性
    bar: {
        configurable: false,
        get: function() { return 10 },
        set: function(value) {
            console.log("Setting `o.bar` to", value);
        }
    }
});
*/


//构造函数的方式创建JS对象  此处略讲，详情参照后续面向对象编程 
//注：JS对象是通过原型链的方式实现的对象继承
function Person(name,age){
    this.name = name;
    this.age = age;
}
Person.prototype.sayName = function(){
    console.log("hello,i'm",this.name,this.age,"years old");
};
var person1 = new Person("Mike",21);
person1.sayName();//hello,i'm Mike 21 years old


var o={
    x:12
}
o.__proto__===Object.prototype;//true
var o2=Object.create(o);
o2.__proto__===o;//true


var Person=function(name){
	this.name=name;
}
var p=new Person("name");
p.__proto__===Person.prototype;//true
Person.__proto__===Function.prototype;//true
Person.__proto__.__proto__===Object.prototype;//true
Person.__proto__.__proto__.__proto__===null;//true


//注意：
var objStr = new Object("xxx");
console.log(typeof objStr);//object
console.log(objStr);//String {"xxx"}
console.log(objStr instanceof String);//true

var objNum = new Object(23);
console.log(typeof objNum);//object
console.log(objNum instanceof Number);//true

var objBoolean = new Object(true);
console.log(typeof objBoolean);//object
console.log(objBoolean instanceof Boolean);//true


//访问属性的for循环练习
var obj2 = {
    id_1:2,
    id_2:4,
    id_3:6,
    id_4:8,
    id_5:10
};
for(var i=1;i<6;i++)
{
	console.log(obj2["id_"+i]);
}
//2 4 6 8 10


//思考obj3 和 obj4 内容是什么？为什么？
var obj3 = {};
for(var i=0;i<10;i++){
	obj3.i = i;
	console.log(obj3.i);//0 1 2 3 4 5 6 7 8 9 
}//obj3.i=9
//i=9时,obj3.i=9;
//i=10时，跳出循环

var obj4 = {};
for(var i=0;i<10;i++){
	obj4[i] = i;
	console.log(obj4[i]);//0 1 2 3 4 5 6 7 8 9 
}//obj4[i]=9
//i=9时,obj4[i]=9;
//i=10时，跳出循环