var a = "a";
var b = 123;
var foo = function() {
        console.log(a, b);
        return 0;
    }
    //require 用来加载代码，而 exports 和 module.exports 则用来导出代码
    // module.exports 初始值为一个空对象 {}
    // exports 是指向的 module.exports 的引用
    // require() 返回的是 module.exports 而不是 exports
module.exports.a = a; //
module.exports.b = b;
module.exports.c = foo;