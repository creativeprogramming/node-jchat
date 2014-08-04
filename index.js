var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var formatDate = require('dateformat');
var config = require('./config.json');
var jchat = require('./lib/jchat');
var cache = require('pcache');
var jCache = new cache(config.cachetime);

server.listen(config.port);

app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {
    res.sendfile(__dirname + '/public/index.html');
});

io.on('connection', function (socket) {
    var users = {};
    jCache.keys().forEach(function(i) {
        socket.emit('chat message', jCache.get(i));
    });

    socket.emit('chat message', {
        time: formatDate(new Date(), config.timeformat),
        user: 'system',
        msg: config.welcomemsg
    });

    socket.on('chat message', function (msg) {
        msg.msg = jchat.BBcode(msg.msg);
        msg.time = formatDate(msg.time, config.timeformat);
        jCache.set(new Date().getTime(), msg);
        io.emit('chat message', msg);
    });

    socket.on('connected', function (msg) {
        users[socket.id] = msg.user;
        msg.msg = msg.user + ' has joined';
        msg.time = formatDate(msg.time, config.timeformat);
        msg.user = 'system';
        io.emit('chat message', msg);
    });

    socket.on('disconnect', function() {
        var msg = {};
        msg.msg = users[socket.id] + ' has left';
        msg.user = 'system';
        msg.time = formatDate(msg.time, config.timeformat);
        io.emit('chat message', msg);
    });
});
