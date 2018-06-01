var http = require("http"); //内置模块
var url = require("url"); //内置模块
// http.createServer([requestListener]):该函数用来创建一个HTTP服务器，
//并将 requestListener 作为 request 事件的监听函数。
http.createServer(function(req, res) {
    //console.log(Object.keys(req),"___",Object.keys(res));
    //console.log("req.url：",req.url);
    // var getDataObj = url.parse(req.url,true).query;

    var getDataStr = url.parse(req.url).query; //解析URL
    //parse函数中第二个参数为true的话返回一个对象

    //response.writeHead(statusCode[, statusMessage][, headers])
    //发送一个响应头给请求。 状态码是一个三位数的 HTTP 状态码，如 404。
    // 最后一个参数 headers 是响应头。 第二个参数 statusMessage 是可选的
    //状态描述。
    res.writeHead(200, {
        "Content-Type": "text/plain",
        //"Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        //在后端支持跨域访问的设置，响应头中的设置
        "Access-Control-Allow-Methods": "GET, POST"
    });
    setTimeout(function() {
        res.end("你好，我已收到你发的信息：" + getDataStr);
    }, 2000 * Math.random());
    //res.end("你的输入信息是：" + getDataStr);
    //res.end()该方法会通知服务器，所有响应头和响应主体都已被发送，
    //即服务器将其视为已完成。 
}).listen(8080, "127.0.0.1");
console.log("start server!");