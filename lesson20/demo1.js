//demo1-5
//正则案例 练习 查看编辑器如何使用正则
// /\bo/g:--字边界--o--
// /\d[zo]/:--数字--z or o--
// /2[x-z]/g:--2--one of(x到z)--
console.log("moon2xyz".replace(/o/,"ab"));//mabon2xyz
console.log("moon2xyz".replace(/o/g,"ab"));//mababn2xyz
console.log("moon2 ooxyz".replace(/\bo/g,"ab"));//moon2 aboxyz
console.log("moon2xyz".replace(/\dx/,"_"));//moon_yz
console.log("moon2xyz".replace(/[xyz]/g,"ab"));//moon2ababab
console.log("m2on2x2z".replace(/\d[zo]/g,"ab"));//mabn2xab
console.log("m2on2x2z".replace(/2[x-z]/g,""));//m2on

//将下列文章中 单独的大写C统一改为大写D，要求其他的c不受影响
var str="Chaude and Cold.C stands for chaude";
str.replace(/C/g,"D");


//正则对象的创建方式一 通过字面量直接创建
var reg1 = /[bcf]at/gi;

//正则对象的创建方式二 通过RegExp构造函数来实例化正则对象
//g：全局都要改，否则只改第一个匹配的字符串
//i：不区分大小写
var reg2 = new RegExp(/[bcf]at/,"gi");//常见形式
var reg3 = new RegExp("[bcf]at","gi");

console.log("a fAt bat ,a faT cat".match(reg1));
console.log("a fAt bat ,a faT cat".match(reg2));
console.log("a fAt bat ,a faT cat".match(reg3));
//以上答案都是->["fAt", "bat", "faT", "cat"]


//在控制台上测试，了解两点
// 一、g全局、i大小写、m换行 修饰符的作用
// 二、正则对象的两种基本使用方式 
//     1.字符串.字符串方法（正则对象） 
//     2.正则对象.正则方法（字符串）
var regExp = /ab/i;
var matchResult = "xxAbcaaBbxyz".match(regExp);
console.log(matchResult);
//["Ab", index: 2, input: "xxAbcaaBbxyz", groups: undefined]

var regExp = /ab/gi;
var matchResult = "xxAbcaaBbxyz".match(regExp);
console.log(matchResult);// ["Ab", "aB"]

//  /a*b/gi:--...a--b--（b前面a个数>=0）
//  *匹配前一个表达式0次或多次,等价于 {0,}。
//  /a.b/gi：--a--匹配除换行符之外的任何单个字符--b--
var regExp = /a*b/gi; //注意*和.的区别 
var matchResult = "xxAbcaaBbxyz".match(regExp);
console.log(matchResult);//(3) ["Ab", "aaB", "b"]

var regExp = /a.b/gi;//注意*和.的区别 
var matchResult = "xxAbcaaBbxyz".match(regExp);
console.log(matchResult);//["aaB"]


//test初步了解
//lastIndex 表示当前匹配内容的最后一个字符的下一个位置
//注意：lastIndex只有global为true时考虑，否则重新匹配
var regExp = /a/i;
console.log(regExp.test("ab"),regExp.lastIndex);//true 0
console.log(regExp.test("ab"),regExp.lastIndex);//true 0
console.log(regExp.test("ab"),regExp.lastIndex);//true 0
console.log(regExp.test("ab"),regExp.lastIndex);//true 0

var regExp = /a/gi;
//加了g，循环了若干次后是true还是false,因为test中的lastIndex
console.log(regExp.test("ab"),regExp.lastIndex);//true 1
console.log(regExp.test("ab"),regExp.lastIndex);//false 0
console.log(regExp.test("ab"),regExp.lastIndex);//true 1
console.log(regExp.test("ab"),regExp.lastIndex);//false 0
//lastIndex=1时，从b开始匹配,之后没有可匹配的，所以为false

var regExp = /a/gi;
while (regExp.test("aaa")){
    console.log(regExp.lastIndex);//1 2 3
}


// 正则表达式之 \
// \b:匹配一个词的边界（空格或开头结尾）
// 注意:一个匹配的词的边界与非边界并不包含在匹配的内容中。
console.log(/oo/.test("moon"));//true
console.log(/oo\b/.test("moon"));//false
console.log(/oon\b/.test("moon"));//true
console.log(/\boo/.test("moon"));//false

//seach()返回字符串中第一个与 regexp 相匹配的子串的起始位置,否则返回-1
console.log("moon".search(/oo/));//1
console.log("moon".search(/oo\b/));//-1
console.log("moon".search(/oon\b/));//1
console.log("moon".search(/\boo\b/));//-1


// \B:匹配一个非单词边界
//一个字符串的开始和结尾都被认为是非单词。
console.log(/oo\B/.test("moon"));//true
console.log(/oon\B/.test("moon"));//false
console.log(/oo\B/.test("moon"));//true
console.log(/\Boo\B/.test("moon"));//true

console.log("moon".match(/oo\B/));//["oo", index: 1, input: "moon"]
console.log("moonoonxoo".match(/oo\B/));
//["oo", index: 1, input: "moonoonxoo"]
console.log("moon".match(/oon\B/));//null
console.log("moo".match(/\Boo\B/));//null

"noonday".replace(/\Boo/,"xx");//"nxxnday"
"noonday".search(/\Boo/);//1

//练习将"aaa"替换为"axa"
"aaa".replace(/\Ba\B/,"x");

"possibly yesterday".replace(/y\B./,"aaa");//"possibly aaasterday"
"possibly yesterday".replace(/y\B/,"aaa");//"possibly aaaesterday"


// \d:匹配一个数字等价于[0-9]  
// 例如， /\d/ 或者 /[0-9]/ 匹配"B2 is the suite number."中的'2'
// \D:匹配一个非数字等价于[^0-9]  
// 例如， /\D/ 或者 /[^0-9]/ 匹配"B2 is the suite number."中的'B'

// \w:匹配一个单字字符（字母、数字或者下划线）,等价于[A-Za-z0-9_]。
//例如, /\w/ 匹配 "apple," 中的 'a'，"$5.28,"中的 '5' , "3D." 中的 '3'
// \W:匹配一个非单字字符,等价于[^A-Za-z0-9_]。
//例如, /\W/ 或者 /[^A-Za-z0-9_]/ 匹配 "50%." 中的 '%'。

// \s:匹配一个空白字符 例如, /\s\w*/ 匹配"foo bar."中的' bar'
// \S:匹配一个非空白字符 例如, /\S\w*/ 匹配"foo bar."中的'foo'

//\d \D \w \W \s \S 案例
"sdafsa sdfea2s".replace(/a\ds/g,"*");//"sdafsa sdfe*"
"sdafsa sdfea2s".replace(/a\Ds/g,"*");//"sd**dfea2s"
"sdafsa sdfea2s".replace(/a\ws/g,"*");//"sd*a sdfe*"
"sdafsa sdfea2s".replace(/a\Ws/g,"*");//"sdafs*dfea2s"


//replace()返回一个新字符串
var str = "test22314234244dgfqeqe232qe13ed";
var newStr = str.search(/\dqe/);
console.log(newStr)//24
var s=str.replace(/\dqe/,11223344);
console.log(str);//test22314234244dgfqeqe232qe13ed
console.log(s);//test22314234244dgfqeqe231122334413ed

//匹配一个非单词边界  
// /\B../匹配"noonday"中得'oo', 而/y\B./匹配"possibly yesterday"中得"ye"
console.log("noonday".match(/\B../));
//["oo", index: 1, input: "noonday", groups: undefined]
console.log(/\B../.test("noonday"));//true


//字符类 []
console.log("absxsdfe123Ab".replace(/[abd]/,"X"));//Xbsxsdfe123Ab
console.log("absxsdfe123Ab".replace(/[abd]/g,"X"));//XXsxsXfe123AX
console.log("absxsdfe123Ab".replace(/[abd]/gi,"X"));//XXsxsXfe123XX

// 字符类 的取反 [^]
console.log("absxsdfe123Ab".replace(/[^abd]/,"X"));//abXxsdfe123Ab
console.log("absxsdfe123Ab".replace(/[^abd]/g,"X"));//abXXXdXXXXXXb
console.log("absxsdfe123Ab".replace(/[^abd]/gi,"X"));//abXXXdXXXXXAb

//范围类
console.log("12345667".replace(/[3-9]/gi,"X"));//12XXXXXX
console.log("absxsdfe123Ab".replace(/[a-f1-9]/gi,"X"));//XXsxsXXXXXXXX
//--one of(a到f or 1到9)--
console.log("absxsdfe123Ab".replace(/[a-f][1-9]/gi,"X"));//absxsdfX23Ab
//--one of(a到f)--one of(1到9)--
//如果单独替换，则需要分组，见后续
console.log("absxsdfe1Q2e3Ab".replace(/[a-f][1-9][A-Z]/gi,"X"));
//absxsdfX2Xb

//思考：如何匹配 -
console.log("2017-10-23".replace(/[0-9]/g,"X"));//XXXX-XX-XX
console.log("2017-10-23".replace(/[0-9-]/g,"X"));//XXXXXXXXXX


// \d、\D、\w、\W、\s、\S 用[]如何表示
// [0-9]
// [^0-9]
// [a-zA-Z_0-9]
// [^a-zA-Z_0-9]
// [\t\n\x0B\f\r]
// [^\t\n\x0B\f\r]


//关于. 除了回车和换行符之外的所有字符
/ab[0-9][^\r\n]/ //等效于/ab\d./
console.log("@abc@123@".replace(/@./g,"Q"));//QbcQ23@
console.log("@abc@123@".replace(/.@/g,"Q"));//@abQ12Q


//关于边界 ^ $ \b \B
// $:匹配输入的结束——字符串结尾
console.log("This is a Boy is".replace(/is/g,0));// Th0 0 a Boy 0
console.log("This is a Boy is".replace(/^is/g,0));// This is a Boy is
console.log("This is a Boy is".replace(/is$/g,0));// This is a Boy 0
console.log("This is a Boy is".replace(/is\b/g,0));// Th0 0 a Boy 0
console.log("This is a Boy is".replace(/is\B/g,0));// This is a Boy is
console.log("This is a Boy is".replace(/\bis/g,0));// This 0 a Boy 0
console.log("This is a Boy is".replace(/\Bis/g,0));// Th0 is a Boy is


//思考如何匹配 12345789abcdef34534789ede
//"12345789abcdef34534789ede".replace(/\d\d\d\d\d\d\d\d/g,"X");
//不用量词的写法，非常不好->等价于
//"12345789abcdef34534789ede".replace(/\d{8}/g,"X");

//量词 注意*在这里是量词，不是充当通配符，充当通配符的是 .
//? 出现0次或1次（最多出现1次）
console.log("AaBbAb_AaaBbbAba".replace(/Aa?/g,0));//0Bb0b_0aBbb0ba

//+ 出现1次或多次（至少出现1次）
console.log("AaBbAb_AaaBbbAba".replace(/Aa+/g,0));//0BbAb_0BbbAba

//* 出现0次或多次（任意次）
console.log("AaBbAb_AaaBbbAba".replace(/Aa*/g,0));//0Bb0b_0Bbb0ba

//{n} 出现n次
console.log("AaBbAb_AaaBbbAba".replace(/Aa{1}/g,0));//0BbAb_0aBbbAba
console.log("AaBbAb_AaaBbbAba".replace(/Aa{2}/g,0));//AaBbAb_0BbbAba

//{n,m} 出现n到m次
console.log("AaBbAb_AaaBbbAba".replace(/Aa{1,2}/g,0));//0BbAb_0BbbAba

//{n,} 出现至少n次
console.log("AaBbAb_AaaBbbAbaAaaaaaaAaaAaaa".replace(/Aa{2,}/g,0));
//AaBbAb_0BbbAba000
console.log("AaBbAb_AaaBbbAbaAaaaaaaAaaAaaa".replace(/Aa{2,4}/g,0));
//AaBbAb_0BbbAba0aa00

//注意：0到n次的写法{0,n}而不是{,n}

//思考：
var reg = /d{20}\w\d?\w+\d*\w{3,5}\d{3,}/;
//--20次d--字符--数字最多一次--字符至少一次--数字任意次--字符3~5次--
//数字至少3次--


//贪婪模式和非贪婪模式
"12345678".replace(/\d{3,6}/,'X');//X78->默认为贪婪模式 
"12345678".replace(/\d{3,6}?/,'X');//X45678->设置为非贪婪模式:在量词后加？
"12345678".replace(/\d{3,6}?/g,'X');//"XX78"


//正则表达式的分组
console.log("NameNameName_11111".replace(/Name{3}/,"X"));//NameNameName_11111
console.log("NameNameName_11111".replace(/(Name){3}/,"X"));//X_11111

console.log("a1b2c3d4e5".replace(/[a-z]\d{3}/,"X"));//a1b2c3d4e5
console.log("a1b2c3d4e5".replace(/([a-z]\d){3}/,"X"));//Xd4e5
console.log("a1b2c3d4e5".replace(/([a-z]\d){3,4}/,"X"));//Xe5
console.log("a1b2c3d4e5".replace(/([a-z]\d){3,4}?/,"X"));//Xd4e5

// 与分组相关的 或:|
"abcdefghijk".replace(/abcde|fghijk/g,"X");//XX
"abcdefghijk_abcdehijk_abcfghijk".replace(/abc(de|fg)hijk/g,"X");
//"abcdefghijk_X_X"

//练习：
//将"xxabccxxdexx"替换为"yyabccxxdeyy"
"xxabccxxdexx".replace(/(\bxx)|(xx\b)/g,"yy");//"yyabccxxdeyy"
"xx11xx".replace(/(\bxx)|(xx\b)/g,"mm");//mm11mm

