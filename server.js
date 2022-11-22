const express = require("express");
const app = express();
const bp = require("body-parser");

// const qr = require("qrcode");
require("dotenv").config();
// const port = 3000;
const { Server } = require("socket.io");
const io = new Server({
    cors: {
        origin : '*'
    }
 });
 app.get('/', function (req, res) {
    res.send('GET request to homepage')
  })
const points = 0;
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());

 io.use((socket, next)=>{
    const {name} = socket.handshake.query;
    if(name){
      socket.data = { name };
      return next();
    }
    return next(new Error('Error'))
   })
 io.on('connection', async socket => {
    console.log('Connection Success', socket.id);
    const socket_list =await io.fetchSockets();
    socket.emit('participant-list', socket_list.map(socket => ({id: socket.id, name: socket.data.name, points: points})));
    socket.broadcast.emit("participant-joined",() => {
        if(socket_list.length > 2){
            socket.disconnect();
        }
        else{
            socket.emit('participant-joined', {id: socket.id, name: socket.data.name, points:0});
        }
    });
    socket.on('hit-ball', () => {
       points++;
       socket.emit('hit-ball',{
        name: socket.data.name,
        id: socket.id,
        points: points
       });
    });
    socket.on("disconnect", () => {
        socket.broadcast.emit("participant-left");
      });

 });

 app.listen(process.env.PORT || 3000, () => console.log("Server at 3000"));
