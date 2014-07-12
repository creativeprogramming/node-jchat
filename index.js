var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var formatDate = require('dateformat');
var jchat = require('./lib/jchat');
var config = require('./config.json');

server.listen(config.port);

app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {
    res.sendfile(__dirname + '/public/index.html');
});

io.on('connection', function (socket) {
    socket.emit('chat message', {
        time: formatDate(new Date(), config.timeformat),
        user: 'system',
        msg: config.welcomemsg
    });
    socket.on('chat message', function (msg, user) {
        msg.msg = jchat.BBcode(msg.msg);
        msg.time = formatDate(msg.time, config.timeformat);
        io.emit('chat message', msg);
    });
});
