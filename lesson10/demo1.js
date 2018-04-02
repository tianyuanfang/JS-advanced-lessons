//静态词法作用域与调用形式无关
var name = "Jack";
function echo() {
    console.log(name);
}
function foo() {
    var name = "Bill";
    function fee(){
        var name = "Lucy";
        echo();
    }
    fee();
}
foo();//Jack


//通过new Function实例化的函数对象，不一定遵从静态词法作用域
var scope = "g";
function foo(){
	var scope = "l";
	return new Function("console.log(scope);")
}
foo()();//g->返回的是一个window下的对象


//变量污染、变量共享问题,尤其是异步执行的情况下。
//如果是两个单独的文件的情况下，更容易造成变量污染
var userId = 123;
document.onclick = function () {
    console.log("userId = ",userId);
    //alert("userId = "+userId);
};
//一长串代码后，假如看不见上述代码了
var a=2,b=3;
if(a<b){
    var userId = 234;
}//一点击document就会输出：234


//使用IIFE来解决上述问题
var userId = 123;
document.onclick = function () {
    console.log("userId = ",userId);
    //alert("userId = "+userId);
};
//多人协同开发时问题，块作用域缺陷的问题可能会更加明显
(function(){
    var a=2,b=3;
    if(a<b){
        var userId = 234;
    }
}());//一点击document就会输出：123
//匿名函数立即执行，后释放局部变量


//理解执行上下文（通俗的例子）,嵌套的情况
var xx = ["书桌","书包","铅笔盒"];//小明家中
console.log("在家-做作业中 1 ...");
function goToStore(){
    var yy = ["文具店老板","出售的文具"];//文具商店中
    console.log("在文具店-买文具中  ...");
    function goToBank(){
        var zz = ["银行职员","柜员机"];//银行中
        console.log("在银行-取钱 ... 返回文具店");
    }
    console.log("在文具店-买文具中  ... 发现没带钱");
    goToBank();
    console.log("在文具店-买好文具  ... 返回家");
}
console.log("在家-做作业中 2 ... 发现笔没油了");
goToStore();//笔没油了，去商店买笔
console.log("在家-继续做作业...");
//在家-做作业中 1 ...
// 在家-做作业中 2 ... 发现笔没油了
// 在文具店-买文具中  ...
// 在文具店-买文具中  ... 发现没带钱
// 在银行-取钱 ... 返回文具店
// 在文具店-买好文具  ... 返回家
// 在家-继续做作业...


console.log("全局上下文-start");
var x = 1;
function foo(){
    console.log("foo上下文-start");//设置断点
    var y = 2;
    function bar(){
        console.log("bar上下文-start");//设置断点
        var z = 3;
        console.log(x+y+z);
        console.log("bar上下文-end");//设置断点
    }
    bar();
    console.log("foo上下文-end");//设置断点
}
foo();//设置断点
console.log("全局上下文-end");//设置断点
// 全局上下文-start
// foo上下文-start
// bar上下文-start
// 6
// bar上下文-end
// foo上下文-end
// 全局上下文-end


// 使用Chorme的 Watch窗口（追踪x，y，z）和
// Scope窗体（观察作用域链的变化）
console.log("全局上下文-start");
var x = "家中环境-";
function goToStore_A(){
    console.log("goToStore_A 上下文-start");//设置断点
    var y = "文具店A环境-";
    goToBank_C();//设置断点
    // goToBank_D();//设置断点
    console.log("goToStore_A 上下文-end");//设置断点
}
function goToStore_B(){
    console.log("goToStore_B 上下文-start");//设置断点
    var y = "文具店B环境-";
    goToBank_C();//设置断点
    // goToBank_D();//设置断点
    console.log("goToStore_B 上下文-end");//设置断点
}
function goToBank_C(){
    console.log("goToBank_C 上下文-start");//设置断点
    var z = "银行C环境-";
    //console.log(x+y+z);
    console.log("goToBank_C 上下文-end");//设置断点
}
function goToBank_D(){
    console.log("goToBank_D 上下文-start");//设置断点
    var z = "银行D环境-";
    console.log(x+y+z);
    console.log("goToBank_D 上下文-end");//设置断点
}
goToStore_A();//设置断点
// goToStore_B();//设置断点
console.log("全局上下文-end");//设置断点
// 全局上下文-start
// goToStore_A 上下文-start
// goToBank_C 上下文-start
// goToBank_C 上下文-end
// goToStore_A 上下文-end
// 全局上下文-end


// 将goToBank函数嵌套到goToStore函数中，3层的链，分析此时的作用域链
console.log("全局上下文-start");
var x = "家中环境-";
function goToStore_A(){
    console.log("goToStore_A 上下文-start");//设置断点
    var y = "文具店A环境-";
    function goToBank_C(){
        console.log("goToBank_C 上下文-start");//设置断点
        var z = "银行C环境-";
        console.log(x+y+z);
        console.log("goToBank_C 上下文-end");//设置断点
    }
    function goToBank_D(){
        console.log("goToBank_D 上下文-start");//设置断点
        var z = "银行D环境-";
        console.log(x+y+z);
        console.log("goToBank_D 上下文-end");//设置断点
    }
    goToBank_C();//设置断点
    // goToBank_D();//设置断点
    console.log("goToStore_A 上下文-end");//设置断点
}
function goToStore_B(){
    console.log("goToStore_B 上下文-start");//设置断点
    var y = "文具店B环境-";
    function goToBank_C(){
        console.log("goToBank_C 上下文-start");//设置断点
        var z = "银行C环境-";
        console.log(x+y+z);
        console.log("goToBank_C 上下文-end");//设置断点
    }
    function goToBank_D(){
        console.log("goToBank_D 上下文-start");//设置断点
        var z = "银行D环境-";
        console.log(x+y+z);
        console.log("goToBank_D 上下文-end");//设置断点
    }
    goToBank_C();//设置断点
    // goToBank_D();//设置断点
    console.log("goToStore_B 上下文-end");//设置断点
}
goToStore_A();//设置断点
// goToStore_B();//设置断点
console.log("全局上下文-end");//设置断点
// 全局上下文-start
// goToStore_A 上下文-start
// goToBank_C 上下文-start
// 家中环境-文具店A环境-银行C环境-
// goToBank_C 上下文-end
// goToStore_A 上下文-end
// 全局上下文-end