const create_chat = `CREATE table IF NOT EXISTS chat (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    chat_room_id INT,
    message TEXT NOT NULL,
	created_at DATETIME DEFAULT NOW(),
	updated_at TIMESTAMP,
    CONSTRAINT FK_Users_Chat FOREIGN KEY (user_id)
    REFERENCES Users(id),
    CONSTRAINT FK_Chat_room_Chat FOREIGN KEY (chat_room_id)
    REFERENCES Chat_room(id)
)`;

export default create_chat;