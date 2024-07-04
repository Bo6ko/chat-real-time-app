import http from 'http';
import { Server, Socket } from 'socket.io';
import app from './app.js';

import ChatRoom from './src/models/chat_room.js';
import { MysqlError } from 'mysql';

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

io.on("connection", (socket) => {
    console.log('Connected');

    socket.on("join_room", (sender_id, receiper_id) => {
        ChatRoom.create({sender_id, receiper_id}, (err: MysqlError, roomId: any) => {
            if(err) {
                console.error('Error creating user: ', err);
            } else {
                console.log('Room id', roomId)
                socket.join(roomId);
                console.log(`User with ID: ${sender_id} joined room: ${roomId}`)
            }
        });
    })

    socket.on("send_message", (chat) => {
        console.log(chat);
        socket.to(chat.room).emit("receive_message", chat.message)
    })

    socket.on("disconnect", () => {
        console.log('Disconnect')
    })
});

const port = process.env.PORT || 3001;
server.listen(port, () => {
    console.log(`Running server to port ${process.env.PORT || 3001}`)
});
