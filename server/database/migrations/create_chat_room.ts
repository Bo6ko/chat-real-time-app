const create_chat_room = `CREATE table IF NOT EXISTS chat_room (
    id INT PRIMARY KEY AUTO_INCREMENT,
    sender_id INT,
    receiper_id INT,
	created_at DATETIME DEFAULT NOW(),
	updated_at TIMESTAMP,
    CONSTRAINT FK_Users_Chat_room_Sender FOREIGN KEY (sender_id)
    REFERENCES Users(id),
    CONSTRAINT FK_Users_Chat_room_Receiper FOREIGN KEY (receiper_id)
    REFERENCES Users(id)
)`;

export default create_chat_room;