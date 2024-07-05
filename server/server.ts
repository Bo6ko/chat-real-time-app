import http from 'http';
import { Server } from 'socket.io';
import app from './app.js';

import Chat from './src/models/chat.js';
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
        ChatRoom.create({sender_id, receiper_id}, (err: MysqlError, chat_room_id: any) => {
            if(err) {
                console.error('Error creating user: ', err);
            } else {
                console.log('Room id', chat_room_id);
                socket.join(chat_room_id);
                console.log(`User with ID: ${sender_id} joined room: ${chat_room_id}`);
                socket.emit('room_chat_id', chat_room_id);


                Chat.getAll((err: MysqlError, results: any) => {
                    if(err) {
                        console.log('Error retrieving users:', err);
                    } else {
                        socket.emit('room_created', results);
                    }
                })
            }
        });
    })

    socket.on("send_message", (chat) => {
        Chat.create(chat);
        socket.to(chat.chat_room_id).emit("receive_message", chat.message)
    })

    socket.on("disconnect", () => {
        console.log('Disconnect')
    })
});

const port = process.env.PORT || 3001;
server.listen(port, () => {
    console.log(`Running server to port ${process.env.PORT || 3001}`)
});
