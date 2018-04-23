var obj1={x:1};
var obj2=Object.create(obj1);//创建一个空对象，它的原型是obj1
obj2.y=2;
obj1;//{x: 1}
obj2;//{y: 2}


//Object.create两个参数类似于Object.defineProperties
var empty = {};
var obj2 = Object.create(empty,{
   x:{value:1}, y:{value:2,enumerable:true}
});
console.log(obj2);//{y: 2, x: 1}->可枚举的优先
console.log(obj2.hasOwnProperty("x"));//true


//JavaScript的继承方式 是对象-对象的继承，对象要实现继承,首先要有原型对象
var o1={x:1};
var o2=Object.create(o1);
o2.__proto__===o1//true
o1.__proto__===Object.prototype;//true
o2.__proto__.__proto__.__proto__===null;//true


//Part1 原型链综述
var proObj = {
    z:3
};//原型
var obj = Object.create(proObj);
obj.x = 1;
obj.y = 2;
console.log(obj.x);//1->自身属性
console.log(obj.y);//2->自身属性
console.log(obj.z);//3->通过原型访问
console.log("z" in obj);//true
console.log(obj.hasOwnProperty("z"));//false

//Part2 原型链属性操作
obj.z = 5;//在obj自身添加属性z
console.log(obj.hasOwnProperty("z"));//true
console.log(obj.z);//5
console.log(proObj.z);//3

obj.z = 8;//修改自身属性z
console.log(obj.z);//8

delete obj.z;//true->删除自身属性z
console.log(obj.z);//3->通过原型访问

delete obj.z;//true->静默失败
console.log(obj.z);//3->通过原型访问

//如何删除原型上的属性
delete  obj.__proto__.z;//等价于delete proObj.z;
console.log(obj.z);//此时彻底没有z了->undefined

//注意：hasOwnProperty是原型方法,调用的主体为obj,
//先在自身上找该方法,找不到的话去原型链上去找
//区别于Object.keys(obj)这种静态方法->属于类的


function Person(name,age) {
    this.name = name;
    this.age = age;
}
Person.prototype.sayHi = function () {
    console.log("Hi,i'm "+this.name);
};
var p1 = new Person("Jack",20);
p1;//Person {name: "Jack", age: 20}
//->name、age是自身属性，sayHi是原型上的函数
console.log(p1.name);//Jack
console.log(p1.age);//20
p1.sayHi();//Hi,i'm Jack


//分析：属性和方法定义在构造函数中和写在prototype上这两种情况有什么不同?
//没有私有属性情况下，常将方法添加到构造函数的prototype属性上，
//实现方法共享,节省内存
//而属性根据情况来确定是定义在构造函数中,还是定义在构造函数的prototype
//（即实例化对象的原型上）属性上


//原型举例->先在自身找，再在原型上找
function MyObj() { }
MyObj.prototype.z = 3;//z在原型上

var obj = new MyObj();
obj.x = 1;
obj.y = 2;

console.log(obj.x);//1->自身属性
console.log(obj.y);//2->自身属性
console.log(obj.z);//3->原型上

console.log("z" in obj);//true
console.log(obj.hasOwnProperty("z"));//false

//原型链属性操作
obj.z = 5;//为obj添加属性z
obj.hasOwnProperty("z");//true
console.log(obj.z);//5
console.log(MyObj.prototype.z);//3

obj.z = 8;//修改自身z值
console.log(obj.z);//8

delete obj.z;//true
console.log(obj.z);//3

delete obj.z;//true->静默失败
console.log(obj.z);//3

//如何删除原型上的属性
delete  obj.__proto__.z;//或者delete MyObj.prototype.z;
console.log(obj.z);//此时彻底没有z了->undefined