var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile('index.html', { root: __dirname });
});

var messages = [];

io.on('connection', function(socket){
  console.log(socket.id + ' connected');

  for (var i = 0; i < messages.length; i++) {
    socket.emit('chat message', messages[i]);
  }

  socket.on('disconnect', function(){
    console.log(socket.id + ' user disconnected');
  });

  socket.on('chat message', function(msg){
    console.log(socket.id + ' message: ' + msg);
    io.emit('chat message', msg);

    messages.push(msg);
  });
});

var port = process.env.port || 3000;

http.listen(port, function(){
  console.log('listening on *:' + port);
});
