//demo06
var f = function(v) { return v + 1; };
f(2); //3

//使用箭头函数，上述代码等效如下,只有一个参数和一条语句
//单参数可以不用（），单语句可以不用return关键字
var f = v => v + 1; //var f = (v) => {return v + 1;};
f(2); //返回3


//没有参数和有多个参数时，需要使用小括号来表示参数，如果有多条语句则需要有大括号表示函数体
var f = () => 5;
// 等同于
var f = function() { return 5 };

var foo = (num1, num2) => {
    if (num1 > num2) {
        return num1 * 2;
    } else {
        return num2 * 2;
    }
};
foo(2, 3); //6
foo(3, 2); //6
// 等同于 ES5的写法
var foo = function(num1, num2) {
    if (num1 > num2) {
        return num1 * 2;
    } else {
        return num2 * 2;
    }
};
foo(2, 3); //6
foo(3, 2); //6


var max = (a, b) => a > b ? a : b;
//等价于
var max = function(a, b) {
    return a > b ? a : b;
};

//箭头函数可以与变量解构结合使用
const full = ({ first, last }) => last + ' ' + first;
full({ first: "Ming", last: "Li" }); //"Li Ming"
// 等同于
function full({ first, last }) { return last + ' ' + first; }
full({ first: "Ming", last: "Li" });


//demo07
// Part1 方法中的函数嵌套 this缺陷
var point = {
    x: 0,
    y: 0,
    moveTo: function(x, y) {
        //内部嵌套函数
        function moveToX() { this.x = x; } //this绑定到了哪里？->window      
        function moveToY() { this.y = y; }
        moveToX();
        moveToY();
    }
};
point.moveTo(2, 2);
console.log(point); //{x: 0, y: 0, moveTo: ƒ}
console.log(window.x, window.y); //2 2


// Part2 方法中的函数嵌套 this缺陷 ES5中通过软绑定解决办法
var point = {
    x: 0,
    y: 0,
    moveTo: function(x, y) {
        var that = this; //软绑定->this是point
        //内部嵌套函数
        function moveToX() { that.x = x; } //this改为that
        function moveToY() { that.y = y; } //this绑定到了哪里？->window
        moveToX();
        moveToY();
    }
};
point.moveTo(2, 2);
console.log(point); //{x: 2, y: 2, moveTo: ƒ}
console.log(window.x, window.y); //undefined undefined

//思考并回顾：如何用call或apply间接调用的方法解决this指向问题？那bind呢？
moveToX.call(this); //取代原moveToX()位置
moveToX.bind(this)(); //同理


//ES6中 箭头函数中this是与函数定义时所在的对象绑定，而不是使用时所在的对象（避免this缺陷）
//箭头函数导致this总是指向函数定义生效时所在的对象
//通过箭头函数可以有效避免this指向问题
var point = {
    x: 0,
    y: 0,
    moveTo: function(x, y) {
        //内部嵌套函数
        var moveToX = () => this.x = x;
        var moveToY = () => this.y = y;
        moveToX();
        moveToY();
    }
};
point.moveTo(2, 2);
console.log(point); //{x: 2, y: 2, moveTo: ƒ}
console.log(window.x, window.y); //undefined unndefined

// 箭头函数有几个使用注意点。
// （1）函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。
// （2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。
// （3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用Rest参数代替。
// （4）不可以使用yield命令，因此箭头函数不能用作Generator函数

//思考函数中的this ES5中如何解决
function foo() {
    setTimeout(function() {
        console.log('id:', this.id);
    }, 100);
}
var id = 21;
foo.call({ id: 42 }); // id: 21

//查看下例中箭头函数的写法和结果
function foo() {
    setTimeout(() => {
        console.log('id:', this.id);
    }, 100);
}
var id = 21;
foo.call({ id: 42 }); // id: 42
//箭头函数导致this总是指向函数定义生效时所在的对象（本例是{id: 42}），所以输出的是42
//其实箭头函数里面没有自己的this，而是引用外层的this

//箭头函数没有自己的this，所以也就不能用call()、apply()、bind()这些方法去改变this的指向
function foo() {
    return () => {
        return () => {
            return () => {
                console.log('id:', this.id);
            };
        };
    };
}
var f = foo.call({ id: 1 });
var t1 = f.call({ id: 2 })()(); // id: 1
var t2 = f().call({ id: 3 })(); // id: 1
var t3 = f()().call({ id: 4 }); // id: 1

//需要特别注意：
//大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上小括号
var getTempItem = itemId => ({ id: itemId, name: "Temp" });
getTempItem(23); //{id: 23, name: "Temp"}
//等效于
var getTempItem = function(itemId) {
    return { id: itemId, name: "Temp" }
};
getTempItem(23); //{id: 23, name: "Temp"}


//demo08
// ES5 中实现函数参数默认值的方法
var sum = function(a, b, c) {
    b = b || 4;
    c = c || 5;
    return a + b + c;
};
console.log(sum(1, 2, 3)); //1+2+3
console.log(sum(1, 2)); //1+2+5
console.log(sum(1)); //1+4+5
console.log(sum(1, 0, 0)); //本应为1+0+0，但此处为1+4+5，代码有问题需优化，优化如下

//优化改造版本
var sum = function(a, b, c) {
    if (b != false) { b = b || 4; } //(b!=false)&&(b=b||4);
    if (c != false) { c = c || 5; } //(c!=false)&&(c=c||5);
    return a + b + c;
};
console.log(sum(1, 2, 3)); //1+2+3
console.log(sum(1, 2)); //1+2+5
console.log(sum(1)); //1+4+5
console.log(sum(1, 0, 0)); //1+0+0


// ES6 中实现函数参数默认值的方法 ,使用babble查看ES5的写法
var sum = function(a, b = 4, c = 5) {
    return a + b + c;
};
console.log(sum(1, 2, 3)); //1+2+3
console.log(sum(1, 2)); //1+2+5
console.log(sum(1)); //1+4+5
console.log(sum(1, 0, 0)); //1+0+0

//默认值案例
function fetch(url, { body = '', method = 'GET', headers = {} } = {}) {
    console.log(url);
    console.log(body);
    console.log(method);
    console.log(headers);
}
fetch('http://example.com');
//http://example.com
//
//GET
//{}
fetch('http://example.com', { body: 'body', method: 'GET' });
//http://example.com
//body
//GET
//{}


//demo09
// Part 11111
function foo(x = 5) {
    let x = 1; //报错->x不能重复声明
    const x = 2; //报错->x不能重复声明
    var x = 3; //正常
}
foo();

// Part 222222
//默认值顺序，参数一般有顺序，有默认值的参数应该是尾参数
//否则无法使 有默认值的用默认值，没有默认值的用传递的参数
function f(x = 1, y) {
    return [x, y];
}
f(); //[1,undefined]
f(2); //[2,undefined]
//f(,3);//报错，无法使x用1，y用3

//所以有默认值的参数在最后
function f(x, y = 1) {
    return [x, y];
}
f(); //[undefined, 1]
f(2); //[2, 1] 


//demo10
// ...类数组：把数组变成散列形式
// ...变量：把变量整合成一个数组
// Part1111111111111
// ES5中 实参数大于形参数量时，可以通过arguments来获得所有参数
function test() {
    console.log(arguments); //console.log(test.arguments);
}
test("a", "b", "c");
//Arguments(3) ["a", "b", "c", callee: ƒ, Symbol(Symbol.iterator): ƒ]

//...Rest——合并若干参数为一个数组，主要用于函数定义时，代替 arguments，组解决arguments的弊端
function f(...y) {
    console.log(y);
}
f("a", "b", "c"); //["a","b","c"]

function add(...values) {
    let sum = 0;
    for (var val of values) {
        sum += val;
    }
    return sum;
}
add(2, 5, 3) // 10

//比arguments使用更加灵活,比如只想看从第二个开始之后的参数
function f(x, ...y) { console.log(x, y); }
f("a", "b", "c", "d"); //"a",["b","c","d"]
f("a", ["b", "c", "d"]); //"a",[["b","c","d"]]
f("a"); //"a",[]
f(); //undefined,[]

function f(x, ...y, z) { console.log(y); }
f("a", "b", "c"); //Uncaught SyntaxError: Rest parameter must be last formal parameter


// Part2222222222222
//...Spread 扩展操作符 相当于化数组为分散的参数，主要用于函数调用时，...Rest的逆运算
function f(x, ...y) { console.log(x, y); }
f("a", ...["b", "c"]); //等价于f("a","b","c"); ->a  ["b", "c"]
f("a"); //"a",[]
f(); //undefined,[]

function f(x, y, z) { console.log(x, y, z); }
f("a", ...["b", "c"]); //等价于f("a","b","c"); ->a b c


//Part333333333333 扩展知识 call与apply的转换 两者之间的区别 通过...Rest和...Spread转换
function abc(...v) { console.log(v) }
abc.call({}, ...[1, 2, 3]); //等效于 abc.apply({},[1,2,3]); ->[1, 2, 3]

//函数定义和调用时的 合并元素为数组（...Rest） 与 拆分数组为各个元素(...Spread)