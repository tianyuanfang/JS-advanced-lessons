//短路原则（忽略对右操作数的判断)
//-对于&&,转换后的左操作数若为true,则直接返回原始右操作数;
//若为false,直接返回原始左操作数
//-对于||，转换后的左操作数若为true，则直接返回原始左操作数;
//若为false则直接返回原始右操作数
//-通过短路原则，可以用&&和||来实现复杂的条件语句来代替if-else

//操作数非布尔类型，&&短路原则
console.log(2&&4);//4
console.log(0&&4);//0
console.log({x:2}&&{name:"Jack"});//{name: "Jack"}
console.log(null&&"hello");//null
console.log({}&&"world");//world


//操作数非布尔类型，||短路原则
console.log(2||4);//2
console.log(0||4);//4
console.log({x:2}||{name:"Jack"});//{x:2}
console.log(null||"hello");//hello
console.log({}||"world");//{}


//思考 所有对象转换为布尔类型 都为 true
console.log((new Boolean(false))&&234);//234
console.log((new Boolean(false))||234);//Boolean{false}


var score = 76;
if(score>90){
    console.log("优");
}else if(score>75){
    console.log("良");
}else if(score>60){
    console.log("及格");
}else{
    console.log("不及格");
}
//通过&&和||的组合实现如上功能，注：小括号优先级最高
console.log((score>90&&"优")||(score>75&&"良")||
	(score>60&&"及格")||"不及格");


var A=1,B=1;
console.log(!(A&&B)===!A||!B);//true
console.log(!(A||B)===!A||!B);//true


//函数定义时可以给参数指定默认值,调用时若未传参数则该参数的值取它定义时的默认值
//JS（ES6之前）不能直接为函数的参数指定默认值，可以通过 || 来实现
var sum = function(a,b,c){
    b = b||4;
    c = c||5;
    return a+b+c;
};
console.log(sum(1,2,3));//1+2+3=6
console.log(sum(1,2));//1+2+5=8   c=undefined||5->5
console.log(sum(1));//1+4+5=10
console.log(sum(1,0,0));//1+4+5=10(ES5的缺点)


//优化改造版本
var sum = function(a,b,c){
    if(b!=false){b = b||4;}//(b!=false)&&(b=b||4);
    if(c!=false){c = c||5;}//(c!=false)&&(c=c||5);
    return a+b+c;
};
console.log(sum(1,2,3));//6
console.log(sum(1,2));//1+2+5=8
console.log(sum(1));//1+4+5=10
console.log(sum(1,0,0));//1+0+0=1