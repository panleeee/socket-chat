var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var mysql = require('mysql');
var session = require('express-session');
var io = require('socket.io')(http);
var path = require('path');

var roomName = "default";
var nickname;
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
app.use('/waiting', function(req, res, next) {
    if (typeof req.session.status == "undefined")
        res.redirect('/');
    next();
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('index', {status : req.session.status});
    console.log(nickname);
});

app.get('/chatroom/:room', function(req, res) {
    roomName = req.params.room;
    res.render('chatroom', {
        roomName: roomName
    });
});

app.get('/logout', function(req, res) {
    req.session.status = null;
    res.redirect('/');
});

app.get('/waiting', function(req, res) {
    var roomInfo = io.sockets.adapter.rooms;
    rooms = Object.keys(io.sockets.adapter.rooms);
    res.render('waiting', {
        roomInfo: roomInfo,
        rooms: rooms
    });
});

app.post('/checkID', function(req, res) {
    var id = req.body.signUpId;
    // console.log(req.body);
    // console.log(res);
    var query = "select id from user where id = '" + id + "'";
    connection.query(query, function(err, rows) {
        if (err)
            console.log(err);

        console.log(rows);

        if (rows.length > 0)
            res.send({
                isExist: "exist"
            });
        else
            res.send({
                isExist: "dontExist"
            });
    });
});

app.post('/checkEmail', function(req, res) {
    var email = req.body.signUpEmail;
    console.log(email);
    var query = "select email from user where email = '" + email + "'";
    connection.query(query, function(err, rows) {
        if (err)
            console.log(err);

        if (rows.length > 0)
            res.send({isExist :"exist"});
        else
            res.send({isExist :"dontExist"});
    });

});

app.post('/checkNickname', function(req, res) {
    var nickname = req.body.signUpNick;
    var query = "select nickname from user where nickname = '" + nickname + "'";
    connection.query(query, function(err, rows) {
        if (err)
            console.log(err);

        if (rows.length > 0) {
            res.send({
                isExist: "exist"
            });
        } else {
            res.send({
                isExist: "dontExist"
            });
        }
    });
});

app.post('/signUp', function(req, res) {
    console.log('sign up');
    var id = req.body.signUpId;
    var pwd = req.body.signUpPwd;
    var email = req.body.signUpEmail;
    var nickname = req.body.signUpNick;
    var data = [id, pwd, email, nickname];

    connection.query("insert into user(id,pwd,email,nickname) values(?,?,?,?)", data, function(err, result) {
        if (err)
            console.log(err);
            console.log(result);
        res.redirect('/');
    });

});

app.post('/signIn', function(req, res) {
    var id = req.body.signInId;
    var pwd = req.body.signInPwd;
    var data = [id, pwd];
    connection.query("select id, pwd ,nickname from user where id = '" + id + "' and pwd = '" + pwd + "'", function(err, rows) {
        if (err)
            console.log(err);

        if (rows.length > 0) {
            req.session.nickname = rows[0].nickname;
            req.session.status = 'login';
            nickname = req.session.nickname;
            res.redirect(301,'/');
            res
        } else {
            res.send('<script>alert("ID 또는 PWD를 확인해주세요.")</script>');
        }
    });
});

io.on('connection', function(socket) {
    console.log('connected!');
    socket.leave(socket.id);
    socket.join(roomName);
    var rooms = io.sockets.adapter.rooms;
    for (roomNum in rooms) {
        console.log(rooms[roomNum].length);
    }

    socket.on('sendMsg', function(data) {
        var newData = {
            "desc": data,
            "name": nickname
        }
        socket.broadcast.to(roomName).emit('receiveMsg', newData);
    });

});

http.listen(3000, function() {
    console.log("server on");
});
