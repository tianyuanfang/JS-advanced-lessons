//demo09
//ES6允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构赋值
//这种写法属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值

//不用解构赋值方式定义变量
var a = 1;
var b = 2;
var c = 3;
console.log(a, b, c); //1 2 3

//用解构赋值方式定义变量
//Part 1111111111111111 数组的解构赋值
var [a, b, c] = [1, 2, 3];
console.log(a, b, c); //1 2 3

//let 也支持解构赋值
let [foo, [
    [bar], baz
]] = [1, [
    [2], 3
]];
console.log(foo, bar, baz); //1 2 3

let [, , xx] = ["foo", "bar", "baz"];
console.log(xx); // "baz"

let [x, , y] = [1, 2, 3];
console.log(x, y); //1 3

let [head, ...tail] = [1, 2, 3, 4]; //...tail===undefined默认值->[]
console.log(head, tail); //1 [2, 3, 4]

let [d, e, ...f] = ['a'];
console.log(d, e, f); //"a" undefined []

//注意：如果解构不成功，变量的值就等于undefined
var [foo2] = [];
var [bar2, fee2] = [1];
console.log(foo2, fee2); //undefined undefined


//不完全解构的情况
let [x2, y2] = [1, 2, 3];
console.log(x2, y2); //1 2

let [a2, [b2], d2] = [1, [2, 3], 4];
console.log(a2, b2, d2); //1 2 4


//如果等号的右边不是数组（或者严格地说，不是可遍历的结构），那么将会报错
let [foo] = 1; //not iterable
let [foo] = false; //not iterable
let [foo] = NaN; //not iterable
let [foo] = undefined; //not iterable
let [foo] = null; //not iterable
let [foo] = {}; //not iterable


//解构赋值中的默认值(变量===undefined为真，则等于默认值)
var [foo3 = true] = []; //foo3 为 true
[x3, y3 = 'b'] = ['a']; // x3='a'   y3='b'
[x4, y4 = 'b'] = ['a', undefined]; // x4='a'  y4='b'

// ES6内部使用严格相等运算符（===），判断一个位置是否有值。
// 所以，如果一个数组成员不严格等于undefined，默认值是不会生效的。
var [x5 = 1] = [undefined]; //x5 为 1
var [x6 = 1] = [null]; //x6 为 null
//null===undefined->false

function f2() {
    return 2;
}
let [x7 = f2()] = [1];
console.log(x7); //1

//默认值可以引用解构赋值的其他变量，但该变量必须已经声明
let [m1 = 1, n1 = m1] = []; // m1=1; n1=1
let [m2 = 1, n2 = m2] = [2]; // m2=2; n2=2
let [m3 = 1, n3 = m3] = [1, 2]; // m3=1; n3=2
let [m4 = n4, n4 = 1] = []; // ReferenceError
console.log(m1, n1, m2, n2, m3, n3);


let a = [];
let b = [2, 3, 4];
[a[0], a[1], a[2]] = b;
console.log(a == b); //false
a; //(3) [2, 3, 4]

let a = [];
let b = [2, 3, 4];
a = b;
console.log(a == b); //true


// //以下内容先只做了解，详细内容参见Set Map和Generator章节
// //对于Set结构，也可以使用数组的解构赋值
// let [x8, y8, z8] = new Set(["a", "b", "c"]);

// //Generator案例
// function* fibs() {
//     var a8 = 0;
//     var b8 = 1;
//     while (true) {
//         yield a8;
//         [a8, b8] = [b8, a8 + b8];
//     }
// }
// var [first, second, third, fourth, fifth, sixth,xxx,yyy,zzz,mm,nn,pp] = fibs();
// console.log(first, second, third, fourth,fifth,sixth,xxx,yyy,zzz,mm,nn,pp);//


//demo10
//对象的解构赋值
var { foo1, bar1 } = { foo1: "aaa", bar1: "bbb" };
//->var { foo1: foo1, bar1: bar1 } = { foo1: "aaa", bar1: "bbb" };
console.log(foo1, bar1); //aaa bbb


// 数组的元素是按次序排列的，变量的取值由它的位置决定
// 而对象的属性没有次序，变量必须与属性key同名，才能取到正确的值
var { bar2, foo2 } = { foo2: "ccc", bar2: "ddd" };
console.log(foo2, bar2); //ccc ddd

var { baz3 } = { foo3: "ccc", bar3: "ddd" };
console.log(baz3); //undefined


//左侧为键值对时,注意键值对赋值时的对应关系:键是匹配用的，值是变量
var { foo4: baz4 } = { foo4: 'aaa', bar4: 'bbb' };
console.log(baz4); // "aaa"

let obj1 = { first: 'hello', last: 'world' };
let { first: f, last: l } = obj1;
console.log(f, l); //hello world

let { first, last } = obj1;
console.log(first, last); //hello world


//对象的解构赋值的内部机制，是先找到同名属性，再赋给对应的变量。真正被赋值的是后者，而不是前者。
var { foo6: baz6 } = { foo6: "aaa", bar6: "bbb" };
console.log(baz6); // "aaa"
foo6 // error: foo is not defined
//上面代码中，真正被赋值的是变量baz6，而不是模式foo6


//和数组一样，解构也可以用于嵌套结构的对象,如果是键值对，键只用于匹配，真正赋给的是对应的值
var obj2 = { p: ['Hello', { y: 'World' }] };
var { p: [x, { y }] } = obj2;
console.log(x, y); //Hello World

var { p: [x, { y: z }] } = obj2;
console.log(x, z); //Hello World
console.log(y, p); //都报错

var node = { loc: { start: { line: 1, column: 5 } } };
var { loc: { start: { line } } } = node;
line; // 1
//loc,start;// error: undefined
//上面代码中，只有line是变量，loc和start都是模式，不会被赋值。

//嵌套赋值的例子，为什么加括号，如果不加括号解析器将解析为代码块，所以加括号
let obj3 = {};
let arr = [];
({ foo7: obj3.prop, bar7: arr[0] } = { foo7: 123, bar7: true });
console.log(obj3); // { prop: 123 }
console.log(arr); // [true]

//对象的解构也可以指定默认值。
var { x2 = 3 } = {};
console.log(x2); // 3

var { x3, y3 = 5 } = { x3: 1 };
console.log(x3); // 1
console.log(y3); // 5

var { x4: y4 = 3 } = {};
console.log(y4); // 3

var { x5: y5 = 3 } = { x5: 5 };
console.log(y5); // 5

var { message: msg = 'Something went wrong' } = {};
console.log(msg); // "Something went wrong"


//demo11
//字符串也可以解构赋值
const [a, b, c, d, e] = 'hello'; //相当于将'hello'转成了["h","e","l","l","o"]后解构
console.log(a); // "h"
console.log(b); // "e"
console.log(c); // "l"
console.log(d); // "l"
console.log(e); // "o"

//类似数组的对象都有一个length属性，因此还可以对这个属性解构赋值。
let { length: len } = 'hello';
console.log(len); // 5


//解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。
let { toString: s1 } = 123;
//把123转换为Number对象，它继承了Number.prototype的toString方法，所以toString匹配上了
console.log(s1); //ƒ toString() { [native code] }
//s1 === Number.prototype.toString // true

let { toString: s2 } = true; //同上理
console.log(s2); //ƒ toString() { [native code] }
//s2 === Boolean.prototype.toString // true


//解构赋值的规则是，只要等号右边的值不是对象，就先将其转为对象。
// 由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错。
let { prop: x } = undefined; // TypeError
let { prop: y } = null; // TypeError


//demo12
function add([x, y]) {
    return x + y;
}
add([1, 2]); // 3

[
    [1, 2],
    [3, 4]
].map(function([a, b]) { return a + b; }); // [ 3, 7 ]->[1,2]作为实参整体传入
//箭头函数表示形式 [[1, 2], [3, 4]].map(([a, b]) => a + b);


//函数参数的解构也可以使用默认值,下例中用了两次的解构赋值
function move1({ x = 0, y = 0 } = {}) {
    return [x, y];
}
console.log(move1({ x: 3, y: 4 })); // [3, 4]
console.log(move1({ x: 3 })); // [3, 0]
console.log(move1({})); // [0, 0]
console.log(move1()); // [0, 0]

//注意，下面的写法会得到不一样的结果。
function move2({ x, y } = { x: 0, y: 0 }) {
    return [x, y];
}
console.log(move2({ x: 3, y: 8 })); // [3, 8]
console.log(move2({ x: 3 })); // [3, undefined]
console.log(move2({})); // [undefined, undefined]
console.log(move2()); // [0, 0]
//上面代码是为函数move的参数指定默认值，而不是为变量x和y指定默认值


//undefined就会触发函数参数的默认值
[1, undefined, 3].map(function(x = 'yes') { return x; });
// [ 1, 'yes', 3 ]
//箭头函数表示形式 [1, undefined, 3].map((x = 'yes') => x);


//demo13
// 1 交换变量的值
var [x, y] = ["a", "b"];
[x, y] = [y, x];
console.log(x, y); //b,a

// 2 从函数返回多个值
// 函数只能返回一个值，如果要返回多个值，只能将它们放在数组或对象里返回。
// 返回一个数组
function example() {
    return [1, 2, 3];
}
var [a, b, c] = example();
console.log(a, b, c); //1 2 3

// 返回一个对象,解构所有属性
function example() {
    return { foo: 1, bar: 2 };
}
var { foo, bar } = example();
console.log(foo, bar); //1 2

// 3 函数参数的定义
//解构赋值可以方便地将一组参数与变量名对应起来。
// 参数是一组有次序的值
function f([x, y, z]) {
    console.log(x, y, z);
}
f([1, 2, 3]); //1 2 3

// 参数是一组无次序的值
function f({ x, y, z }) {
    console.log(x, y, z);
}
f({ z: 3, y: 2, x: 1 }); //1 2 3


//demo14
// 4 提取JSON数据
//解构赋值对提取JSON对象中的数据，尤其有用。
var jsonData = { id: 42, status: "OK", data: [867, 5309] };
let { id, status, data: number } = jsonData;
console.log(id, status, number); // 42, "OK", [867, 5309]

//5 函数参数的默认值
jQuery.ajax = function(url, {
    async = true,
    beforeSend = function() {},
    cache = true,
    complete = function() {},
    crossDomain = false,
    global = true,
    // ... more config
}) {
    // ... do stuff
};
//指定参数的默认值，就避免了在函数体内部再写var foo = config.foo || 'default foo';

//6 遍历Map结构 Map相关内容参见Map Set章节
// 任何部署了Iterator接口的对象，都可以用for...of循环遍历。
// Map结构原生支持Iterator接口，配合变量的解构赋值，获取键名和键值就非常方便。
var map = new Map();
map.set('first', 'hello');
map.set('second', 'world');
for (let [key, value] of map) {
    console.log(key + " is " + value);
}
// first is hello
// second is world

//如果只想获取键名，或者只想获取键值，可以写成下面这样。
// 获取键名
for (let [key] of map) {
    // ...
}
// 获取键值
for (let [, value] of map) {
    // ...
}

// 7 输入模块的指定方法
//加载模块时，往往需要指定输入哪些方法。解构赋值使得输入语句非常清晰。
const { SourceMapConsumer, SourceNode } = require("source-map");


//demo15
// 括号扩的是值而不是模式时可以使用括号
// 以下三种解构赋值不得使用圆括号。
//（1）变量声明语句中，不能带有圆括号。
// var [(a)] = [1];
// var {x: (c)} = {};
// var ({x: c}) = {};
// var {(x: c)} = {};
// var {(x): c} = {};
// var { o: ({ p: p }) } = { o: { p: 2 } };// 全部报错

//（2）函数参数中，模式不能带有圆括号
//函数参数也属于变量声明，因此不能带有圆括号。
// function f([(z)]) { return z; }
// f([1]);// 报错

//（3）赋值语句中，不能将整个模式或嵌套模式中的一层，放在圆括号之中
({ p: a }) = { p: 42 };
([a]) = [5];
//上面代码将整个模式放在圆括号之中，导致报错。

[({ p: a }), { x: c }] = [{}, {}];
//上面代码将嵌套模式的一层放在圆括号之中，导致报错。

//可以使用圆括号的情况：赋值语句的非模式部分，可以使用圆括号。
[(b)] = [3]; // 正确
({ p: (d) } = {}); // 正确
[(parseInt.prop)] = [3]; // 正确
// 第一行语句中，模式是取数组的第一个成员，跟圆括号无关
// 第二行语句中，模式是p，而不是d
// 第三行语句与第一行语句的性质一致
// 上面三行语句都可以正确执行,它们的圆括号都不属于模式的一部分。

// 即括号扩的是值而不是模式时可以使用括号，但建议能不用括号的尽量不用，避免产生歧义