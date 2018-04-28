//通过Object.create静态方法创建的对象的原型共享问题
var superObj = {
    x:1,
    y:2
};
var subObj_First = Object.create(superObj);
var subObj_Second = Object.create(superObj);
//subObj_First与subObj_Second原型都是superObj
subObj_First.__proto__.x = 5;
//若此行写为subObj_First.x = 5;->为subObj_First添加了一个属性x
console.log(subObj_Second.x);//5


//通过构造函数创建的对象的原型共享问题
//以下写法实现了原型继承，但存在原型共享的问题
function Person(name){
    this.name = name;
}
Person.prototype.age = 22;
Person.prototype.showName = function(){console.log(this.name);};
function Student(id){
    this.id = id;
}
Student.prototype = new Person("Mike");//等价于->
// var p1 = new Person("Mike");
// Student.prototype = p1;
var s1 = new Student(2017001);
var s2 = new Student(2017002);
// Person.prototype:age,showName
//         |
// Student.prototype: Person对象：name
//         |
//s1:id  s2:id
console.log(s1.name,s1.age,s1.id);//Mike 22 2017001
console.log(s2.name,s2.age,s2.id);//Mike 22 2017002
s1.__proto__.name = "Jack";
console.log(s2.name);//Jack
s2.__proto__.__proto__.age = 99;
console.log(s2.age);//99

console.log(s1);//Student {id: 2017001}
console.log(s1.__proto__);//Person {name: "Jack"}
console.log(s1.__proto__.__proto__);//{age: 99, showName: ƒ, constructor: ƒ}

//如何给每个student对象单独添加自身属性name和age，内存是否浪费
//不浪费，每个学生的姓名与年龄不一样，不可以共享
s1.name = "Bill";
s1.age = 22;
s1;//Student {id: 2017001, name: "Bill", age: 22}
s2.name = "Colin";
s2.age = 23;
s2;//Student {id: 2017002, name: "Colin", age: 23}


//通过Object.create创建的对象的原型共享问题
//以下写法实现了原型继承，但存在原型共享的问题
function Person(name){
    this.name = name;
}
Person.prototype.age = 22;
Person.prototype.showName = function(){console.log(this.name);};   
var person1 = new Person("Mike");
var student1 = Object.create(person1,{id:{value:123,writable:true}});
var student2 = Object.create(person1,{id:{value:456,writable:true,
    enumerable:true}});
// Person.prototype:age,showName
//         |
// person1:name
//         |
//student1:id  student2:id  
console.log(student1.name,student1.age,student1.id);//Mike 22 123
console.log(student2.name,student2.age,student2.id);//Mike 22 456
student1.__proto__.name = "Jack";
console.log(student2.name);//Jack
student2.__proto__.__proto__.age = 99;
console.log(student2.age);//99


//JS实现继承的形式 一
function Person(name,age){
    this.name = name;
    this.age = age;
};
Person.prototype.showName = function(){console.log(this.name);};
function Student(name,age,id){
    Person.call(this,name,age);//this.Person(name,age);
    //->这里的Person是普通函数，不是构造函数；this是Student实例化的对象
    this.id = id;
}
Student.prototype.__proto__ = Person.prototype;
var s1 = new Student("xxx",22,2017001);
var s2 = new Student("www",23,2017002);
// Person.prototype:showName
//         |
// Student.prototype
//         |
//s1:name,age,id  s2:name,age,id
console.log(s1);//Student {name: "xxx", age: 22, id: 2017001}
console.log(s1.__proto__);//Person {constructor: ƒ}
console.log(s1.__proto__.__proto__);//{showName: ƒ, constructor: ƒ}


//JS实现继承的形式 二
function Person(name,age){
    this.name = name;
    this.age = age;
};
Person.prototype.showName = function(){
    console.log(this.name);
};
function Student(name,age,id){
    Person.call(this,name,age);
    this.id = id;
}
Student.prototype = Object.create(Person.prototype);
//Student.prototype以Person.prototype为原型
console.log(Person.prototype.constructor);//Person
console.log(Student.prototype.constructor);//Person
// ƒ Person(name,age){
//     this.name = name;
//     this.age = age;
// }
Student.prototype.constructor = Student;//使Student.prototype构造器为Student
var s1 = new Student("xxx",22,2017001);
var s2 = new Student("www",23,2017002);
// Person.prototype:showName
//         |
// Student.prototype
//         |
//s1:name,age,id  s2:name,age,id
console.log(s1);//Student {name: "xxx", age: 22, id: 2017001}
console.log(s1.__proto__);//Person {constructor: ƒ}
console.log(s1.__proto__.__proto__);//{showName: ƒ, constructor: ƒ}


//静态方法实例与原型方法实例->静态方法属于类；原型方法属于对象
var BaseClass = function(){};
BaseClass.prototype.f2 = function(){//原型方法
    console.log("This is a prototype method ");
};
BaseClass.f1 = function(){//定义静态方法
    console.log("This is a static method ");
};
BaseClass.f1();//This is a static method
var instance1 = new BaseClass();
instance1.f2();//This is a prototype method


//实例方法 原型方法
var BaseClass = function() {};
BaseClass.prototype.method1 = function(){
    console.log("1 This is a method in Base.prototype");
};
var instance1 = new BaseClass();
instance1.method1();//1 This is a method in Base.prototype
instance1.method1 = function(){
    console.log("2 This is a method in instance1");
};//为自身添加方法method1
instance1.method1();//访问的是自身method1->2 This is a method in instance1


var BaseClass = function() {//构造函数
    this.method1 = function(){
        console.log('1 Defined by the "this" in the instance method');
    }
};
var instance1 = new BaseClass();
instance1.method1 = function(){
    console.log('2 Defined directly in the instance method');
};//修改自身method1
BaseClass.prototype.method1 = function(){
    console.log('3 Defined by the prototype instance method ');
};
instance1.method1();//2 Defined directly in the instance method
// BaseClass.prototype：method1
//             |
// instance1:method1


//Part 1 constructor属性的应用->constructor属于xxx.prototype
// 1 确定对象的构造函数名
function Foo(){}
var f = new Foo();
console.log(f.constructor.name);//Foo
// 2 创建相似对象
function Constr(name) {
    this.name = name;
}
var x = new Constr("Jack");
var y = new x.constructor("Mike");//x.constructor<=>Constr
console.log(y);//Constr {name: "Mike"}
console.log(y instanceof Constr);//true
// 3 constructor可用于指定构造函数
function Person(area){
    this.type = 'person';
    this.area = area;
}
Person.prototype.sayArea = function(){
    console.log(this.area);
};
var Father = function(age){
    this.age = age;
};
Father.prototype = new Person('Beijing');
console.log(Person.prototype.constructor); //function person()
console.log(Father.prototype.constructor); //function person()
// ƒ Person(area){
//     this.type = 'person';
//     this.area = area;
// }
Father.prototype.constructor = Father;     //修正constructor指向
console.log(Father.prototype.constructor); //function father()
// ƒ (age){
//     this.age = age;
// }
var one = new Father(25);
// Person.prototype:sayArea
//             |
// Father.prototype:Person对象：type,area
//             |
// one:age
console.log(one);//Father {age: 25}
console.log(one.__proto__);//Person {type: "person", area: "Beijing", constructor: ƒ}
console.log(one.__proto__.__proto__);//{sayArea: ƒ, constructor: ƒ}


//Part2 公有属性、私有属性、特权方法
function A(id) {
    this.publicId = id;
    var privateId = 456;//私有成员
    this.getId = function () {
        console.log(this.publicId,privateId);
    };//类似C++利用类函数调用私有成员
}
var a = new A(123);
console.log(a.publicId);//123
console.log(a.privateId);//undefined
a.getId();//123 456


function Person(name){
	this.name = name;
}
Person.prototype.getName = function(){}
// Person.prototype = {getName:function(){}}
var p = new Person("jack");
//p.constructor=>Person
console.log(p.__proto__ === Person.prototype);//true
console.log(p.__proto__ === p.constructor.prototype);//true 
console.log(Object.prototype === p.constructor.prototype);//false
console.log(({getName:function(){}}).__proto__ 
===p.constructor.prototype);//false

Object.prototype === p.constructor.prototype.__proto__;//true
console.log(({getName:function(){}}).__proto__ 
===p.constructor.prototype.__proto__);//true


function Person(name){
	this.name = name;
}
//Person.prototype.getName = function(){}
Person.prototype = {getName:function(){}}
var p = new Person("jack");
//p.constructor=>Object
console.log(p.__proto__ === Person.prototype);//true
console.log(p.__proto__ === p.constructor.prototype);//false 
console.log(Object.prototype === p.constructor.prototype);//true
console.log(({getName:function(){}}).__proto__ 
===p.constructor.prototype);//true


//Shape 多态
function A(){
    this.a = 10;
    this.af = function(){console.log(this.a);}
}
var a = new A();
function B(){
    A.call(this);//this.A();
    this.b = 20;
    this.bf = function(){console.log(this.b);}
}
B.prototype.__proto__ = A.prototype;
var b = new B();
// A.prototype
//     |
// B.prototype
//     |
// b:a,af,b,bf
console.log(b);//B {a: 10, af: ƒ, b: 20, bf: ƒ}
console.log(b.__proto__);//A {constructor: ƒ}
console.log(b.__proto__.__proto__);//{constructor: ƒ}