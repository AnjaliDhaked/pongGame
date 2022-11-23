const express = require("express");
const app = express();
const bp = require("body-parser");
const { Room } = require("./room.js");
const shortId = require("shortid");
/**
 * @type {Map<string, Room>}
 */
const rooms = new Map();
// const qr = require("qrcode");
require("dotenv").config();
const { Server } = require("socket.io");
const io = new Server({
  cors: {
    origin: '*'
  }
});
app.get('/', function (req, res) {
  res.send('GET request to homepage')
})
const points = 0;
// app.use(bp.urlencoded({ extended: false }));
// app.use(bp.json());

//  io.use((socket, next)=>{
//     const {name} = socket.handshake.query;
//     if(name){
//       socket.data = { name };
//       return next();
//     }
//     return next(new Error('Error'))
//    })
io.on('connection', async socket => {
  console.log('Connection Success', socket.id);
  const socket_list = await io.fetchSockets();
  socket.emit('participant-list', socket_list.map(socket => ({ id: socket.id, name: socket.data.name, points: points })));
  socket.broadcast.emit("participant-joined", () => {
    // const totalRooms = rooms.size();
    // const size = rooms[totalRooms].size();
    // if(size ===2){

    // }

    if (socket_list.length > 2) {
      socket.disconnect();
    }
    else {
      socket.emit('participant-joined', { id: socket.id, name: socket.data.name, points: 0 });
    }
  });
  socket.on('hit-ball', (id) => {
    const room = rooms.get(id);
    points++;
    if (room) {
      room.points = points;
    }
    socket.emit('hit-ball', {
      id: socket.id,
      points: points
    });
  });
  socket.on('create-group', () => {
    const id = shortId.generate();
    const room = new Room({ id, points: 0 });
    rooms.set(id, room);
    io.emit("group-created", { id });
  });
  socket.on('join-group', (id) => {
    const room = rooms.get(id);
    if (room) {
      socket.join(id);
      socket.emit('group-joined', room);
    }

  });
  socket.on("disconnect", () => {
    socket.broadcast.emit("participant-left");
  });

});

io.listen(process.env.PORT || 3000, function () {
  console.log("SERVER STARTED PORT: 3000");
});
