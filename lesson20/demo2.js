//demo6-9
//分组的 反向引用
//如何将2017-10-23转成10/23/2017
"2017-10-23".replace(/(\d{4})-(\d{2})-(\d{2})/,"$2/$3/$1");//10/23/2017

//分组的 忽略分组 （?:）
"2017-10-23".replace(/(?:\d{4})-(\d{2})-(\d{2})/,"$2/$3/$1");//23/$3/10
//后两个(\d{2})对应的是$1、$2，没有$3
//(?:\d{4})忽略了分组，所以不能反向引用

//!!!!!注意：^代表输入开始，$代表输入结束；[^]代表字符取反
console.log(/^(ab)$/.test("(ab)"));//false
//这个代表了，以a起始，以b结尾;()代表分组
console.log(/^\(ab\)$/.test("(ab)"));//true
// "\("是转移字符，匹配"("字符
//这个代表了，以"("起始，以")"结束


//正则前瞻，了解即可 判断后边是否满足断言
//?= 是->true    ?! 不是->true
console.log("a23*4vv".replace(/\w(?=\d)/g,"X"));//XX3*4vv 正项前瞻
console.log("a23*4v8".replace(/\w(?=\d)/g,"X"));//XX3*4X8
console.log("a23*4v8".replace(/\w(?!\d)/g,"X"));//a2X*XvX 负项前瞻


//- global（全局） 默认为false
//- ignore case（大小写） 默认为false
//- multiline（换行） 默认为false
//- lastIndex 表示当前匹配内容的最后一个字符的下一个位置（global:true时考虑）
//- sourse 正则表达式文本字符串
var reg1 = /\w/;
var reg2 = /\w/gi;
console.log(reg1.global,reg1.ignoreCase,reg1.multiline,
    reg1.lastIndex,reg1.source);//false false false 0 "\w"
console.log(reg2.global,reg2.ignoreCase,reg2.multiline,
    reg2.lastIndex,reg2.source);//true true false 0 "\w"

//思考reg1的global属性是定义在谁身上，是否可修改，它的属性特性描述符是什么？
RegExp.prototype.hasOwnProperty("global");//true
Object.getOwnPropertyDescriptor(RegExp.prototype, "global");
//{get: ƒ, set: undefined, enumerable: false, configurable: true}

var reg2 = /\w/gi;
console.log(reg2.lastIndex);//0
reg2.test("abc23def");
console.log(reg2.lastIndex);//1
reg2.test("abc23def");
console.log(reg2.lastIndex);//2

while (reg2.test("abc23def")){
    console.log(reg2.lastIndex);
}//3 4 5 6 7 8


//RegExp.prototype.exec方法,可以获得更为详细的信息，返回一个有属性的数组，
//属性index表示匹配到的位置
//对于非全局模式下返回第一个匹配的和所有的分组项，正则对象的lastIndex不起作用
//对于全局模式下 每检测一次lastIndex增加一次，再次用此正则对象匹配时，
//匹配的起始点为上一次的lastIndex

//如果 exec() 找到了匹配的文本，则返回一个结果数组。否则，返回 null。
//此数组的第 0 个元素是与正则表达式相匹配的文本，第 1 个元素是与 RegExpObject
//的第 1 个子表达式相匹配的文本（如果有的话），第 2 个元素是与 RegExpObject 
//的第 2 个子表达式相匹配的文本（如果有的话），以此类推。
var reg3 = /\w/gi;
var str = "slfls3r3sfsf";
var returnArray1 = reg3.exec(str);
console.log(reg3.lastIndex,returnArray1);
//1  ["s", index: 0, input: "slfls3r3sfsf", groups: undefined]

var returnArray2 = reg3.exec(str);
console.log(reg3.lastIndex,returnArray2);
//2  ["l", index: 1, input: "slfls3r3sfsf", groups: undefined]

var returnArray3;
while (returnArray3 = reg3.exec(str)){
    console.log(reg3.lastIndex,returnArray3);
}
//3 ["f", index: 2, input: "slfls3r3sfsf", groups: undefined]
//4 ["l", index: 3, input: "slfls3r3sfsf", groups: undefined]
//5 ["s", index: 4, input: "slfls3r3sfsf", groups: undefined]
//6 ["3", index: 5, input: "slfls3r3sfsf", groups: undefined]
//7 ["r", index: 6, input: "slfls3r3sfsf", groups: undefined]
//8 ["3", index: 7, input: "slfls3r3sfsf", groups: undefined]
//9 ["s", index: 8, input: "slfls3r3sfsf", groups: undefined]
//10 ["f", index: 9, input: "slfls3r3sfsf", groups: undefined]
//11 ["s", index: 10, input: "slfls3r3sfsf", groups: undefined]
//12 ["f", index: 11, input: "slfls3r3sfsf", groups: undefined]


//RegExp静态属性
console.log(RegExp.$_);//上一次正则对象匹配内容，得使用一次正则才能有
// "abc".match(/a/);
// ["a", index: 0, input: "abc", groups: undefined]
// RegExp.$_;
// "abc"
console.log(RegExp.lastMatch);
//lastMatch 非标准属性是正则表达式的静态和只读属性，含有最后匹配到的字符串。
// var re = /hi/g;
// re.test('hi there!');
// RegExp.lastMatch; // "hi"
// RegExp['$&'];     // "hi"


"abcdef21313sfsflsf1223jlnsa".match(/[a-h]/);
"abcdef21313sfsflsf1223jlnsa".match(/[a-h]/g);
"abcdef21313sfsflsf1223jlnsa".match(/[123efsa]/g);
"abcdef21313sfsflsf1223jlnsa".match(/[^123efsa]/g);
"abcdef21313sfsflsf1223jlnsa".match(/[1-2a-d]/g);
"hello world Hi you".match(/hello|world/);
"hello world Hi you".match(/hello|world/g);
"world Hi you".match(/hello|world/);
"THat hot hat".match(/h.t/);
"THat hot hat".match(/h.t/g);
"THat hot hat".match(/h.t/gi);
// ["a", index: 0, input: "abcdef21313sfsflsf1223jlnsa", groups: undefined]
// (10) ["a", "b", "c", "d", "e", "f", "f", "f", "f", "a"]
// (20) ["a", "e", "f", "2", "1", "3", "1", "3", "s", "f", "s", "f", "s", "f", "1", "2", "2", "3", "s", "a"]
// (7) ["b", "c", "d", "l", "j", "l", "n"]
// (11) ["a", "b", "c", "d", "2", "1", "1", "1", "2", "2", "a"]
// ["hello", index: 0, input: "hello world Hi you", groups: undefined]
// (2) ["hello", "world"]
// ["world", index: 0, input: "world Hi you", groups: undefined]
// ["hot", index: 5, input: "THat hot hat", groups: undefined]
// (2) ["hot", "hat"]
// (3) ["Hat", "hot", "hat"]