var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bb = require('./lib/bbcode');

console.log(bb(';-)'));

server.listen(3000);

app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {
    res.sendfile(__dirname + '/public/index.html');
});

io.on('connection', function(socket){
    socket.on('chat message', function(msg, user) {
        msg.msg = bb(msg.msg);
        io.emit('chat message', msg);
    });
});
