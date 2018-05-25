//demo01、demo02、demo03
//Part11111 事件及事件对象
/*
window.onload = function() {
    console.log("window onload");
    var div2 = document.getElementById("div2");
    //思考：将下述代码写在window.onload回调函数外会怎样
    //window.onload是当整个脚本解析完才解析它，若写在外，则div2未定义
    div2.onclick = function() {
        console.log("div2 click");
    }
    div2.onmouseover = function() {
        console.log("div2 mouseover");
    }
}

function div1click() {
    console.log("div1 click");
    console.log("this:", this);
    //Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, frames: Window, …}
}
*/

//Part22222 Html事件响应
/*
window.onload = function(e) {
    // console.log("window onload");
    // console.log("e:", e);
    // //Event {isTrusted: true, type: "load", target: document, currentTarget: Window, eventPhase: 2, …}
    // console.log(e.target); //#document

    var div1 = document.getElementById("div1");
    var div2 = document.getElementById("div2");
    var eventHandler = function(e) { //点击div2时
        // // 测试0
        // console.log(e.type); //click
        // console.log(e.target, this);
        // //<div id="div2"></div>  <div id="div2"></div>
        // //所有情况都一样么?有没有某种情况不一样呢？——有

        // // 测试1
        // console.log(e.clientX, e.clientY);
        // console.log(this, "-----", e.target.id);
        // //<div id="div2"></div> "-----" "div2"

        // // 测试2
        // console.log(e);
        // console.log(e.__proto__);
        // console.log(e.__proto__.__proto__);
        // console.log(e.__proto__.__proto__.__proto__);
        // console.log(e.__proto__.__proto__.__proto__.__proto__);
        // //MouseEvent {isTrusted: true, screenX: 94, screenY: 397, clientX: 94, clientY: 306, …}
        // //MouseEvent {…}
        // //UIEvent {initUIEvent: ƒ, …}
        // //Event {NONE: 0, CAPTURING_PHASE: 1, AT_TARGET: 2, BUBBLING_PHASE: 3, …}
        // //{constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …}

        // // 测试3
        // for (var k in e) {
        //     console.log(k, e[k]);
        // }
        // //isTrusted true
        // //screenX 104
        // //screenY 386
        // //clientX 104
        // //clientY 296
        // //ctrlKey false
        // //shiftKey false
        // //altKey false
        // //metaKey false
        // //button 0
        // //buttons 0
        // //......

        // // for(var k in e.__proto__){
        // //     console.log(k);
        // // }
        // // for(var k in e.__proto__.__proto__){
        // //     console.log(k);
        // // }
        // // for(var k in e.__proto__.__proto__.__proto__){
        // //     console.log(k);
        // // }
    }
    div1.onclick = eventHandler;
    div2.onclick = eventHandler;

    //自定义事件监听、事件分发
    // document.addEventListener("xx", function(e) {
    //     console.log(e.type, "自定义事件监听")
    // });
    // document.dispatchEvent(new Event("xx"));
}
*/

//Part33333 Html事件响应
/*
//测试2 DOM0级事件处理
window.onload = function(e) {
    var div1 = document.getElementById("div1");
    var div2 = document.getElementById("div2");
    var eventHandler = function(e) {
        console.log(e.clientX, e.clientY);
    }
    div1.onclick = eventHandler;
    div1.onclick = function() {
        console.log("xx");
    }; //思考：覆盖还是两个语句都会输出？——覆盖
    div2.onclick = eventHandler;
    //div2.onclick = null;//取消事件响应
}
*/

/*
//测试3 DOM2级事件处理
window.onload = function(e) {
    var div1 = document.getElementById("div1");
    var div2 = document.getElementById("div2");
    var eventHandler = function(e) {
        console.log(e.clientX, e.clientY);
    }
    div1.addEventListener("click", eventHandler);
    //第3个参数可选，默认false：冒泡；true：捕获
    div1.addEventListener("click", function() { console.log("xx"); });
    //思考：是覆盖还是两个语句都会输出？——两个语句都会输出

    div2.addEventListener("click", eventHandler);
    //div2.removeEventListener("click",eventHandler);//取消事件响应处理

    //自定义事件、事件分发、事件监听
    div2.addEventListener("MyEvent", function(e) {
        console.log(e.type, e.target, "处理自定义事件")
    });
    div2.dispatchEvent(new Event("MyEvent"));

    // //思考DOM节点对象的继承关系    
    // //addEventListener、removeEventListener、dispatchEvent这3个方法
    // //都是定义在哪个原型上的？——Object.prototype.hasOwnProperty("");
    // console.log(div2.__proto__);
    // console.log(div2.__proto__.__proto__);
    // console.log(div2.__proto__.__proto__.__proto__);
    // console.log(div2.__proto__.__proto__.__proto__.__proto__);
    // console.log(div2.__proto__.__proto__.__proto__.__proto__.__proto__);
    // //HTMLDivElement {constructor: ƒ, Symbol(Symbol.toStringTag): "HTMLDivElement"}
    // //HTMLElement {…}
    // //Element {…}   
    // //Node {ELEMENT_NODE: 1, ATTRIBUTE_NODE: 2, TEXT_NODE: 3, CDATA_SECTION_NODE: 4, ENTITY_REFERENCE_NODE: 5, …}
    // //EventTarget {addEventListener: ƒ, removeEventListener: ƒ, dispatchEvent: ƒ, constructor: ƒ, Symbol(Symbol.toStringTag): "EventTarget"}
    // //EventTarget 是一个由可以接收事件的对象实现的接口，并且可以为它们创建
    // //侦听器    
}
*/

/*
//自定义事件（创建、分发、捕获的综合案例）
window.onload = function(e) {
    var div1 = document.getElementById("div1");
    var div2 = document.getElementById("div2");
    var eventHandler = function(e) {
        console.log(e.target, this);
        //<div id="div1"></div>   <div id="div1"></div>
        var myEvent = new Event("MyEvent");
        //div1.dispatchEvent(myEvent);
        div2.dispatchEvent(myEvent);
    }
    div1.onclick = eventHandler;

    //下述代码部分，参见事件流部分
    //捕获从window-document-body-div-(text)
    //冒泡相反
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
    //document handler
    //body handler
    //div2 listener MyEvent
}
*/

/*
window.onload = function() {
    //DOM0级事件响应 定义在哪里？
    console.log(document.body.__proto__.hasOwnProperty("onclick"));
    console.log(document.body.__proto__.__proto__.hasOwnProperty("onclick"));
    //false true

    //DOM2级事件响应  定义在哪里？
    console.log(document.body.__proto__.hasOwnProperty("addEventListener"));
    console.log("addEventListener" in document);
    console.log(document.body.__proto__.__proto__.__proto__.__proto__.__proto__.hasOwnProperty("addEventListener"));
    //false true true
}
*/