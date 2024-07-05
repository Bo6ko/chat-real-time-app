import db from '../../database/db_connection.js';
const TABLE = 'chat_room';

interface ChatRoom {
    sender_id: string,
    receiper_id: string,
}

const ChatRoom: any = {
    getAll: (callback: any) => {
        const sql = `select * from ${TABLE}`;
        db.query(sql, callback);
    },
    create: (chatRoom: ChatRoom, callback: any) => {
        const checkChatRoomQuery = `SELECT * FROM chat_room WHERE (sender_id = ? and receiper_id = ?) or (receiper_id = ? and sender_id = ?)`;
        db.query(checkChatRoomQuery, [chatRoom.sender_id, chatRoom.receiper_id, chatRoom.sender_id, chatRoom.receiper_id], (error, results) => {
            if (error) {
                callback(error);
                return;
            }
            if (results.length > 0) {
                // User with the same username or email already exists
                console.log('This Chat room already exists');
                callback(null, results[0].id);
                return;
            }
            const insertChatRoomQuery = `INSERT INTO ${TABLE} (sender_id, receiper_id) VALUES (?, ?)`;
            db.query(insertChatRoomQuery, [chatRoom.sender_id, chatRoom.receiper_id], (error, results) => {
                if (error) {
                    callback(error);
                    return;
                }
                callback(null, results.insertId);
            });
        });
    }
}

export default ChatRoom;