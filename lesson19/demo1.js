//UTC 协调世界时间 Coordinated Universal Time
//GMT 格林尼治时间 （北京时间是正8时区） Greenwich Mean Time

//new Date(year,month,date?,hours?,minutes?,seconds?,milliseconds?) 
//注意起始索引 
//new Date(dateTimeStr)//参数为字符串类型，注意格式，参见日期格式章节
//new Date(timeValue)//参数为数字类型，以毫秒为单位
//new Date( )//返回当前时间

var date1 = new Date(2018,4,7,15,58,15);
//注意：月0-11，日：1-31，时：0-23，分：0-59，秒：0-59，毫秒：0-999
console.log(date1);//Mon May 07 2018 15:58:15 GMT+0800 (中国标准时间)

var date2 = new Date(17,9,18,12,34,1);//若year为2位的话自动加1900
console.log(date2);//Thu Oct 18 1917 12:34:01 GMT+0800 (中国标准时间)

var date3 = new Date("2017-08-09");
//注意日期的格式 此处的08代表8月，对比上一个创建形式
console.log(date3);//Wed Aug 09 2017 08:00:00 GMT+0800 (中国标准时间)

var date3 = new Date("2017-8-9");
//注意日期的格式 此处的08代表8月，对比上一个创建形式
console.log(date3);//Wed Aug 09 2017 00:00:00 GMT+0800 (中国标准时间)

//var date4 = new Date(0);  //1970-01-01:00:00:00
var date4 = new Date(1000); //1970-01-01:00:00:00+1000ms
console.log(date4);//Thu Jan 01 1970 08:00:01 GMT+0800 (中国标准时间)
date4.getTime();//1000->计算成毫秒

var date5 = new Date();//new Date(Date.now());->此刻日期
console.log(date5);//Mon May 07 2018 16:11:41 GMT+0800 (中国标准时间)

//补充：无效日期
var date6 = new Date(NaN);
console.log(date6);//Invalid Date


//有无new的区别->数据类型不同
var d1 = new Date();
var d2 = Date();
console.log(d1,typeof d1);//object
console.log(d2,typeof d2);//string
//Mon May 07 2018 16:14:04 GMT+0800 (中国标准时间) "object"
//Mon May 07 2018 16:14:04 GMT+0800 (中国标准时间) string

var n1 = new Number("123");
var n2 = Number("123");
console.log(n1,typeof n1);//Number {123} "object"
console.log(n2,typeof n2);//123 "number"


//Date静态方法（Date构造器函数对象的方法）GMT 格林尼治时间
//以毫秒为单位返回当前时间（从1970年1月1日00:00:00开始计算）
console.log(Date.now());//1525681376043->当前时间毫秒数
console.log(new Date().getTime());//1525681376043->当前时间毫秒数

console.log(Date.parse("1970-01-01"));//0->字符串转换成毫秒
console.log(Date.parse("1970-01-02"));//86400000

console.log(Date.UTC(2017,9,1));//1506816000000
//将给定的日期转换成毫秒,解释为UTC 协调世界时间


//Date原型方法 getter和setter相关
var d = new Date("1978-11-25");
console.log(d.getFullYear(),d.getMonth(),d.getDate(),
d.getDay(),d.getHours());//年、月、日、星期、时->1978 10 25 6 8

console.log(d.getTimezoneOffset());//-480
//返回格林尼治时间和本地时间之间的时差，以分钟为单位。

d.setDate(11);//修改日
console.log(d.getFullYear(),d.getMonth(),d.getDate(),
d.getDay(),d.getHours());//1978 10 11 6 8

d.setFullYear(1999,5,3);
console.log(d.getFullYear(),d.getMonth(),d.getDate(),
d.getDay(),d.getHours());//1999 5 3 4 8


//Date原型方法 转成字符串相关
//toTimeString():把 Date 对象的时间部分转换为字符串
//toLocaleTimeString():根据本地时间把 Date 对象的时间部分转换为字符串
//toDateString():把 Date 对象的日期部分转换为字符串
//toLocaleDateString():根据本地时间把 Date 对象的日期部分转换为字符串
//toJSON():将 Date 对象转换为字符串，并格式化为 JSON 数据格式。
//x ISO-8601 标准: YYYY-MM-DDTHH:mm:ss.sssZ

var d = new Date(2012,3,21,15,7,23,234);
console.log(d.toTimeString(),"___",d.toLocaleTimeString());
//15:07:23 GMT+0800 (中国标准时间) ___ 下午3:07:23
console.log(d.toDateString(),"___",d.toLocaleDateString());
//Sat Apr 21 2012 ___ 2012/4/21
console.log(d.toJSON());//2012-04-21T07:07:23.234Z


//日期格式实例
//toISOString():使用 ISO 标准返回 Date 对象的字符串格式
// YYYY-MM-DDTHH:mm:ss.sssZ
console.log(Date.parse("2010-01-01 11:12:23.111"));
console.log(new Date("2010-01-01 11:12:23.111"));
console.log(new Date().toISOString());
//1262315543111
//Fri Jan 01 2010 11:12:23 GMT+0800 (中国标准时间)->比下方差8个小时
//2018-05-07T08:59:15.929Z

console.log(Date.parse("2010-01-01T11:12:23.111Z"));
console.log(new Date("2010-01-01T11:12:23.111Z"));//->'Z'
console.log(new Date().toISOString());
//1262344343111
//Fri Jan 01 2010 19:12:23 GMT+0800 (中国标准时间)->比上方多8个小时
//2018-05-07T09:01:50.441Z


//日期格式（无时间）
console.log(new Date("2001"));
console.log(new Date("2001-02"));
console.log(new Date("2001-02-22"));
//Mon Jan 01 2001 08:00:00 GMT+0800 (中国标准时间)
//Thu Feb 01 2001 08:00:00 GMT+0800 (中国标准时间)
//Thu Feb 22 2001 08:00:00 GMT+0800 (中国标准时间)


//日期和时间格式
console.log(new Date("1999-11-22T13:17"));
console.log(new Date("1999-11-22T13:17:11"));
console.log(new Date("1999-11-22T13:17:11.111"));
console.log(new Date("1999-11-22T13:17:11.111Z"));
//Mon Nov 22 1999 13:17:00 GMT+0800 (中国标准时间)
//Mon Nov 22 1999 13:17:11 GMT+0800 (中国标准时间)
//Mon Nov 22 1999 13:17:11 GMT+0800 (中国标准时间)
//Mon Nov 22 1999 21:17:11 GMT+0800 (中国标准时间)


//时间的比较和运算，内部转换为数字进行比较和运算（从1970年1月1日00:00:00开始计算）
console.log(new Date("1970-01-01").getTime());
console.log(new Date("1970-01-02").getTime());
console.log(new Date("1960-01-02").getTime());
console.log(new Date("1970-01-02") > new Date("1970-01-01"));
console.log(new Date("1970-01-02") - new Date("1970-01-01"));
console.log(new Date((new Date("1970-01-01").getTime())+86400000));
//0
//86400000
//-315532800000
//true
//86400000
//Fri Jan 02 1970 08:00:00 GMT+0800 (中国标准时间)


//时间运算 和 时间综合练习 输出50天后是几月几号，星期几？
var today=new Date();
var date=new Date(today.getTime()+24*60*60*1000*50);
today;//Mon May 07 2018 17:14:58 GMT+0800 (中国标准时间)
date; //Tue Jun 26 2018 17:14:58 GMT+0800 (中国标准时间)