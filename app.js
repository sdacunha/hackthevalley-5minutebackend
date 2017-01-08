var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendfile('index.html');
});

io.on('connection', function(socket){
    socket.on('beacon-ping', function(msg){
        console.log('message: ' + msg);
    });
    socket.on('phone', function(msg){
        console.log('message: ' + msg);
    });
});

http.listen(3000, "0.0.0.0", function(){
    console.log('listening on *:3000');
});