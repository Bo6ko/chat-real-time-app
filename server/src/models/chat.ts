import db from '../../database/db_connection.js';
const TABLE = 'chat';

interface Chat {
    chat_room_id: string,
    user_id: number,
    message: string,
}

const Chat: any = {
    getAll: (callback: any) => {
        const sql = `select c.chat_room_id, c.message, u.id, u.email from ${TABLE} as c join users as u ON u.id = c.user_id order by c.created_at`;
        db.query(sql, callback);
    },
    create: (chat: Chat) => {
        const insertChatQuery = `INSERT INTO ${TABLE} (chat_room_id, user_id, message) VALUES (?, ?, ?)`;
        db.query(insertChatQuery, [chat.chat_room_id, chat.user_id, chat.message], (error, results) => {
            if (error) {
                console.log(error);
                return;
            }
            console.log(results);
        });
    },
}

export default Chat;