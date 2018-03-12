//Number原型方法(Number对象继承的方法）
// Number.prototype.toFixed();
// Number.prototype.toPrecision();
// Number.prototype.toString();
// Number.prototype.toExponential();
/*
Number原型方法(Number对象继承的方法）

Number.prototype.toFixed(digits):小数点后数字的个数；
介于 0 到 20 （包括）之间，实现环境可能支持更大范围。
如果忽略该参数，则默认为 0
eg:
var numObj = 12345.6789;
numObj.toFixed();// 返回 "12346"：进行四舍五入，不包括小数部分
numObj.toFixed(1);// 返回 "12345.7"：进行四舍五入
numObj.toFixed(6);// 返回 "12345.678900"：用0填充

Number.prototype.toPrecision()：影响精度
eg:
var numObj = 5.123456;
numObj.toPrecision();//输出 5.123456
numObj.toPrecision(5);//输出 5.1235
numObj.toPrecision(2);//输出 5.1
numObj.toPrecision(1);//输出 5

Number.prototype.toString()：参数，按进制转换
eg:
var count = 10;
console.log(count.toString());// 输出 '10'
console.log((17).toString());// 输出 '17'
console.log((17.2).toString());// 输出 '17.2'
var x = 6;
console.log(x.toString(2));// 输出 '110'
console.log((254).toString(16));// 输出 'fe'
console.log((-10).toString(2));// 输出 '-1010'
console.log((-0xff).toString(2));// 输出 '-11111111'

Number.prototype.toExponential():影响幂的小数点后位数
eg:
var numObj = 77.1234;
numObj.toExponential();//输出 7.71234e+1
numObj.toExponential(4);//输出 7.7123e+1
numObj.toExponential(2));//输出 7.71e+1
*/
var n1 = 12345.6789;
console.log(n1.toFixed(2));// 12345.68
console.log(n1.toPrecision(2));//1.2e+4
console.log(n1.toString());//12345.6789
console.log(n1.toExponential(2));//1.23e+4


console.log(NaN === NaN);//false
console.log(isNaN("12,3"));//true
console.log(Math.floor(3.8));//3
console.log(Math.floor(-3.8));//-4
console.log(Math.ceil(3.2));//4
console.log(Math.ceil(-3.2));//-3
console.log(Math.round(-3.2));//-3
console.log(Math.round(-3.5));//-3
console.log(Math.round(-3.8));//-4
//round() 方法可把一个数字舍入为最接近的整数。
//对于 0.5，该方法将进行上舍入。
//例如，3.5 将舍入为 4，而 -3.5 将舍入为 -3。


console.log("A" > "a");//false
console.log("B".localeCompare("A"));//考虑本地化的字符排序，返回0或非0->1
console.log("A".localeCompare("A"));//考虑本地化的字符排序，返回0或非0->0
console.log("A".localeCompare("B"));//-1
//类似于前后两字符相减


var str18 = "abcDEF".toLowerCase();//abcdef->小写
var str19 = "abcDEF".toUpperCase();//ABCDEF->大写


//String.prototype.toLocaleLowerCase( );
//根据任何特定于语言环境的案例映射，将表示调用字符串的新字符串转换为小写。

//String.prototype.toLocaleUpperCase( );
//使用本地化（locale-specific）的大小写映射规则将输入的字符串转化成大写
//形式并返回结果字符串。

//String.prototype.lastIndexOf(searchValue[, fromIndex]);
//返回指定值在调用该方法的字符串中最后出现的位置，如果没找到则返回 -1。
//从该字符串的后面向前查找，从 fromIndex 处开始。
//eg:
// "canal".lastIndexOf("a")   // returns 3
// "canal".lastIndexOf("a",2) // returns 1
// "canal".lastIndexOf("a",0) // returns -1
// "canal".lastIndexOf("x")   // returns -1


//Part 444444444 与正则相关的方法 详细内容参见正则表达式章节
//String.prototype.search(regexp);
//String.prototype.match(regexp);
//String.prototype.replace(regexp);