//创建数组的不同方式
var arr1 = [1,2,3,"4"];

var arr2 = new Array(5);//思考var arr2 = new Array("5");->["5"]
console.log(arr2);//(5) [empty × 5]
for(var i=0;i<arr2.length;i++)
    arr2[i] = i;
arr2;//(5) [0, 1, 2, 3, 4]

var arr3 = new Array(1,2,3,4);//多个参数
console.log(arr1,arr2,arr3);
//(4) [1, 2, 3, "4"]  (5) [0, 1, 2, 3, 4]  (4) [1, 2, 3, 4]


var arr22 = [];
for(var i=0;i<5;i++){
	document.onclick = function(){
		arr22[i] = i;
	}
}//点击document之后：arr22:(6) [empty × 5, 5]


//数组直接量中的值不一定要是常量，可以是任意的表达式
var base = 1024;
var table = [base,base+1,base+2,base+3];//(4) [1024, 1025, 1026, 1027]
//也可包含对象直接量或其他数组直接量
var b = [[1,{y:2}],[2,{x:3}]];//(2) [Array(2), Array(2)]


var a3 = [1,2,3];
var a4 = a3;
a4 = [];
console.log(a3,a4);//(3) [1, 2, 3]  []


//Error
function idLog(x){
    try{
        var arr = new Array(-1);
    }
    catch(e){
        console.log(e);
    }//捕捉异常事件
    finally{
        console.log("222");
    }
}
idLog(123);
//RangeError: Invalid array length
// at idLog (<anonymous>:3:19)
// at <anonymous>:12:1
//  222


//增删改查
var a = ["hello"];
a[1] = 3.14;//增：直接添加数组元素，通过方法添加元素参见后续章节
a[2] = "world";
console.log("删除前的数组a",a);//删除前的数组a (3) ["hello", 3.14, "world"]
delete a[2];//删：此时数组长度是3。
//如何彻底删除？直接修改length与pop方法
console.log("删除后的数组a",a);//删除后的数组a (3) ["hello", 3.14, empty]
a.pop();//a.length=2;
a;//(2) ["hello", 3.14]
a[0] = "XX";//改：修改数组元素a[0]
console.log(a[0]);//查:看数组中的元素，索引从0开始->XX


// 数组特别之处在于，当使用使用2的32次方以内的非负整数作为属性名时
// （包括类型转换的数字），数组会自动维护其length属性，作为数组的元素，
// 而不是数组对象的属性
var a = [];
a[-1.23] = true; //创建一个名为“-1,23”的属性
a["100"] = 0;   // 数组的第101个元素->隐式转换
a[1.00] = "Hi"; //和a[1]相当
console.log(a.length);//101
console.log(a);//(101) [empty, "Hi", empty × 98, 0, -1.23: true]


var a1 = [,"abc"];
console.log(a1.length);//2

for(var i in a1){
    console.log(i,a1[i]);//输出几个元素
}//1 abc
console.log(0 in a1,1 in a1);//false,true->0和1是key值

var a2 = new Array(3);
console.log(a2.length);//3
console.log(a2);//(3) [empty × 3]

var a3 = [,,];
console.log(a3.length);//2
console.log(["a","b"].length);//2
console.log(["a","b",].length);//2
console.log(["a","b",,].length);//3


// 多维数组 实例一 矩形数组和交错数组
var table = new Array(5);
for(var i=0;i<table.length;i++){
    table[i] = new Array(5);//若是table[i] = new Array(i);
}
for(var row=0;row<table.length;row++){
    for(var col=0;col<table[row].length;col++){
        table[row][col]=row*col;
    }
}
var product = table[2][4];//8
console.log(table);
// (5) [Array(5), Array(5), Array(5), Array(5), Array(5)]
// 0:(5) [0, 0, 0, 0, 0]
// 1:(5) [0, 1, 2, 3, 4]
// 2:(5) [0, 2, 4, 6, 8]
// 3:(5) [0, 3, 6, 9, 12]
// 4:(5) [0, 4, 8, 12, 16]

//若是table[i] = new Array(i);->
// (5) [Array(0), Array(1), Array(2), Array(3), Array(4)]
// 0:[]
// 1:[0]
// 2:(2) [0, 2]
// 3:(3) [0, 3, 6]
// 4:(4) [0, 4, 8, 12]

// 合并一起的写法
var table = new Array(5);
for(var i=0;i<table.length;i++){
    table[i] = new Array(5);//若是table[i] = new Array(i);
    for(var col=0;col<table[i].length;col++){
        table[i][col]=i*col;
    }
}
var product = table[2][4];
console.log(table);


//Part1  数组的静态方法
//Array.from() 方法从一个类似数组或可迭代对象中创建一个新的数组实例。
var bar = ["a", "b", "c"];
Array.from(bar);// ["a", "b", "c"]
Array.from('foo');// ["f", "o", "o"]

// Array.of() 和 Array 构造函数之间的区别在于处理整数参数：Array.of(7)
// 创建一个具有单个元素 7 的数组，而 Array(7) 创建一个长度为7的空数组
// （注意：这是指一个有7个空位的数组，而不是由7个undefined组成的数组）。
Array.of(7);       // [7]
Array.of(1, 2, 3); // [1, 2, 3]

Array(7);          // [ , , , , , , ,]
Array(1, 2, 3);    // [1, 2, 3]


var arr1 = [1,3,4];
console.log(Array.isArray(arr1));//true
//pop是Array.prototype上是方法
function foo(){
    console.log(Array.isArray(arguments));//false
	//console.log(arguments.pop());//这样是否能调用？->不能
	//arguments是类数组对象，不是数组
    console.log(Array.prototype.pop.call(arguments));//5
}
foo(3,2,5);


//Part2  数组添加、删除元素的原型方法 破坏性
//Array.prototype.shift
var arr2 = [1,3,5,7];
var shiftElement = arr2.shift();//返回去除的元素
console.log(shiftElement,arr2);//1   (3) [3, 5, 7]

//unshift:在数组开头添加元素
var newLength = arr2.unshift(1,2);//返回新的数组长度
console.log(newLength,arr2);//5 (5) [1, 2, 3, 5, 7]

var popElement = arr2.pop();//返回pop出去的元素
console.log(popElement,arr2);//7 (4) [1, 2, 3, 5]

var newLength = arr2.push(77,88);//返回新的数组长度
console.log(newLength,arr2);//6 (6) [1, 2, 3, 5, 77, 88]

//思考：如何通过push将两个数组组合成一个数组
var arr3 = ["a","b"];
var arr4 = ["c","d"];
Array.prototype.push.apply(arr3,arr4);
console.log(arr3);//(4) ["a", "b", "c", "d"]

//splice(saart,deleteCount?,elememt?)
//splice 从start开始，移除deleteCount个元素，并插入给定的元素
var arr5 = ["a","b","c","d"];
var spliceElements = arr5.splice(1,2,"x");//返回切掉的数组
console.log(spliceElements,arr5);//(2) ["b", "c"]  (3) ["a", "x", "d"]
//思考start若是负数则返回什么？：
var arr5 = ["a","b","c","d"];
arr5.splice(-2,2,"x");//(2) ["c", "d"]
arr5;//(3) ["a", "b", "x"]


//Part1 排序和颠倒元素顺序 破坏性
//Array.prototype.reverse()
var arr1 = [1,2,3];
arr1.reverse();
console.log(arr1);//(3) [3, 2, 1]

//Array.prototype.sort(compareFunction？)
var arr2 = ["banana","apple","pear","orange"];
arr2.sort();//按第一个字母排序
console.log(arr2);//(4) ["apple", "banana", "orange", "pear"]

//思考sort中的参数
var arr3 = [-1,-20,7,50];
arr3.sort();//按第一个数字排序
console.log(arr3);//(4) [-1, -20, 50, 7]

//sort传递的函数对象
arr3.sort(function (a,b) {return a-b;});//(4) [-20, -1, 7, 50]
//对于数字类型，大于0则交换，冒泡排序
arr3.sort(function (a,b) {return a>b;});//(4) [-20, -1, 7, 50]
//对于布尔类型，true则交换，冒泡排序

var arr2 = ["banana","apple","pear","orange"];
arr2.sort(function(a,b){return a[1]>b[1];});
console.log(arr2);//(4) ["banana", "pear", "apple", "orange"]


//Part2 合并、切分和连接 非破坏性
//Array.prototype.concat(arr1?,arr2?,...)
var arr4 = ["banana","apple"];
var arr5 = ["pear","orange"];
var newArray = arr4.concat(arr5);
console.log(newArray,arr4,arr5);
//(4) ["banana", "apple", "pear", "orange"] 
//(2) ["banana", "apple"]  (2) ["pear", "orange"]

//Array.prototype.slice(begin?,end?)注意：不要和splice弄混了
//不算end那个元素
var arr6 = [1,2,3,4,5];
var newArray = arr6.slice(2,4);
console.log(newArray,arr6);//(2) [3, 4] (5) [1, 2, 3, 4, 5]
var newArray2 = arr6.slice(2);
console.log(newArray2,arr6);//(3) [3, 4, 5] (5) [1, 2, 3, 4, 5]

//Array.prototype.join(separator?)
var arr7 = [3,4,5];
var joinReturn = arr7.join("--");//返回了个string
console.log(joinReturn,arr7);//3--4--5 (3) [3, 4, 5]
console.log(typeof joinReturn);//string
//注意：稀疏数组调用join
console.log([3,,,,,,5].join("*"));//3******5->length=7，两个元素之间一个*


//Part3 值的查找 非破坏性
//Array.prototype.indexOf(searchValue,startIndex?)
//searchValue:查找元素   startIndex：从哪开始查找
var arr8 = [1,3,5,5,7,9,5];
console.log(arr8.indexOf(5));//2
console.log(arr8.indexOf(5,3));//3
console.log(arr8.indexOf(5,5));//6

//Array.prototype.lastIndexOf(searchElement,startIndex?)->从后往前查
console.log(arr8.lastIndexOf(5));//6
console.log(arr8.lastIndexOf(5,3));//3
console.log(arr8.lastIndexOf(5,5));//3


//Part1 数组原型方法（迭代-非破坏性-检测方法）
// Array.prototype.forEach(callback,thisValue?) //注意并不返回新的数组
//thisValue可以指定callback中的this
var arr1= [2,5,8];
arr1.forEach(function (a) {
    if(a>3){
        console.log(a,"大于3");
    }else {
        console.log(a,"不大于3");
    }
});
// 2 "不大于3"
// 5 "大于3"
// 8 "大于3"
console.log(arr1);//(3) [2, 5, 8]

var arr1=[2,5,8];
var arr2=[1,6,7];
arr1.forEach(function(a,i){
	console.log(a,i,this);
},arr2);
// 2 0 (3) [1, 6, 7]
// 5 1 (3) [1, 6, 7]
// 8 2 (3) [1, 6, 7]
var arr3=[];
var arr2=[1,6,7];
arr1.forEach(function(a,i){
	arr3[i]=a>arr2[i]?a:arr2[i];
},arr2);
arr3;//(3) [2, 6, 8]

// Array.prototype.every(callback,thisValue?) 
//返回一个布尔类型 若有不满足的将不再进行后续判断直接返回false
var arr2= [2,5,8];//[2,4,6]
var returnValue = arr2.every(function (a) {
	//判断数组元素是否都是偶数，若有不满足的将不再进行后续判断
    console.log(a);//2 5
    return a%2===0;
});
console.log(returnValue);//false

//练习：验证一个百位数，个、十、百 每一位上的数相加可以除尽3的话，
//则这个百位数就能整除3
var arr=[162,111];
var returnValue=arr.every(function(a){
	console.log(a);
	var a1=Math.floor(a/100);
	var a2=Math.floor(a%100/10);
	var a3=a%10;
	return (a1+a2+a3)%3===0;
});
console.log(returnValue);//true

// Array.prototype.some(callback,thisValue?)
//返回一个布尔类型 若有一部分满足的将不再进行后续判断，直接返回true
var arr2= [2,5,8];//[2,4,6]
var returnValue = arr2.some(function (a) {
	//判断数组元素是否都是偶数，若有不满足的将不再进行后续判断
    console.log(a);//2
    return a%2===0;
});
console.log(returnValue);//true


//Part2 数组原型方法（迭代-非破坏性-转换方法）
// Array.prototype.map(callback,thisValue?) //Map映射 返回新的数组
var arr2= [1,3,5,7,9];
var newArray = arr2.map(function(a) {
    return a*a;
});
console.log(newArray,arr2);//(5) [1, 9, 25, 49, 81] (5) [1, 3, 5, 7, 9]

// Array.prototype.filter(callback,thisValue?) //Filter过滤 返回新的数组
var arr2= [1,3,5,7,9];
var newArray = arr2.filter(function(a) {
    //产生新数组，新数组的元素是返回true的那些元素
    return (a>2&&a<8)?true:false;
});
console.log(newArray,arr2);//(3) [3, 5, 7] (5) [1, 3, 5, 7, 9]


//Part3333333 数组原型方法（迭代-非破坏性-归约方法）
// Array.prototype.reduce(element,initialValue?) //从左向右迭代
//对累加器和数组中的每个元素（从左到右）应用一个函数，将其减少为单个值。
// 对reduce的解读 ((((x1 op x2) op x3) op x4)...xn)
function add(prev,cur) {
    return prev+cur;
}
var arr3 = [10,3,1];
console.log(arr3.reduce(add));//14

// Array.prototype.reduceRight(callback,initialValue?) //从右向左迭代
function add(prev,cur) {
    return prev+cur;
}
var arr3 = [10,3,1];
console.log(arr3.reduceRight(add));//14


//综合实例
//arr.reduce(callback[, initialValue])
//initialValue可选:用作第一个调用 callback的第一个参数的值。如果没有提供
//初始值，则将使用数组中的第一个元素。在没有初始值的空数组上调用 reduce 将报错
function printArgs(prev,cur,i) {//i为cur下标值
    console.log("prev",prev,",cur:",cur,",i:",i);
    return prev+cur;
}
var arr4 = ["a","b","c","d"];
console.log(arr4.reduce(printArgs));
// prev a ,cur: b ,i: 1
// prev ab ,cur: c ,i: 2
// prev abc ,cur: d ,i: 3
// abcd
console.log(arr4.reduce(printArgs,"x"));
// prev x ,cur: a ,i: 0
// prev xa ,cur: b ,i: 1
// prev xab ,cur: c ,i: 2
// prev xabc ,cur: d ,i: 3
// xabcd
console.log(arr4.reduceRight(printArgs));
// prev d ,cur: c ,i: 2
// prev dc ,cur: b ,i: 1
// prev dcb ,cur: a ,i: 0
// dcba
console.log(arr4.reduceRight(printArgs,"x"));
// prev x ,cur: d ,i: 3
// prev xd ,cur: c ,i: 2
// prev xdc ,cur: b ,i: 1
// prev xdcb ,cur: a ,i: 0
// xdcba


var flattened = [[0, 1], [2, 3], [4, 5]].reduce(function(a, b){
    return a.concat(b);
});
console.log(flattened);//(6) [0, 1, 2, 3, 4, 5]


var names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];
var countedNames = names.reduce(function (allNames, name) {
    console.log("allNames:"+allNames+"  "+"name:"+name);
    if (name in allNames) {
        allNames[name]++;
    }
    else {
        allNames[name] = 1;
    }
    return allNames;
}, {});
countedNames;//{Alice: 2, Bob: 1, Tiff: 1, Bruce: 1}
// allNames:{} name:Alice
// allNames:{Alice: 1}  name:Bob
// allNames:{Alice: 1, Bob: 1}   name:Tiff
// allNames:{Alice: 1, Bob: 1, Tiff: 1}  name:Bruce
// allNames:{Alice: 1, Bob: 1, Tiff: 1, Bruce: 1}  name:Alice


//使用map和reduce来实现，数组求平均值和标准差
//不用map和reduce的写法
var data = [1,1,3,5,5];
var total = 0;
for(var i=0;i<data.length;i++){
    total += data[i];
}
var average = total/data.length;
total = 0;
for(var i=0;i<data.length;i++){
    var deviation = data[i]-average;
    total+=deviation*deviation;
}
var stddev = Math.sqrt(total/data.length);
//使用map和reduce的精简写法
var data = [1,1,3,5,5];
function add(x,y) {return x+y;}
function deviation(x) {return x-average;}
function square(x){return x*x;}
var average = data.reduce(add)/data.length;
var tempArr = data.map(deviation);
total = 0;
total = tempArr.map(square).reduce(add);
var stddev = Math.sqrt(total/data.length);
