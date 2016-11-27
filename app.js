var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var mysql = require('mysql');
var session = require('express-session');
var io = require('socket.io')(http);
var path = require('path');

var roomName = "default";
var roomInfo = null;

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '!!Jin20409281',
    database: 'socketChat'
});

app.use(express.static(path.join(__dirname + '/public')));
app.use(session({
    secret: 'socket-chat',
    resave: false,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.text());
app.use(function (req,res,next) {
    // if(typeof req.session.status == "undefined")
    //     redirect('/');
    next();
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/html/index.html');
});

app.get('/chatroom/:room', function(req, res) {
    roomName = req.params.room;
    res.render('chatroom',{roomName : roomName});
});

app.get('/logout',function (req,res) {
    req.session.status = null;
});

app.get('/waiting',function (req,res) {
    var roomInfo = io.sockets.adapter.rooms;
    rooms = Object.keys(io.sockets.adapter.rooms);
    res.render('waiting',{roomInfo :  roomInfo,rooms :rooms});
});

app.post('/checkID', function(req, res) {
    var id = req.body.signUpId;
    var query = "select id from user where = '" + id + "'";
    connection.query("select id from user where id = ?", id, function(err, rows) {
        if (err)
            console.log(err);

        if (rows.length > 0)
            res.send("exist");
        else
            res.send("dontExist");
    });
});

app.post('/checkEmail', function(req, res) {
    var email = req.body.signUpEmail;
    var query = "select email from user where = '" + email + "'";
    connection.query("select email from user where email = ?", email, function(err, rows) {
        if (err)
            console.log(err);

        if (rows.length > 0)
            res.send("exist");
        else
            res.send("dontExist");
    });
});

app.post('/checkNickname', function(req, res) {
    var nickname = req.body.signUpNick;
    var query = "select nickname from user where = '" + nickname + "'";
    connection.query("select nickname from user where nickname = ?", nickname, function(err, rows) {
        if (err)
            console.log(err);

        if (rows.length > 0)
            res.send("exist");
        else
            res.send("dontExist");
    });
});

app.post('/signUp', function(req, res) {
    var id = req.body.signUpId;
    var pwd = req.body.signUpPwd;
    var email = req.body.email;
    var nickname = req.body.signUpNick;
    var data = [id, pwd, email, nickname];
    connection.query("insert insto values(?,?,?,?)", data, function(err, result) {
        if (err)
            console.log(err);
    });
});

app.post('/signIn', function(req, res) {
    var id = req.body.signInId;
    var pwd = req.body.signInPwd;
    var data = [id, pwd];
    connection.query("select id, pwd ,nickname from user where id = ? and pwd = ?", data, function(err, rows) {
        if (err)
            console.log(err);

        if (rows.length > 0) {
            req.session.nickname = rows;
            req.session.status = 'login';
            res.redirect('/');
        } else {
            res.send("dontExist");
        }

    });
});

io.on('connection', function(socket) {
    console.log('connected!');
    socket.leave(socket.id);
    socket.join(roomName);
    var rooms = io.sockets.adapter.rooms;
    for(roomNum in rooms){
        console.log(rooms[roomNum].length);
    }

    socket.on('sendMsg', function(data) {
        var newData = {
            "desc": data,
            "name": "Kang"
        }
        socket.broadcast.to(roomName).emit('receiveMsg', newData);
    });

});

http.listen(3000, function() {
    console.log("server on");
});
