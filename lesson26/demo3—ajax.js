//XMLHttpRequest Get 请求——前端代码
//后端代码参见参见demo3——node.js
var xhr = new XMLHttpRequest();
// if (!xhr) {
//     console.log("xhr 创建失败！！");
// }
xhr.onreadystatechange = function() { //监听
    console.log(xhr.readyState, xhr.status);
    if (xhr.readyState == 4) {
        //表示服务器的相应代码是200；正确返回了数据
        if (xhr.status == 200) {
            console.log(xhr.responseText);
        }
    }
};
xhr.open("get", "http://127.0.0.1:8080?getInfo=MyGetInformation", true);
//xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded "); //post需增加
xhr.send();
//前端输出
// 1 0
// 2 200
// 3 200
// 4 200
// 你好，我已收到你发的信息：getInfo=MyGetInformation


// 域名检测 http://panda.www.net.cn/cgi-bin/check.cgi?area_domain=qq.com