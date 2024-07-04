import dotenv from 'dotenv';
dotenv.config();
import db from './db_connection.js';

import create_users from './migrations/create_users.js';
import create_chat_room from './migrations/create_chat_room.js';
import create_chat from './migrations/create_chat.js';

console.log(create_users);
db.query(create_users);

console.log(create_chat_room);
db.query(create_chat_room);

console.log(create_chat);
db.query(create_chat);
