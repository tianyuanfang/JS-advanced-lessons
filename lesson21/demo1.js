//异常处理基本形式
// try语句包含了由一个或者多个语句 和至少一个catch子句或一个finally子句
//的其中一个组成的try块
// 或者两个兼有,下面是三种形式的try声明:
// try...catch
// try...finally
// try...catch...finally

/*
catch语句中包含要执行的语句，当try语句中抛出错误时,你想让try语句中的内容成功 
如果没成功，你想控制接下来发生的事情，这时你可以在catch语句中实现。
如果在try块中有任何一个语句或者调用的函数抛出异常,控制立即转向catch子句。
如果在try块中没有异常抛出，则catch子句将会跳过。
finally子句无论是否有异常抛出或着是否被捕获它总是执行。
可以嵌套一个或者更多的try语句,如果内部的try语句没有catch子句，
那么将会进入包围它的try语句的catch子句。
*/

//catch和finally至少有一个
try{
    //try_statements 可能出现错误部分
    console.log("try_statements");
    throw "Some Error";//可以抛出异常 throw new Error("ErrorMsg");
    //var a= new Array(-1);
    throw new TypeError();// throw new ReferenceError();
}
catch(e){
    //catch_statements 捕获处理异常
    console.warn("catch_statements",e);
}
finally{ 
    //finally_statements 最终处理
    console.log("finally_statements");
}
// try_statements
// catch_statements Some Error
// finally_statements


try {
    try{
        throw "ErrorMessage11";
    }
    // catch (e){
    //     //throw "ErrorMessage22"; //抛出异常后将直接跳出catch，catch内后续代码不再执行
    //     console.log("inside catch",e);
    //     //throw "ErrorMessage22";
    // }
    finally {
        console.log("finally 111");
    }
}
catch (e) {
    console.log("outside catch",e);
}
finally {
    console.log("finally 222");
}
//finally 111
//outside catch ErrorMessage11
//finally 222


//关于console
console.log("logInfo");
console.warn("warnInfo");//警告
console.error("errorInfo");//提示错误
//console.assert(条件表达式,输出)：若条件为真，则不输出；否则输出
console.assert(3>2,"有问题的话会输出这句话11111");
console.assert(2==="2","有问题的话会输出这句话22222");
// logInfo
// warnInfo
// errorInfo
// Assertion failed: 有问题的话会输出这句话22222


//执行完try内部finally，再执行外部catch
try {
    try {
        throw "oops";
    }
    finally {
        console.log("finally");
    }
}
catch (ex) {
    console.error("outer", ex);
}
// finally
// outer oops

try {
    try {
        throw "oops";
    }
    catch (ex) {
        console.error("inner", ex);
        throw ex;
    }
    finally {
        console.log("finally");
    }
}
catch (ex) {
    console.error("outer", ex);
}
// inner oops
// finally
// outer oops


//思考下述两段代码的区别，思考两者调用栈CallStack的不同
try{
	function abc(x,cb){
		console.log(x);
		cb();
    }
	abc("xx",function(){
		var arr = new Array(-1);
	});
}
catch(e){
	console.log(e);
}
// xx
// RangeError: Invalid array length
//     at <anonymous>:7:13
//     at abc (<anonymous>:4:3)
//     at <anonymous>:6:2

//JS的异步
//思考这种情况是否能捕获到异常，回调函数捕获异常的问题
try{
	function abc(x,cb){
		console.log(x);
		cb();
    }
}
catch(e){
	console.log(e);
}
abc("xx",function(){
    var arr = new Array(-1);
});
// xx
// Uncaught RangeError: Invalid array length
//     at <anonymous>:13:15
//     at abc (<anonymous>:6:3)
//     at <anonymous>:12:1

// function(){
//     var arr = new Array(-1);
// }语句一个在try中，一个不在


//Error相关
var e1 = new Error("e1 Error Msg");
try {
    throw  e1;
    //throw new Error("Whoops!");
} 
catch (e) {
    console.log(e.name + ": " + e.message);//Error: e1 Error Msg
}

//可以直接创建Error对象
console.log(Error.prototype);
//{name: "Error", message: "", constructor: function, toString: function}
var myError = new Error("NewMessage");
console.log(myError.name,myError.message); //Error NewMessage


//基于Error的子类，可以创建自定义错误对象，并添加若干自有属性
function MyError(message,name) {
    this.name = name||'MyError';
    this.message = message || 'Default Message';
}
MyError.prototype.__proto__ = Error.prototype;
//MyError.prototype = Object.create(Error.prototype);
//MyError.prototype.constructor = MyError;

try {
    // throw new MyError();
    throw new MyError('custom message');
} 
catch (e) {
    console.log(e.name);     // 'MyError'
    console.log(e.message);  // 'custom message'
}


//Part 1111111111 引用错误案例 ReferenceError
// var y = 23;
try
{
    var x = y;// 没有定义y所以产生错误。如果有y的话，不会抛异常错误
    //console.log("x") = 23;//赋值引用错误，在chorme中测试
}
catch(e){
    console.log(e.name,e.message);
}
finally {
    console.log("finally");//有无异常该句都会执行
}
// ReferenceError y is not defined
// finally

//Part 222222222 范围错误 RangeError
try{
    var a= new Array(-1);
    //var a= new Array(1);
}
catch(e){
    console.log(e.name,e.message);
}
//RangeError Invalid array length


//Part 3333333333 类型错误 TypeError
try{
    var a;//a类型：undefined
    a.aa();//只有object才可以调用
    //var a= new 123; //在chrome中测试
}
catch(e){
    console.log(e.name,e.message);
}
//TypeError Cannot read property 'aa' of undefined


//错误类型测试
try {
    throw new RangeError();
    // throw new TypeError();
    // throw new ReferenceError();
} 
catch (e) {
    if (e instanceof TypeError)
        console.log("TypeError");     
    else if (e instanceof RangeError)
        console.log("RangeError");
    else if (e instanceof ReferenceError)
        console.log("ReferenceError");     
    else
        console.log("OtherError");    
}
//RangeError


//自定义错误
//输入月份异常案例 注意可以在外层进行捕获异常错误
function UserException(message) {
    this.message = message;
    this.name = "UserException";
}
function getMonthName(mo) {
    mo = mo-1; // 调整月份数字到数组索引 (1=Jan, 12=Dec)
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
        "Aug", "Sep", "Oct", "Nov", "Dec"];
    if (months[mo] !== undefined) {
        return months[mo];
    } else {
        throw new UserException("InvalidMonthNo");
    }
}
try {
    // statements to try
    var myMonth = 15; // 15 超出边界并引发异常
    var monthName = getMonthName(myMonth);
} catch (e) {
    var monthName = "unknown";
    console.log(e.message, e.name); // 传递异常对象到错误处理
}
//InvalidMonthNo UserException


