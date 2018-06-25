//demo11
//Part1111111111111111
//为什么要使用Symbol
// ES5里面对象的属性名都是字符串，
// 如果你需要使用一个别人提供的对象，你对这个对象有哪些属性也不是很清楚，
// 但又想为这个对象新增一些属性，那么你新增的属性名就很可能和原来的属性名发送冲突
// 例如：
var obj = {
    x: 1,
    y: 2,
    moveTo: function(x, y) {
        this.x = x;
        this.y = y;
    }
}
obj.moveTo = function(x, y) {
    console.log("方法被覆盖了");
};
obj.moveTo(0, 0); //方法被覆盖了
// 显然我们是不希望这种情况发生的。所以，我们需要确保每个属性名都是独一无二
// 因此，ES6里就引入了Symbol，用它来产生一个独一无二的值。


//定义Symbol变量，注意Symbol是基本数据类型的一种，不能用new
let s = Symbol(); //不能用new
typeof s; // "symbol"

//Symbol函数可以接受一个字符串作为参数，表示对Symbol实例的描述，主要是为了在控制台显示，
//或者转为字符串时，比较容易区分。
var s1 = Symbol('foo');
var s2 = Symbol('bar');
console.log(s1); // Symbol(foo)
console.log(s2); // Symbol(bar)
console.log(s1.toString()); // "Symbol(foo)"
console.log(s2.toString()); // "Symbol(bar)"


//Part2222222222222222222
//Symbol函数的参数只是表示对当前Symbol值的描述，因此相同参数的Symbol函数的返回值是不相等的。
// 没有参数的情况
var s1 = Symbol();
var s2 = Symbol();
s1 === s2; // false
// 有参数的情况
var s1 = Symbol("foo");
var s2 = Symbol("foo");
s1 === s2; // false


//如果 Symbol 的参数是一个对象，就会调用该对象的toString方法，将其转为字符串，
//然后才生成一个 Symbol 值
const obj = {
    toString() { //对象中函数的简写形式
        return 'abc';
    }
};
const sym = Symbol(obj);
sym; // Symbol(abc)


//Symbol值不能与其他类型的值进行运算，会报错。
var sym = Symbol('My symbol');
"your symbol is " + sym; //报错

//但是，Symbol值可以显式转为字符串。
var sym = Symbol('My symbol');
String(sym); //"Symbol(My symbol)"
sym.toString(); //"Symbol(My symbol)"


//demo12
//Part111111111111111
//由于每一个Symbol值都是不相等的，这意味着Symbol值可以作为标识符，用于对象的属性名，
//就能保证不会出现同名的属性。
//这对于一个对象由多个模块构成的情况非常有用，能防止某一个键被不小心改写或覆盖。
//使用Symbol是用[]，而不是用点操作符
var mySymbol = Symbol();
// 第一种写法
var a = {};
a[mySymbol] = 'Hello!'; //注意中括号内不要加引号
//加引号相当于添加了一个字符串类型的key值"mySymbol"
// 第二种写法
var a = {
    [mySymbol]: 'Hello!'
};
// 第三种写法
var a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });
// 以上写法都得到同样结果
a[mySymbol] // "Hello!"


//思考下述代码，是添加了几个属性，obj对象有几个属性？
var aSymbol = Symbol("abc");
var obj = {
    [aSymbol]: 'Hello!'
};
Object.defineProperty(obj, Symbol("abc"), { value: 'World!' });
obj; //{Symbol(abc): "Hello!", Symbol(abc): "World!"}


//属性值是Symbol时，是独一无二的；但是字符串时，会被覆盖
// .运算符：添加一个字符串类型key值；[]运算符：动态添加key值
var sym1 = Symbol("xx");
var sym2 = Symbol("xx");
var str1 = "xx";
var str2 = "xx";
var obj = {};
obj[sym1] = "12";
obj[sym2] = "34";
obj[str1] = "56";
obj[str2] = "78";
obj; //{xx: "78", Symbol(xx): "12", Symbol(xx): "34"}


//Part22222222222222222
//上面代码通过[]和Object.defineProperty，将对象的属性名指定为一个Symbol值。
//注意，Symbol值作为对象属性名时，不能用点运算符，使用中括号时注意使用引号和不用引号的区别
var mySymbol = Symbol();
var a = {};
a.mySymbol = 'Hello!'; //添加了一个 "mySymbol":'Hello!'
a[mySymbol] // undefined->注意不加引号，相当于访问Symbol值
a['mySymbol']; // "Hello!"->注意加引号，相当于访问string值
//上面代码中，因为点运算符后面总是字符串，所以不会读取mySymbol作为标识名所指代的那个值，
//导致a的属性名实际上是一个字符串，而不是一个Symbol值。


//思考：
var myS1 = Symbol("xx");
var myS2 = "xx";
var obj = {
    [myS1]: 123,
    [myS2]: 456
};
console.log(obj[myS1], obj[Symbol("xx")]); //123 undefined
console.log(obj[myS2], obj["xx"]); //456 456
console.log(obj["myS1"]); //undefined
console.log(obj["myS2"]); //undefined

//同理，在对象的内部，使用Symbol值定义属性时，Symbol值必须放在方括号之中
// 如果不用[]的话相当于使用s对应的字符串定义属性
let s = Symbol();
let obj = {
    [s]: function(arg) { console.log("xx"); }
};
obj[s](123); //xx
// 上面代码中，如果s不放在方括号中，该属性的键名就是字符串s，而不是s所代表的那个Symbol值。

// 采用增强的对象写法，上面代码的obj对象可以写得更简洁一些
let obj = {
    [s](arg) { console.log("xx"); }
};

//还有一点需要注意，Symbol值作为属性名时，该属性还是公开属性，不是私有属性


//了解下述内容
//Symbol用于switch时可以避免重复问题
const COLOR_RED = Symbol("red");
const COLOR_GREEN = Symbol("green");

function getComplement(color) {
    switch (color) {
        case COLOR_RED:
            return COLOR_GREEN;
        case COLOR_GREEN:
            return COLOR_RED;
        default:
            throw new Error('Undefined color');
    }
}
getComplement(COLOR_RED); //Symbol(green)
getComplement(COLOR_GREEN); //Symbol(red)
// 常量使用Symbol值最大的好处，就是其他任何值都不可能有相同的值了，
//因此可以保证上面的switch语句会按设计的方式工作。


//demo13
//Part111111111111111111111111
//Object.getOwnPropertySymbols():可以获取指定对象的所有Symbol属性名
//遍历实例一
var obj = {};
var a = Symbol('a');
var b = Symbol('b');
obj[a] = 'Hello';
obj[b] = 'World';
Object.getOwnPropertySymbols(obj); //[Symbol(a), Symbol(b)]

//遍历实例二
var obj = {};
var foo = Symbol("foo");
Object.defineProperty(obj, foo, { value: "foo bar" });
for (var i in obj) {
    console.log(i); // 无输出
}
Object.getOwnPropertyNames(obj); // []
Object.getOwnPropertySymbols(obj); // [Symbol(foo)]

//实例三
var obj = {};
var str = "x";
var sym1 = Symbol("xx");
var sym2 = Symbol("yy");
obj[str] = 123;
obj[sym1] = 456;
obj[sym2] = 789;
obj; //{x: 123, Symbol(xx): 456, Symbol(yy): 789}
Object.getOwnPropertySymbols(obj); //[Symbol(xx), Symbol(yy)]
//获取Symbol对应的value值
Object.getOwnPropertySymbols(obj).forEach((v) => {
    console.log(obj[v]); //456 789
});

//Part2222222222222222222222
// Symbol.for()与Symbol()这两种写法，都会生成新的Symbol。
// 它们的区别是，前者会被登记在全局环境中供搜索，后者不会。
// Symbol.for()不会每次调用就返回一个新的Symbol类型的值，而是会先检查给定的key是否已经存在，
// 如果不存在才会新建一个值。
// 调用Symbol.for("cat")30次，每次都会返回同一个Symbol值，
// 但是调用Symbol("cat")30次，会返回30个不同的Symbol值。
var s1 = Symbol.for('foo'); //创建
var s2 = Symbol.for('foo'); //返回相同值
console.log(s1 === s2); // true

console.log(Symbol.for("bar") === Symbol.for("bar")); // true
console.log(Symbol("bar") === Symbol("bar")); // false
console.log(Symbol.for("bar") === Symbol("bar")); // false

//Symbol.keyFor方法返回一个已登记的Symbol类型值的key。
var s1 = Symbol.for("foo");
console.log(Symbol.keyFor(s1)); // "foo"
var s2 = Symbol("foo"); //不会被登记
console.log(Symbol.keyFor(s2)); //undefined

//思考：
var s3 = Symbol(Symbol.keyFor(s1));
console.log(s1 === s3); //false
console.log(s2 === s3); //false
var s4 = Symbol.for(Symbol.keyFor(s1));
console.log(s1 === s4); //true
console.log(s2 === s4); //false


//demo14
//Part 111111111111111111111111111111111111111
//Set:它类似于数组，但是成员的值都是唯一的，没有重复的值
//用Set构造函数来生成Set对象，用法类似实例化数组对象，通过new实例化Set对象
//通过add方法向Set结构加入成员，Set结构不会添加重复的值
var s1 = new Set([1, 2, 3, 4, 5, 5, 6, 2, 2]);
console.log(s1); //Set(6) {1, 2, 3, 4, 5, …}

var s2 = new Set();
[2, 3, 5, 4, 5, 2, 2].map(x => s2.add(x));
for (var i of s2) {
    console.log(i);
} // 2 3 5 4


// 例一
var set = new Set([1, 2, 3, 4, 4]);
console.log([...set]); //[1, 2, 3, 4]
// 例二
var items = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
console.log(items.size); // 5

// 去除数组的重复成员
[...new Set([1, 2, 3, 3])]; //(3) [1, 2, 3]


//区分基本类型和引用（对象）类型，两个对象总是不相等的，思考下述代码
var set = new Set();
set.add({});
console.log(set.size); // 1
set.add({});
console.log(set.size); // 2


//Part 22222222222222222222222222222222222222222222222
var s = new Set();
s.add(1).add(2).add(2); // 注意2被加入了两次
s; //Set(2) {1, 2}
s.size // 2
s.has(1); // true
s.has(2); // true
s.has(3); // false
s.delete(2);
s.has(2); // false

var properties = new Set();
properties.add('width');
properties.add('height');
console.log(properties.size); //2
if (properties.has('width') && properties.has('height')) {
    console.log("do something!"); //do something!
}

//将Set转换为数组的三种方法
//1 Array.from
var items = new Set([1, 2, 3, 4, 5]);
var array = Array.from(items);
array; //(5) [1, 2, 3, 4, 5]

//2 ...
console.log([...new Set([1, 2, 3, 4, 5])]); //[1, 2, 3, 4, 5]

//如果不加[]就是散列的元素
console.log(...new Set([1, 2, 3, 4, 5])); //1, 2, 3, 4, 5

//3 Array.prototype.slice.call/apply
Array.prototype.slice.call([...new Set([1, 2, 3])]); //(3) [1, 2, 3]
Array.prototype.slice.apply([...new Set([1, 2, 3])]); //(3) [1, 2, 3]


//关于Set的遍历方法
var set = new Set(['red', 'green', 'blue']);
set; //Set(3) {"red", "green", "blue"}
console.log(set.keys()); //SetIterator {"red", "green", "blue"}
console.log(set.values()); //SetIterator {"red", "green", "blue"}
console.log(set.entries()); //SetIterator {"red", "green", "blue"}

console.log(typeof set.keys()); //注意是object，是否可迭代，可用for...of遍历
console.log(typeof set.values()); //object
console.log(typeof set.entries()); //object

//keys方法、values方法、entries方法返回的都是遍历器对象
for (var item of set.keys()) {
    console.log(item);
}
// red
// green
// blue
for (var item of set.values()) {
    console.log(item);
}
// red
// green
// blue
for (var item of set.entries()) {
    console.log(item);
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]

//练习：使用解构赋值，将数据提取
for (var [key, value] of set.entries()) {
    console.log(key, value);
}
//red red
//green green
//blue blue

//Set结构的实例的forEach方法，用于对每个成员执行某种操作，没有返回值。
var set = new Set([1, 2, 3]);
set.forEach((value, key) => console.log(value * 2, key));
//2 1
//4 2
//6 3

//而且，数组的map和filter方法也可以间接用于Set了，通过...转成数组后调用后再生成set
var set = new Set([1, 2, 3]);
set = new Set([...set].map(x => x * 2)); // 返回Set结构：{2, 4, 6}

var set = new Set([1, 2, 3, 4, 5]);
set = new Set([...set].filter(x => (x % 2) == 0)); // 返回Set结构：{2, 4}


// set应用案例 并集、交集
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);
// 并集
let union = new Set([...a, ...b]); // Set {1, 2, 3, 4}
// 交集
let intersect = new Set([...a].filter(x => b.has(x))); // set {2, 3}


//关于WeakSet
/*
WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 有两个区别。
首先，WeakSet 的成员只能是对象，而不能是其他类型的值。

其次，WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，
也就是说，如果其他对象都不再引用该对象，
那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。
这是因为垃圾回收机制依赖引用计数，如果一个值的引用次数不为0，垃圾回收机制就不会释放这块内存。
结束使用该值之后，有时会忘记取消引用，导致内存无法释放，进而可能会引发内存泄漏。
WeakSet 里面的引用，都不计入垃圾回收机制，所以就不存在这个问题。
因此，WeakSet 适合临时存放一组对象，以及存放跟对象绑定的信息。
只要这些对象在外部消失，它在 WeakSet 里面的引用就会自动消失。

由于上面这个特点，WeakSet 的成员是不适合引用的，因为它会随时消失。
另外，由于 WeakSet 内部有多少个成员，取决于垃圾回收机制有没有运行，
运行前后很可能成员个数是不一样的，而垃圾回收机制何时运行是不可预测的，
因此 ES6 规定 WeakSet 不可遍历。
*/