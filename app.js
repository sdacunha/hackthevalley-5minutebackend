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
        console.log("Beacon sent purchase ping to " + msg);
    });
    socket.on('beacon-purchased', function(msg){
        phones[msg].emit("purchased");
        console.log("Beacon sent purchased ping to " + msg);
    });
    socket.on('phone', function(msg){
        phones[msg] = socket
        console.log("Phone connected: " + msg);
    });
});

http.listen(80, "0.0.0.0", function(){
    console.log('listening on *:80');
});