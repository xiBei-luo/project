var ws = require("nodejs-websocket")

var PORT=3000

var clientCount=0;
// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {
	console.log("New connection")//服务器终端显示（命令行里面显示）
	clientCount++
	conn.nickname='user'+clientCount//根据数字clientCount自增长确定用户名
	var mes={}
	mes.type="enter"
	mes.data=conn.nickname+' comes in '
	broadcast(JSON.stringify(mes))
	conn.on("text", function (str) {
		console.log("Received "+str)//服务器终端显示（命令行里面显示）
		var mes={}
		mes.type="message"
		mes.data=conn.nickname +' says: '+ str
		broadcast(JSON.stringify(mes))
	})//发送的消息显示格式
	conn.on("close", function (code, reason) {
		console.log("Connection closed")//服务器终端显示（命令行里面显示）
		var mes={}
		mes.type="leave"
		mes.data=conn.nickname+' left '
		broadcast(JSON.stringify(mes))
    })//与服务器的连接关闭时的显示信息
    conn.on("error",function(err){
        console.log("handle err")//服务器终端显示（命令行里面显示）
        console.log(err)
    })//处理异常信息
}).listen(PORT)
console.log("websocket server listening on port "+PORT)

function broadcast(str){
	server.connections.forEach(function(connection){
		connection.sendText(str)
	})
}