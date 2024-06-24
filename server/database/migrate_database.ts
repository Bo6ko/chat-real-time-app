import dotenv from 'dotenv';
dotenv.config();
import db from './db_connection';

import create_users from './migrations/create_users.js';

console.log(create_users);
db.query(create_users);
