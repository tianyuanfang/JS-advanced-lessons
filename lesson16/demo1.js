var a = 10;b = "Hi";
function thisTest2(){
    console.log(this);//window
    this.a = 20;//修改a的值
    delete this.b;
    this.c = "新添加属性";//在window下添加属性c
}
thisTest2();
console.log(a,c);//20 "新添加属性"


//严格模式下this为undefined，非严格模式下this为window
//检测严格模式
function isStrict(){
    "use strict"
     return this===undefined?true:false;
}
isStrict();//true


//达不到目标
var point = {
    x:0,
    y:0,
    moveTo:function(x,y){
        function moveToX(x){
            this.x = x;//this->window
        };
        function moveToY(y){
            this.y = y;//this->window
        }
        moveToX(x);
        moveToY(y);
    }
};//对象中的嵌套函数当做一般函数
point.moveTo(2,2);
point;//{x: 0, y: 0, moveTo: ƒ}
console.log(window.x,window.y);//2 2

//可达到目标
var point = {
    x:0,
    y:0,
    moveTo:function (x,y) {
        this.x = x;
        this.y = y;
    }
};
point.moveTo(1,1);//this绑定到当前对象，即point对象上
console.log(point);//{x: 1, y: 1, moveTo: ƒ}


//使用构造函数创建对象，this为实例化的对象
function Point(x,y) {
    this.x = x;
    this.y = y;
}
var p = new Point(2,3);
console.log(p);//Point {x: 2, y: 3}
//直接调用Point方法会是什么样的情况
Point(5,6);
console.log(window.x,window.y);//5 6


//call 实例
objA = {name:"AA",x:1};
objB = {name:"BB",x:5};
objA.test = function () {
    console.log(this.name,this.x);
};
objA.test();//AA 1
objA.test.call(objB);//BB 5


// Part1 方法中函数嵌套 this缺陷
var point = {
    x:0,
    y:0,
    moveTo:function (x,y) {
        //内部嵌套函数
        function moveToX() {
            this.x = x;//this绑定到了window
        }
        //内部嵌套函数
        function moveToY() {
            this.y = y;//this绑定到了window
        }
        moveToX();
        moveToY();
    }
};
point.moveTo(2,2);
console.log(point);//{x: 0, y: 0, moveTo: ƒ}
console.log(window.x,window.y);//2 2

// 解决方案一：软绑定
var point = {
    x:0,
    y:0,
    moveTo:function (x,y) {
        var that = this;//关键的一行，软绑定
        //内部嵌套函数
        function moveToX() {
            that.x = x;//that为该对象
        }
        function moveToY() {
            that.y = y;//that为该对象
        }
        moveToX();
        moveToY();
    }
};
point.moveTo(2,2);
console.log(point);//{x: 2, y: 2, moveTo: ƒ}
console.log(window.x,window.y);//undefined undefined

//解决方案二：通过call和apply来解决
var point = {
    x:0,
    y:0,
    moveTo:function (x,y) {
        function moveToX() {
            this.x = x;//this绑定到了window
        }
        function moveToY() {
            this.y = y;//this绑定到了window
        }
        moveToX.call(this);//->this.moveToX()->point.moveToX()
        moveToY();
    }
};
point.moveTo(2,2);
console.log(point);//{x: 2, y: 0, moveTo: ƒ}

//解决方案三：通过bind来解决
var point = {
    x:0,y:0,
    moveTo:function (x,y) {
        function moveToX() {
            this.x = x;//this绑定到了window
        }
        function moveToY() {
            this.y = y;//this绑定到了window
        }
        moveToX.bind(point)();//f.bind(obj)->返回一个函数，主体变成了obj
        moveToY.bind(point)();
    }
};
point.moveTo(2,2);
console.log(point);//{x: 2, y: 2, moveTo: ƒ}


// Part2 构造函数中函数嵌套 this缺陷
//当Point作为构造函数时，this为实例化的对象；
//当Point为普通函数时，this为window
function Point(x,y) {
    this.x = x;
    this.y = y;
    this.moveXY = function (x,y) {
        function moveX(x) {
            this.x+=x;//this是window
        }
        function moveY(y) {
            this.y+=y;//this是window
        }
        moveX(x);
        moveY(y);
    }
}
var p = new Point(2,3);
p.moveXY(1,1);
console.log(p);//输出为Point{x:2,y:3}没有移动

//解决方案1 软绑定
function Point(x,y) {
    this.x = x;
    this.y = y;
    this.moveXY = function (x,y) {
        var that = this;//此处that为实例化出来的p对象
        function moveX(x) {
            that.x+=x;//this改为that
        }
        function moveY(y) {
            that.y+=y;//this改为that
        }
        moveX(x);
        moveY(y);
    }
}
var p = new Point(2,3);
p.moveXY(1,1);
console.log(p);//输出为Point{x:3,y:4}，移动了(1,1)

//解决方案2 call/apply
function Point(x,y) {
    this.x = x;
    this.y = y;
    this.moveXY = function (x,y) {
        function moveX(x) {
            this.x+=x;
        }
        function moveY(y) {
            this.y+=y;
        }
        moveX.call(this,x);
        moveY.apply(this,[y]);
    }
}
var p = new Point(2,3);
p.moveXY(1,1);
console.log(p);//输出为Point{x:3,y:4}，移动了(1,1)

//解决方案3 bind
function Point(x,y) {
    this.x = x;
    this.y = y;
    this.moveXY = function (x,y) {
        function moveX(x) {
            this.x+=x;
        }
        function moveY(y) {
            this.y+=y;
        }
        moveX.bind(this,x)();
        moveY.bind(this,y)();
    }
}
var p = new Point(2,3);
p.moveXY(1,1);
console.log(p);//输出为Point{x:3,y:4}，移动了(1,1)


//思考：下述代码
var obj = {
    name:"obj",
    x:23,
    test:function(){
        console.log(this.x,this);
    }
};
var fun1 = function () {
    return function fun2() {
        return this.x;//若改为 return this;
    }
};
obj.fun3 = fun1;
obj.fun4 = fun1();
console.log(obj.fun3());
// ƒ fun2() {
//     return this.x;//若改为 return this;
// }（同前一个答案）
console.log(obj.fun3()());//undefined（window）
console.log(obj.fun4());//23（{name: "obj", x: 23, test: ƒ, fun3: ƒ, fun4: ƒ}）
//相当于
// obj.fun3=function () {
//     return function fun2() {
//         return this.x;//->对象中的嵌套函数，this为window
//     }
// };
// obj.fun4=function fun2() {
//     return this.x;//若改为 return this;
// }