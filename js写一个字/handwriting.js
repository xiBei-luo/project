var canvasWidth=800;
var canvasHeight=canvasWidth;


var strokeColor="black";
var isMouseDown=false;
var lastLoc={x:0,y:0};//记录上一次鼠标的位置
var lastTimestamp=0;
var lastLineWidth=-1;

var canvas=document.getElementById("canvas");
var context=canvas.getContext("2d");

canvas.width=canvasWidth;
canvas.height=canvasHeight;

drawGrid();
//清除操作
$("#clear_btn").click(
	function(e){
		context.clearRect(0,0,canvasWidth,canvasHeight)
		drawGrid();
	}
);
//选择颜色操作
$(".color_btn").click(
    function(e){
        $(".color_btn").removeClass("color_btn_selected")
        $(this).addClass("color_btn_selected")
        strokeColor = $(this).css("background-color")
    }
)

//鼠标事件
canvas.onmousedown=function(e){
	e.preventDefault();//作用于移动端，阻止默认的事件响应
	isMouseDown=true;
	//console.log("mouse down!")
	lastLoc=windowToCanvas(e.clientX,e.clientY);
	//alert(loc.x+","+loc.y)//输出鼠标点击处的坐标
	lastTimestamp=new Date().getTime();
};
canvas.onmouseup=function(e){
	e.preventDefault();
	isMouseDown=false;
	//console.log("mouse up!")
};
canvas.onmouseout=function(e){
	e.preventDefault();
	isMouseDown=false;
	//console.log("mouse put!")
};
canvas.onmousemove=function(e){
	e.preventDefault();
	if(isMouseDown){
		//console.log("mouse move!")
		var curLoc=windowToCanvas(e.clientX,e.clientY);
		var curTimestamp=new Date().getTime();
		var s=calcDistance(curLoc,lastLoc);
		var t=curTimestamp-lastTimestamp;

		var lineWidth=calcLineWidth(t,s);
		//draw
		context.beginPath();
		context.moveTo(lastLoc.x,lastLoc.y);
		context.lineTo(curLoc.x,curLoc.y);

		context.strokeStyle=strokeColor;
		context.lineWidth=lineWidth;
		context.lineCap="round";//使得画出的线条没有“毛边”现象
		context.lineJoin="round";//使线条更加平滑
		context.stroke();
		lastLoc=curLoc;//在上一次鼠标停留的位置和当前鼠标停留的位置之间绘制一条平滑的直线
		lastTimestamp=curTimestamp;
		lastLineWidth=lineWidth;
	}
};


function calcLineWidth(t,s){
	var v=s/t;
	var resultLineWidth;
	if(v<=0.1)
		resultLineWidth=30;
	else if(v>=10)
		resultLineWidth=1;
	else
		resultLineWidth=30-(v-0.1)/(10-0.1)*(30-1);

	if(lastLineWidth==-1)
		return resultLineWidth;
	else

	return lastLineWidth*2/3+resultLineWidth*1/3;
}


function calcDistance(loc1,loc2){
	return Math.sqrt(loc1.x-loc2.x)*(loc1.x-loc2.x)+(loc1.y-loc2.y)*(loc1.y-loc2.y)
}//计算两个坐标点之间的距离


function windowToCanvas(x,y){
	var bbox=canvas.getBoundingClientRect()
	return{x:Math.round(x-bbox.left),y:Math.round(y-bbox.top)}
}//使得鼠标点击的坐标位置在canvas中,获取canvas中鼠标停留的坐标


function drawGrid(){
context.save();
context.strokeStyle="rgb(230,11,9)"
//画方格
context.beginPath();
context.moveTo(3,3);
context.lineTo(canvasWidth-3,3);
context.lineTo(canvasWidth-3,canvasHeight-3);
context.lineTo(3,canvasHeight-3);
context.closePath();//自动闭合路径
context.lineWidth=6;
context.stroke();
//画米字
context.beginPath();
context.moveTo(0,0);
context.lineTo(canvasWidth,canvasHeight);

context.moveTo(canvasWidth,0);
context.lineTo(0,canvasHeight);

context.moveTo(canvasWidth/2,0);
context.lineTo(canvasWidth/2,canvasHeight);
context.moveTo(0,canvasHeight/2);

context.lineTo(canvasWidth,canvasHeight/2);
context.lineWidth=1;
context.stroke();
context.restore();
}