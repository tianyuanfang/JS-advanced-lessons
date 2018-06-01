var test1 = require("./test1");
console.log(test1.a);
console.log(test1.b);
console.log(test1.c());

var Person = require("./Person");
var p = new Person("jack", 23);
p.show();

// 当 Node 遇到 require(X) 时，按下面的顺序处理。
// （1）如果 X 是内置模块（比如 require('http'）) 
// 　　a. 返回该模块。 
// 　　b. 不再继续执行。
// （2）如果 X 以 "./" 或者 "/" 或者 "../" 开头 
// 　　a. 根据 X 所在的父模块，确定 X 的绝对路径。 
// 　　b. 将 X 当成文件，依次查找下面文件，只要其中有一个存在，就返回该文件，
//        不再继续执行。
// X
// X.js
// X.json
// X.node
// 　　c. 将 X 当成目录，依次查找下面文件，只要其中有一个存在，就返回该文件，
//        不再继续执行。
// X/package.json（main字段）
// X/index.js
// X/index.json
// X/index.node
// （3）如果 X 不带路径 
// 　　a. 根据 X 所在的父模块，确定 X 可能的安装目录。 
// 　　b. 依次在每个目录中，将 X 当成文件名或目录名加载。
// （4） 抛出 "not found"