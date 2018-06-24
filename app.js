var express = require('express');
const http = require('http');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var gameRouter = require('./gameRouter');

var app = express();
const server = http.createServer(app);

server.listen(3000, err => {
  console.log('Server is running @ 3000');
});

app.set('view engine', 'html');
app.set('view engine', 'jade');
app.use(express.static(__dirname));
app.get('/', (req, res) => {
  console.log("test")
  res.sendFile(__dirname + '/index.html');
});
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }))

app.use(gameRouter);

// 여기까지 오면 - 에러
app.use(function(req, res, next) {
  res.sendStatus(404);  
});

app.use(function(err, req, res, next) {
   res.send('ERROR', err.stack);
});
var io = require('socket.io')(server);
io.on('connection', socket => {
    // 연결된 사용자와 채팅방 정보
    var user;
    var room;
    console.log("Socket ");
    // 채팅방 입장
    socket.on('joinRoom', function (info) {
        user = info.user;
        // 기존 룸에서 나가기
        if ( room ) {
            socket.leave(room);
            room = null;
        }

        // 채팅방 얻어오기
        room = info.room;
        socket.join(room);
        
        console.log('user ', user, 'join room:', room);
        io.to(room).emit('joinRoomResult', {user:user, room:room})
    });

    // 클라이언트가 보낸 메세지 이벤트
    socket.on('message', function(data) {
        console.log('client message :', data);

        const text = data.message;

        console.log('[' + room + ']', user, '>>', text);
        if ( user && text ) {
            io.to(room).emit('messageReceive', {user:user, message:text})
        }
    });
});
