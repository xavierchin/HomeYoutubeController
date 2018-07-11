var fs = require('fs');
var https = require('https');
const express = require("express");
const appHTTP = express();
const server = require('http').Server(appHTTP);
var audio = require('win-audio').speaker;
var nowPlaying="";
var nextSong="";
var songList=[];
var online = 0;
audio.polling(500);//check sound on 500ms
var SERVER_CONFIG = {//https config
    key: fs.readFileSync('./key/server-key.pem'),
    ca: [fs.readFileSync('./key/cert.pem')],
    cert: fs.readFileSync('./key/server-cert.pem')
};
var app = https.createServer(SERVER_CONFIG, (req, res) => {
    res.writeHead(200);
    //res.end('hello world\n');
});//https server create

var io = require('socket.io')(app);//socket io create on https server

appHTTP.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
appHTTP.get('/shotcut', (req, res) => {
    res.sendFile(__dirname + '/shotcut.html');
});
appHTTP.use('/images', express.static(__dirname + '/images'));

io.on('connection', function (socket) {
    online += 1;
    io.emit("online",online);
    io.emit("title",nowPlaying);
    io.emit("volume",audio.get());
    io.emit("nextsong",nextSong);
    io.emit("songlist",songList);
    console.log("someone connect,now online:" + online.toString());
    socket.on("send", (msg) => {
        io.emit("msg", msg);//boardcast to all online user
        switch (msg) {
            case "sounddown":
                audio.decrease(10);
                break;
            case "soundup":
                audio.increase(10);
                break;
            case "mute":
                audio.mute();
                break;
            default:
                break;
        }
        console.log(msg);
    });
    socket.on("title",(msg)=>{
        io.emit("title",msg);
        nowPlaying=msg;
        console.log("title",msg);
    });
    socket.on("nextsong",(msg)=>{
        io.emit("nextsong",msg);
        nextSong=msg;
        console.log("next song : "+msg);
    })
    socket.on("songlist",(list)=>{
        console.log(list);
        songList=list;
        io.emit("songlist",list);
    });
    socket.on("sendlink",(link)=>{
        console.log("select link : "+ link);
        io.emit("sendlink",link)
    });
    socket.on('disconnect', function () {
        console.log(socket.id, 'disconnected');
        online -= 1;
    });
});
audio.events.on('change', (volume) => {
    console.log("old %d% -> new %d%", volume.old, volume.new);
    io.emit("volume",volume.new)
});

audio.events.on('toggle', (status) => {
    console.log("muted: %s -> %s", status.old, status.new);
    if(status.new){
        io.emit("volume","mute")
        console.log(status);
    }
});
server.listen(80, "192.168.1.4", () => {
    console.log("Server Started. http://192.168.1.4");
});
app.listen(443, '192.168.1.4', () => {
    console.log("Server Start listen on https://192.168.1.4")
});

