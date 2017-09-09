var app=require('http').createServer()
var io=require('socket.io')(app)

var PORT=3000

var clientCount=0;

app.listen(PORT)

io.on('connection',function(socket){
	clientCount++
	socket.nickname='user'+clientCount//根据数字clientCount自增长确定用户名
	io.emit('enter',socket.nickname+'comes in')

	socket.on('message',function(str){
		io.emit('message',socket.nickname +' says: '+ str)
	})

	socket.on('disconnect',function(str){
		io.emit('leave',socket.nickname +' left ')
	})
})


console.log("websocket server listening on port "+PORT)
