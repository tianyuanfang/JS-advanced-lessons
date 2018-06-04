//后端代码
var http = require("http"); //内置模块
var url = require("url"); //内置模块

// http.createServer([requestListener]):该函数用来创建一个HTTP服务器，
//并将 requestListener 作为 request 事件的监听函数。
http.createServer(function(req, res) {
    //console.log(Object.keys(req), "___", Object.keys(res));
    console.log("req.url：", req.url);
    var getDataObj = url.parse(req.url, true).query;

    var getDataStr = url.parse(req.url).query; //解析URL
    //parse函数中第二个参数为true的话返回一个对象

    //response.writeHead(statusCode[, statusMessage][, headers]),发送一个响应头给请求 
    //statusCode是一个三位数的 HTTP 状态码，如 404。
    //statusMessage 是可选的状态描述;headers 是响应头。
    res.writeHead(200, {
        "Content-Type": "text/plain",
        //"Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", //在后端支持跨域访问的设置，响应头中的设置
        "Access-Control-Allow-Methods": "GET, POST"
    });

    setTimeout(function() {
        res.end("你好，我已收到你发的信息：" + getDataStr);
    }, 5000 * Math.random()); //模拟服务器处理请求的时间,发送响应给前端

    //res.end("你的输入信息是：" + getDataStr);
    //res.end()该方法会通知服务器，所有响应头和响应主体都已被发送，即服务器将其视为已完成。 
}).listen(8080, "127.0.0.1"); //监听"127.0.0.1"的8080端口

console.log("start server!");
//后端输出
// start server!
// req.url： /?getInfo=MyGetInformation