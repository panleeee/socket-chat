var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var mysql = require('mysql');
var session = require('express-session');
var io = require('socket.io')(http);
var path = require('path');

app.use(express.static(path.join(__dirname+'/public')));
app.use(session({
    secret: 'socket-chat',
    resave: false,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(bodyParser.text());

app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');

app.get('/',function (req,res) {
  res.sendFile(__dirname+'/public/html/index.html');
});

app.get('/chatroom',function (req,res) {
    res.sendFile(__dirname+'/public/html/chatroom.html');
});

app.post('/checkID',function (req,res) {
  var id = req.body.
});

io.on('connection',function (socket) {
    console.log('connected!');
    socket.on('sendMsg',function (data) {
        var newData = {
            "desc" : data,
            "name" : "Kang"
        }
        socket.broadcast.emit('receiveMsg',newData);
    });
});

http.listen(3000,function () {
    console.log("server on");
});
