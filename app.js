var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var phones = {}

app.get('/', function(req, res){
    res.sendfile('index.html');
});

io.on('connection', function(socket){
    socket.on('beacon-ping', function(msg){
        phones[msg].emit("ping");
    });
    socket.on('beacon-purchased', function(msg){
        phones[msg].emit("purchased");
    });
    socket.on('phone', function(msg){
        phones[msg] = socket
    });
});

http.listen(80, "0.0.0.0", function(){
    console.log('listening on *:3000');
});