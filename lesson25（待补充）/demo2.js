//demo04
//Part11111 事件流
//捕获从window-document-body-div-(text)
//冒泡相反

window.onload = function(e) {
    var div1 = document.getElementById("div1");
    var div2 = document.getElementById("div2");
    // b 1 2 d->t t t/f f
    // d b 2 1->t t f f 
    // b 2 1 d->t f f f
    div1.addEventListener("click", function(e) {
        console.log("div1 click");
        //e.stopPropagation();
    }, true); //第3个参数可以不写，默认为false：冒泡

    div2.addEventListener("click", function(e) {
        console.log("div2 click");
    }, false);

    document.addEventListener("click", function(e) {
        console.log("document click");
    }, false);
    //第3个参数默认是false使用的是冒泡方式，若改为true的话则为捕获方式

    document.body.addEventListener("click", function(e) {
        console.log("body click");
    }, true); //若第3个可选参数为true的话会怎样，理解冒泡和捕获的顺序

    // window.addEventListener("click", function(e) {
    //     console.log("window click");
    // }, false);
    //div2 click
    //div1 click
    //body click
    //document click
    //window click    
}


/*
//测试3 DOM2级事件处理
window.onload = function(e) {
    var div1 = document.getElementById("div1");
    var div2 = document.getElementById("div2");
    var eventHandler = function(e) {
        console.log(e.clientX, e.clientY);
    }
    div1.addEventListener("click", eventHandler);
    div1.addEventListener("click", function() {
        console.log("xx");
    }); //思考：是覆盖还是两个语句都会输出？——两个语句都会输出

    div2.addEventListener("click", eventHandler);
    // 84 115
    // xx->冒泡，div2-div1
    //div2.removeEventListener("click",eventHandler);//取消响应
    

    //自定义事件、事件分发、事件监听
    document.addEventListener("MyEvent", function() {
        console.log("处理自定义事件")
    });
    document.dispatchEvent(new Event("MyEvent"));
}
*/

/*
//自定义事件（创建、分发、捕获的综合案例）
window.onload = function(e) {
    var div1 = document.getElementById("div1");
    var div2 = document.getElementById("div2");
    var eventHandler = function(e) {
        console.log(e.target, this);

        var myEvent = new Event("MyEvent");
        div2.dispatchEvent(myEvent); //若改为div1分发的话会怎样
        //div1.dispatchEvent(myEvent);
    }
    div1.onclick = eventHandler;

    div2.addEventListener("MyEvent", function(e) {
        console.log("div2 listener", e.type);
    }, false); //改为true

    document.addEventListener("MyEvent", function(e) {
        console.log("document handler");
    }, true);
    //第3个参数默认是false使用的是冒泡方式，若改为true的话则为捕获方式

    document.body.addEventListener("MyEvent", function(e) {
        console.log("body handler");
    }, true);

    window.addEventListener("MyEvent", function(e) {
        console.log("window handler");
    }, true);
    //点击div1
    //<div id="div1"></div>  <div id="div1"></div> 
    //window handler
    //document handler
    //body handler
    //div2 listener MyEvent

    //点击div2
    //<div id="div2"></div>  <div id="div1"></div> 
    //window handler
    //document handler
    //body handler
    //div2 listener MyEvent
}
*/