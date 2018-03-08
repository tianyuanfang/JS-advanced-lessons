// var x=10;//x是全局变量
// document.onclick=function(){
// 	alert("x="+x);//20
// }

//如何避免全局污染
(function(){
	var x=10;//x是全局变量
	document.onclick=function(){
		alert("x="+x);//10
	}
})()