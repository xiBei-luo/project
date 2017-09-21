var can;
var ctx;
var w;
var h;
var girlPic=new Image();
var starPic=new Image();
var num=60;
var stars=[];
var lastTime;
var deltaTime;
var switchy=false;//鼠标事件监听
var life=0;

function init(){
	can=document.getElementById('canvas');
	ctx=can.getContext("2d");
	w=can.width;
	h=can.height;
	document.addEventListener("mousemove",mousemove,false);//添加鼠标移动事件监听
	girlPic.src="src/girl.jpg";
	starPic.src="src/star.png";
	for(var i=0;i<num;i++){
		var obj=new starObj();
		stars.push(obj);
		stars[i].init();
	}
	lastTime=Date.now();
	gameLoop();

}//初始化各个变量，为各个变量赋值

document.body.onload=init;

function gameLoop(){
	window.requestAnimFrame(gameLoop);//循环打印背景
	var now=Date.now();
	deltaTime=now-lastTime;
	lastTime=now;

	drawBackground();//绘制背景
	drawGirl();//绘制女孩图片
	drawStars();//绘制星星
	aliveUpdate();
}//打印各个变量，输出各个变量

function drawBackground(){
	ctx.fillStyle="#393550";
	ctx.fillRect(0,0,w,h);
}//定义背景属性
function drawGirl(){
	ctx.drawImage(girlPic,100,150,600,300);//各参数含义分别为图片变量，图片位置横坐标、纵坐标，图片的左右边距和上下边距；
}
function mousemove(e){
	if(e.offsetX||e.layerX){
		var px=e.offsetX==undefined?e.layerX:e.offsetX;
		var py=e.offsetY==undefined?e.layerY:e.offsetY;

		if(px>100&&px<700&&py>150&&py<450){
			switchy=true;
		}else{
			switchy=false;
		}			

	}
}//鼠标移动事件