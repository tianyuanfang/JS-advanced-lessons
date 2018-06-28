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


class A {
    constructor(x) {
        this.x = x;
    }
}
class B extends A {
    constructor(x, y) {
        //this.y = y;//先写这句话，会报错->没调用super方法则生不成对象
        var tt = super(x);
        console.log(tt.constructor, tt); //class B extends A{...}  B {x: 1}
        this.y = y;
    }
}
var b = new B(1, 2);


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
class Square extends Polygon {
    constructor(length) {
        //this.height;// ReferenceError->super 需要先被调用！
        var s = super(length, length);
        console.log(s); //Square {name: "Polygon", height: 2, width: 2}
        /*
            注意: 在派生的类中, 在你可以使用'this'之前, 必须先调用super()。
            忽略这, 这将导致引用错误。
        */
        this.name = 'Square';
        console.log(s); //Square {name: "Square", height: 2, width: 2}
    }
    get area() {
        return this.height * this.width;
    }
    set area(value) {
        this.area = value;
    }
}
var s = new Square(2);


var obj1 = {
    method1() {
        console.log("method 1");
    }
}
var obj2 = {
    method2() {
        super.method1();
        //super当做对象时，在原型方法中，指向父类的prototype属性；在静态方法中，指向父类
    }
}
Object.setPrototypeOf(obj2, obj1); //obj2的父类是obj1
obj2.method2(); //method 1


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


//demo04
//Part11111111111111111111111111111111111111111111111
//类的prototype属性相当于实例的原型，所有在类中定义的方法，都会被实例继承。
//如果在一个方法前，加上static关键字，
//就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。
class Foo {
    static classMethod() {
        return 'hello';
    }
}
Foo.classMethod(); // 'hello'
var foo = new Foo();
foo.classMethod(); // TypeError: foo.classMethod is not a function
// 上面代码中，Foo类的classMethod方法前有static关键字，表明该方法是一个静态方法，
// 可以直接在Foo类上调用（Foo.classMethod()），而不是在Foo类的实例上调用。
// 如果在实例上调用静态方法，会抛出一个错误，表示不存在该方法
// 注意，如果静态方法包含this关键字，这个this指的是类，而不是实例。


class Foo {
    static bar() {
        this.baz();
    }
    static baz() {
        console.log('hello');
    }
    baz() {
        console.log('world');
    }
}
Foo.bar(); // hello
// 上面代码中，静态方法bar调用了this.baz，这里的this指的是Foo类，
// 而不是Foo的实例，等同于调用Foo.baz。
// 另外，从这个例子还可以看出，静态方法可以与非静态方法重名。


//思考下边的例子
class Foo {
    static baz() {
        console.log('hello');
    }
    baz() {
        console.log('world');
        Foo.baz();
    }
    static fun1(o) {
        // this.fun2();//报错
        o.fun2();
    }
    fun2() {
        console.log("fun2")
    }
}
var a = new Foo();
a.baz(); //world hello
Foo.fun1(a); //fun2


//demo05
//静态属性指的是 Class 本身的属性，即Class.propName，而不是定义在实例对象（this）上的属性。
class Foo {}
Foo.prop = 1;
Foo.prop; // 1
//上面的写法为Foo类定义了一个静态属性prop。
//目前，只有这种写法可行，因为 ES6 明确规定，Class 内部只有静态方法，没有静态属性。

/*
// 以下两种写法都无效
class Foo {
    // 写法一
    prop: 2;
    // 写法二
    static prop: 2;
}
Foo.prop // undefined
*/

//目前有一个静态属性的提案，对实例属性和静态属性都规定了新的写法
class MyClass {
    static myStaticProp = 42;
    constructor() {
        console.log(MyClass.myStaticProp); // 42
    }
}
// 同样的，这个新写法大大方便了静态属性的表达，ES6暂不支持

// 老写法
class Foo {
    // ...
}
Foo.prop = 1;
// 上面代码中，老写法的静态属性定义在类的外部。整个类生成以后，再生成静态属性。
// 这样让人很容易忽略这个静态属性，也不符合相关代码应该放在一起的代码组织原则。
// 另外，新写法是显式声明（declarative），而不是赋值处理，语义更好


//demo06
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
class ColorPoint extends Point {
    constructor(x, y, color) {
        super(x, y); // 调用父类的constructor(x, y)，如果没有调用super将报错
        this.color = color;
    }
    show() {
        console.log(this.x, this.y, this.color);
    }
}
var cp = new ColorPoint(1, 2, 3);
cp.show(); //true
console.log(cp instanceof ColorPoint); // true
console.log(cp instanceof Point); // true

//类-类原型链、对象-对象原型链
console.log(Object.getPrototypeOf(ColorPoint) === Point); //true
console.log(ColorPoint.__proto__ === Point); //true
console.log(cp.__proto__ === ColorPoint.prototype); //true
console.log(cp.__proto__.__proto__ === Point.prototype); //true
console.log(ColorPoint.__proto__.__proto__ === Function.prototype); //true

// 子类必须在constructor方法中调用super方法，否则新建实例时会报错。
// 这是因为子类没有自己的this对象，而是继承父类的this对象，然后对其进行加工。
// 如果不调用super方法，子类就得不到this对象

// ES5的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面
// Parent.call(this)。
// ES6的继承机制完全不同，必须先调用super方法， 然后再用子类的构造函数修改this。

// 如果子类没有定义constructor方法，这个方法会被默认添加，代码如下。
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
class ColorPoint extends Point {

}
var cp = new ColorPoint();
cp; //ColorPoint {x: undefined, y: undefined}
// 也就是说，不管有没有显式定义，任何一个子类都有constructor方法

// 另一个需要注意的地方是，在子类的构造函数中，只有调用super之后，
// 才可以使用this关键字，否则会报错。
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
class ColorPoint extends Point {
    constructor(x, y, color) {
        //this.color = color; // ReferenceError 报错因为没有调用父类构造函数，没有实例
        super(x, y);
        this.color = color; // 正确
    }
}


// 关于静态方法的继承，父类的静态方法，可以被子类继承。
class Foo {
    static classMethod() {
        return 'hello';
    }
}
class Bar extends Foo {}
Bar.classMethod(); // 'hello'
// 上面代码中，父类Foo有一个静态方法，子类Bar可以调用这个方法。

// 静态方法也是可以从super对象上调用的。
class Foo {
    static classMethod() {
        return 'hello';
    }
}
class Bar extends Foo {
    static classMethod() {
        return super.classMethod() + ', too'; //此时的super指代父类
    }
}
Bar.classMethod(); // "hello, too"


//静态方法的继承的案例
class Human {
    constructor() {}
    static ping() {
        return 'ping';
    }
}
class Computer extends Human {
    constructor() {
        super(); //super此处指代父类构造函数
    }
    static pingpong() {
        return super.ping() + ' pong'; //super此处指代父类
    }
}
Computer.pingpong(); // 'ping pong'