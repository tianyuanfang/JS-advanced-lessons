//demo01
//ES5 中使用构造函数定义并生成新的对象 Part11111111111
function Point(x, y) {
    this.x = x;
    this.y = y;
}
Point.prototype.show = function() {
    console.log("Point:", this.x, this.y);
};
var p1 = new Point(1, 2);
p1.show(); //Point: 1 2
console.log(Object.keys(p1)); //(2) ["x", "y"]
console.log(Object.keys(p1.__proto__)); // ["show"]


// ES5 中的继承与多态
function Point(x, y) {
    this.x = x;
    this.y = y;
}

function Point2D(x, y) {
    Point.call(this, x, y);
    //this.show = function(){console.log("Point2D:",this.x,this.y);}
}
Point2D.prototype.__proto__ = Point.prototype;

function Point3D(x, y, z) {
    Point.call(this, x, y);
    this.z = z;
    //this.show = function(){console.log("Point3D:",this.x,this.y,this.z);}
}
Point3D.prototype.__proto__ = Point.prototype;

Point.prototype.show = function() {
    switch (this.constructor) {
        case Point2D:
            console.log("Point2D:", this.x, this.y);
            break;
        case Point3D:
            console.log("Point3D:", this.x, this.y, this.z);
            break;
        default:
            break;
    }
};

var p2 = new Point2D(1, 2);
var p3 = new Point3D(3, 4, 5);
p2.show(); //Point2D: 1 2
p3.show(); //Point3D: 3 4 5


//ES6 中的class 语法 Part2222222222222
class Point {
    constructor() { //定义在Point.prototype上
        this.x = 1;
        this.y = 2;
        var private_z = 3;
        this.d = function() {
            console.log(this.x, this.y, private_z); //可以访问私有数据成员
        }
    }
    show() { //定义在Point.prototype上
        //console.log("show:",this.x,this.y,private_z);//报错,因为无法访问私有数据成员
        console.log("show:", this.x, this.y);
    }
}
var p2 = new Point();
console.log(Object.getOwnPropertyNames(p2)); //(3) ["x", "y", "d"]
console.log(Object.getOwnPropertyNames(p2.__proto__)); //["constructor", "show"]
p2.d(); //1 2 3
p2.show(); //show: 1 2

//class 是语法糖 本质还是原型继承
console.log(typeof Point); //function
console.log(Point instanceof Function); //true
console.log(Point === Point.prototype.constructor); // true
console.log(p2.constructor === Point.prototype.constructor); //true

//与ES5的区别 class类内定义的方法是不可枚举的
console.log(Object.keys(p2)); //(3) ["x", "y", "d"]
console.log(Object.keys(p2.__proto__)); //[]

//补充：
// 由于类的方法都定义在prototype对象上面，所以类的新方法可以添加在prototype对象上面。
// Object.assign方法可以很方便地一次向类添加多个方法。
class Point {
    constructor() {

    }
}
Object.assign(Point.prototype, {
    foo() {},
    fee() {}
});
var p = new Point()
Object.keys(p.__proto__); //(2) ["foo", "fee"]
Object.getOwnPropertyNames(p.__proto__); //(3) ["constructor", "foo", "fee"]


//demo02
//与ES5中一样，实例化出的对象的原型是共享的
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    show() {
        console.log("Point:", x, y);
    }
}
var p1 = new Point(1, 2);
var p2 = new Point(1, 2);
p1.__proto__ === p2.__proto__; //true


class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
var p1 = new Point(2, 3);
var p2 = new Point(3, 2);
p1.__proto__.printName = function() {
    console.log('Oops')
};
p1.printName(); // "Oops"
p2.printName(); // "Oops"
var p3 = new Point(4, 2);
p3.printName(); // "Oops"


// class A{
//     constructor(x){
//         this.x = x;
//     }
// }
// class B extends A{
//     constructor(x,y){
//         //this.y = y;//先写这句话，会报错
//         var tt = super(x);
//         console.log(tt.constructor,tt);
//         this.y = y;
//     }
// }
// var b = new B(1,2);


class Polygon {
    constructor(height, width) {
        this.name = 'Polygon';
        this.height = height;
        this.width = width;
    }
    sayName() {
        console.log('Hi, I am a ', this.name + '.');
    }
}


// class Square extends Polygon {
//     constructor(length) {
//         //this.height;// ReferenceError，super 需要先被调用！

//         /*
//            这里，它调用父类的构造函数的 length,
//            作为Polygon 的 width和 height.
//         */
//         super(length, length);

//         /*
//             注意: 在派生的类中, 在你可以使用'this'之前, 必须先调用super()。
//             忽略这, 这将导致引用错误。
//         */
//         this.name = 'Square';
//     }
//     get area() {
//         return this.height * this.width;
//     }
//     // set area(value) {
//     //     this.area = value;
//     // }
// }


// var obj1 = {
//     method1() {
//         console.log("method 1");
//     }
// }
// var obj2 = {
//     method2() {
//         super.method1();
//     }
// }
// Object.setPrototypeOf(obj2, obj1);
// obj2.method2(); // logs "method 1"


//demo03
//Part1111111111111111111
//与函数一样，类也可以使用表达式的形式定义。
const MyClass = class Me {
    getClassName() {
        return Me.name;
    }
};
// 上面代码使用表达式定义了一个类。
// 需要注意的是，这个类的名字是MyClass而不是Me，Me只在 Class 的内部代码可用，指代当前类。
let inst = new MyClass();
inst.getClassName(); // Me
//Me.name // ReferenceError: Me is not defined
//上面代码表示，Me只在 Class 内部有定义。

//如果类的内部没用到的话，可以省略Me，也就是可以写成下面的形式。
const MyClass = class { /* ... */ };

//采用 Class 表达式，可以写出立即执行的 Class
let person = new class {
    constructor(name) {
        this.name = name;
    }
    sayName() {
        console.log(this.name);
    }
}('张三');
person.sayName(); // "张三"
//上面代码中，person是一个立即执行的类的实例


//Part2222222222222222222
//类不存在变量提升（hoist），这一点与 ES5 完全不同。
new Foo(); // ReferenceError
class Foo {}
//上面代码中，Foo类使用在前，定义在后，这样会报错，
// 因为 ES6 不会把类的声明提升到代码头部。
// 这种规定的原因与下文要提到的继承有关，必须保证子类在父类之后定义。
{
    let Foo = class {};
    class Bar extends Foo {}
}
// 上面的代码不会报错，因为Bar继承Foo的时候，Foo已经有定义了。
// 但是，如果存在class的提升，上面代码就会报错，因为class会被提升到代码头部，
// 而let命令是不提升的，所以导致Bar继承Foo的时候，Foo还没有定义


//由于本质上，ES6 的类只是 ES5 的构造函数的一层包装，所以函数的许多特性都被Class继承，
//包括name属性。
class Point {}
Point.name // "Point"
    //name属性总是返回紧跟在class关键字后面的类名


//与 ES5 一样，在“类”的内部可以使用get和set关键字，
//对某个属性设置存值函数和取值函数，
// 拦截该属性的存取行为。
class MyClass {
    constructor(prop) {
        this._prop = prop;
    }
    get prop() {
        return this._prop;
    }
    set prop(value) {
        this._prop = value;
    }
}
let inst = new MyClass(23);
console.log(inst.prop); //23
inst.prop = 45;
console.log(inst.prop); //45


//Class 内部调用new.target，返回当前 Class。
class Rectangle {
    constructor(length, width) {
        console.log(new.target === Rectangle);
        this.length = length;
        this.width = width;
    }
}
var obj = new Rectangle(3, 4); // 输出 true