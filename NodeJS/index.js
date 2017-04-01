var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http, {
    transports: ['polling', 'websocket'],
});

io.attach(4567);

io.on('connection', function(socket){
    socket.on('character', function(msg){
        //console.log(msg);
        io.emit('character', msg);
    });
});

//Express for HTTP Request
app.set('json spaces', 20);
app.get('/play', function (req, res) {
    res.sendFile(__dirname + '/files/index.html');
});
app.get('/files/jquery.js', function (req, res) {
    res.sendFile(__dirname + '/files/jquery.js');
});

http.listen(8080, function () {
    console.log('listening on *:' + 8080);
});

//app.listen(8080, function () {
//    console.log('Example app listening on port 3000!')
//});