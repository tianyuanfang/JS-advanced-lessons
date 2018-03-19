var obj = {x:1};
var str1=""+obj;
console.log(str1);//[object Object]
var str2=JSON.stringify(obj);
console.log(str2);//{"x":1}

var a = 34;
if(a = 45){
    console.log("是否会输出？");
}//是否会输出？

var b = 34;
if(45 == b){//为什么要这样写，有什么好处->易检错
    console.log("是否会输出？");
}


console.log("1"+"2"); //"12"
console.log("1"+2); //"12"
console.log(1+{}); //"1[object Object]"
console.log(true+true); //2
console.log("5"-2); //3


var x = "1";
console.log(++x); //2 注意++和--的隐式类型转换
var x = "1";
console.log(x+1);//11


//==:如果类型不同，先转换再比较，注：引用类型到基本类型的转换方向
//===:若类型不同则false，若类型相同则判断同 ==
console.log(3===3);//true
console.log(3==="3");//false
console.log(3=="3");//true
console.log(3==new String(3));//true
console.log(3===new String(3));//false

var obj1 = new String("xyz");
var obj2 = new String("xyz");
console.log("xyz"===obj1);//false
console.log(obj1 == obj2);//false
console.log(obj1 === obj2);//false
console.log(obj1 == new String("xyz"));//false

var obj1 = new String("xyz");
var obj2 = obj1;
console.log("xyz"===obj1);//false
console.log(obj1 == obj2);//true
console.log(obj1 === obj2);//true
console.log(obj1 == new String("xyz"));//false


//“!=、!==”相当于“==、===取反”
var obj1 = new String("xyz");
var obj2 = new String("xyz");
console.log("xyz"!=obj1);//false
console.log(obj1 !== obj2);//true
console.log(obj1 != obj2);//true
console.log(obj1 != new String("xyz"));//true


var obj1={x:2,y:[1],z:false};
var obj2={x:2,y:[1],z:new Boolean(false)};
console.log(obj1.z==obj2.z);//true