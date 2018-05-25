//demo05、demo06
//Part11111 事件流-阻止冒泡-阻止默认响应
/*
window.onload = function(e) {
    var div1 = document.getElementById("div1");
    var div2 = document.getElementById("div2");
    div1.addEventListener("click", function(e) {
        console.log("div1 click");
    }, false); //改成true会怎样
    div2.addEventListener("click", function(e) {
        console.log("div2 click");
    }, false); //改成true会怎样
    div3.addEventListener("click", function(e) {
        console.log("div3 click");
    }, false); //改成true会怎样    

    document.addEventListener("click", function(e) {
        console.log("document click");
    }, false);
    //第3个参数默认是false使用的是冒泡方式，若改为true的话则为捕获方式

    document.body.addEventListener("click", function(e) {
        console.log("body click");
    }, false);

    window.addEventListener("click", function(e) {
        console.log("window click");
    }, false);
    //点击div3->冒泡：从高层向底层
    //div3 click
    //div2 click
    //div1 click
    //body click
    //document click
    //window click
}
*/

//Part22222 事件流-阻止冒泡-阻止默认响应

window.onload = function(e) {
    var div1 = document.getElementById("div1");
    var div2 = document.getElementById("div2");

    div1.addEventListener("click", function(e) {
        console.log("div1 click--red");
        console.log("target:", e.target);
        console.log("this:", this);
        e.stopPropagation(); //阻止事件冒泡
        e.preventDefault(); //阻止默认响应
        console.log(e.bubbles, e.cancelable, e.cancelBubble);
        //bubbles:如果事件是起泡类型，则返回 true，否则返回 fasle
        //cancelable :如果用 preventDefault()方法可以取消与事件关联的
        //默认动作，则为 true，否则为 fasle
        //cancelBubble:阻止浏览器默认的事件冒泡行为        
    }, false); //改成true会怎样

    div2.addEventListener("click", function(e) {
        console.log("div2 click--yellow");
        console.log("target:", e.target);
        console.log("this:", this);
        e.target.hidden = true;
        this.hidden = true; //-> 两者有什么区别？——相应对象会在点击后隐藏
        //e.stopPropagation();
    }, true); //改成true会怎样->先捕获，再冒泡

    div3.addEventListener("click", function(e) {
        console.log("div3 click--blue");
        console.log("target:", e.target);
        console.log("this:", this);
        //e.stopPropagation();
    }, false); //改成true会怎样

    document.addEventListener("click", function(e) {
        console.log("document click");
    }, false);

    document.body.addEventListener("click", function(e) {
        console.log("body click");
    }, false);

    window.addEventListener("click", function(e) {
        console.log("window click");
    }, false);
    //点击div3，先捕获，再冒泡
    // div2 click--yellow
    // target: <div id = ​"div3" hidden></div>​
    // this: <div id = ​"div2" hidden></div>​

    // div3 click--blue
    // target: <div id = ​"div3" hidden></div>​
    // this: <div id = ​"div3" hidden></div>​

    // div1 click--red
    // target: <div id = ​"div3" hidden></div>​
    // this: <div id = ​"div1"></div>​
    // true true true
    // body click
    // document click
    // window click

    //阻止默认事件行为
    var aId = document.getElementById("aId");
    aId.addEventListener("click", function(e) {
        e.preventDefault(); //阻止默认事件，阻止了链接跳转
        console.log("阻止跳转百度");
    });
}